// ═══════════════════════════════════════════════════════
// SUPPORT PAGE  (/support?lang=xx — shown in the visitor's chosen language)
// ═══════════════════════════════════════════════════════
//
// ►► ONE THING TO SET: paste your Ko-fi page URL below (e.g. 'https://ko-fi.com/qrgospel').
//    Until it's set, the page still shows its message but no "Give" button appears —
//    nothing breaks. This is the ONLY place the donation link lives.
const SUPPORT_URL = '';

// Warm, on-brand copy per language. Framed as optional support to keep the site
// free — deliberately NOT tax-deductible "donation" language (lean individual setup).
// Registers match the rest of the site: informal singular you, except Hindi (आप,
// respectful) and Japanese/Korean (polite); Portuguese is European.
const SUPPORT = {
  ar: {
    dir: 'rtl', title: 'ادعم هذا المشروع', back: 'رجوع', cta: 'ادعم المشروع',
    p: [
      'ما وجدته هنا مجاني — وسيبقى دائمًا كذلك. بلا رسوم، بلا إعلانات، وبلا تسجيل.',
      'لكن إبقاءه يعمل له تكلفة: الخوادم التي توصّل كل رسالة، والعمل على تقديمه بمزيد من اللغات. نتحمّل نحن هذه التكلفة حتى يتمكّن أي شخص، في أي مكان، من قراءة هذه الكلمات مجانًا.',
      'إذا كان لهذا الموقع معنى عندك، فأنت مدعوّ بمحبة للمساعدة في إبقائه مجانيًا لمن يأتي بعدك. أعطِ ما يطمئن إليه قلبك — وفقط إن استطعت.'
    ],
    thanks: 'شكرًا لوجودك هنا. هذا وحده هدية.'
  },
  en: {
    dir: 'ltr', title: 'Support this project', back: 'Back', cta: 'Support the project',
    p: [
      'What you found here is free — and it always will be. No charge, no ads, nothing to sign up for.',
      "But keeping it running does cost something: the servers that deliver each message, and the work of offering it in more and more languages. We cover this ourselves so that anyone, anywhere, can read these words for free.",
      "If this site has meant something to you, you're warmly invited to help keep it free for the next person who needs it. Give only what's on your heart — and only if you can."
    ],
    thanks: 'Thank you for being here. That alone is a gift.'
  },
  fa: {
    dir: 'rtl', title: 'از این پروژه حمایت کن', back: 'بازگشت', cta: 'از پروژه حمایت کن',
    p: [
      'آنچه اینجا یافتی رایگان است — و همیشه رایگان خواهد ماند. بدون هزینه، بدون تبلیغات، بدون ثبت‌نام.',
      'اما نگه‌داشتنش هزینه دارد: سرورهایی که هر پیام را می‌رسانند و کار ارائه‌ی آن به زبان‌های بیشتر و بیشتر. ما خودمان این هزینه را می‌پردازیم تا هر کسی، در هر جا، بتواند این کلمات را رایگان بخواند.',
      'اگر این سایت برایت معنایی داشته، با مهر دعوتت می‌کنیم کمک کنی تا برای نفر بعدی که به آن نیاز دارد رایگان بماند. هر چه دلت می‌خواهد ببخش — و فقط اگر می‌توانی.'
    ],
    thanks: 'ممنون که اینجایی. همین خودش یک هدیه است.'
  },
  fr: {
    dir: 'ltr', title: 'Soutiens ce projet', back: 'Retour', cta: 'Soutenir le projet',
    p: [
      "Ce que tu as trouvé ici est gratuit — et le restera toujours. Sans frais, sans publicité, sans inscription.",
      "Mais le faire fonctionner a un coût : les serveurs qui délivrent chaque message, et le travail pour l'offrir dans toujours plus de langues. Nous le prenons en charge nous-mêmes pour que n'importe qui, où qu'il soit, puisse lire ces mots gratuitement.",
      "Si ce site a compté pour toi, tu es chaleureusement invité(e) à aider à le garder gratuit pour la prochaine personne qui en aura besoin. Donne seulement ce que ton cœur te dicte — et seulement si tu le peux."
    ],
    thanks: "Merci d'être là. C'est déjà un cadeau."
  },
  de: {
    dir: 'ltr', title: 'Unterstütze dieses Projekt', back: 'Zurück', cta: 'Das Projekt unterstützen',
    p: [
      'Was du hier gefunden hast, ist kostenlos — und das bleibt es auch. Keine Gebühren, keine Werbung, keine Anmeldung.',
      'Aber der Betrieb kostet etwas: die Server, die jede Nachricht ausliefern, und die Arbeit, sie in immer mehr Sprachen anzubieten. Wir tragen das selbst, damit jeder Mensch, überall, diese Worte kostenlos lesen kann.',
      'Wenn dir diese Seite etwas bedeutet hat, bist du herzlich eingeladen, mitzuhelfen, sie für den nächsten Menschen frei zu halten, der sie braucht. Gib nur, was dir auf dem Herzen liegt — und nur, wenn du kannst.'
    ],
    thanks: 'Danke, dass du hier bist. Das allein ist ein Geschenk.'
  },
  hi: {
    dir: 'ltr', title: 'इस परियोजना का समर्थन करें', back: 'वापस', cta: 'परियोजना का समर्थन करें',
    p: [
      'आपको यहाँ जो मिला वह निःशुल्क है — और हमेशा रहेगा। कोई शुल्क नहीं, कोई विज्ञापन नहीं, कोई पंजीकरण नहीं।',
      'लेकिन इसे चलाने में कुछ खर्च होता है: वे सर्वर जो हर संदेश पहुँचाते हैं, और इसे अधिक से अधिक भाषाओं में प्रस्तुत करने का काम। हम इसे स्वयं वहन करते हैं ताकि कोई भी, कहीं भी, इन शब्दों को निःशुल्क पढ़ सके।',
      'यदि इस साइट ने आपके लिए कुछ अर्थ रखा है, तो आप सादर आमंत्रित हैं कि इसे अगले ज़रूरतमंद व्यक्ति के लिए निःशुल्क बनाए रखने में मदद करें। जो आपके मन में हो वही दें — और केवल तभी जब आप सक्षम हों।'
    ],
    thanks: 'यहाँ होने के लिए धन्यवाद। यह अपने आप में एक उपहार है।'
  },
  it: {
    dir: 'ltr', title: 'Sostieni questo progetto', back: 'Indietro', cta: 'Sostieni il progetto',
    p: [
      "Ciò che hai trovato qui è gratuito — e lo sarà sempre. Nessun costo, nessuna pubblicità, nessuna registrazione.",
      "Ma mantenerlo attivo ha un costo: i server che recapitano ogni messaggio e il lavoro per offrirlo in sempre più lingue. Ce ne facciamo carico noi, così che chiunque, ovunque, possa leggere queste parole gratuitamente.",
      "Se questo sito ha significato qualcosa per te, sei caldamente invitato/a ad aiutare a mantenerlo gratuito per la prossima persona che ne avrà bisogno. Dona solo ciò che senti nel cuore — e solo se puoi."
    ],
    thanks: 'Grazie di essere qui. Questo già è un dono.'
  },
  ja: {
    dir: 'ltr', title: 'このプロジェクトを応援する', back: '戻る', cta: 'プロジェクトを応援する',
    p: [
      'ここで出会ったものは無料です——そしてこれからもずっと無料です。料金も、広告も、登録もありません。',
      'けれども、運営には費用がかかります。一つひとつのメッセージを届けるサーバー、そしてより多くの言語で届けるための働きです。誰もが、どこにいても、この言葉を無料で読めるように、私たちがその費用を負担しています。',
      'もしこのサイトがあなたにとって意味のあるものだったなら、次にこれを必要とする人のために無料で保ち続けることを、どうか手伝っていただけませんか。心にあるものだけを、そしてできる範囲で。'
    ],
    thanks: 'ここに来てくださって、ありがとうございます。それだけで一つの贈り物です。'
  },
  ko: {
    dir: 'ltr', title: '이 프로젝트를 후원하기', back: '뒤로', cta: '프로젝트 후원하기',
    p: [
      '여기서 만난 것은 무료입니다 — 그리고 앞으로도 늘 무료일 것입니다. 요금도, 광고도, 가입도 없습니다.',
      '하지만 운영에는 비용이 듭니다. 각 메시지를 전하는 서버, 그리고 점점 더 많은 언어로 전하기 위한 수고입니다. 누구나, 어디서나 이 말씀을 무료로 읽을 수 있도록 우리가 그 비용을 감당하고 있습니다.',
      '이 사이트가 당신에게 의미가 있었다면, 다음에 이것이 필요한 사람을 위해 무료로 유지되도록 도와주시길 따뜻하게 청합니다. 마음에 있는 만큼만, 그리고 가능할 때에만 나눠 주세요.'
    ],
    thanks: '이곳에 와 주셔서 감사합니다. 그것만으로도 하나의 선물입니다.'
  },
  zh: {
    dir: 'ltr', title: '支持这个项目', back: '返回', cta: '支持这个项目',
    p: [
      '你在这里看到的一切都是免费的——而且永远都会是。没有费用，没有广告，无需注册。',
      '但维持它的运行需要成本：传递每一条信息的服务器，以及用越来越多语言呈现它的工作。我们自己承担这些，好让任何人、在任何地方都能免费读到这些话语。',
      '如果这个网站对你有意义，我们诚挚邀请你帮忙让它对下一个需要的人也保持免费。只献上你心中所愿——也只在你有能力时。'
    ],
    thanks: '谢谢你来到这里。这本身就是一份礼物。'
  },
  pt: {
    dir: 'ltr', title: 'Apoia este projeto', back: 'Voltar', cta: 'Apoiar o projeto',
    p: [
      'O que encontraste aqui é gratuito — e será sempre. Sem custos, sem publicidade, sem registo.',
      'Mas mantê-lo a funcionar tem um custo: os servidores que entregam cada mensagem e o trabalho de o oferecer em cada vez mais línguas. Somos nós que o suportamos, para que qualquer pessoa, em qualquer lugar, possa ler estas palavras gratuitamente.',
      'Se este site significou algo para ti, estás carinhosamente convidado(a) a ajudar a mantê-lo gratuito para a próxima pessoa que dele precisar. Dá apenas o que sentires no coração — e só se puderes.'
    ],
    thanks: 'Obrigado por estares aqui. Só isso já é uma dádiva.'
  },
  ru: {
    dir: 'ltr', title: 'Поддержать проект', back: 'Назад', cta: 'Поддержать проект',
    p: [
      'То, что ты нашёл здесь, бесплатно — и всегда таким останется. Без платы, без рекламы, без регистрации.',
      'Но поддержание работы стоит денег: серверы, которые доставляют каждое сообщение, и труд, чтобы предлагать это на всё большем числе языков. Мы берём это на себя, чтобы любой человек в любом месте мог прочитать эти слова бесплатно.',
      'Если этот сайт что-то значил для тебя, мы сердечно приглашаем тебя помочь сохранить его бесплатным для следующего, кому он понадобится. Дай лишь то, что на сердце, — и только если можешь.'
    ],
    thanks: 'Спасибо, что ты здесь. Уже это — подарок.'
  },
  es: {
    dir: 'ltr', title: 'Apoya este proyecto', back: 'Volver', cta: 'Apoyar el proyecto',
    p: [
      'Lo que encontraste aquí es gratis — y siempre lo será. Sin coste, sin anuncios, sin registro.',
      'Pero mantenerlo en marcha cuesta algo: los servidores que entregan cada mensaje y el trabajo de ofrecerlo en cada vez más idiomas. Lo asumimos nosotros para que cualquiera, en cualquier lugar, pueda leer estas palabras gratis.',
      'Si este sitio ha significado algo para ti, te invitamos con cariño a ayudar a mantenerlo gratis para la próxima persona que lo necesite. Da solo lo que sientas en el corazón — y solo si puedes.'
    ],
    thanks: 'Gracias por estar aquí. Eso ya es un regalo.'
  },
  sw: {
    dir: 'ltr', title: 'Saidia mradi huu', back: 'Rudi', cta: 'Saidia mradi',
    p: [
      'Ulichokipata hapa ni bure — na kitabaki hivyo daima. Hakuna malipo, hakuna matangazo, hakuna kujisajili.',
      'Lakini kuendesha tovuti hii kunagharimu: seva zinazofikisha kila ujumbe, na kazi ya kuitoa kwa lugha zaidi na zaidi. Sisi wenyewe tunabeba gharama hii ili kila mtu, popote alipo, aweze kusoma maneno haya bila malipo.',
      'Ikiwa tovuti hii imekuwa na maana kwako, unakaribishwa kwa upendo kusaidia kuiweka bure kwa mtu anayefuata atakayeihitaji. Toa tu kile kilicho moyoni mwako — na ikiwa tu unaweza.'
    ],
    thanks: 'Asante kwa kuwa hapa. Hilo lenyewe ni zawadi.'
  }
};

