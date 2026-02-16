import { REGIONS_DATA } from '@/lib/data/regions-expanded';
import { uz } from '@/lib/i18n/uz';

export default function Home() {
  const regions = Object.entries(REGIONS_DATA).map(([name, data]) => ({
    name,
    capital: data.capital,
    districts: data.districts.length
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🇺🇿 O'zbekiston Hududiy Tengsizlik Tahlili
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            O'zbekiston bo'yicha 14 viloyat va 200+ tumanlarning iqtisodiy rivojlanish darajasini tahlil qilishning hamjahon platformasi
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/dashboard"
              className="px-8 py-3 bg-linear-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all"
            >
              📊 Boshqaruv Paneliga O'tish
            </a>
            <a
              href="/data-input"
              className="px-8 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              📝 Ma'lumot Kiritish
            </a>
            <a
              href="/analysis/inequality"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              📈 Tahlilga O'tish
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-emerald-600 mb-2">14</div>
            <div className="text-gray-600 font-semibold">Viloyatlar</div>
            <div className="text-sm text-gray-500 mt-2">O'zbekiston bo'yicha</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
            <div className="text-gray-600 font-semibold">Tumanlar</div>
            <div className="text-sm text-gray-500 mt-2">Tumanly boshqaruv</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-amber-600 mb-2">20</div>
            <div className="text-gray-600 font-semibold">Indikatorlar</div>
            <div className="text-sm text-gray-500 mt-2">4 ta yo'nalishda</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-purple-600 mb-2">4</div>
            <div className="text-gray-600 font-semibold">Klasterlar</div>
            <div className="text-sm text-gray-500 mt-2">Rivojlanish darajasi</div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            🎯 Asosiy Xususiyatlari
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="📊"
              title="Tengsizlik Tahlili"
              description="Gini, CV, Theil va Decil nisbatlarini hisoblash"
            />
            <FeatureCard
              icon="🤖"
              title="AI Tavsiyalari"
              description="Siyosiy tavsiyalarni sun'iy intellekt yaratadi"
            />
            <FeatureCard
              icon="🎯"
              title="Klasterizacija"
              description="K-means algoritmi orqali viloyatlarni guruhlash"
            />
            <FeatureCard
              icon="📈"
              title="Grafiklar va Diagrammalar"
              description="Interaktiv visualizatsiya va animatsiyalar"
            />
            <FeatureCard
              icon="📄"
              title="Hisobotlar Yaratish"
              description="PDF va CSV formatidagi hisobotlarni exel'ga chiqarish"
            />
            <FeatureCard
              icon="🌐"
              title="Reytingi Jadval"
              description="Viloyat va tumanlarning rivojlanish reytingi"
            />
          </div>
        </div>

        {/* Strategy Types */}
        <div className="bg-linear-to-r from-emerald-50 to-blue-50 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-emerald-600">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            💡 Strategik Yo'nalishlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-bold text-green-700">IQTISODIY</div>
              <div className="text-sm text-gray-600 mt-2">Zavod, investitsiya, savdo</div>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-bold text-blue-700">IJTIMOIY</div>
              <div className="text-sm text-gray-600 mt-2">Daromad, uy-joy, xizmatlar</div>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
              <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
              <div className="font-bold text-purple-700">DEMOGRAFIK</div>
              <div className="text-sm text-gray-600 mt-2">Aholiga o'sish, ishchiga layo'qatli</div>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
              <div className="text-2xl mb-2">🏗️</div>
              <div className="font-bold text-orange-700">INFRATUZILMA</div>
              <div className="text-sm text-gray-600 mt-2">Yo'llar, shifoxona, maktab</div>
            </div>
          </div>
        </div>

        {/* Regions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            🗺️ Tahlil Qilinayotgan Viloyatlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {regions.map((region, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-emerald-50 to-blue-50 rounded-lg p-4 border-l-4 border-emerald-500 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{region.name}</div>
                    <div className="text-sm text-gray-600 mt-1">📍 {region.districts} ta tuman</div>
                    {region.capital && <div className="text-xs text-emerald-600 font-semibold mt-2">⭐ Markazi: {region.capital}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">ℹ️ Tizim Haqida</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="mb-3">
                Bu tizim O'zbekiston bo'yicha hududiy tengsizlikni tahlil qilib, har bir viloyat va tumanlarning iqtisodiy, ijtimoiy, demografik va infratuzilma ko'rsatkichlarini o'rganadi.
              </p>
              <p>
                Tizimda 20 ta turlicha indikator ishlatiladi va K-means algoritmi orqali viloyatlar 4 ta klasterga bo'linadi.
              </p>
            </div>
            <div>
              <p className="mb-3">
                <strong>Asosiy Indekslar:</strong>
                <ul className="list-disc ml-5 mt-2">
                  <li>Gini koefficienti</li>
                  <li>O'zgaruvchanlik koefficienti</li>
                  <li>Theil indeksi</li>
                  <li>Decil nisbati</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        body {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
