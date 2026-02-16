// Strategic recommendations by cluster
export const CLUSTER_STRATEGIES = {
  1: {
    title: "YUQORI RIVOJLANGAN VILOYATLAR",
    range: "0.70 - 1.00",
    color: "#28a745",
    characteristics: [
      "Yuqori sanoat va xizmatlar salohiyati",
      "Yaxshi infratuzilma",
      "Yuqori daromad darajasi",
      "Viloyat markazi paytaxtlar"
    ],
    strategies: {
      economic: [
        {
          action: "Innovatsion klasterlar va texnoparklarni rivojlantirish",
          indicators: ["Yuqori qo'shimcha qiymatlı mahsulotlar", "Texnoloji kompaniyalar"],
          timeline: "2-3 yil"
        },
        {
          action: "Qu'shni viloyatlarga investiciya oqimini yo'naltirish mehanizmlari",
          indicators: ["Jalobi investiciyalar", "Xarij savdosi"],
          timeline: "Davomiy"
        },
        {
          action: "Eksportga yo'naltirilgan ishlab chiqarishni ko'paytirish",
          indicators: ["Valuta tushumlari", "Iş o'rinlari"],
          timeline: "1-2 yil"
        }
      ],
      social: [
        {
          action: "Yuqori malakali kadrlар tayorlash markazlarini tashkil etish",
          indicators: ["Kadrlар bazasi", "Ta'lim sifati"],
          timeline: "2 yil"
        },
        {
          action: "Ilmiy-tadqiqot markazlarini qurish",
          indicators: ["Innovatsion rivojlanish", "Ilmiy nashrlar"],
          timeline: "3 yil"
        }
      ],
      demographic: [
        {
          action: "Ichki migratsiyani boshqarish, atrofi viloyatlarda iş o'rinlari yaratish",
          indicators: ["Aholining barqarorliği", "Migratsiya kamaytirilishi"],
          timeline: "Davomiy"
        }
      ],
      infrastructure: [
        {
          action: "Transport-logistika markazlarini qurish",
          indicators: ["Logistik xizmatlar", "Savdo aylanmasi"],
          timeline: "2-3 yil"
        }
      ]
    }
  },
  2: {
    title: "O'RTACHA-YUQORI RIVOJLANGAN VILOYATLAR",
    range: "0.50 - 0.70",
    color: "#17a2b8",
    characteristics: [
      "O'rtachadan yuqori iqtisodiy ko'rsatkichlar",
      "Qishloq xo'jaligi va sanoat aralash ekonomikasi",
      "Rivojlanish salohiyati yuqori",
      "Infratuzilmada ayrim kamchiliklar"
    ],
    strategies: {
      economic: [
        {
          action: "Qishloq xo'jaligi mahsulotlarini qayta ishlash korkhanalarini ko'paytirish",
          indicators: ["Qo'shimcha qiymat", "Iş o'rinlari"],
          timeline: "1-2 yil"
        },
        {
          action: "Kichik biznes uchun imtiyozli kredit liniyalari ochish",
          indicators: ["Tадbirkорlik faolliği", "Mikrofinansiya"],
          timeline: "6 oy"
        }
      ],
      social: [
        {
          action: "Kasb-hunarmandlik ta'limi markazlarini kengaytirish",
          indicators: ["Malakali ishchi kuvi", "Ta'lim"],
          timeline: "1 yil"
        }
      ],
      demographic: [
        {
          action: "Yosh uchun uy-joy dasturlari",
          indicators: ["Yosh saxlash", "Oilalar"],
          timeline: "Davomiy"
        }
      ],
      infrastructure: [
        {
          action: "Yo'l infratuzilmasini yaxshilash",
          indicators: ["Bozorlarga chiqish", "Transport alaqasi"],
          timeline: "2 yil"
        }
      ]
    }
  },
  3: {
    title: "O'RTACHA-PAST RIVOJLANGAN VILOYATLAR",
    range: "0.35 - 0.50",
    color: "#ffc107",
    characteristics: [
      "Qishloq xo'jaligiga yuqori bog'liqliq",
      "Infratuzilma etarli emas",
      "Ishsizlik darajasi o'rtachadan yuqori",
      "Yoshlar migratsiyasi muammosi"
    ],
    strategies: {
      economic: [
        {
          action: "Qishloq xo'jaligini diversifikatsiya qilish (intensiv bog'dorchilik)",
          indicators: ["Daromat oshirilishi", "Mавсумiylik kamaytirilishi"],
          timeline: "2-3 yil"
        },
        {
          action: "Agroturizm va qishloq turizimini rivojlantirish",
          indicators: ["Qo'shimcha daromat", "Turizm xizmatlar"],
          timeline: "1-2 yil"
        }
      ],
      social: [
        {
          action: "Masofaviy ta'lim va telemeditsina xizmatlarini joriy etish",
          indicators: ["Xizmatlarni kiriş", "Sog'liq ta'minotи"],
          timeline: "1 yil"
        },
        {
          action: "Ijtimoiy kontract dasturlari kengaytirish",
          indicators: ["Kambag'alliқni qisqartirish", "Ижtimoiy sta'bili"],
          timeline: "Davomiy"
        }
      ],
      demographic: [
        {
          action: "Mahalliy iş o'rinlari yaratish dasturlari",
          indicators: ["Migratsiya kamaytirilishi", "Bandi oshirilishi"],
          timeline: "2 yil"
        }
      ],
      infrastructure: [
        {
          action: "Ichimlik suvi va kanalizatsiya tizimlarini yaxshilash",
          indicators: ["Turmuş sifati", "Sog'liq ta'minotи"],
          timeline: "3 yil"
        }
      ]
    }
  },
  4: {
    title: "PAST RIVOJLANGAN VILOYATLAR",
    range: "0.00 - 0.35",
    color: "#dc3545",
    characteristics: [
      "Eng past iqtisodiy ko'rsatkichlar",
      "Infratuzilma juda zaif",
      "Yuqori ishsizlik va kambag'alliқ",
      "Chekka hududlar, transport muammoları"
    ],
    strategies: {
      economic: [
        {
          action: "Davlat maqsadli dasturlari va subsidiyalar orqali qo'llab-quvvatlash",
          indicators: ["Bazaviy iqtisodiy rivojlanish", "Iş o'rinlari"],
          timeline: "Davomiy"
        },
        {
          action: "Mahalliy xom ashyoga asoslanuvchi kichik ishlab chiqarishni tashkil etish",
          indicators: ["Qo'shimcha qiymat", "Iş o'rinlari yaratilishi"],
          timeline: "1-2 yil"
        },
        {
          action: "Kooperativ xo'jaliklari tashkil etish",
          indicators: ["Masshtab samaradorligi", "Renta oshirilishi"],
          timeline: "1 yil"
        }
      ],
      social: [
        {
          action: "Ijtimoiy yordam dasturlari kuchaytirish",
          indicators: ["Kambag'alliқni yumshatish", "Ijtimoiy sta'bili"],
          timeline: "Davomiy"
        },
        {
          action: "Mobil tibbiy xizmatlarni tashkil etish",
          indicators: ["Sog'liq xizmatlarini kiriş", "Salomatliқ"],
          timeline: "1 yil"
        },
        {
          action: "Kasb-hunarmandlik ta'lim kursalarini tashkil etish",
          indicators: ["Bandilik oshirilishi", "Kадrlar ta'yori"],
          timeline: "6 oy - 1 yil"
        }
      ],
      demographic: [
        {
          action: "Yosh mutaxassislar uchun uy-joy va ragbat dasturlari",
          indicators: ["Kadrlар jalbi", "Migrasiayo kamaytirilishi"],
          timeline: "2-3 yil"
        },
        {
          action: "Oilавiy tаdbirkорlik qo'llab-quvvatlash",
          indicators: ["Оilалаr saxlanishi", "Daromat manbalari"],
          timeline: "1-2 yil"
        }
      ],
      infrastructure: [
        {
          action: "Asosiy infratuzilmani barpo etish (yo'llar, elektr, suv)",
          indicators: ["Bazaviy shartlar", "Turmuş sifati"],
          timeline: "3-5 yil"
        },
        {
          action: "Internet va mobil alaqani kengaytirish",
          indicators: ["Raqamli xizmatlarni kiriş", "Elektron tijorat"],
          timeline: "2 yil"
        },
        {
          action: "Maktab binolarini ta'mirлash va jihozlash",
          indicators: ["Ta'lim sifati", "O'quvchilar"],
          timeline: "2-3 yil"
        }
      ]
    }
  }
};

// Regional recommendations for all regions
export const REGIONAL_RECOMMENDATIONS = [
  {
    icon: "🎯",
    title: "Hududi tenglash​tish fondi",
    description: "Yuqori rivojlangan viloyatlardan past rivojlanganlarni mablag'i yo'naltirish"
  },
  {
    icon: "🤝",
    title: "Klasterlararо hamkorlik",
    description: "Rivojlangan viloyatlarning past rivojlanganlar bilan sheriklik dasturlari"
  },
  {
    icon: "📊",
    title: "Differentsial solog' siyosati",
    description: "Past rivojlangan viloyatlarda solog' imtiyozlari"
  },
  {
    icon: "🏗️",
    title: "Infratuzilma tenglash​tirilishi",
    description: "Past rivojlangan viloyatlarda infratuzilmaga ustuvor investitsiya"
  },
  {
    icon: "👨‍💼",
    title: "Kadrlar almashinuvi",
    description: "Yuqori malakali kadrlarni past rivojlanganlargi jalbi mekanizmlari"
  }
];
