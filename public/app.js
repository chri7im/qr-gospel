'use strict';
// ═══════════════════════════════════════════════════════
// ANALYTICS (Vercel Web Analytics — anonymous, cookie-free)
// ═══════════════════════════════════════════════════════
// Queue stub so events fired before the insights script loads are kept.
// This file runs first (both scripts are deferred, in document order).
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

// Custom events (visible on plans with custom-events support; harmless otherwise).
// PRIVACY: only language codes, preset issue keys and step names — free-text
// issues are reported as "custom", personal data is never tracked.
function track(name, data) {
  try { window.va('event', { name: name, data: data }); } catch (e) {}
}

// Test hook: ?geo=DE previews the site as a visitor from that country sees it
// (printed-Bible offer, geo language fallback). Read before the URL normalises.
const GEO_OVERRIDE = (() => {
  try {
    const v = new URLSearchParams(location.search).get('geo');
    return v ? v.toUpperCase().slice(0, 2) : '';
  } catch (e) { return ''; }
})();

// Each step gets a virtual path so the funnel (languages, issues, conversion)
// shows up in the analytics "Pages" breakdown. Deep links don't exist — a
// reload on a step URL normalises back to the root before the first pageview.
try {
  history.replaceState({ page: 'page1' }, '', '/');
} catch (e) {}

