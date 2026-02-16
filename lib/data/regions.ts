import { Region, Indicator, IndicatorCategory } from '@/types';

export const REGIONS: Region[] = [
  { id: 'TAS', name: 'Toshkent', nameUz: 'Тошкент шаҳри', nameRu: 'Ташкент', districts: 12, capital: true },
  { id: 'AND', name: 'Andijon', nameUz: 'Андижон', nameRu: 'Андижан', districts: 14 },
  { id: 'BUX', name: 'Buxoro', nameUz: 'Бухоро', nameRu: 'Бухара', districts: 11 },
  { id: 'FAR', name: 'Fargona', nameUz: 'Фарғона', nameRu: 'Фергана', districts: 15 },
  { id: 'JIZ', name: 'Jizzax', nameUz: 'Жиззах', nameRu: 'Джизак', districts: 12 },
  { id: 'XOR', name: 'Xorazm', nameUz: 'Хоразм', nameRu: 'Хорезм', districts: 10 },
  { id: 'NAM', name: 'Namangan', nameUz: 'Наманган', nameRu: 'Наманган', districts: 11 },
  { id: 'NAV', name: 'Navoiy', nameUz: 'Навоий', nameRu: 'Навои', districts: 8 },
  { id: 'QAS', name: 'Qashqadaryo', nameUz: 'Қашқадарё', nameRu: 'Кашкадарья', districts: 13 },
  { id: 'QAR', name: 'Qoraqalpogiston', nameUz: 'Қорақалпоғистон', nameRu: 'Каракалпакия', districts: 16 },
  { id: 'SAM', name: 'Samarqand', nameUz: 'Самарқанд', nameRu: 'Самарканд', districts: 14 },
  { id: 'SIR', name: 'Sirdaryo', nameUz: 'Сирдарё', nameRu: 'Сырдарья', districts: 8 },
  { id: 'SUR', name: 'Surxondaryo', nameUz: 'Сурхондарё', nameRu: 'Сурхандарья', districts: 13 },
  { id: 'TOS', name: 'Toshkent viloyati', nameUz: 'Тошкент вилояти', nameRu: 'Ташкентская область', districts: 15 }
];

