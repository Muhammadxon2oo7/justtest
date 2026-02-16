# 🇺🇿 O'zbekiston Hududiy Tengsizlik Tahlili Tizimi
## O'zbekcha Foydalanuvchi Qo'llanmasi

---

## 📋 Umumiy Tavsif

Bu tizim O'zbekiston bo'yicha 14 viloyat va 200+ tumanlarning **iqtisodiy tengsizlikni tahlil** qilish uchun yaratilgan. Tizimda 20 ta turlicha indikator ishlatiladi va **K-means algoritmi** orqali viloyatlar 4 ta klasterga bo'linadi.

---

## 🎯 Asosiy Xususiyatlari

### 1. 📊 Tengsizlik Tahlili
- **Gini koefficienti** - Iqtisodiy tengsizlikni o'lchash
- **O'zgaruvchanlik koefficienti (CV)** - Dispersiyani o'rtachaga nisbati
- **Theil indeksi** - Yog'unlashtirilgan tengsizlik o'lchovi
- **Decil nisbati** - Eng yuksidan eng pastgacha nisbati

### 2. 🎯 Klasterizacija
- **4 ta klaster daraja**:
  - **Klaster 1**: Yuqori rivojlangan (0.70-1.00)
  - **Klaster 2**: O'rtacha-yuqori (0.50-0.70)
  - **Klaster 3**: O'rtacha-past (0.35-0.50)
  - **Klaster 4**: Past rivojlangan (0.00-0.35)

### 3. 💡 Strategik Tavsiyalar
- **IQTISODIY yo'nalish**: Zavod, investitsiya, kichik biznes
- **IJTIMOIY yo'nalish**: Daromad, uy-joy, xizmatlar
- **DEMOGRAFIK yo'nalish**: Aholiga o'sish, ishchiga layo'qatli
- **INFRATUZILMA yo'nalish**: Yo'llar, shifoxona, maktab

### 4. 📈 Interaktiv Vizualizatsiya
- Recharts kutubxonasi orqali grafiklar
- Framer Motion animatsiyalari
- Real-time ma'lumot o'zgarishi

---

## 🌍 Tahlil Qilinayotgan Viloyatlar

| # | Viloyat | Tumanlar Soni | Markazi |
|---|---------|---|---------|
| 1 | Toshkent viloyati | 15 | Toshkent |
| 2 | Qashqadaryo viloyati | 12 | Kasbi |
| 3 | Samarqand viloyati | 12 | Samarqand |
| 4 | Bukhoro viloyati | 12 | Bukhoro |
| 5 | Xorazm viloyati | 13 | Urganch |
| 6 | Farg'ona viloyati | 15 | Farg'ona |
| 7 | Andijan viloyati | 15 | Andijan |
| 8 | Namangan viloyati | 15 | Namangan |
| 9 | Surhandarya viloyati | 15 | Termiz |
| 10 | Jizzax viloyati | 13 | Jizzax |
| 11 | Sirdario viloyati | 15 | Guliston |
| 12 | Toshkent shahri | 9 | Toshkent |
| 13 | Nukus shahri | 13 | Nukus |
| 14 | Tashkent o'zbekiston | 5 | Tashkent |

---

## 📊 20 ta Indikator (4 Yo'nalish)