// ═══════════════════════════════════════════════════════
// LANGUAGE DATA
// ═══════════════════════════════════════════════════════
const LANGS = [
  {
    code:'ar', name:'العربية', en:'Arabic', dir:'rtl',
    hdr:'اختر لغتك',
    ey:'من نحن', ti:'من نحن',
    body:'مهمتنا الوحيدة في هذا العالم هي نشر أعظم خبر سمعه هذا العالم على الإطلاق! الحب والأمل والغاية — كلها في متناول يدك!',
    cta:'احصل عليه الآن مجانًا ←',
    qEy:'استبيان', qTi:'ما الذي يزعجك أكثر في الحياة؟',
    iss:['الإدمان','القلق','الاكتئاب','الخوف','شعور بالذنب','الوحدة','نوبات الهلع','غياب الهدف','العار','الغضب','الحزن','الغيرة','المرارة','الفراغ الداخلي'],
    otl:'شيء آخر...',
    t4:'ما الذي يثقل قلبك؟', s4:'صف بكلماتك الخاصة.', ph4:'اكتب هنا...', b4:'متابعة ←',
    tag:'رسالة لك', ldg:'يتم تحضير رسالتك...', lmr:'أخبرني المزيد! ←',
    t6:'هل تريد معرفة المزيد؟', s6:'شارك تفاصيلك فقط إذا كنت مرتاحاً وسنتواصل معك بطريقة آمنة.',
    ln:'الاسم', le:'البريد الإلكتروني', lp:'الهاتف (اختياري)',
    sb:'إرسال', sk:'لا شكراً',
    tyT:'شكراً لك!', tyS:'سنتواصل معك قريباً.', tySkip:'نتمنى لك السلام.',
    pn:'سامي', lng:'Arabic',
    consentLabel:'أوافق على أن يتواصل معي فريق QR Gospel حول مواضيع الإيمان. يمكنني إلغاء الاشتراك في أي وقت.',
    consentError:'يرجى الموافقة قبل الإرسال.',
    privacyLink:'سياسة الخصوصية',
    formErr:'يرجى إدخال اسمك أو بريدك الإلكتروني.',
    emailErr:'يرجى التحقق من بريدك الإلكتروني.',
    share:'شارك مع صديق', aBack:'رجوع', aNext:'متابعة',
    bibleBtn:'اقرأ الكتاب المقدس مجاناً',
    printedBtn:'اطلب نسخة مطبوعة مجانية من الكتاب المقدس'
  },
  {
    code:'en', name:'English', en:'English', dir:'ltr',
    hdr:'Please select your language',
    ey:'About us', ti:'About us',
    body:"Our only mission in this world is to spread the greatest news this world has ever heard! Love, Hope, Purpose — all are up for grabs — for you!",
    cta:'Get it now for free →',
    qEy:'Questionnaire', qTi:'What bothers you most in life?',
    iss:['Addiction','Anxiety','Depression','Fear','Guilt','Loneliness','Panic attacks','Lack of Purpose','Shame','Anger','Grief','Envy','Bitterness','Emptiness'],
    otl:'Something else...',
    t4:'What weighs on your heart?', s4:'Please describe in your own words what troubles you most.', ph4:'Write here...', b4:'Continue →',
    tag:'A message for you', ldg:'Preparing your message…', lmr:"I'd like to learn more →",
    t6:'Would you like to learn more?', s6:"Leave your details and we'll be in touch.",
    ln:'Name', le:'Email', lp:'Phone (optional)',
    sb:'Submit', sk:"No thanks, I'm good",
    tyT:'Thank you!', tyS:"We'll be in touch soon.", tySkip:'May you find peace.',
    pn:'Paul', lng:'English',
    consentLabel:'I agree to be contacted by QR Gospel about faith-related topics. I can unsubscribe at any time.',
    consentError:'Please check the box above before submitting.',
    privacyLink:'Privacy Policy',
    formErr:'Please enter your name or email.',
    emailErr:'Please check your email address.',
    share:'Share with a friend', aBack:'Go back', aNext:'Continue',
    bibleBtn:'Read the Bible for free',
    printedBtn:'Order a free printed Bible'
  },
  {
    code:'fa', name:'فارسی', en:'Farsi', dir:'rtl',
    hdr:'لطفاً زبانت را انتخاب کن',
    ey:'درباره ما', ti:'درباره ما',
    body:'تنها مأموریت ما در این دنیا، گسترش بزرگ‌ترین خبری است که این دنیا تاکنون شنیده! عشق، امید، هدف — همه برای تو در دسترس است!',
    cta:'الان رایگان دریافت کن ←',
    qEy:'پرسشنامه', qTi:'چه چیزی در زندگیت بیشتر اذیتت می‌کنه؟',
    iss:['اعتیاد','اضطراب','افسردگی','ترس','احساس گناه','تنهایی','حملات پانیک','نبود هدف','شرم','خشم','غم','حسادت','کینه','پوچی'],
    otl:'چیز دیگری...',
    t4:'چه چیزی دلت را سنگین می‌کند؟', s4:'به زبان خودت توضیح بده.', ph4:'اینجا بنویس...', b4:'ادامه بده ←',
    tag:'پیامی برای تو', ldg:'در حال آماده‌سازی پیام تو...', lmr:'بیشتر بگو! ←',
    t6:'آیا می‌خواهی بیشتر بدانی؟', s6:'اگر راحت هستی اطلاعاتت را وارد کن تا با احترام با تو در تماس باشیم.',
    ln:'نام', le:'ایمیل', lp:'تلفن (اختیاری)',
    sb:'ارسال', sk:'نه ممنون',
    tyT:'متشکرم!', tyS:'به زودی با تو تماس می‌گیریم.', tySkip:'برایت آرامش آرزو می‌کنیم.',
    pn:'علی', lng:'Persian (Farsi)',
    consentLabel:'موافقم که تیم QR Gospel درباره موضوعات ایمانی با من تماس بگیرد. هر زمان می‌توانم لغو اشتراک کنم.',
    consentError:'لطفاً قبل از ارسال موافقت کن.',
    privacyLink:'سیاست حریم خصوصی',
    formErr:'لطفاً نام یا ایمیلت را وارد کن.',
    emailErr:'لطفاً ایمیلت را بررسی کن.',
    share:'با یک دوست به اشتراک بگذار', aBack:'بازگشت', aNext:'ادامه',
    bibleBtn:'کتاب مقدس را رایگان بخوان',
    printedBtn:'یک نسخه چاپی رایگان کتاب مقدس سفارش بده'
  },
  {
    code:'fr', name:'Français', en:'French', dir:'ltr',
    hdr:'Choisis ta langue',
    ey:'Qui sommes-nous', ti:'Qui sommes-nous',
    body:"Notre seule mission dans ce monde, c'est de partager la meilleure nouvelle que tu aies jamais entendue ! Amour, espoir, but — tout ça est à toi !",
    cta:'Obtiens-le maintenant gratuitement →',
    qEy:'Questionnaire', qTi:'Qu\'est-ce qui te dérange le plus dans la vie ?',
    iss:['Dépendance','Anxiété','Dépression','Peur','Sentiments de culpabilité','Solitude','Crises de panique','Manque de sens','Honte','Colère','Deuil','Envie','Amertume','Vide intérieur'],
    otl:'Autre chose...',
    t4:'Qu\'est-ce qui pèse sur ton cœur ?', s4:'Décris avec tes propres mots.', ph4:'Écris ici...', b4:'Continuer →',
    tag:'Un message pour toi', ldg:'Préparation de ton message…', lmr:'Dis-m\'en plus ! →',
    t6:'Tu veux en savoir plus ?', s6:'Partage tes coordonnées uniquement si tu es à l\'aise et nous te recontacterons en toute sécurité.',
    ln:'Nom', le:'E-mail', lp:'Téléphone (facultatif)',
    sb:'Envoyer', sk:'Non merci',
    tyT:'Merci !', tyS:'Nous te contacterons bientôt.', tySkip:'Que la paix soit avec toi.',
    pn:'Paul', lng:'French',
    consentLabel:'J\'accepte d\'être contacté(e) par QR Gospel sur des sujets liés à la foi. Je peux me désinscrire à tout moment.',
    consentError:'Merci de cocher la case ci-dessus avant d\'envoyer.',
    privacyLink:'Politique de confidentialité',
    formErr:'Merci d’entrer ton nom ou ton e-mail.',
    emailErr:'Vérifie ton adresse e-mail.',
    share:'Partage avec un ami', aBack:'Retour', aNext:'Continuer',
    bibleBtn:'Lis la Bible gratuitement',
    printedBtn:'Commande une Bible imprimée gratuite'
  },
  {
    code:'de', name:'Deutsch', en:'German', dir:'ltr',
    hdr:'Wähle deine Sprache',
    ey:'Über uns', ti:'Über uns',
    body:'Unsere einzige Mission in dieser Welt ist, die beste Nachricht zu verbreiten, die du je gehört hast! Liebe, Hoffnung, Sinn im Leben — das alles und mehr wartet auf dich!',
    cta:'Hol es dir jetzt kostenlos →',
    qEy:'Fragebogen', qTi:'Was stört dich am meisten im Leben?',
    iss:['Sucht','Sorgen','Depressionen','Angst','Schuldgefühle','Einsamkeit','Panikattacken','Sinnlosigkeit','Scham','Wut','Trauer','Neid','Bitterkeit','Innere Leere'],
    otl:'Etwas anderes...',
    t4:'Was lastet auf deinem Herzen?', s4:'Beschreibe mit eigenen Worten, was dich am meisten bewegt.', ph4:'Schreibe hier...', b4:'Weiter →',
    tag:'Eine Botschaft für dich', ldg:'Deine Nachricht wird vorbereitet…', lmr:'Ich möchte mehr erfahren! →',
    t6:'Möchtest du mehr erfahren?', s6:'Teile deine Daten nur, wenn es sich gut anfühlt. Wir melden uns sicher und respektvoll.',
    ln:'Name', le:'E-Mail', lp:'Telefon (optional)',
    sb:'Senden', sk:'Nein danke',
    tyT:'Danke!', tyS:'Wir melden uns bald bei dir.', tySkip:'Wir wünschen dir Frieden.',
    pn:'Paul', lng:'German',
    consentLabel:'Ich bin einverstanden, von QR Gospel zu Glaubensthemen kontaktiert zu werden. Ich kann mich jederzeit abmelden.',
    consentError:'Bitte stimme oben zu, bevor du absendest.',
    privacyLink:'Datenschutzerklärung',
    formErr:'Bitte gib deinen Namen oder deine E-Mail ein.',
    emailErr:'Bitte überprüfe deine E-Mail-Adresse.',
    share:'Teile es mit einem Freund', aBack:'Zurück', aNext:'Weiter',
    bibleBtn:'Lies die Bibel kostenlos',
    printedBtn:'Bestelle eine kostenlose gedruckte Bibel'
  },
  {
    code:'hi', name:'हिन्दी', en:'Hindi', dir:'ltr',
    hdr:'अपनी भाषा चुनें',
    ey:'हमारे बारे में', ti:'हमारे बारे में',
    body:'इस दुनिया में हमारा एकमात्र मिशन उस सबसे बड़ी खबर को फैलाना है जो इस दुनिया ने कभी सुनी है! प्रेम, आशा, उद्देश्य — सब कुछ आपके लिए उपलब्ध है!',
    cta:'अभी मुफ़्त में पाएं →',
    qEy:'प्रश्नावली', qTi:'जीवन में आपको सबसे अधिक क्या परेशान करता है?',
    iss:['लत','चिंता','अवसाद','डर','अपराध-बोध','अकेलापन','पैनिक अटैक','उद्देश्य की कमी','शर्म','क्रोध','दुःख','ईर्ष्या','कड़वाहट','खालीपन'],
    otl:'कुछ और...',
    t4:'आपके दिल पर क्या भारी है?', s4:'अपने शब्दों में बताएं।', ph4:'यहाँ लिखें...', b4:'जारी रखें →',
    tag:'आपके लिए एक संदेश', ldg:'आपका संदेश तैयार हो रहा है…', lmr:'मुझे और बताएं! →',
    t6:'क्या आप अधिक जानना चाहते हैं?', s6:'सिर्फ तभी अपनी जानकारी साझा करें जब आप सहज महसूस करें, हम सुरक्षित तरीके से जवाब देंगे।',
    ln:'नाम', le:'ईमेल', lp:'फ़ोन (वैकल्पिक)',
    sb:'भेजें', sk:'नहीं, धन्यवाद',
    tyT:'धन्यवाद!', tyS:'हम जल्द ही आपसे संपर्क करेंगे।', tySkip:'आपको शांति मिले।',
    pn:'पॉल', lng:'Hindi',
    consentLabel:'मैं सहमत हूँ कि QR Gospel आस्था से जुड़े विषयों पर मुझसे संपर्क करे। मैं कभी भी सदस्यता रद्द कर सकता/सकती हूँ।',
    consentError:'कृपया भेजने से पहले ऊपर सहमति दें।',
    privacyLink:'गोपनीयता नीति',
    formErr:'कृपया अपना नाम या ईमेल दर्ज करें।',
    emailErr:'कृपया अपना ईमेल जांचें।',
    share:'एक दोस्त के साथ साझा करें', aBack:'वापस', aNext:'जारी रखें',
    bibleBtn:'बाइबल मुफ़्त में पढ़ें',
    printedBtn:'मुफ़्त छपी हुई बाइबल मंगवाएं'
  },
  {
    code:'it', name:'Italiano', en:'Italian', dir:'ltr',
    hdr:'Scegli la tua lingua',
    ey:'Chi siamo', ti:'Chi siamo',
    body:"La nostra unica missione in questo mondo è diffondere la notizia più bella che tu abbia mai sentito! Amore, speranza, scopo — tutto per te!",
    cta:'Ottienilo ora gratis →',
    qEy:'Questionario', qTi:'Cosa ti dà più fastidio nella vita?',
    iss:['Dipendenza','Ansia','Depressione','Paura','Sensi di colpa','Solitudine','Attacchi di panico','Mancanza di scopo','Vergogna','Rabbia','Dolore','Invidia','Amarezza','Vuoto interiore'],
    otl:"Qualcos'altro...",
    t4:'Cosa pesa sul tuo cuore?', s4:'Descrivi con le tue parole.', ph4:'Scrivi qui...', b4:'Continua →',
    tag:'Un messaggio per te', ldg:'Preparando il tuo messaggio…', lmr:'Dimmi di più! →',
    t6:'Vorresti saperne di più?', s6:'Condividi i tuoi dati solo se ti senti tranquillo: ti ricontatteremo in modo sicuro.',
    ln:'Nome', le:'Email', lp:'Telefono (opzionale)',
    sb:'Invia', sk:'No grazie',
    tyT:'Grazie!', tyS:'Ci faremo vivi presto.', tySkip:'Ti auguriamo pace.',
    pn:'Paolo', lng:'Italian',
    consentLabel:'Accetto di essere contattato/a da QR Gospel su argomenti di fede. Posso annullare l\'iscrizione in qualsiasi momento.',
    consentError:'Per favore, spunta la casella sopra prima di inviare.',
    privacyLink:'Informativa sulla privacy',
    formErr:'Inserisci il tuo nome o la tua email.',
    emailErr:'Controlla il tuo indirizzo email.',
    share:'Condividi con un amico', aBack:'Indietro', aNext:'Continua',
    bibleBtn:'Leggi la Bibbia gratuitamente',
    printedBtn:'Ordina una Bibbia stampata gratuita'
  },
  {
    code:'ja', name:'日本語', en:'Japanese', dir:'ltr',
    hdr:'言語を選択してください',
    ey:'私たちについて', ti:'私たちについて',
    body:'この世界における私たちの唯一の使命は、この世界が今まで聞いたことのある最も素晴らしいニュースを広めることです！愛、希望、目的 — すべてがあなたのために用意されています！',
    cta:'今すぐ無料で手に入れよう →',
    qEy:'アンケート', qTi:'人生で最もあなたを悩ませているものは何ですか？',
    iss:['依存症','不安','うつ病','恐怖','罪悪感','孤独','パニック発作','目的の欠如','羞恥心','怒り','悲しみ','嫉妬','苦々しさ','虚しさ'],
    otl:'その他...',
    t4:'あなたの心を重くしているものは何ですか？', s4:'ご自身の言葉でお書きください。', ph4:'ここに書いてください...', b4:'続ける →',
    tag:'あなたへのメッセージ', ldg:'メッセージを準備しています…', lmr:'もっと教えて！ →',
    t6:'もっと詳しく知りたいですか？', s6:'お名前とご連絡先をお残しください。',
    ln:'お名前', le:'メール', lp:'電話番号（任意）',
    sb:'送信', sk:'いいえ、結構です',
    tyT:'ありがとうございます！', tyS:'まもなくご連絡いたします。', tySkip:'平安がありますように。',
    pn:'ポール', lng:'Japanese',
    consentLabel:'QR Gospelから信仰に関する連絡を受けることに同意します。いつでも配信停止できます。',
    consentError:'送信前に上のチェックボックスにチェックを入れてください。',
    privacyLink:'プライバシーポリシー',
    formErr:'お名前またはメールアドレスを入力してください。',
    emailErr:'メールアドレスをご確認ください。',
    share:'友達にシェアする', aBack:'戻る', aNext:'続ける',
    bibleBtn:'聖書を無料で読む',
    printedBtn:'無料の印刷版聖書を注文する'
  },
  {
    code:'ko', name:'한국어', en:'Korean', dir:'ltr',
    hdr:'언어를 선택하세요',
    ey:'우리에 대해', ti:'우리에 대해',
    body:'이 세상에서 우리의 유일한 사명은 이 세상이 들어본 가장 위대한 소식을 전파하는 것입니다! 사랑, 희망, 목적 — 모두 당신을 위한 것입니다!',
    cta:'지금 무료로 받기 →',
    qEy:'설문', qTi:'삶에서 당신을 가장 괴롭히는 것은 무엇인가요?',
    iss:['중독','불안','우울','두려움','죄책감','외로움','공황발작','목적 부재','수치심','분노','슬픔','질투','쓴 마음','공허함'],
    otl:'다른 것...',
    t4:'무엇이 마음을 무겁게 하나요?', s4:'마음에 가장 무거운 것을 써 주세요.', ph4:'여기에 쓰세요...', b4:'계속 →',
    tag:'당신을 위한 메시지', ldg:'메시지를 준비 중입니다…', lmr:'더 알려줘! →',
    t6:'더 알고 싶으신가요?', s6:'연락처를 남겨 주시면 곧 연락드리겠습니다.',
    ln:'이름', le:'이메일', lp:'전화번호 (선택)',
    sb:'제출', sk:'아니요, 괜찮습니다',
    tyT:'감사합니다!', tyS:'곧 연락드리겠습니다.', tySkip:'평안하시길 바랍니다.',
    pn:'바울', lng:'Korean',
    consentLabel:'QR Gospel이 신앙 관련 주제로 연락하는 것에 동의합니다. 언제든지 구독을 취소할 수 있습니다.',
    consentError:'제출하기 전에 위의 체크박스를 선택해 주세요.',
    privacyLink:'개인정보 처리방침',
    formErr:'이름 또는 이메일을 입력해 주세요.',
    emailErr:'이메일 주소를 확인해 주세요.',
    share:'친구에게 공유하기', aBack:'뒤로', aNext:'계속',
    bibleBtn:'성경을 무료로 읽기',
    printedBtn:'무료 인쇄 성경 주문하기'
  },
  {
    code:'zh', name:'中文', en:'Mandarin', dir:'ltr',
    hdr:'请选择你的语言',
    ey:'关于我们', ti:'关于我们',
    body:'我们在这世界上的唯一任务就是传播你听过的最棒的消息！爱、希望、目标——全都是给你的！',
    cta:'现在免费获取 →',
    qEy:'问卷', qTi:'什么是生活中最困扰你的事？',
    iss:['成瘾','焦虑','抑郁','恐惧','内疚','孤独','惊恐发作','缺乏目标','羞耻','愤怒','悲伤','嫉妒','苦涩','空虚'],
    otl:'其他...',
    t4:'什么压在你的心上？', s4:'请用自己的话描述最困扰你的事。', ph4:'在这里写...', b4:'继续 →',
    tag:'给你的信息', ldg:'正在准备你的信息…', lmr:'告诉我更多！ →',
    t6:'你想了解更多吗？', s6:'只在你觉得安心的时候留下资料，我们会安全地与你联系。',
    ln:'姓名', le:'电子邮件', lp:'电话（可选）',
    sb:'提交', sk:'不了，谢谢',
    tyT:'谢谢！', tyS:'我们很快会与你联系。', tySkip:'愿你找到平安。',
    pn:'保罗', lng:'Mandarin Chinese',
    consentLabel:'我同意 QR Gospel 就信仰相关话题与我联系。我可以随时取消订阅。',
    consentError:'请在提交前勾选上方的同意框。',
    privacyLink:'隐私政策',
    formErr:'请输入你的姓名或电子邮件。',
    emailErr:'请检查你的电子邮件地址。',
    share:'分享给朋友', aBack:'返回', aNext:'继续',
    bibleBtn:'免费阅读圣经',
    printedBtn:'免费索取纸质圣经'
  },
  {
    code:'pt', name:'Português', en:'Portuguese', dir:'ltr',
    hdr:'Escolhe a tua língua',
    ey:'Sobre nós', ti:'Sobre nós',
    body:'A nossa única missão neste mundo é espalhar a melhor notícia que alguma vez ouviste! Amor, esperança, propósito — tudo para ti!',
    cta:'Recebe agora gratuitamente →',
    qEy:'Questionário', qTi:'O que mais te incomoda na vida?',
    iss:['Vício','Ansiedade','Depressão','Medo','Culpa','Solidão','Ataques de pânico','Falta de propósito','Vergonha','Raiva','Luto','Inveja','Amargura','Vazio'],
    otl:'Outra coisa...',
    t4:'O que pesa no teu coração?', s4:'Descreve com as tuas próprias palavras.', ph4:'Escreve aqui...', b4:'Continuar →',
    tag:'Uma mensagem para ti', ldg:'A preparar a tua mensagem…', lmr:'Conta-me mais! →',
    t6:'Gostarias de saber mais?', s6:'Partilha os teus dados apenas se te sentires confortável. Entraremos em contacto contigo com todo o cuidado.',
    ln:'Nome', le:'E-mail', lp:'Telefone (opcional)',
    sb:'Enviar', sk:'Não, obrigado',
    tyT:'Obrigado!', tyS:'Entraremos em contacto em breve.', tySkip:'Que encontres paz.',
    pn:'Paulo', lng:'European Portuguese',
    consentLabel:'Concordo em ser contactado(a) pela QR Gospel sobre temas de fé. Posso cancelar a subscrição a qualquer momento.',
    consentError:'Por favor, assinala a caixa acima antes de enviar.',
    privacyLink:'Política de Privacidade',
    formErr:'Por favor, indica o teu nome ou e-mail.',
    emailErr:'Verifica o teu e-mail.',
    share:'Partilha com um amigo', aBack:'Voltar', aNext:'Continuar',
    bibleBtn:'Lê a Bíblia gratuitamente',
    printedBtn:'Encomenda uma Bíblia impressa gratuita'
  },
  {
    code:'ru', name:'Русский', en:'Russian', dir:'ltr',
    hdr:'Пожалуйста, выбери язык',
    ey:'О нас', ti:'О нас',
    body:'Наша единственная миссия в этом мире — рассказать тебе самую важную новость, которую ты когда-либо слышал! Любовь, надежда, смысл жизни — ждут тебя!',
    cta:'Получи это сейчас бесплатно →',
    qEy:'Опрос', qTi:'Что больше всего беспокоит тебя в жизни?',
    iss:['Зависимость','Тревога','Депрессия','Страх','Вина','Одиночество','Панические атаки','Отсутствие цели','Стыд','Гнев','Горе','Зависть','Горечь','Пустота'],
    otl:'Что-то ещё...',
    t4:'Что лежит на твоём сердце?', s4:'Опиши своими словами, что беспокоит тебя больше всего.', ph4:'Напиши здесь...', b4:'Продолжить →',
    tag:'Послание для тебя', ldg:'Твоё сообщение готовится…', lmr:'Хочу узнать больше! →',
    t6:'Хочешь узнать больше?', s6:'Делись данными только если готов. Мы свяжемся аккуратно и безопасно.',
    ln:'Имя', le:'Эл. почта', lp:'Телефон (необязательно)',
    sb:'Отправить', sk:'Нет, спасибо',
    tyT:'Спасибо!', tyS:'Мы скоро свяжемся с тобой.', tySkip:'Желаем тебе мира.',
    pn:'Павел', lng:'Russian',
    consentLabel:'Я согласен(на), чтобы QR Gospel связывался со мной по вопросам веры. Я могу отписаться в любое время.',
    consentError:'Пожалуйста, поставь галочку выше перед отправкой.',
    privacyLink:'Политика конфиденциальности',
    formErr:'Пожалуйста, укажи имя или эл. почту.',
    emailErr:'Проверь свой адрес эл. почты.',
    share:'Поделись с другом', aBack:'Назад', aNext:'Продолжить',
    bibleBtn:'Читай Библию бесплатно',
    printedBtn:'Закажи бесплатную печатную Библию'
  },
  {
    code:'es', name:'Español', en:'Spanish', dir:'ltr',
    hdr:'Elige tu idioma',
    ey:'Sobre nosotros', ti:'Sobre nosotros',
    body:'¡Nuestra única misión en este mundo es compartir la mejor noticia que hayas oído nunca! Amor, esperanza, propósito — ¡todo es para ti!',
    cta:'Consíguelo ahora gratis →',
    qEy:'Cuestionario', qTi:'¿Qué es lo que más te molesta en la vida?',
    iss:['Adicción','Ansiedad','Depresión','Miedo','Sentimientos de culpa','Soledad','Ataques de pánico','Falta de propósito','Vergüenza','Ira','Duelo','Envidia','Amargura','Vacío'],
    otl:'Algo más...',
    t4:'¿Qué pesa en tu corazón?', s4:'Describe con tus propias palabras lo que más te afecta.', ph4:'Escribe aquí...', b4:'Continuar →',
    tag:'Un mensaje para ti', ldg:'Preparando tu mensaje…', lmr:'¡Dime más! →',
    t6:'¿Te gustaría saber más?', s6:'Comparte tus datos solo si te sientes cómodo y te contactaremos con cuidado.',
    ln:'Nombre', le:'Correo electrónico', lp:'Teléfono (opcional)',
    sb:'Enviar', sk:'No, gracias',
    tyT:'¡Gracias!', tyS:'Nos pondremos en contacto pronto.', tySkip:'Que encuentres paz.',
    pn:'Pablo', lng:'Spanish',
    consentLabel:'Acepto que QR Gospel me contacte sobre temas de fe. Puedo darme de baja en cualquier momento.',
    consentError:'Por favor, marca la casilla de arriba antes de enviar.',
    privacyLink:'Política de privacidad',
    formErr:'Por favor, introduce tu nombre o correo.',
    emailErr:'Revisa tu correo electrónico.',
    share:'Comparte con un amigo', aBack:'Volver', aNext:'Continuar',
    bibleBtn:'Lee la Biblia gratis',
    printedBtn:'Pide una Biblia impresa gratis'
  },
  {
    code:'sw', name:'Kiswahili', en:'Swahili', dir:'ltr',
    hdr:'Chagua lugha yako',
    ey:'Kuhusu sisi', ti:'Kuhusu sisi',
    body:'Dhamira yetu pekee duniani ni kusambaza habari njema zaidi ambayo dunia hii imewahi kusikia! Upendo, Tumaini, Kusudi — vyote vipo kwa ajili yako!',
    cta:'Pata sasa bila malipo →',
    qEy:'Dodoso', qTi:'Ni nini kinachokusumbua zaidi maishani?',
    iss:['Uraibu','Wasiwasi','Unyogovu','Hofu','Hatia','Upweke','Mashambulizi ya hofu','Ukosefu wa kusudi','Aibu','Hasira','Huzuni','Wivu','Uchungu','Utupu'],
    otl:'Kingine...',
    t4:'Ni nini kinachokuzito moyoni?', s4:'Eleza kwa maneno yako mwenyewe.', ph4:'Andika hapa...', b4:'Endelea →',
    tag:'Ujumbe kwa ajili yako', ldg:'Inaandaa ujumbe wako…', lmr:'Niambie zaidi! →',
    t6:'Je, ungependa kujua zaidi?', s6:'Shiriki maelezo yako tu ukijisikia vizuri, tutawasiliana kwa uangalifu.',
    ln:'Jina', le:'Barua pepe', lp:'Simu (si lazima)',
    sb:'Tuma', sk:'Hapana, asante',
    tyT:'Asante!', tyS:'Tutawasiliana nawe hivi karibuni.', tySkip:'Tunakuletea amani.',
    pn:'Paulo', lng:'Swahili',
    consentLabel:'Ninakubali kuwasiliana na QR Gospel kuhusu mada za imani. Ninaweza kujiondoa wakati wowote.',
    consentError:'Tafadhali weka alama kwenye kisanduku hapo juu kabla ya kutuma.',
    privacyLink:'Sera ya Faragha',
    formErr:'Tafadhali weka jina au barua pepe yako.',
    emailErr:'Tafadhali angalia barua pepe yako.',
    share:'Shiriki na rafiki', aBack:'Rudi nyuma', aNext:'Endelea',
    bibleBtn:'Soma Biblia bila malipo',
    printedBtn:'Agiza Biblia iliyochapishwa bila malipo'
  }
];

