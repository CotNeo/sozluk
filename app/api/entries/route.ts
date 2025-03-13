import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import Entry from '@/app/models/Entry';
import Topic from '@/app/models/Topic';

// GET /api/entries - Get all entries
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('topic');
    const debe = searchParams.get('debe') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    await dbConnect();

    let query = {};
    let sort = { createdAt: -1 }; // Varsayılan olarak en yeni entryler

    // Belirli bir başlığa ait entryleri filtrele
    if (topicId) {
      query = { ...query, topic: topicId };
    }

    // DEBE (Dünün En Beğenilen Entry'leri) için filtrele
    if (debe) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      query = {
        ...query,
        createdAt: { $gte: yesterday, $lt: today },
      };
      
      sort = { 'likes.length': -1 }; // Beğeni sayısına göre sırala
    }

    // Entryleri getir ve yazarlarını populate et
    const entries = await Entry.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('author', 'username displayName')
      .populate('topic', 'title slug')
      .lean();

    // Toplam entry sayısını getir (sayfalama için)
    const total = await Entry.countDocuments(query);

    return NextResponse.json({
      entries,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json(
      { error: 'Entryler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/entries - Create a new entry
export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    // Kullanıcı girişi kontrolü
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Bu işlem için giriş yapmalısınız' },
        { status: 401 }
      );
    }

    const { content, topicId } = await request.json();

    // Gerekli alanları kontrol et
    if (!content || !topicId) {
      return NextResponse.json(
        { error: 'İçerik ve başlık ID\'si zorunludur' },
        { status: 400 }
      );
    }

    // İçerik uzunluğunu kontrol et
    if (content.trim().length < 10) {
      return NextResponse.json(
        { error: 'Entry en az 10 karakter olmalıdır' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Başlığın var olup olmadığını kontrol et
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return NextResponse.json(
        { error: 'Belirtilen başlık bulunamadı' },
        { status: 404 }
      );
    }

    // Yeni entry oluştur
    const entry = await Entry.create({
      content,
      author: session.user.id,
      topic: topicId,
      likes: [],
      isEdited: false,
      isFeatured: false,
    });

    // Başlığın entry sayısını güncelle
    await Topic.findByIdAndUpdate(topicId, { $inc: { entryCount: 1 } });

    // Entry'i yazarı ve başlığı ile birlikte getir
    const populatedEntry = await Entry.findById(entry._id)
      .populate('author', 'username displayName')
      .populate('topic', 'title slug');

    return NextResponse.json(populatedEntry, { status: 201 });
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json(
      { error: 'Entry oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 