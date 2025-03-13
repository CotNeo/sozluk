# hubX sözlük

Modern bir sosyal sözlük platformu. Next.js, TypeScript, MongoDB ve Tailwind CSS ile geliştirilmiştir.

## Proje Hakkında

hubX sözlük, kullanıcıların çeşitli konular hakkında başlıklar açabildiği, bu başlıklar altında entryler (girdiler) yazabildiği ve diğer kullanıcıların entrylerini beğenebildiği veya yorum yapabildiği bir sosyal platform uygulamasıdır.

## Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Veritabanı**: MongoDB, Mongoose
- **Kimlik Doğrulama**: NextAuth.js
- **Stil**: Tailwind CSS
- **Gerçek Zamanlı İletişim**: Socket.io
- **Paket Yöneticisi**: npm

## Proje Durumu

### Tamamlanan İşlemler

#### Bileşenler
- ✅ **Header**: Üst menü bileşeni, arama kutusu ve navigasyon linkleri içerir
- ✅ **Footer**: Alt bilgi bileşeni, sosyal medya linkleri ve telif hakkı bilgisi içerir
- ✅ **TopicCard**: Başlık kartı bileşeni, başlık bilgilerini görüntüler
- ✅ **EntryCard**: Entry kartı bileşeni, entry içeriğini ve beğeni/yorum butonlarını içerir
- ✅ **EntryForm**: Entry formu bileşeni, yeni entry oluşturmak için kullanılır
- ✅ **CommentSection**: Yorum bölümü bileşeni, yorumları listeler ve yeni yorum ekleme formu içerir

#### Sayfalar
- ✅ **Ana Sayfa**: Karşılama sayfası ve popüler başlıkları gösterir
- ✅ **Giriş Sayfası**: Kullanıcı girişi için form içerir
- ✅ **Kayıt Sayfası**: Yeni kullanıcı kaydı için form içerir
- ✅ **Popüler Başlıklar Sayfası**: En popüler başlıkları listeler
- ✅ **Bugünkü Başlıklar Sayfası**: Bugün oluşturulan başlıkları listeler
- ✅ **DEBE (Dünün En Beğenilen Entryleri) Sayfası**: Dün en çok beğeni alan entryleri listeler
- ✅ **Başlık Oluşturma Sayfası**: Yeni başlık oluşturmak için form içerir
- ✅ **Başlık Detay Sayfası**: Belirli bir başlığın detaylarını ve entrylerini gösterir
- ✅ **Entry Detay Sayfası**: Belirli bir entrynin detaylarını ve yorumlarını gösterir

#### API Rotaları
- ✅ **Kimlik Doğrulama API'leri**: Kullanıcı girişi ve kaydı için API rotaları
  - `/api/auth/[...nextauth]`: NextAuth.js ile kimlik doğrulama
  - `/api/users/register`: Kullanıcı kaydı
- ✅ **Başlık API'leri**: Başlık oluşturma ve listeleme için API rotaları
  - `/api/topics`: Başlık oluşturma (POST) ve listeleme (GET)
  - `/api/topics?popular=true`: Popüler başlıkları listeleme
  - `/api/topics?today=true`: Bugünkü başlıkları listeleme
- ✅ **Entry API'leri**: Entry oluşturma ve listeleme için API rotaları
  - `/api/entries`: Entry oluşturma (POST) ve listeleme (GET)
  - `/api/entries?topic=:topicId`: Belirli bir başlığa ait entryleri listeleme
  - `/api/entries?debe=true`: Dünün en beğenilen entrylerini listeleme
- ✅ **Yorum API'leri**: Yorum oluşturma ve listeleme için API rotaları
  - `/api/comments`: Yorum oluşturma (POST) ve listeleme (GET)
  - `/api/comments?entryId=:entryId`: Belirli bir entrye ait yorumları listeleme
- ✅ **Beğeni API'leri**: Entry beğenme ve beğeniyi kaldırma için API rotaları
  - `/api/likes`: Entry beğenme (POST) ve beğeniyi kaldırma (DELETE)

#### Modeller
- ✅ **User**: Kullanıcı modeli
- ✅ **Topic**: Başlık modeli
- ✅ **Entry**: Entry modeli
- ✅ **Comment**: Yorum modeli

#### Yardımcı Fonksiyonlar
- ✅ **dbConnect**: MongoDB bağlantısı için yardımcı fonksiyon
- ✅ **socket**: Socket.io istemci ve sunucu bağlantısı için yardımcı fonksiyonlar

#### Tip Tanımlamaları
- ✅ **next-auth.d.ts**: NextAuth için genişletilmiş tip tanımlamaları

### Tamamlanacak İşlemler

#### Kullanıcı Yönetimi
- ⬜ **Kullanıcı Profil Sayfası**: Kullanıcı profilini görüntüleme ve düzenleme
- ⬜ **Şifre Sıfırlama**: Kullanıcıların şifrelerini sıfırlaması için fonksiyonalite
- ⬜ **Kullanıcı Takip Etme**: Kullanıcıların birbirlerini takip etmesi için fonksiyonalite
- ⬜ **Kullanıcı Ayarları**: Kullanıcı tercihlerini yönetme

#### İçerik Yönetimi
- ⬜ **Entry Düzenleme**: Kullanıcıların kendi entrylerini düzenlemesi
- ⬜ **Entry Silme**: Kullanıcıların kendi entrylerini silmesi
- ⬜ **Başlık Düzenleme**: Moderatörlerin başlıkları düzenlemesi
- ⬜ **İçerik Raporlama**: Uygunsuz içeriği raporlama mekanizması