// Stable reference to English — LANGS order shifts when a dynamic language is injected at index 0
const LANG_EN = LANGS[1];

// ═══════════════════════════════════════════════════════
// OPENING SENTENCES (hardcoded per language: [sentence1, sentence2_before, sentence2_after])
// ═══════════════════════════════════════════════════════
const OPENING = {
  ar: ['هناك قصة قديمة جدًا، إنها جزء من حمضنا النووي.', 'هذه القصة تفسر السبب الحقيقي لـ', '.'],
  de: ['Es gibt eine Geschichte, die ist so alt, dass sie Teil unserer DNA ist.', 'Diese Geschichte erklärt die wahre Ursache deiner ', '.'],
  en: ['There is a story so ancient, it is part of our DNA.', 'That story explains the root cause of your ', '.'],
  es: ['Hay una historia tan antigua que forma parte de nuestro ADN.', 'Esa historia explica la verdadera causa de tu ', '.'],
  fa: ['داستانی وجود دارد به قدمت بشریت، که در DNA ما حک شده است.', 'این داستان ریشه واقعی ', ' را توضیح می\u200Cدهد.'],
  fr: ["Il existe une histoire si ancienne qu'elle fait partie de notre ADN.", 'Cette histoire explique la véritable cause de ta ', '.'],
  hi: ['एक कहानी है जो इतनी पुरानी है कि यह हमारे DNA का हिस्सा है।', 'यह कहानी आपकी ', ' की असली जड़ को समझाती है।'],
  it: ["C'\u00E8 una storia cos\u00EC antica che fa parte del nostro DNA.", 'Questa storia spiega la vera causa della tua ', '.'],
  ja: ['私たちのDNAに刻まれているほど古い物語があります。', 'その物語は、あなたの', 'の本当の原因を説明しています。'],
  ko: ['우리의 DNA에 새겨져 있을 만큼 오래된 이야기가 있습니다.', '그 이야기는 당신의 ', '의 진정한 원인을 설명합니다.'],
  pt: ['Existe uma história tão antiga que faz parte do nosso ADN.', 'Essa história explica a verdadeira causa disto: ', '.'],
  ru: ['Есть история настолько древняя, что она записана в нашей ДНК.', 'Эта история объясняет истинную причину твоей ', '.'],
  sw: ['Kuna hadithi ya kale sana hivi kwamba ni sehemu ya DNA yetu.', 'Hadithi hiyo inaeleza chanzo cha kweli cha ', '.'],
  zh: ['有一个古老到刻在我们DNA中的故事。', '这个故事解释了你', '的真正根源。'],
};

