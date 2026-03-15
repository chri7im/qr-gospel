// Visitor welcome email content per language — warm, personal, matching site tone
const WELCOME = {
  ar: {
    subject: 'شكراً لك — رسالة من فريق Good News',
    greeting: name => `عزيزي ${name || 'صديقنا'}،`,
    body: `يسعدنا أنك أخذت هذه الخطوة. ما قرأته اليوم ليس مجرد كلمات — إنها قصة حقيقية عن حب لا نهائي، حب موجّه لك شخصياً.

نريدك أن تعرف أنك لست وحدك. هناك من يهتم بك ويريد أن يسير معك في هذا الطريق.

سنتواصل معك قريباً. وحتى ذلك الحين، تذكّر: أنت محبوب أكثر مما تتخيل.`,
    closing: 'بمحبة،\nفريق Good News',
    unsubscribe: 'إذا لم تعد ترغب في تلقي رسائل منّا، ببساطة قم بالرد على هذا البريد بكلمة "إلغاء الاشتراك" وسنقوم بإزالة بياناتك فوراً.'
  },
  en: {
    subject: 'Thank you — a message from the Good News team',
    greeting: name => `Dear ${name || 'friend'},`,
    body: `We're so glad you took this step. What you read today isn't just words on a screen — it's a true story about a love so deep and so personal that it was meant specifically for you.

We want you to know that you are not alone. There are people who care about you and who would love to walk this journey with you.

We'll be in touch soon. Until then, remember this: you are loved more than you could ever imagine.`,
    closing: 'With warmth,\nThe Good News team',
    unsubscribe: 'If you no longer wish to receive messages from us, simply reply to this email with the word "Unsubscribe" and we will remove your details immediately.'
  },
  fa: {
    subject: 'متشکریم — پیامی از تیم Good News',
    greeting: name => `${name || 'دوست'} عزیز،`,
    body: `خوشحالیم که این قدم را برداشتی. آنچه امروز خواندی فقط کلمات نیست — داستانی واقعی است درباره عشقی بی‌نهایت که مخصوص تو نوشته شده.

می‌خواهیم بدانی که تنها نیستی. کسانی هستند که به تو اهمیت می‌دهند و دوست دارند در این مسیر همراهت باشند.

به زودی با تو تماس خواهیم گرفت. تا آن زمان به یاد داشته باش: تو بیش از آنچه تصور کنی دوست داشته می‌شوی.`,
    closing: 'با مهر،\nتیم Good News',
    unsubscribe: 'اگر دیگر مایل به دریافت پیام از ما نیستید، کافیست به این ایمیل با کلمه «لغو اشتراک» پاسخ دهید و ما بلافاصله اطلاعات شما را حذف خواهیم کرد.'
  },
  fr: {
    subject: 'Merci — un message de l\'équipe Good News',
    greeting: name => `Cher(e) ${name || 'ami(e)'},`,
    body: `Nous sommes heureux que tu aies fait ce pas. Ce que tu as lu aujourd'hui n'est pas simplement des mots — c'est une histoire vraie, celle d'un amour si profond et si personnel qu'il a été écrit pour toi.

Nous voulons que tu saches que tu n'es pas seul(e). Il y a des personnes qui se soucient de toi et qui aimeraient marcher avec toi sur ce chemin.

Nous te contacterons bientôt. En attendant, souviens-toi : tu es aimé(e) plus que tu ne pourrais jamais l'imaginer.`,
    closing: 'Avec chaleur,\nL\'équipe Good News',
    unsubscribe: 'Si tu ne souhaites plus recevoir de messages de notre part, réponds simplement à cet e-mail avec le mot « Désabonnement » et nous supprimerons tes données immédiatement.'
  },
  de: {
    subject: 'Danke — eine Nachricht vom Good News Team',
    greeting: name => `Liebe(r) ${name || 'Freund(in)'},`,
    body: `Wir freuen uns sehr, dass du diesen Schritt gemacht hast. Was du heute gelesen hast, sind nicht nur Worte — es ist eine wahre Geschichte über eine Liebe, die so tief und so persönlich ist, dass sie genau für dich bestimmt ist.

Wir möchten, dass du weißt: Du bist nicht allein. Es gibt Menschen, denen du am Herzen liegst und die diesen Weg gerne mit dir gehen möchten.

Wir melden uns bald bei dir. Bis dahin denk daran: Du bist mehr geliebt, als du dir jemals vorstellen kannst.`,
    closing: 'Herzlich,\nDas Good News Team',
    unsubscribe: 'Wenn du keine Nachrichten mehr von uns erhalten möchtest, antworte einfach auf diese E-Mail mit dem Wort „Abmelden" und wir werden deine Daten umgehend entfernen.'
  },
  hi: {
    subject: 'धन्यवाद — Good News टीम की ओर से एक संदेश',
    greeting: name => `प्रिय ${name || 'मित्र'},`,
    body: `हमें खुशी है कि तुमने यह कदम उठाया। आज तुमने जो पढ़ा वह केवल शब्द नहीं हैं — यह एक सच्ची कहानी है एक ऐसे प्रेम के बारे में जो इतना गहरा और व्यक्तिगत है कि वह विशेष रूप से तुम्हारे लिए है।

हम चाहते हैं कि तुम जानो — तुम अकेले नहीं हो। ऐसे लोग हैं जो तुम्हारी परवाह करते हैं और इस यात्रा में तुम्हारे साथ चलना चाहते हैं।

हम जल्द ही तुमसे संपर्क करेंगे। तब तक याद रखो: तुम जितना सोच सकते हो उससे कहीं अधिक प्रेम किए जाते हो।`,
    closing: 'स्नेह से,\nGood News टीम',
    unsubscribe: 'अगर तुम हमसे और संदेश नहीं चाहते, तो बस इस ईमेल का जवाब "सदस्यता रद्द करें" लिखकर दो और हम तुम्हारी जानकारी तुरंत हटा देंगे।'
  },
  it: {
    subject: 'Grazie — un messaggio dal team Good News',
    greeting: name => `Caro/a ${name || 'amico/a'},`,
    body: `Siamo felici che tu abbia fatto questo passo. Quello che hai letto oggi non sono solo parole — è una storia vera, la storia di un amore così profondo e personale che è stato scritto proprio per te.

Vogliamo che tu sappia che non sei solo/a. Ci sono persone a cui stai a cuore e che vorrebbero camminare con te in questo percorso.

Ti contatteremo presto. Nel frattempo, ricorda: sei amato/a più di quanto tu possa mai immaginare.`,
    closing: 'Con affetto,\nIl team Good News',
    unsubscribe: 'Se non desideri più ricevere messaggi da noi, rispondi semplicemente a questa e-mail con la parola "Cancellami" e rimuoveremo immediatamente i tuoi dati.'
  },
  ja: {
    subject: 'ありがとうございます — Good Newsチームからのメッセージ',
    greeting: name => `${name || '友'}へ、`,
    body: `この一歩を踏み出してくださったことを、心から嬉しく思います。今日読んだものは、ただの言葉ではありません。それは、あなた個人に向けられた深い愛についての本当の物語です。

あなたは一人ではないことを知ってください。あなたを大切に思い、この道を一緒に歩みたいと願う人たちがいます。

近いうちにご連絡いたします。それまで覚えていてください：あなたは想像以上に愛されています。`,
    closing: '心を込めて、\nGood Newsチーム',
    unsubscribe: '今後メッセージの受信を希望されない場合は、このメールに「配信停止」と返信してください。すぐにあなたの情報を削除いたします。'
  },
  ko: {
    subject: '감사합니다 — Good News 팀의 메시지',
    greeting: name => `${name || '친구'}에게,`,
    body: `이 한 걸음을 내디뎌 주셔서 정말 기쁩니다. 오늘 읽으신 것은 단순한 글이 아닙니다. 그것은 당신을 위해 특별히 쓰여진, 깊고 개인적인 사랑에 대한 진실한 이야기입니다.

당신은 혼자가 아니라는 것을 알아주세요. 당신을 소중히 여기며 이 여정을 함께 걷고 싶어하는 사람들이 있습니다.

곧 연락드리겠습니다. 그때까지 기억해 주세요: 당신은 상상할 수 있는 것보다 훨씬 더 사랑받고 있습니다.`,
    closing: '따뜻한 마음을 담아,\nGood News 팀',
    unsubscribe: '더 이상 메시지를 받고 싶지 않으시면 이 이메일에 "구독 취소"라고 답장해 주세요. 즉시 정보를 삭제하겠습니다.'
  },
  zh: {
    subject: '谢谢你 — 来自 Good News 团队的一封信',
    greeting: name => `亲爱的${name || '朋友'}，`,
    body: `我们很高兴你迈出了这一步。你今天读到的不仅仅是文字——它是一个真实的故事，关于一份如此深沉、如此私人的爱，这份爱是专门为你而写的。

我们希望你知道：你并不孤单。有人在乎你，有人愿意陪你走这段路。

我们很快会与你联系。在此之前，请记住：你被爱的程度，远超你的想象。`,
    closing: '温暖地，\nGood News 团队',
    unsubscribe: '如果你不再希望收到我们的消息，只需回复此邮件并写上"取消订阅"，我们会立即删除你的信息。'
  },
  pt: {
    subject: 'Obrigado — uma mensagem da equipe Good News',
    greeting: name => `Querido(a) ${name || 'amigo(a)'},`,
    body: `Ficamos muito felizes que você deu este passo. O que você leu hoje não são apenas palavras — é uma história verdadeira sobre um amor tão profundo e tão pessoal que foi escrito especialmente para você.

Queremos que você saiba que não está sozinho(a). Existem pessoas que se importam com você e que gostariam de caminhar junto com você nessa jornada.

Entraremos em contato em breve. Até lá, lembre-se: você é amado(a) mais do que jamais poderia imaginar.`,
    closing: 'Com carinho,\nA equipe Good News',
    unsubscribe: 'Se não deseja mais receber mensagens nossas, basta responder a este e-mail com a palavra "Cancelar" e removeremos seus dados imediatamente.'
  },
  ru: {
    subject: 'Спасибо — сообщение от команды Good News',
    greeting: name => `Дорогой друг ${name ? name + ',' : ','}`,
    body: `Мы рады, что ты сделал этот шаг. То, что ты прочитал сегодня — это не просто слова. Это настоящая история о любви настолько глубокой и личной, что она была написана именно для тебя.

Мы хотим, чтобы ты знал: ты не один. Есть люди, которым ты не безразличен, и которые хотели бы пройти этот путь вместе с тобой.

Мы скоро свяжемся с тобой. А пока помни: ты любим больше, чем можешь себе представить.`,
    closing: 'С теплом,\nКоманда Good News',
    unsubscribe: 'Если ты больше не хочешь получать от нас сообщения, просто ответь на это письмо словом «Отписаться», и мы немедленно удалим твои данные.'
  },
  es: {
    subject: 'Gracias — un mensaje del equipo Good News',
    greeting: name => `Querido/a ${name || 'amigo/a'},`,
    body: `Nos alegra mucho que hayas dado este paso. Lo que leíste hoy no son solo palabras — es una historia verdadera sobre un amor tan profundo y tan personal que fue escrito especialmente para ti.

Queremos que sepas que no estás solo/a. Hay personas que se preocupan por ti y que quieren caminar contigo en este camino.

Nos pondremos en contacto pronto. Hasta entonces, recuerda: eres amado/a más de lo que jamás podrías imaginar.`,
    closing: 'Con cariño,\nEl equipo Good News',
    unsubscribe: 'Si ya no deseas recibir mensajes de nuestra parte, simplemente responde a este correo con la palabra "Cancelar suscripción" y eliminaremos tus datos de inmediato.'
  },
  sw: {
    subject: 'Asante — ujumbe kutoka kwa timu ya Good News',
    greeting: name => `Mpendwa ${name || 'rafiki'},`,
    body: `Tunafurahi sana kwamba umechukua hatua hii. Ulichokisoma leo si maneno tu — ni hadithi ya kweli kuhusu upendo wa kina na wa kibinafsi sana ambao uliandikwa mahususi kwa ajili yako.

Tunataka ujue kwamba huko peke yako. Kuna watu wanaokujali na ambao wangependa kutembea nawe katika safari hii.

Tutawasiliana nawe hivi karibuni. Hadi wakati huo, kumbuka: unapendwa zaidi kuliko unavyoweza kuwazia.`,
    closing: 'Kwa joto,\nTimu ya Good News',
    unsubscribe: 'Ikiwa hutaki tena kupokea ujumbe kutoka kwetu, jibu tu barua pepe hii na neno "Jiondoe" na tutaondoa maelezo yako mara moja.'
  }
};