#### Arama Özellikleri
- ⬜ **Başlık Arama**: Başlıklar içinde arama yapma
- ⬜ **Entry İçeriği Arama**: Entry içeriklerinde arama yapma
- ⬜ **Gelişmiş Filtreleme**: Tarih, popülerlik, etiket gibi kriterlere göre filtreleme

#### Bildirim Sistemi
- ⬜ **Beğeni Bildirimleri**: Kullanıcıların entryleri beğenildiğinde bildirim
- ⬜ **Yorum Bildirimleri**: Kullanıcıların entrylerinde yorum yapıldığında bildirim
- ⬜ **Takip Bildirimleri**: Takip edilen kullanıcılar yeni entry eklediğinde bildirim

#### Yönetim Paneli
- ⬜ **Moderatör Paneli**: Moderatörler için özel yönetim paneli
- ⬜ **İçerik Onaylama/Reddetme**: Moderatörlerin içerikleri onaylaması veya reddetmesi
- ⬜ **Kullanıcı Yönetimi**: Moderatörlerin kullanıcıları yönetmesi

#### Performans İyileştirmeleri
- ⬜ **Sayfalama Optimizasyonu**: Büyük veri setleri için sayfalama
- ⬜ **Önbellek Stratejileri**: Verilerin önbelleğe alınması
- ⬜ **Görüntü Optimizasyonu**: Görsellerin optimizasyonu

#### Mobil Uyumluluk İyileştirmeleri
- ⬜ **Responsive Tasarım İyileştirmeleri**: Mobil cihazlar için daha iyi kullanıcı deneyimi
- ⬜ **Mobil-Spesifik Özellikler**: Mobil cihazlara özel özellikler

#### Ek Özellikler
- ⬜ **Tema Seçenekleri**: Açık/koyu tema seçeneği
- ⬜ **Çoklu Dil Desteği**: Farklı dil seçenekleri
- ⬜ **Sosyal Medya Entegrasyonu**: Sosyal medya platformlarıyla entegrasyon
- ⬜ **İstatistikler**: Kullanıcı ve içerik istatistikleri

## Proje Yapısı

```
hubx-sozluk/
├── app/                    # Next.js 14 App Router yapısı
│   ├── api/                # API rotaları
│   │   ├── auth/           # Kimlik doğrulama API'leri
│   │   ├── users/          # Kullanıcı API'leri
│   │   ├── topics/         # Başlık API'leri
│   │   ├── entries/        # Entry API'leri
│   │   ├── comments/       # Yorum API'leri
│   │   └── likes/          # Beğeni API'leri
│   ├── components/         # Paylaşılan bileşenler
│   │   ├── Header.tsx      # Üst menü bileşeni
│   │   ├── Footer.tsx      # Alt bilgi bileşeni
│   │   ├── TopicCard.tsx   # Başlık kartı bileşeni
│   │   ├── EntryCard.tsx   # Entry kartı bileşeni
│   │   ├── EntryForm.tsx   # Entry formu bileşeni
│   │   └── CommentSection.tsx # Yorum bölümü bileşeni
│   ├── models/             # Mongoose modelleri
│   │   ├── User.ts         # Kullanıcı modeli
│   │   ├── Topic.ts        # Başlık modeli
│   │   ├── Entry.ts        # Entry modeli
│   │   └── Comment.ts      # Yorum modeli
│   ├── login/              # Giriş sayfası
│   ├── register/           # Kayıt sayfası
│   ├── popular/            # Popüler başlıklar sayfası
│   ├── today/              # Bugünkü başlıklar sayfası
│   ├── debe/               # Dünün en beğenilen entryleri sayfası
│   ├── topic/[slug]/       # Başlık detay sayfası
│   ├── entry/[id]/         # Entry detay sayfası
│   ├── user/[username]/    # Kullanıcı profil sayfası
│   ├── topics/create/      # Başlık oluşturma sayfası
│   ├── layout.tsx          # Ana layout
│   ├── page.tsx            # Ana sayfa
│   └── globals.css         # Global CSS
├── lib/                    # Yardımcı fonksiyonlar
│   ├── dbConnect.ts        # MongoDB bağlantı yardımcısı
│   └── socket.ts           # Socket.io istemci yardımcısı
├── public/                 # Statik dosyalar
├── types/                  # TypeScript tip tanımlamaları
│   └── next-auth.d.ts      # NextAuth tip tanımlamaları
├── .env.local              # Ortam değişkenleri (örnek)
├── next.config.js          # Next.js yapılandırması
├── tailwind.config.js      # Tailwind CSS yapılandırması
├── tsconfig.json           # TypeScript yapılandırması
└── package.json            # Proje bağımlılıkları
```

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/CotNeo/hubx-sozluk.git
cd hubx-sozluk
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env.local` dosyasını oluşturun:
```
MONGODB_URI=mongodb://localhost:27017/hubx-sozluk
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Bilinen Sorunlar ve Çözümleri

### API Rotaları
- **Entries API'sindeki Sıralama Sorunu**: `app/api/entries/route.ts` dosyasında `sort` parametresi için TypeScript hatası bulunmaktadır. Bu sorunu çözmek için `sort` parametresini doğru tipte tanımlamak gerekiyor.

### Bileşenler
- **EntryCard Bileşeni**: `app/components/EntryCard.tsx` dosyasında `SimpleEntry` ve `IEntry` tipleri arasında uyumsuzluk bulunmaktadır. Bu sorunu çözmek için tipleri daha iyi eşleştirmek gerekiyor.

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Özellik dalınızı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Dalınıza push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request açın



## İletişim

Proje Sahibi - [@github_CotNeo](https://github.com/kullCotNeoanici)

Proje Linki: [https://github.com/CotNeo/hubx-sozluk](https://github.com/kCotNeo/hubx-sozluk) 