function buildOpening(langCode, issueText) {
  const t = OPENING[langCode] || OPENING.en;
  return t[0] + ' ' + t[1] + issueText + t[2];
}

// ═══════════════════════════════════════════════════════
// ISSUE KEYS (map index in iss[] to static file name)
// ═══════════════════════════════════════════════════════
const ISSUE_KEYS = [
  'addiction','anxiety','depression','fear','guilt','loneliness',
  'panic-attacks','lack-of-purpose','shame','anger','grief','envy',
  'bitterness','emptiness'
];

// Same address-shape check the server uses — catches typos before the fire-and-forget submit
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// localStorage can throw (private mode, blocked storage) — degrade to no caching
function storageGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════
let L = LANGS[1];          // selected language, default English
let issue = '';            // selected or typed issue
let issueKey = '';         // file key for static text lookup
let fromOther = false;     // whether user typed a custom issue
let cur = 'page1';         // current page id
let contactSent = false;   // a submission went out — block duplicates this visit

// ═══════════════════════════════════════════════════════
// LANGUAGE DETECTION
// ═══════════════════════════════════════════════════════
// Map browser language codes to our LANGS index
const LANG_CODE_MAP = {};
LANGS.forEach((l, i) => { LANG_CODE_MAP[l.code] = i; });

