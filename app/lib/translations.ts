// app/lib/translations.ts

export const LANGUAGES = [
  "Arabic",
  "English",
  "French",
  "German",
  "Hindi",
  "Italian",
  "Japanese",
  "Korean",
  "Mandarin",
  "Russian",
  "Spanish",
] as const;

type Language = (typeof LANGUAGES)[number];

const messages = {
  "Please select your language": {
    Arabic: "يرجى اختيار لغتك",
    English: "Please select your language",
    French: "Veuillez sélectionner votre langue",
    German: "Bitte wählen Sie Ihre Sprache",
    Hindi: "कृपया अपनी भाषा चुनें",
    Italian: "Seleziona la tua lingua",
    Japanese: "言語を選択してください",
    Korean: "언어를 선택하세요",
    Mandarin: "请选择你的语言",
    Russian: "Пожалуйста, выберите ваш язык",
    Spanish: "Por favor seleccione su idioma",
  },
  about: {
    Arabic:
      "مهمتنا الوحيدة في هذا العالم هي نشر أعظم خبر سمعه العالم على الإطلاق! الحب والأمل والهدف - كلها متاحة لك!",
    English:
      "About us: Our only mission in this world is to spread the greatest news this world has ever heard! Love, Hope, Purpose - all are up for grabs - for you!",
    French:
      "À propos de nous : Notre seule mission dans ce monde est de partager la meilleure nouvelle que ce monde ait jamais entendue ! L'amour, l'espoir et le but - tout est à portée de main - pour vous !",
    German:
      "Über uns: Unsere einzige Mission in dieser Welt ist es, die großartigste Nachricht zu verbreiten, die diese Welt je gehört hat! Liebe, Hoffnung, Sinn - alles ist für Sie zu haben!",
    Hindi:
      "हमारे बारे में: इस दुनिया में हमारा एकमात्र मिशन इस दुनिया की सबसे अच्छी खबर को फैलाना है! प्रेम, आशा, उद्देश्य - आपके लिए सब कुछ उपलब्ध है!",
    Italian:
      "Chi siamo: La nostra unica missione in questo mondo è diffondere la notizia più grande che questo mondo abbia mai sentito! Amore, Speranza, Scopo - tutto è a tua disposizione!",
    Japanese:
      "私たちについて：この世界での私たちの唯一の使命は、この世界がこれまで聞いた中で最も素晴らしい知らせを広めることです！ 愛、希望、目的—すべてあなたのために用意されています！",
    Korean:
      "소개: 이 세상에서 우리의 유일한 사명은 이 세상이 들어본 적이 없는 가장 놀라운 소식을 전하는 것입니다! 사랑, 희망, 목적 - 모두 당신을 위해 준비되어 있습니다!",
    Mandarin:
      "关于我们：我们在这个世界上唯一的使命就是传播这个世界上有史以来最好的消息！爱，希望，目标——这一切都为你准备好了！",
    Russian:
      "О нас: Наша единственная миссия в этом мире – распространять самую прекрасную новость, которую когда-либо слышал этот мир! Любовь, Надежда, Цель – все это для тебя!",
    Spanish:
      "Acerca de nosotros: ¡Nuestra única misión en este mundo es difundir la mejor noticia que este mundo haya escuchado jamás! Amor, Esperanza, Propósito: todo está disponible para ti.",
  },
  getItNow: {
    Arabic: "احصل عليه الآن مجانًا",
    English: "Get it now for free",
    French: "Obtenez-le maintenant gratuitement",
    German: "Hol es dir jetzt kostenlos",
    Hindi: "इसे अभी मुफ्त में प्राप्त करें",
    Italian: "Ottienilo ora gratuitamente",
    Japanese: "今すぐ無料で手に入れてください",
    Korean: "지금 무료로 받으세요",
    Mandarin: "现在免费获取",
    Russian: "Получить сейчас бесплатно",
    Spanish: "Obténlo ahora gratis",
  },
  questionTitle: {
    Arabic: "استبيان: ما الذي يزعجك أكثر في الحياة؟",
    English: "Questionaire: What bothers you most in life?",
    French: "Questionnaire : Qu'est-ce qui vous dérange le plus dans la vie ?",
    German: "Fragebogen: Was stört Sie am meisten im Leben?",
    Hindi: "प्रश्नावली: जीवन में आपको सबसे अधिक क्या परेशान करता है?",
    Italian: "Questionario: Cosa ti disturba di più nella vita?",
    Japanese: "アンケート: 人生で最もあなたを悩ませるものは何ですか？",
    Korean: "설문 조사: 인생에서 가장 당신을 괴롭히는 것은 무엇인가요?",
    Mandarin: "问卷调查：生活中最困扰你的问题是什么？",
    Russian: "Опрос: Что больше всего беспокоит вас в жизни?",
    Spanish: "Cuestionario: ¿Qué es lo que más te molesta en la vida?",
  },
  concerns: {
    fear: {
      Arabic: "الخوف",
      English: "Fear",
      French: "Peur",
      German: "Angst",
      Hindi: "डर",
      Italian: "Paura",
      Japanese: "恐れ",
      Korean: "두려움",
      Mandarin: "恐惧",
      Russian: "Страх",
      Spanish: "Miedo",
    },
    depression: {
      Arabic: "الاكتئاب",
      English: "Depression",
      French: "Dépression",
      German: "Depression",
      Hindi: "डिप्रेशन",
      Italian: "Depressione",
      Japanese: "うつ病",
      Korean: "우울증",
      Mandarin: "抑郁",
      Russian: "Депрессия",
      Spanish: "Depresión",
    },
    loneliness: {
      Arabic: "الشعور بالوحدة",
      English: "Loneliness",
      French: "Solitude",
      German: "Einsamkeit",
      Hindi: "अकेलापन",
      Italian: "Solitudine",
      Japanese: "孤独",
      Korean: "외로움",
      Mandarin: "孤独",
      Russian: "Одиночество",
      Spanish: "Soledad",
    },
    lackOfPurpose: {
      Arabic: "انعدام الهدف",
      English: "Lack of Purpose",
      French: "Manque de but",
      German: "Mangel an Zweck",
      Hindi: "उद्देश्य की कमी",
      Italian: "Mancanza di scopo",
      Japanese: "目的の欠如",
      Korean: "목적 결여",
      Mandarin: "缺乏目标",
      Russian: "Отсутствие цели",
      Spanish: "Falta de propósito",
    },
    other: {
      Arabic: "أخرى",
      English: "Other",
      French: "Autre",
      German: "Andere",
      Hindi: "अन्य",
      Italian: "Altro",
      Japanese: "その他",
      Korean: "기타",
      Mandarin: "其他",
      Russian: "Другое",
      Spanish: "Otro",
    },
  },
};

export function t(key: keyof typeof messages, lang: Language): string {
  // Fallback to English if not found
  return messages[key][lang] ?? messages[key].English;
}

// For translating the concerns (fear, depression, etc.)
export function translateConcern(
  concernKey: keyof typeof messages["concerns"],
  lang: Language
): string {
  return messages.concerns[concernKey][lang] ?? messages.concerns[concernKey].English;
}