// Pick language from ?lang= — own-property check so values like "__proto__" can't
// resolve to inherited objects; unknown/dynamic languages fall back to English.
const params = new URLSearchParams(location.search);
const requested = params.get('lang') || 'en';
const lang = Object.prototype.hasOwnProperty.call(SUPPORT, requested) ? requested : 'en';
const s = SUPPORT[lang];

document.documentElement.lang = lang;
document.documentElement.dir = s.dir;
document.title = s.title + ' — Good News';
document.getElementById('back-text').textContent = s.back;
document.getElementById('support-title').textContent = s.title;

const content = document.getElementById('support-content');
// Built with DOM nodes (textContent) — never innerHTML — so copy can't be parsed as markup
s.p.forEach(text => {
  const p = document.createElement('p');
  p.textContent = text;
  content.appendChild(p);
});
if (SUPPORT_URL) {
  const a = document.createElement('a');
  a.className = 'support-cta';
  a.href = SUPPORT_URL;
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = s.cta;
  content.appendChild(a);
}
const thanks = document.createElement('p');
thanks.className = 'support-thanks';
thanks.textContent = s.thanks;
content.appendChild(thanks);

// Back link: go back only when the visitor came from this site; otherwise follow
// the href to the start page (same as the privacy page).
const backLink = document.getElementById('back-link');
if (backLink) backLink.addEventListener('click', (e) => {
  let sameOrigin = false;
  try { sameOrigin = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (err) {}
  if (sameOrigin && history.length > 1) {
    e.preventDefault();
    history.back();
  }
});