// Map country codes to best-fit language
const COUNTRY_LANG = {
  SA:'ar',EG:'ar',AE:'ar',IQ:'ar',MA:'ar',DZ:'ar',TN:'ar',JO:'ar',LB:'ar',KW:'ar',QA:'ar',BH:'ar',OM:'ar',YE:'ar',LY:'ar',SD:'ar',SY:'ar',PS:'ar',
  IR:'fa',AF:'fa',TJ:'fa',
  FR:'fr',BE:'fr',SN:'fr',CI:'fr',CM:'fr',CD:'fr',MG:'fr',ML:'fr',BF:'fr',NE:'fr',TD:'fr',GN:'fr',RW:'fr',HT:'fr',
  DE:'de',AT:'de',CH:'de',LI:'de',LU:'de',
  IN:'hi',NP:'hi',
  IT:'it',SM:'it',
  JP:'ja',
  KR:'ko',KP:'ko',
  CN:'zh',TW:'zh',HK:'zh',MO:'zh',SG:'zh',
  BR:'pt',PT:'pt',AO:'pt',MZ:'pt',
  RU:'ru',BY:'ru',KZ:'ru',KG:'ru',
  ES:'es',MX:'es',CO:'es',AR:'es',PE:'es',VE:'es',CL:'es',EC:'es',GT:'es',CU:'es',BO:'es',DO:'es',HN:'es',PY:'es',SV:'es',NI:'es',CR:'es',PA:'es',UY:'es',PR:'es',
  KE:'sw',TZ:'sw',UG:'sw',
  US:'en',GB:'en',AU:'en',NZ:'en',CA:'en',IE:'en',ZA:'en',NG:'en',GH:'en',PH:'en',JM:'en'
};

function getDeviceLangCode() {
  const browserLangs = navigator.languages || [navigator.language || ''];
  for (const tag of browserLangs) {
    const code = tag.split('-')[0].toLowerCase();
    if (code) return code;
  }
  return '';
}

function detectLangIndex() {
  const code = getDeviceLangCode();
  if (code in LANG_CODE_MAP) return { idx: LANG_CODE_MAP[code], code: code, miss: false };
  return { idx: -1, code: code, miss: !!code };
}

// Visitor country (memoized — used for both the language fallback and the
// printed-Bible offer, but fetched at most once)
let countryPromise = null;
function getCountry() {
  if (GEO_OVERRIDE) return Promise.resolve(GEO_OVERRIDE);
  if (!countryPromise) {
    countryPromise = fetch('/api/geo')
      .then(res => (res.ok ? res.json() : { country: '' }))
      .then(data => data.country || '')
      .catch(() => '');
  }
  return countryPromise;
}

async function detectCountryLangCode() {
  const country = await getCountry();
  return COUNTRY_LANG[country] || '';
}

// ═══════════════════════════════════════════════════════
// BIBLE OFFERS (thank-you screen)
// ═══════════════════════════════════════════════════════
// Lead link: read the Bible free online — works for every country and language.
const BIBLE_ONLINE_URL = 'https://www.bible.com/';
// Extra: vetted ministries that ship free printed Bibles, by visitor country.
// Keep this list small and personally vetted; everyone else just sees the
// online link. Extend with one line per new country partner.
const PRINTED_BIBLE_OFFERS = {
  DE: 'https://www.c-plakat.de/bibeln-buecher-p13.html'
};

// Load or fetch translations for an unsupported language
async function loadDynamicLang(code) {
  // 1. Check localStorage cache
  const cacheKey = 'lang_' + code;
  const cached = storageGet(cacheKey);
  if (cached) {
    try { return JSON.parse(cached); } catch (e) {}
  }

  // 2. Check for static ui.json (committed by a previous translation)
  try {
    const staticRes = await fetch(`/texts/${code}/ui.json`);
    if (staticRes.ok) {
      const data = await staticRes.json();
      if (data.iss && data.iss.length === 14) {
        storageSet(cacheKey, JSON.stringify(data));
        return data;
      }
    }
  } catch (e) {}

  // 3. Translate via API (which also commits to GitHub for future users)
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: code })
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.iss || data.iss.length !== 14) return null;

    storageSet(cacheKey, JSON.stringify(data));
    return data;
  } catch (e) { return null; }
}

// Build a full LANGS entry from translated UI strings
function buildLangEntry(code, t) {
  // Get native language name via Intl API
  let nativeName = code;
  try {
    const dn = new Intl.DisplayNames([code], { type: 'language' });
    nativeName = dn.of(code);
    nativeName = nativeName.charAt(0).toUpperCase() + nativeName.slice(1);
  } catch (e) {}

  let enName = code;
  try {
    const dn = new Intl.DisplayNames(['en'], { type: 'language' });
    enName = dn.of(code);
    enName = enName.charAt(0).toUpperCase() + enName.slice(1);
  } catch (e) {}

  return {
    code: code, name: nativeName, en: enName, dir: t.dir || 'ltr',
    hdr: t.hdr, ey: t.ey, ti: t.ti, body: t.body, cta: t.cta,
    qEy: t.qEy, qTi: t.qTi, iss: t.iss, otl: t.otl,
    t4: t.t4, s4: t.s4, ph4: t.ph4, b4: t.b4,
    tag: t.tag, ldg: t.ldg, lmr: t.lmr,
    t6: t.t6, s6: t.s6,
    ln: t.ln, le: t.le, lp: t.lp,
    sb: t.sb, sk: t.sk,
    tyT: t.tyT, tyS: t.tyS, tySkip: t.tySkip,
    consentLabel: t.consentLabel || LANG_EN.consentLabel,
    consentError: t.consentError || LANG_EN.consentError,
    privacyLink: t.privacyLink || LANG_EN.privacyLink,
    formErr: t.formErr || LANG_EN.formErr,
    emailErr: t.emailErr || LANG_EN.emailErr,
    share: t.share || LANG_EN.share,
    aBack: t.aBack || LANG_EN.aBack,
    aNext: t.aNext || LANG_EN.aNext,
    bibleBtn: t.bibleBtn || LANG_EN.bibleBtn,
    printedBtn: t.printedBtn || LANG_EN.printedBtn,
    pn: t.pn || 'Paul', lng: enName
  };
}

