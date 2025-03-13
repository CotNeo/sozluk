import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import Entry from '@/app/models/Entry';

// Beğeni ekle
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

    const { entryId } = await request.json();

    // Entry ID'si kontrolü
    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID\'si zorunludur' },
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

    // Kullanıcının daha önce beğenip beğenmediğini kontrol et
    const userId = session.user.id;
    const alreadyLiked = entry.likes.includes(userId);

    if (alreadyLiked) {
      return NextResponse.json(
        { error: 'Bu entry\'i zaten beğendiniz' },
        { status: 400 }
      );
    }

    // Beğeni ekle
    const updatedEntry = await Entry.findByIdAndUpdate(
      entryId,
      { $addToSet: { likes: userId } },
      { new: true }
    )
      .populate('author', 'username displayName')
      .populate('topic', 'title slug');

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error('Error adding like:', error);
    return NextResponse.json(
      { error: 'Beğeni eklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Beğeni kaldır
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();

    // Kullanıcı girişi kontrolü
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Bu işlem için giriş yapmalısınız' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get('entryId');

    // Entry ID'si kontrolü
    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID\'si zorunludur' },
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

    // Kullanıcının daha önce beğenip beğenmediğini kontrol et
    const userId = session.user.id;
    const alreadyLiked = entry.likes.includes(userId);

    if (!alreadyLiked) {
      return NextResponse.json(
        { error: 'Bu entry\'i beğenmediniz' },
        { status: 400 }
      );
    }

    // Beğeni kaldır
    const updatedEntry = await Entry.findByIdAndUpdate(
      entryId,
      { $pull: { likes: userId } },
      { new: true }
    )
      .populate('author', 'username displayName')
      .populate('topic', 'title slug');

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error('Error removing like:', error);
    return NextResponse.json(
      { error: 'Beğeni kaldırılırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 