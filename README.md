# 👑 Galeri KRALI - Mobile Araç Alım-Satım Oyunu

React Native ile geliştirilen, mobil platformda araç alım-satım yapıp tycoon olma oyunu.

## 🎮 Oyun Özellikleri

### Temel Mekanik
- **Araç Envanteri**: Motorlar ve araçları satın alın ve saklayın
- **Alım-Satım Sistemi**: Kâr elde etmek için araçları satın alıp satın
- **Pazarlık Payı**: Her satışta zorunlu pazarlık payı kesintisi
- **İsteğe Bağlı Ekspertiz**: Araçların durumunu kontrol ettin, fiyat belirle
- **Seviyelendirme**: İşlem sayısına göre otomatik seviyelenme
- **İstatistikler**: Kâr/zarar analizi ve oyuncu istatistikleri

### Araç Kategorileri

#### Motorlar
- **Düşük Silindir (125-390cc)**: Honda, Yamaha, Kawasaki, KTM
- **Orta Silindir (600-750cc)**: Kawasaki Ninja 650, Harley-Davidson
- **Yüksek Silindir (1000cc+)**: BMW, Ducati, Kawasaki H2

#### Araçlar
- **Sedan**: Toyota, Honda, Mercedes-Benz
- **SUV**: Toyota, Jeep
- **Hatchback**: Volkswagen
- **Truck**: Ford

## 🏁 Oyun Seviyeleri

| Seviye | Başlık | İşlem Sayısı | Açılan Araçlar |
|--------|--------|-------------|----------------|
| 1 | Başlangıç Satıcısı | 0-10 | Düşük Motor, Hatchback |
| 2 | Deneyimli Satıcı | 11-50 | Yüksek Motor (Orta), Sedan |
| 3 | Usta Tüccar | 51-150 | Yüksek Motor (Yüksek), SUV |
| 4 | Megastore Sahibi | 151+ | Tümü Açık, Truck |

## 💰 Başlangıç

- **Başlangıç Bakiyesi**: 150.000₺
- **Başlangıç Seviyesi**: 1 (Başlangıç Satıcısı)
- **Açık Araçlar**: Düşük Motorlar + Hatchback

## 🔧 Ekspertiz Sistemi

### Ekspertiz Maliyeti (Seviyeye Göre)
- Level 1: 500₺
- Level 2: 625₺
- Level 3: 750₺
- Level 4: 875₺

### Ekspertiz Sonuçları
- **Temiz** (%40): %20 pazarlık payı
- **Küçük Hasar** (%35): %25 pazarlık payı
- **Orta Hasar** (%20): %30 pazarlık payı
- **Ciddi Hasar** (%5): %35 pazarlık payı

## 📦 Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Expo'yu başlatın
npm start

# iOS için
npm run ios

# Android için
npm run android
```

## 📁 Proje Yapısı

```
src/
├── screens/          # Oyun ekranları
├── components/       # Tekrar kullanılabilir bileşenler
├── context/          # Global durum yönetimi
├── services/         # API ve veri işlemleri
├── utils/            # Yardımcı fonksiyonlar
├── styles/           # Stil değişkenleri
└── data/             # Sabit veriler
```

## 🛠️ Teknolojiler

- **React Native**: Mobil uygulama geliştirme
- **Expo**: React Native geliştirme ortamı
- **AsyncStorage**: Yerel veri saklama
- **React Navigation**: Ekran navigasyonu
- **React Context API**: Global durum yönetimi

## 📝 Lisans

MIT
