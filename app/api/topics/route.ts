import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import Topic from '@/app/models/Topic';
import Entry from '@/app/models/Entry';

// GET /api/topics - Get all topics
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const popular = searchParams.get('popular');
    const today = searchParams.get('today');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    await dbConnect();

    let query = {};
    let sort: { [key: string]: 1 | -1 } = { createdAt: -1 }; // Varsayılan olarak en yeni başlıklar

    // Popüler başlıkları filtrele
    if (popular === 'true') {
      query = { ...query, isPopular: true };
      sort = { entryCount: -1 }; // Entry sayısına göre sırala
    }

    // Bugünkü başlıkları filtrele
    if (today === 'true') {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      query = { ...query, createdAt: { $gte: todayStart } };
    }

    // Başlıkları getir ve yazarlarını populate et
    const topics = await Topic.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('author', 'username displayName')
      .lean();

    // Toplam başlık sayısını getir (sayfalama için)
    const total = await Topic.countDocuments(query);

    return NextResponse.json({
      topics,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Başlıklar yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/topics - Create a new topic
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession();

    // Kullanıcı girişi kontrolü
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Bu işlem için giriş yapmalısınız' },
        { status: 401 }
      );
    }

    const { title, description, tags, firstEntry } = await request.json();

    // Gerekli alanları kontrol et
    if (!title || !firstEntry) {
      return NextResponse.json(
        { error: 'Başlık ve ilk entry zorunludur' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Slug oluştur
    const slug = title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Slug'ın benzersiz olup olmadığını kontrol et
    const existingTopic = await Topic.findOne({ slug });
    if (existingTopic) {
      return NextResponse.json(
        { error: 'Bu başlık zaten mevcut' },
        { status: 400 }
      );
    }

    // Yeni başlık oluştur
    const topic = await Topic.create({
      title,
      slug,
      description,
      author: session.user.id,
      tags: tags || [],
      entryCount: 1, // İlk entry ile başlar
      isPopular: false,
      isFeatured: false,
    });

    // İlk entry'i oluştur
    const entry = await Entry.create({
      content: firstEntry,
      author: session.user.id,
      topic: topic._id,
      likes: [],
      isEdited: false,
      isFeatured: false,
    });

    return NextResponse.json({
      topic: {
        ...topic.toObject(),
        author: {
          id: session.user.id,
          username: session.user.username,
          displayName: session.user.displayName,
        },
      },
      entry: {
        ...entry.toObject(),
        author: {
          id: session.user.id,
          username: session.user.username,
          displayName: session.user.displayName,
        },
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      { error: 'Başlık oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 