export const INDICATORS: Indicator[] = [
  // Economic indicators
  { id: 'gdp_per_capita', name: 'GDP per capita', nameUz: 'ЯД солиқ куватини туснойатида', unit: 'mln UZS', category: 'economic', direction: 'higher' },
  { id: 'avg_income', name: 'Average monthly income', nameUz: 'Ўртача ойлик даромад', unit: 'UZS', category: 'economic', direction: 'higher' },
  { id: 'unemployment_rate', name: 'Unemployment rate', nameUz: 'Иссиқ-туйи ҳолати', unit: '%', category: 'economic', direction: 'lower' },
  { id: 'fdi_investment', name: 'Foreign direct investment', nameUz: 'Чет эл сармоя туюмотлари', unit: 'mln USD', category: 'economic', direction: 'higher' },
  { id: 'business_count', name: 'Active businesses per 1000', nameUz: '1000 шахс юзасига фаол бизнес сони', unit: 'count', category: 'economic', direction: 'higher' },
  { id: 'export_volume', name: 'Export volume', nameUz: 'Экспорт миқдори', unit: 'mln USD', category: 'economic', direction: 'higher' },
  { id: 'poverty_rate', name: 'Poverty rate', nameUz: 'Қарз сиқлиқ сиқли', unit: '%', category: 'economic', direction: 'lower' },
  { id: 'industrial_output', name: 'Industrial output', nameUz: 'Сотилаўчи чиқариш', unit: 'mln UZS', category: 'economic', direction: 'higher' },

  // Social indicators
  { id: 'literacy_rate', name: 'Literacy rate', nameUz: 'Сўврақат сўврақлигн индекси', unit: '%', category: 'social', direction: 'higher' },
  { id: 'school_enrollment', name: 'School enrollment', nameUz: 'Мактаб таълимини қаноатланди', unit: '%', category: 'social', direction: 'higher' },
  { id: 'higher_education', name: 'Higher education rate', nameUz: 'Олий таълим сўврақи', unit: '%', category: 'social', direction: 'higher' },
  { id: 'doctors_per_1000', name: 'Doctors per 1000', nameUz: '1000 аҳалига асбоб дохир', unit: 'count', category: 'social', direction: 'higher' },
  { id: 'hospital_beds', name: 'Hospital beds per 1000', nameUz: '1000 аҳалига ҳоситалар ҳаййораси', unit: 'count', category: 'social', direction: 'higher' },
  { id: 'life_expectancy', name: 'Life expectancy', nameUz: 'Ўмри умум', unit: 'years', category: 'social', direction: 'higher' },
  { id: 'infant_mortality', name: 'Infant mortality', nameUz: 'Чақалоқларнингўлими сиқли', unit: 'per 1000', category: 'social', direction: 'lower' },
  { id: 'access_clean_water', name: 'Access to clean water', nameUz: 'Тоза суғни мустахсос', unit: '%', category: 'social', direction: 'higher' },

  // Demographic indicators
  { id: 'population', name: 'Total population', nameUz: 'Жами аҳоли санчи', unit: 'count', category: 'demographic', direction: 'neutral' },
  { id: 'population_density', name: 'Population density', nameUz: 'Аҳолинингсиқлиғи', unit: 'per km²', category: 'demographic', direction: 'neutral' },
  { id: 'urban_population', name: 'Urban population', nameUz: 'Шаҳар аҳолисининг ферг', unit: '%', category: 'demographic', direction: 'neutral' },
  { id: 'youth_ratio', name: 'Youth ratio (15-29)', nameUz: 'Ёширо ва ёш ўртасидаги ниҳо', unit: '%', category: 'demographic', direction: 'neutral' },
  { id: 'dependency_ratio', name: 'Dependency ratio', nameUz: 'Қарзи муҳим нисбати', unit: '%', category: 'demographic', direction: 'lower' },
  { id: 'migration_balance', name: 'Net migration', nameUz: 'Миграциянинг сўф мавзани', unit: 'count', category: 'demographic', direction: 'higher' },
  { id: 'birth_rate', name: 'Birth rate', nameUz: 'Туғилиш сиқли', unit: 'per 1000', category: 'demographic', direction: 'neutral' },

  // Infrastructure indicators
  { id: 'paved_roads', name: 'Paved roads', nameUz: 'Асфалт йўллар', unit: '%', category: 'infrastructure', direction: 'higher' },
  { id: 'internet_coverage', name: 'Internet coverage', nameUz: 'Интернет тўпламасниё', unit: '%', category: 'infrastructure', direction: 'higher' },
  { id: 'electricity_access', name: 'Electricity access', nameUz: 'Электрлилк юнумлари', unit: '%', category: 'infrastructure', direction: 'higher' },
  { id: 'gas_supply', name: 'Natural gas supply', nameUz: 'Табиий газ ихрож', unit: '%', category: 'infrastructure', direction: 'higher' },
  { id: 'public_transport', name: 'Public transport availability', nameUz: 'Омма транспорт ҳамкорлиги', unit: 'routes/1000', category: 'infrastructure', direction: 'higher' },
  { id: 'housing_quality', name: 'Modern housing stock', nameUz: 'Замонавий ут-жой фонди', unit: '%', category: 'infrastructure', direction: 'higher' },
  { id: 'digital_services', name: 'Digital public services', nameUz: 'Рақамли хизматлар', unit: '%', category: 'infrastructure', direction: 'higher' },
  { id: 'logistics_index', name: 'Logistics performance', nameUz: 'Логистиканинг қуллиси', unit: 'score 0-100', category: 'infrastructure', direction: 'higher' }
];

export const INDICATOR_CATEGORIES: IndicatorCategory[] = [
  {
    id: 'economic',
    name: 'Economic Development',
    nameUz: 'Иқтисодий ривожланиш',
    weight: 0.30,
    indicators: INDICATORS.filter(i => i.category === 'economic')
  },
  {
    id: 'social',
    name: 'Social Development',
    nameUz: 'Ижтимоий ривожланиш',
    weight: 0.25,
    indicators: INDICATORS.filter(i => i.category === 'social')
  },
  {
    id: 'demographic',
    name: 'Demographic Indicators',
    nameUz: 'Демографик кўрсаткичлар',
    weight: 0.15,
    indicators: INDICATORS.filter(i => i.category === 'demographic')
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Development',
    nameUz: 'Инфратузилма ривожланиши',
    weight: 0.30,
    indicators: INDICATORS.filter(i => i.category === 'infrastructure')
  }
];

export const DEFAULT_WEIGHTS = {
  economic: 0.30,
  social: 0.25,
  demographic: 0.15,
  infrastructure: 0.30
};