// ═══════════════════════════════════════════════════════
// INIT: LANGUAGE SCROLL
// ═══════════════════════════════════════════════════════
(function initLangScroll() {
  const scroll = document.getElementById('p1-scroll');
  const padB = document.getElementById('pad-bottom');
  const ITEM_H = 84;

  function addLangItem(lang, i) {
    const el = document.createElement('div');
    el.className = 'lang-item';
    el.id = 'li-' + i;
    el.setAttribute('role', 'option');
    el.setAttribute('aria-selected', 'false');
    const native = document.createElement('span');
    native.className = 'lang-name';
    native.textContent = lang.name;
    const english = document.createElement('span');
    english.className = 'lang-en';
    english.textContent = lang.en;
    el.append(native, english);
    el.addEventListener('click', () => {
      scroll.scrollTo({ top: i * ITEM_H, behavior: 'smooth' });
      L = LANGS[i];
      setTimeout(() => goTo('page2'), 300);
    });
    scroll.insertBefore(el, padB);
  }

  LANGS.forEach((lang, i) => addLangItem(lang, i));

  function setPads() {
    const areaH = scroll.parentElement.clientHeight;
    const pad = Math.max(0, (areaH / 2) - (ITEM_H / 2));
    document.getElementById('pad-top').style.height = pad + 'px';
    document.getElementById('pad-bottom').style.height = pad + 'px';
  }
  setPads();
  window.addEventListener('resize', setPads);

  function highlight() {
    const top = scroll.scrollTop;
    const idx = Math.round(top / ITEM_H);
    const clamped = Math.max(0, Math.min(LANGS.length - 1, idx));
    document.querySelectorAll('.lang-item').forEach((el, i) => {
      el.classList.toggle('hi', i === clamped);
      el.setAttribute('aria-selected', i === clamped ? 'true' : 'false');
    });
    L = LANGS[clamped];
    document.getElementById('p1-header-text').textContent = L.hdr;
    const arrow = document.getElementById('arrow-btn');
    arrow.classList.add('show');
    arrow.setAttribute('aria-label', L.aNext);
  }

  scroll.addEventListener('scroll', highlight, { passive: true });

  // ── KEYBOARD NAVIGATION (global) ──
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    // When a button/link/field has focus, let it handle Enter/Space natively
    // (otherwise Enter on a focused back button would navigate forward).
    const interactive = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);

    // ── Backspace / Escape → go back ──
    if (key === 'Backspace' || key === 'Escape') {
      // Don't intercept if user is typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
      if (cur === 'page2') goTo('page1');
      else if (cur === 'page3') goTo('page2');
      else if (cur === 'page4') goTo('page3');
      else if (cur === 'page5') goTo('page3');
      else if (cur === 'page6') goTo('page5');
      return;
    }

    // ── Page 1: language picker ──
    if (cur === 'page1') {
      if (key === 'ArrowUp' || key === 'ArrowLeft') {
        e.preventDefault();
        pickerTouched = true;
        const idx = Math.round(scroll.scrollTop / ITEM_H);
        const target = Math.max(0, idx - 1);
        scroll.scrollTo({ top: target * ITEM_H, behavior: 'smooth' });
      } else if (key === 'ArrowDown' || key === 'ArrowRight') {
        e.preventDefault();
        pickerTouched = true;
        const idx = Math.round(scroll.scrollTop / ITEM_H);
        const target = Math.min(LANGS.length - 1, idx + 1);
        scroll.scrollTo({ top: target * ITEM_H, behavior: 'smooth' });
      } else if ((key === 'Enter' || key === ' ') && !interactive) {
        e.preventDefault();
        goTo('page2');
      }
      return;
    }

    // ── Page 2: about us ──
    if (cur === 'page2') {
      if (((key === 'Enter' || key === ' ') && !interactive) || key === 'ArrowRight' || key === 'ArrowDown') {
        e.preventDefault();
        goTo('page3');
      }
      return;
    }

    // ── Page 3: issue selector ──
    if (cur === 'page3') {
      // Number keys 1-9,0 to pick issue quickly
      const num = parseInt(key);
      if (!isNaN(num)) {
        const idx = num === 0 ? 9 : num - 1;
        if (idx < L.iss.length) {
          e.preventDefault();
          pickIssue(L.iss[idx], idx);
        }
        return;
      }
      // Arrow keys scroll the issue list naturally
      return;
    }

    // ── Page 4: custom input ──
    if (cur === 'page4') {
      if (key === 'Enter' && !e.shiftKey && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        submitOther();
      }
      return;
    }

    // ── Page 5: gospel ──
    if (cur === 'page5') {
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        // Arrows scroll the message instead of leaving the page
        e.preventDefault();
        document.getElementById('p5-body').scrollBy({ top: key === 'ArrowDown' ? 160 : -160, behavior: 'smooth' });
      } else if (((key === 'Enter' || key === ' ') && !interactive) || key === 'ArrowRight') {
        e.preventDefault();
        // A second quick Enter right after submitting an issue must not skip
        // past the gospel while it is still loading
        if (document.getElementById('p5-loading').style.display !== 'none') return;
        goTo('page6');
      }
      return;
    }

    // ── Page 6: contact ──
    if (cur === 'page6') {
      if (key === 'Enter' && !interactive) {
        e.preventDefault();
        submitContact();
      }
      return;
    }
  });

  function scrollToLang(idx) {
    setPads();
    scroll.scrollTop = idx * ITEM_H;
    highlight();
  }

  // Append a new dynamic language at the end of the list. Appending keeps every
  // existing index stable — no map reshuffling, no DOM rebuild under the
  // user's finger.
  function injectLang(entry) {
    LANGS.push(entry);
    LANG_CODE_MAP[entry.code] = LANGS.length - 1;
    addLangItem(entry, LANGS.length - 1);
    setPads();
  }

  // Once the visitor starts driving the picker themselves, late async results
  // (translation, geo) may still add languages but must not move the wheel.
  let pickerTouched = false;
  ['pointerdown', 'wheel', 'touchstart'].forEach(ev =>
    scroll.addEventListener(ev, () => { pickerTouched = true; }, { passive: true })
  );
  const mayAutoScroll = () => cur === 'page1' && !pickerTouched;

  // Detect language: phone first, then geo, then dynamic translation
  requestAnimationFrame(async () => {
    const detected = detectLangIndex();

    if (!detected.miss) {
      // Supported language found
      scrollToLang(detected.idx >= 0 ? detected.idx : 1);
      return;
    }

    // Unsupported language — start on English while we load
    scrollToLang(1);
    const missCode = detected.code;

    // Try loading dynamic translation
    const translated = await loadDynamicLang(missCode);
    if (translated) {
      const entry = buildLangEntry(missCode, translated);
      injectLang(entry);
      if (mayAutoScroll()) scrollToLang(LANGS.length - 1);
      return;
    }

    // If translation failed, try geo fallback for a supported lang
    const geoCode = await detectCountryLangCode();
    if (geoCode && geoCode in LANG_CODE_MAP && mayAutoScroll()) {
      scrollToLang(LANG_CODE_MAP[geoCode]);
    }
  });
})();

// ═══════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════
// Virtual analytics path for a page, e.g. /s/de/gospel/anxiety
function stepPath(pageId) {
  const lang = L.code;
  switch (pageId) {
    case 'page2': return `/s/${lang}/about`;
    case 'page3': return `/s/${lang}/issues`;
    case 'page4': return `/s/${lang}/write`;
    case 'page5': return `/s/${lang}/gospel/${(!fromOther && issueKey) ? issueKey : 'custom'}`;
    case 'page6': return `/s/${lang}/contact`;
    default: return '/';
  }
}

// First forward arrival per step fires one funnel event (revisits via the
// back button or in-app back navigation don't inflate the numbers)
const visitedSteps = new Set();

function goTo(pageId, fromHistory) {
  if (pageId === cur) return;
  const prev = document.getElementById(cur);
  const next = document.getElementById(pageId);
  if (!prev || !next) return;

  prev.classList.add('exit');
  prev.classList.remove('active');
  setTimeout(() => prev.classList.remove('exit'), 280);

  // Re-entering a page within its 280ms exit fade must not leave it invisible
  next.classList.remove('exit');
  next.classList.add('active');
  cur = pageId;

  // Record the step: the analytics script counts history navigations as
  // pageviews, and the browser back button now walks the flow instead of
  // leaving the site
  if (!fromHistory) {
    try { history.pushState({ page: pageId }, '', stepPath(pageId)); } catch (e) {}
    if (!visitedSteps.has(pageId)) {
      visitedSteps.add(pageId);
      if (pageId === 'page2') track('language_selected', { lang: L.code });
      if (pageId === 'page6') track('learn_more', { lang: L.code });
    }
  }

  // Apply RTL/LTR
  document.documentElement.setAttribute('dir', L.dir);
  document.documentElement.setAttribute('lang', L.code);

  // Localise the back button's accessible name
  next.querySelectorAll('.back-btn').forEach(b => b.setAttribute('aria-label', L.aBack));

  // Fill page content
  if (pageId === 'page2') fillP2();
  if (pageId === 'page3') fillP3();
  if (pageId === 'page4') fillP4();
  if (pageId === 'page5') fillP5Header(false);
  if (pageId === 'page6') fillP6();

  // Move focus to the new page's heading so screen readers announce the change
  const target = next.querySelector('.pg-focus');
  if (target) requestAnimationFrame(() => target.focus({ preventScroll: true }));
}

