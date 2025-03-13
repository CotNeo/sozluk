import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import Comment from '@/app/models/Comment';
import Entry from '@/app/models/Entry';

// GET /api/comments - Get all comments
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get('entryId');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID\'si gereklidir' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Entry'nin var olup olmadığını kontrol et
    const entry = await Entry.findById(entryId);
    if (!entry) {
      return NextResponse.json(
        { error: 'Belirtilen entry bulunamadı' },
        { status: 404 }
      );
    }

    // Yorumları getir ve yazarlarını populate et
    const comments = await Comment.find({ entryId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username displayName')
      .lean();

    // Toplam yorum sayısını getir (sayfalama için)
    const total = await Comment.countDocuments({ entryId });

    return NextResponse.json({
      comments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Yorumlar yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// POST /api/comments - Create a new comment
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

    const { content, entryId } = await request.json();

    // Gerekli alanları kontrol et
    if (!content || !entryId) {
      return NextResponse.json(
        { error: 'İçerik ve entry ID\'si zorunludur' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Entry'nin var olup olmadığını kontrol et
    const entry = await Entry.findById(entryId);
    if (!entry) {
      return NextResponse.json(
        { error: 'Belirtilen entry bulunamadı' },
        { status: 404 }
      );
    }

    // Yeni yorum oluştur
    const comment = await Comment.create({
      content,
      author: session.user.id,
      entryId,
    });

    // Yorumu yazarı ile birlikte getir
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username displayName');

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Yorum oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 