### 💰 IQTISODIY (5 ta)
- **E1**: Aholiga o'rtacha sanoat mahsuloti (ming so'm)
- **E2**: Asosiy kapitalga investiciyalar (mln so'm)
- **E3**: Kichik biznes subyektlari soni (birlik)
- **E4**: Chakana savdo aylanmasi (mln so'm)
- **E5**: Qishloq xo'jaligi mahsuloti (mln so'm)

### 👥 IJTIMOIY (5 ta)
- **S1**: Aholining o'rtacha oylik daromadi (ming so'm)
- **S2**: Uy-joy bilan ta'minlanish (m²/kishi)
- **S3**: Ishsizlik darajasi (%) - *Teskari indikator*
- **S4**: Ko'rsatilgan xizmatlar hajmi (mln so'm)
- **S5**: Istemol xarajatlari (ming so'm)

### 👨‍👩‍👧‍👦 DEMOGRAFIK (5 ta)
- **D1**: Aholining o'rtacha soni (ming kishi)
- **D2**: Tugilish koefficienti (‰)
- **D3**: Olim koefficienti (‰) - *Teskari indikator*
- **D4**: Tabiiy o'sish (‰)
- **D5**: Mehnatga layoqatli aholining ulushi (%)

### 🏗️ INFRATUZILMA (5 ta)
- **I1**: 10000 aholiga shifoxona ko'ykali (birlik)
- **I2**: 10000 aholiga vrachlar soni (kishi)
- **I3**: Umum-ta'lim maktablari soni (birlik)
- **I4**: Maktabgacha ta'lim qamrovi (%)
- **I5**: Ichimlik suvi bilan ta'minlanish (%)

---

## 🚀 Bosh Sahifada Nima Bor?

### 📍 Xushmuamala Sahifasi
```
🇺🇿 O'zbekiston Hududiy Tengsizlik Tahlili
      ⬇️
      [📊 Boshqaruv Paneliga O'tish] [📝 Ma'lumot Kiritish] [📈 Tahlilga O'tish]
      ⬇️
14 Viloyat | 200+ Tumanlar | 20 Indikatorlar | 4 Klasterlar
```

### 🎯 Asosiy Xususiyatlari
1. **📊 Tengsizlik Tahlili** - Gini, CV, Theil va Decil nisbatlarini hisoblash
2. **🤖 AI Tavsiyalari** - Siyosiy tavsiyalarni sun'iy intellekt yaratadi
3. **🎯 Klasterizacija** - K-means algoritmi orqali viloyatlarni guruhlash
4. **📈 Grafiklar va Diagrammalar** - Interaktiv vizualizatsiya va animatsiyalar
5. **📄 Hisobotlar Yaratish** - PDF va CSV formatidagi hisobotlarni exel'ga chiqarish
6. **🌐 Reytingi Jadval** - Viloyat va tumanlarning rivojlanish reytingi

---

## 🔍 Butun Viloyat Tahlili (Yangi)

### 📍 Sahifa: `/analysis/clustering-advanced`

Bu sahifada siz:

#### 1️⃣ Viloyatni Tanlang
```
[Toshkent viloyati] [Qashqadaryo] [Samarqand] ...
```

#### 2️⃣ Yilni Tanlang
```
2014 | 2015 | ... | 2024 | 2025
```

#### 3️⃣ Indikatorlarni Kiriting
- 4 ta yo'nalish (IQTISODIY, IJTIMOIY, DEMOGRAFIK, INFRATUZILMA)
- Har bir yo'nalishda 5 ta indikator
- **Namunali Ma'lumot** tugmasini bosing ma'lumotlar avtomatik kiritiladi

#### 📊 Natijalar
- **O'zgaruvchanlik (CV)** - Tengsizlik darajasi
- **Kombinlangan Indeksi** - 0.00 - 1.00
- **Decil Nisbati** - D9 / D1
- **Klaster** - Viloyat qaysi klasterga tegishli

#### 🎯 Klasterlar
```
Klaster 1 (Yuqori) - Xususiyatlari:
  ✓ Yuqori sanoat va xizmatlar salohiyati
  ✓ Yaxshi infratuzilma
  ✓ Yuqori daromad darajasi

Klaster 2 (O'rtacha-yuqori) - Xususiyatlari:
  ✓ O'rtachadan yuqori iqtisodiy ko'rsatkichlar
  ✓ Qishloq xo'jaligi va sanoat aralash
  ✓ Rivojlanish salohiyati yuqori

VA H.K...
```

#### 💡 Strategiyalar
Har bir klaster uchun:
- **IQTISODIY strategiya** - Tadbir, kutilayotgan natija, vaqt jadval
- **IJTIMOIY strategiya** - Tadbir, kutilayotgan natija, vaqt jadval
- **DEMOGRAFIK strategiya** - Tadbir, kutilayotgan natija, vaqt jadval
- **INFRATUZILMA strategiya** - Tadbir, kutilayotgan natija, vaqt jadval

---

## 💻 Navigatsiya Bar (Uzbek)

```
🇺🇿 O'zbekiston Hududiy Tahlili
├── 🏠 Bosh Sahifa
├── 📊 Boshqaruv Paneli
├── 📝 Ma'lumot Kiritish
├── 📈 Tahlil
│   ├── 📊 Tengsizlik Tahlili
│   ├── 🎯 Klasterizacija
│   ├── 🎯 Butun Viloyat Tahlili (YANGI!)
│   ├── 🏆 Reytingi
│   └── ⚖️ Taqqoslash
└── 💡 Tavsiyalar
```

---

## 📊 Asosiy Indekslar Izohati

### 1. 📉 Gini Koefficienti
- **0.00** = To'liq tenglik
- **0.50** = O'rtacha tengsizlik
- **1.00** = To'liq tengsizlik
- Kichik qiymash = Yaxshi (kamroq tengsizlik)

### 2. 📊 O'zgaruvchanlik Koefficienti (CV)
- **<20%** = PAST tengsizlik
- **20-35%** = O'RTACHA tengsizlik
- **>35%** = YUQORI tengsizlik

### 3. 🎯 Theil Indeksi
- Logarifmik tengsizlik
- 0 dan 1 gacha
- Kichik qiymash = Yaxshi

### 4. 📈 Decil Nisbati (D9/D1)
- 9-decil bo'linish nuqtsini 1-decil bo'linish nuqtasiga nisbati
- Kichikroq = Yaxshi (kamroq tengsizlik)
- Masalan: 5.0 = Eng yuksigisi eng pastgacha 5 baravar

---

## 🌍 Umum-Viloyat Tavsiyalari

Barcha klasterlar uchun:

1. **🎯 Hududi tenglash​tish fondi**
   - Yuqori rivojlangan viloyatlardan past rivojlanganlarning mablag'i yo'naltirish

2. **🤝 Klasterlararо hamkorlik**
   - Rivojlangan viloyatlarning past rivojlanganlar bilan sheriklik dasturlari

3. **📊 Differentsial solog' siyosati**
   - Past rivojlangan viloyatlarda solog' imtiyozlari

4. **🏗️ Infratuzilma tenglash​tirilishi**
   - Past rivojlangan viloyatlarda infratuzilmaga ustuvor investitsiya

5. **👨‍💼 Kadrlar almashinuvi**
   - Yuqori malakali kadrlarni past rivojlanganlargi jalbi mekanizmlari

---

## 🛠️ Foydalanish Qo'llanmasi

### 1️⃣ **Yangi Ma'lumot Kiritish** (`/data-input`)
- Multi-step forma
- "1-bosqich: Viloyatni tanlang"
- "2-bosqich: Yilni tanlang"
- "3-bosqich: Indikator qiymatlarini kiriting"

### 2️⃣ **Tahlil Qilish** (`/analysis/clustering-advanced`)
- Viloyatni tanlang
- Yilni tanlang
- Indikatorlari kiriting yoki **Namunali Ma'lumot** tugmasini bosing
- **Tahlilni Boshlash** tugmasini bosing

### 3️⃣ **Natijalarni Ko'rish**
- **📊 Natijalar** tabi - Statistika va indekslar
- **🎯 Klasterlar** tabi - Klaster tasnifi va xususiyatlari
- **💡 Strategiyalar** tabi - Siyosiy tavsiyalar

### 4️⃣ **Boshqa Tahlillar**
- **Tengsizlik Tahlili** - Gini, CV, Theil dinamikasini grafiklari
- **Reytingi** - Viloyatlarning reyting jadvalini
- **Taqqoslash** - 2-5 ta viloyatni taqqoslash

---

## 🎨 Rang Kodlari

| Rang | Yo'nalish | Kemasil |
|------|-----------|--------|
| 🟢 Yashil | IQTISODIY | Aznalib, tejarib |
| 🔵 Ko'k | IJTIMOIY | Jamiyat, xizmatlar |
| 🟣 Binafsha | DEMOGRAFIK | Aholiga, rivojlanish |
| 🟠 Apelsin | INFRATUZILMA | Asosiy asboblar |

---

## 📞 Qo'llab-Quvvatlash

**Sahifada Muammo?**
- Server ishga tushishini tekshiring: `http://localhost:3000`
- Brauzerni qayta yuklab o'zishini urinib ko'ring
- Cache ni tozalashni urinib ko'ring

**Tahlilni Boshlashda Muammo?**
- Kamida 1 ta indikator uchun ma'lumot kiritganligingizni tekshiring
- Viloyatni tanlagan​ligingizni tekshiring
- Namunali ma'lumotni ishlatib ko'ring

---

## 📚 Qo'shimcha Resurslar

- **Tezroq Boshlash**: QUICKSTART.md
- **Toliq Qo'llanma**: IMPLEMENTATION_GUIDE.md
- **API Dokumentatsiyasi**: API_DOCUMENTATION.md
- **Loyiha Xulosasi**: PROJECT_SUMMARY.md

---

## 🚀 Ishga Tushirish

```bash
# Dependencies o'rnatish
npm install --legacy-peer-deps

# Development serverini ishga tushirish
npm run dev

# http://localhost:3000 dan kirish
```

---

## ✨ Yangi Xususiyatlar (O'zbekcha versiyada)

✅ **To'liq o'zbekcha interfeys**
✅ **14 viloyat va 200+ tumanlar uchun ma'lumot**
✅ **Kengaytirilgan klasterizacija tahlili**
✅ **Strategik tavsiyalar tizimi**
✅ **O'zbekcha navigatsiya bar**
✅ **O'zbekcha i18n (tillarni almashtirish) tizimi**

---

**Tuzda: Muhammadxon**
**Sana: 2024**
**Til: O'zbekcha** 🇺🇿