// Browser back/forward (incl. swipe gestures) moves through the visited steps
window.addEventListener('popstate', (e) => {
  const target = (e.state && e.state.page) || 'page1';
  if (target !== cur) goTo(target, true);
});

// ═══════════════════════════════════════════════════════
// PAGE FILLERS
// ═══════════════════════════════════════════════════════
function set(id, txt, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = txt;
  if (dir) el.setAttribute('dir', dir);
}

function fillP2() {
  set('p2-title', L.ti, L.dir);
  const el = document.getElementById('p2-text');
  const sentences = L.body.split('!');
  if (sentences.length > 1) {
    el.innerHTML = '';
    el.setAttribute('dir', L.dir);
    const s1 = document.createElement('span');
    s1.textContent = sentences[0] + '!';
    el.appendChild(s1);
    el.appendChild(document.createElement('br'));
    el.appendChild(document.createElement('br'));
    const s2 = document.createElement('span');
    s2.textContent = sentences.slice(1).join('!').trim();
    el.appendChild(s2);
  } else {
    set('p2-text', L.body, L.dir);
  }
  set('p2-cta', L.cta);
}

function fillP3() {
  set('p3-title', L.qTi, L.dir);
  const list = document.getElementById('p3-list');
  list.setAttribute('dir', L.dir);
  list.innerHTML = '';

  L.iss.forEach((iss, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'issue-btn';
    btn.textContent = iss;
    btn.onclick = () => pickIssue(iss, idx);
    list.appendChild(btn);
  });

  const other = document.createElement('button');
  other.type = 'button';
  other.className = 'issue-btn other-opt';
  other.textContent = L.otl;
  other.onclick = () => { fromOther = true; goTo('page4'); };
  list.appendChild(other);
}

function fillP4() {
  set('p4-title', L.t4, L.dir);
  set('p4-sub', L.s4, L.dir);
  const ta = document.getElementById('p4-input');
  ta.placeholder = L.ph4;
  ta.setAttribute('dir', L.dir);
  ta.value = '';
  set('p4-cta', L.b4);
}

function fillP5Header(reset) {
  set('p5-loading-txt', L.ldg);
  document.getElementById('learn-btn').textContent = L.lmr;
  if (reset) {
    document.getElementById('p5-loading').style.display = 'flex';
    document.getElementById('gospel-wrap').style.display = 'none';
    document.getElementById('learn-btn').style.display = 'none';
    document.getElementById('gospel-opening').textContent = '';
    document.getElementById('gospel-body').innerHTML = '';
  }
}

function fillP6() {
  set('p6-title', L.t6, L.dir);
  const subEl = document.getElementById('p6-sub');
  subEl.setAttribute('dir', L.dir);
  // Split on first period+space to add a line break between sentences
  // (built with DOM nodes — dynamic-language strings must never be parsed as HTML)
  const s6 = L.s6;
  const dotIdx = s6.indexOf('. ');
  subEl.textContent = '';
  if (dotIdx > 0) {
    subEl.append(s6.slice(0, dotIdx + 1), document.createElement('br'), s6.slice(dotIdx + 2));
  } else {
    subEl.textContent = s6;
  }
  set('lbl-name', L.ln);
  set('lbl-email', L.le);
  set('lbl-phone', L.lp);
  document.getElementById('p6-cta').textContent = L.sb;
  set('skip-link', L.sk);
  // Consent checkbox
  const consentLabel = document.getElementById('consent-label');
  const privacyLinkText = L.privacyLink || 'Privacy Policy';
  consentLabel.textContent = L.consentLabel || LANG_EN.consentLabel;
  consentLabel.setAttribute('dir', L.dir);
  const consentErrEl = document.getElementById('consent-error');
  consentErrEl.textContent = L.consentError || LANG_EN.consentError;
  consentErrEl.setAttribute('dir', L.dir);
  document.getElementById('f-consent').checked = false;
  consentErrEl.style.display = 'none';
  const formErrEl = document.getElementById('form-error');
  formErrEl.textContent = L.formErr || LANG_EN.formErr;
  formErrEl.setAttribute('dir', L.dir);
  formErrEl.style.display = 'none';
  // Privacy footer
  const footerLink = document.getElementById('p6-privacy-link');
  footerLink.textContent = privacyLinkText;
  footerLink.href = '/privacy?lang=' + encodeURIComponent(L.code);
  // Reset — but once a submission went out, returning to this page shows the
  // thank-you again instead of the form (prevents accidental double-sends)
  if (contactSent) {
    showTY(false);
  } else {
    document.getElementById('p6-form').style.display = 'block';
    document.getElementById('ty-wrap').style.display = 'none';
  }
}

// ═══════════════════════════════════════════════════════
// ISSUE SELECTION
// ═══════════════════════════════════════════════════════
function pickIssue(iss, idx) {
  issue = iss;
  issueKey = ISSUE_KEYS[idx] || '';
  fromOther = false;
  track('issue_selected', { lang: L.code, issue: issueKey || 'custom' });
  fillP5Header(true);
  goTo('page5');
  fetchGospel(++gospelSeq);
}

function submitOther() {
  const val = document.getElementById('p4-input').value.trim();
  if (!val) return;
  issue = val;
  fromOther = true;
  // PRIVACY: the typed text itself is never tracked
  track('issue_selected', { lang: L.code, issue: 'custom' });
  fillP5Header(true);
  goTo('page5');
  fetchGospel(++gospelSeq);
}

// ═══════════════════════════════════════════════════════
// GOSPEL FETCH
// ═══════════════════════════════════════════════════════
// Static texts exist only for the 14 built-in languages (exactly the OPENING keys).
// For anything else the SPA catch-all rewrite answers missing files with
// index.html and HTTP 200 — so a 200 alone is no proof of a gospel text.
function hasStaticTexts(code) {
  return Object.prototype.hasOwnProperty.call(OPENING, code);
}
function looksLikeGospel(html) {
  return html.trim().toLowerCase().startsWith('<p');
}

// Generation counter: a new pick invalidates any still-pending fetch, so a slow
// earlier response can never overwrite the gospel the user actually asked for.
let gospelSeq = 0;

async function fetchGospel(seq) {
  const fresh = () => seq === gospelSeq;

  // For preset issues in built-in languages, try static text first
  if (!fromOther && issueKey && hasStaticTexts(L.code)) {
    try {
      const res = await fetch(`/texts/${L.code}/${issueKey}.htm`);
      if (res.ok) {
        const html = await res.text();
        if (looksLikeGospel(html)) {
          if (!fresh()) return;
          renderGospelHTML(html);
          return;
        }
      }
    } catch (e) { /* fall through to API */ }
  }

  // Fall back to API — send only lang code + issue text (prompt built server-side)
  try {
    const res = await fetch('/api/gospel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: L.code, issue: issue })
    });
    if (!res.ok) throw new Error('API error ' + res.status);
    const data = await res.json();
    const cleaned = data.cleanIssue || issue;

    // If the cleaned issue matches one of our 14 preset issues, use static text instead
    const matchIdx = L.iss.findIndex(
      name => name.toLowerCase() === cleaned.toLowerCase()
    );
    if (matchIdx !== -1 && ISSUE_KEYS[matchIdx] && hasStaticTexts(L.code)) {
      try {
        const sRes = await fetch(`/texts/${L.code}/${ISSUE_KEYS[matchIdx]}.htm`);
        if (sRes.ok) {
          const sHtml = await sRes.text();
          if (looksLikeGospel(sHtml)) {
            if (!fresh()) return;
            renderGospelHTML(sHtml);
            return;
          }
        }
      } catch (e2) { /* fall through to API text */ }
    }

    if (!fresh()) return;
    renderGospel(data.text, cleaned);
  } catch (e) {
    if (!fresh()) return;
    renderGospel(fallback(), issue);
  }
}