function buildWelcomeEmail(name, lang) {
  const w = WELCOME[lang] || WELCOME.en;
  const dir = ['ar', 'fa'].includes(lang) ? 'rtl' : 'ltr';
  const align = dir === 'rtl' ? 'right' : 'left';

  const bodyHtml = w.body.split('\n\n').map(p =>
    `<p style="margin:0 0 16px 0;line-height:1.8;">${p}</p>`
  ).join('');

  const closingHtml = w.closing.replace('\n', '<br>');

  return {
    subject: w.subject,
    html: `
<!DOCTYPE html>
<html dir="${dir}">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Georgia','Times New Roman',serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;">
    <div style="background:#1e3a5f;padding:32px 36px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:400;letter-spacing:0.5px;">Good News</h1>
    </div>
    <div style="padding:36px;text-align:${align};color:#1a2332;font-size:16px;line-height:1.8;">
      <p style="margin:0 0 24px 0;font-size:17px;">${w.greeting(name)}</p>
      ${bodyHtml}
      <p style="margin:24px 0 0 0;color:#6b7a8d;">${closingHtml}</p>
    </div>
    <div style="padding:24px 36px 16px;text-align:${align};">
      <p style="margin:0;font-size:12px;color:#9ba8b5;line-height:1.6;">${w.unsubscribe || WELCOME.en.unsubscribe}</p>
    </div>
    <div style="padding:12px 36px 20px;background:#f0f4f8;text-align:center;">
      <a href="https://qr-gospel.com" style="color:#1e3a5f;font-size:13px;text-decoration:none;">qr-gospel.com</a>
      <span style="color:#ccc;margin:0 8px;">·</span>
      <a href="https://qr-gospel.com/privacy?lang=${lang || 'en'}" style="color:#9ba8b5;font-size:12px;text-decoration:none;">Privacy</a>
    </div>
  </div>
</body>
</html>`
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, lang, issue, consentedAt } = req.body;

  if (!name && !email) {
    return res.status(400).json({ error: 'Name or email required' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    console.log('Contact submission (Resend not configured):', { name, email, phone, lang, issue });
    return res.status(200).json({ ok: true });
  }

  try {
    // 1. Notify site owner
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'QR Gospel <noreply@qr-gospel.com>',
        to: toEmail,
        subject: `New contact from QR Gospel — ${name || 'Anonymous'}`,
        html: `
          <h2>New Contact Submission</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Language</td><td style="padding:8px;">${lang || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Issue</td><td style="padding:8px;">${issue || '—'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Consent</td><td style="padding:8px;">✅ Given at ${consentedAt || new Date().toISOString()}</td></tr>
          </table>
        `
      })
    });

    // 2. Send welcome email to visitor (if they provided an email)
    if (email) {
      const welcome = buildWelcomeEmail(name, lang || 'en');
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: 'Good News <noreply@qr-gospel.com>',
          to: email,
          subject: welcome.subject,
          html: welcome.html
        })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