function renderGospelHTML(html) {
  // Static text is already HTML — first <p> is the opening, rest is the body
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const paragraphs = Array.from(tmp.querySelectorAll('p'));
  const d = L.dir;

  if (paragraphs.length > 0) {
    const opening = paragraphs[0];
    opening.setAttribute('dir', d);
    document.getElementById('gospel-opening').innerHTML = opening.innerHTML;
    document.getElementById('gospel-opening').setAttribute('dir', d);

    const bodyEl = document.getElementById('gospel-body');
    bodyEl.innerHTML = '';
    paragraphs.slice(1).forEach(p => {
      p.setAttribute('dir', d);
      bodyEl.appendChild(p);
    });
  }

  document.getElementById('p5-loading').style.display = 'none';
  document.getElementById('gospel-wrap').style.display = 'block';
  document.getElementById('learn-btn').style.display = 'block';
}

function renderGospel(text, displayIssue) {
  // The API writes the "DNA" opening itself, in the right language and with correct
  // grammar around the issue noun. Keep it as the styled opening when present;
  // only fall back to our per-language template when it's missing (e.g. offline fallback).
  let stripped = text.trim();
  let opening = '';
  const head = stripped.slice(0, 300);
  // "DNA" covers most languages; "ADN" Portuguese/French/Spanish; "ДНК" Russian; "النووي" Arabic
  if (head.indexOf('DNA') !== -1 || head.indexOf('ADN') !== -1 || head.indexOf('ДНК') !== -1 || head.indexOf('النووي') !== -1) {
    // The opening is the first two sentences (DNA sentence + root-cause sentence)
    let dots = 0;
    for (let i = 0; i < stripped.length && i < 500; i++) {
      const c = stripped[i];
      if (c === '.' || c === '。' || c === '।' || c === '۔') {
        dots++;
        if (dots === 2) {
          opening = stripped.slice(0, i + 1).trim();
          stripped = stripped.slice(i + 1).trim();
          break;
        }
      }
    }
  }
  if (!opening) opening = buildOpening(L.code, displayIssue);
  const paragraphs = stripped.split(/\n\n+/);

  const d = L.dir;
  document.getElementById('gospel-opening').textContent = opening;
  document.getElementById('gospel-opening').setAttribute('dir', d);
  const bodyEl = document.getElementById('gospel-body');
  bodyEl.innerHTML = '';
  paragraphs.forEach(p => {
    const el = document.createElement('p');
    el.setAttribute('dir', d);
    el.textContent = p.trim();
    bodyEl.appendChild(el);
  });

  document.getElementById('p5-loading').style.display = 'none';
  document.getElementById('gospel-wrap').style.display = 'block';
  document.getElementById('learn-btn').style.display = 'block';
}

function fallback() {
  return (
    `From the very beginning, human beings were made for a deep relationship of love and trust with their Creator. But we turned away — seeking to define life on our own terms. That fracture is the hidden root beneath every form of human suffering, including ${issue}.\n\n` +
    `Yet the great news is this: God did not abandon us to our brokenness. In Jesus Christ, God himself entered our world. He lived among us, suffered alongside us, and ultimately bore the full weight of human failure and pain on the cross.\n\n` +
    `The resurrection declares that death and brokenness do not have the final word. The same power that raised Jesus is available to you — not as a technique or a self-improvement programme, but as a living relationship.\n\n` +
    `To receive this gospel is to discover that you are fully known — every darkness, every wound, every hidden shame — and yet fully and unconditionally loved. This is not sentimentality. It is the only healing that reaches all the way to the root of ${issue}.\n\n` +
    `You don't have to carry this alone.`
  );
}

// ═══════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════
function submitContact() {
  if (contactSent) return;
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const hp = document.getElementById('f-hp').value;

  // Require at least one of name/email — show a gentle inline error rather than failing silently
  const formErr = document.getElementById('form-error');
  if (!name && !email) {
    formErr.textContent = L.formErr || LANG_EN.formErr;
    formErr.style.display = 'block';
    document.getElementById('f-name').focus();
    return;
  }
  // Catch email typos here — the submit below is fire-and-forget, so a server-side
  // rejection would silently lose the submission
  if (email && !EMAIL_RE.test(email)) {
    formErr.textContent = L.emailErr || LANG_EN.emailErr;
    formErr.style.display = 'block';
    document.getElementById('f-email').focus();
    return;
  }
  formErr.style.display = 'none';

  // Check consent
  const consentBox = document.getElementById('f-consent');
  const consentErr = document.getElementById('consent-error');
  if (!consentBox.checked) {
    consentErr.style.display = 'block';
    return;
  }
  consentErr.style.display = 'none';

  const consentedAt = new Date().toISOString();

  // Send to API (fire-and-forget — don't block the thank-you).
  // keepalive lets the request complete even if the tab closes right away.
  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({ name, email, phone, lang: L.code, issue, consentedAt, hp_field: hp })
  }).catch(() => {});

  contactSent = true;
  track('contact_submitted', { lang: L.code, issue: (!fromOther && issueKey) ? issueKey : 'custom' });
  try { history.pushState({ page: 'page6' }, '', `/s/${L.code}/thanks`); } catch (e) {}
  showTY(false);
}

function showTY(skipped) {
  document.getElementById('p6-form').style.display = 'none';
  document.getElementById('ty-wrap').style.display = 'flex';
  set('ty-title', L.tyT);
  set('ty-sub', skipped ? L.tySkip : L.tyS, L.dir);

  // Lead action: read the Bible online (always available, every language)
  const bibleBtn = document.getElementById('bible-btn');
  bibleBtn.href = BIBLE_ONLINE_URL;
  bibleBtn.style.display = 'inline-flex';
  document.getElementById('bible-btn-text').textContent = L.bibleBtn || LANG_EN.bibleBtn;

  // Extra: free printed Bible when a vetted partner exists for the visitor's country
  const printedBtn = document.getElementById('printed-btn');
  printedBtn.style.display = 'none';
  getCountry().then(country => {
    if (Object.prototype.hasOwnProperty.call(PRINTED_BIBLE_OFFERS, country)) {
      printedBtn.href = PRINTED_BIBLE_OFFERS[country];
      printedBtn.textContent = L.printedBtn || LANG_EN.printedBtn;
      printedBtn.style.display = 'inline-block';
    }
  });

  // Show share button if Web Share API is available
  if (navigator.share) {
    const btn = document.getElementById('share-btn');
    btn.style.display = 'inline-flex';
    document.getElementById('share-btn-text').textContent = L.share || LANG_EN.share;
  }

  const title = document.getElementById('ty-title');
  requestAnimationFrame(() => title.focus({ preventScroll: true }));
}

function shareLink() {
  track('shared', { lang: L.code });
  navigator.share({
    title: 'Good News',
    text: L.body,
    url: 'https://www.qr-gospel.com'
  }).catch(() => {});
}

// ─────────────────────────────────────────────────────────
// CSP-safe event binding (replaces former inline onclick handlers)
// ─────────────────────────────────────────────────────────
document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-goto]");
  if (nav) { goTo(nav.getAttribute("data-goto")); return; }
  const act = e.target.closest("[data-action]");
  if (!act) return;
  const a = act.getAttribute("data-action");
  if (a === "submitOther") submitOther();
  else if (a === "shareLink") shareLink();
  else if (a === "skip") {
    track('contact_skipped', { lang: L.code });
    try { history.pushState({ page: 'page6' }, '', `/s/${L.code}/skipped`); } catch (e) {}
    showTY(true);
  }
});

// Real form semantics: native submit (Enter in a field, the submit button, the
// software keyboard's "Go") all funnel through one handler
document.getElementById('p6-form').addEventListener('submit', (e) => {
  e.preventDefault();
  submitContact();
});

// Outbound Bible links: count interest per language (fires before navigation;
// the links open in a new tab)
document.getElementById('bible-btn').addEventListener('click', () => {
  track('bible_link_clicked', { lang: L.code, kind: 'online' });
});
document.getElementById('printed-btn').addEventListener('click', () => {
  track('bible_link_clicked', { lang: L.code, kind: 'printed' });
});
