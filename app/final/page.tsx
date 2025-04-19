'use client';

import { useSearchParams } from 'next/navigation';

const openingTranslations = {
  ar: 'في قصة قديمة جدًا، هي جزء من دناك. القصة دي بتشرح سبب [issue] بتاعك.',
  en: 'There is a story so ancient, it is part of our DNA. That story explains the root cause of your [issue].',
  fr: 'Y’a une histoire si ancienne qu’elle fait partie de ton ADN. Cette histoire explique pourquoi t’as [issue].',
  de: 'Es gibt eine Geschichte, so alt, dass sie in deiner DNA steckt. Die Geschichte erklärt, warum du [issue] hast.',
  hi: 'एक कहानी है जो इतनी पुरानी है कि वो तेरे डीएनए का हिस्सा है। वो कहानी बताती है कि तेरे [issue] की जड़ क्या है।',
  it: 'C’è una storia così antica che è parte del tuo DNA. Quella storia spiega perché hai [issue].',
  ja: 'すげえ古い話があって、それはお前のDNAの一部なんだ。その話はお前の[issue]の原因を説明してるよ。',
  ko: '너무 오래된 이야기가 있어, 그건 너의 DNA 일부야. 그 이야기는 네 [issue]의 근본 원인을 설명해.',
  zh: '有个故事特别古老，它是你DNA的一部分。那故事解释了你[issue]的根源。',
  pt: 'Tem uma história tão antiga que tá no teu DNA. Essa história explica por que tu tens [issue].',
  ru: 'Есть история такая древняя, что она часть твоей ДНК. Эта история объясняет, почему у тебя [issue].',
  es: 'Hay una historia tan antigua que está en tu ADN. Esa historia explica por qué tienes [issue].',
  sw: 'Kuna hadithi ya zamani sana, ni sehemu ya DNA yako. Hadithi hiyo inaelezea sababu ya [issue] yako.',
};

const gospelMessages = {
  en: {
    fear: 'Fear grips you because you’ve lost trust in a world broken by sin. The gospel tells you Jesus conquered fear by facing death itself, offering you peace through His victory.',
    depression: 'Depression weighs heavy because you feel disconnected from your true purpose. The gospel reveals God’s love, restoring joy through a relationship with Him.',
    loneliness: 'Loneliness stings because you were made for connection. The gospel invites you into God’s family, where you’re never alone.',
    'lack of purpose': 'Without purpose, life feels empty. The gospel shows you were created for God’s glory, giving your life eternal meaning.',
    anxiety: 'Anxiety overwhelms you because you carry burdens alone. The gospel offers Jesus’ peace, who carries your worries and gives you rest.',
    guilt: 'Feelings of guilt weigh you down because you know you’ve messed up. The gospel offers forgiveness through Jesus’ sacrifice, wiping your slate clean and giving you freedom.',
    other: 'Whatever your struggle, the gospel offers hope through Jesus, who heals brokenness and restores life.',
  },
  ar: {
    fear: 'الخوف بيمسك فينا لأننا فقدنا الثقة في عالم مكسور بالخطية. الإنجيل بيقول إن يسوع انتصر على الخوف بمواجهة الموت نفسه، وبيقدم لك السلام من خلال انتصاره.',
    depression: 'الاكتئاب بيثقل علينا لأننا بنحس إننا مفصولين عن هدفنا الحقيقي. الإنجيل بيكشف محبة الله، وبيرجع الفرح من خلال علاقة معاه.',
    loneliness: 'الوحدة بتوجع لأننا اتخلقنا عشان نكون متصلين. الإنجيل بيدعيك لعيلة الله، اللي عمرك ما هتبقى فيها لوحدك.',
    'lack of purpose': 'من غير هدف، الحياة بتحس زي الفاضي. الإنجيل بيوريك إنك اتخلقت لمجد الله، وبيدي لحياتك معنى أبدي.',
    anxiety: 'القلق بيغلبنا لأننا بنشيل همومنا لوحدنا. الإنجيل بيقدم سلام يسوع، اللي بيشيل همومك وبيديك راحة.',
    guilt: 'شعور بالذنب بيثقل عليك لأنك عارف إنك أخطأت. الإنجيل بيقدم الغفران من خلال تضحية يسوع، بيمسح ذنوبك ويديك حرية.',
    other: 'مهما كانت مشكلتك، الإنجيل بيقدم أمل من خلال يسوع، اللي بيشفي الكسر ويجدد الحياة.',
  },
  fr: {
    fear: 'La peur nous tient parce qu’on a perdu confiance en un monde brisé par le péché. L’Évangile dit que Jésus a vaincu la peur en affrontant la mort, t’offrant la paix par sa victoire.',
    depression: 'La dépression pèse lourd parce qu’on se sent déconnecté de notre vrai but. L’Évangile révèle l’amour de Dieu, qui restaure la joie par une relation avec Lui.',
    loneliness: 'La solitude fait mal parce qu’on est fait pour la connexion. L’Évangile t’invite dans la famille de Dieu, où t’es jamais seul.',
    'lack of purpose': 'Sans but, la vie semble vide. L’Évangile te montre que t’es créé pour la gloire de Dieu, donnant un sens éternel à ta vie.',
    anxiety: 'L’anxiété nous submerge parce qu’on porte nos fardeaux seuls. L’Évangile t’offre la paix de Jésus, qui porte tes soucis et te donne du repos.',
    guilt: 'Les sentiments de culpabilité te pèsent parce que tu sais que t’as foiré. L’Évangile t’offre le pardon par le sacrifice de Jésus, effaçant ton ardoise et te donnant la liberté.',
    other: 'Peu importe ton problème, l’Évangile offre de l’espoir par Jésus, qui guérit les cœurs brisés et restaure la vie.',
  },
  de: {
    fear: 'Angst packt uns, weil wir das Vertrauen in eine von Sünde zerbrochene Welt verloren haben. Das Evangelium sagt, dass Jesus die Angst besiegte, indem er dem Tod selbst begegnete, und dir Frieden durch seinen Sieg schenkt.',
    depression: 'Depression lastet schwer, weil wir uns von unserem wahren Sinn entfremdet fühlen. Das Evangelium zeigt Gottes Liebe, die Freude durch eine Beziehung mit ihm zurückbringt.',
    loneliness: 'Einsamkeit tut weh, weil wir für Gemeinschaft geschaffen sind. Das Evangelium lädt dich in Gottes Familie ein, wo du nie allein bist.',
    'lack of purpose': 'Ohne Sinn fühlt sich das Leben leer an. Das Evangelium zeigt, dass du für Gottes Herrlichkeit geschaffen bist, was deinem Leben ewigen Sinn gibt.',
    anxiety: 'Unruhe überwältigt uns, weil wir unsere Lasten allein tragen. Das Evangelium bietet den Frieden Jesu, der deine Sorgen trägt und dir Ruhe schenkt.',
    guilt: 'Schuldgefühle drücken dich, weil du weißt, dass du Mist gebaut hast. Das Evangelium bietet Vergebung durch Jesu Opfer, wischt deine Tafel sauber und gibt dir Freiheit.',
    other: 'Egal, welches Problem du hast, das Evangelium bietet Hoffnung durch Jesus, der Zerbrochenes heilt und das Leben wiederherstellt.',
  },
  hi: {
    fear: 'डर हमें जकड़ लेता है क्योंकि हमने एक पाप से टूटी दुनिया में भरोसा खो दिया है। सुसमाचार कहता है कि यीशु ने मृत्यु का सामना करके डर पर विजय पाई, और तुझे अपने विजय के माध्यम से शांति देता है।',
    depression: 'उदासी भारी पड़ती है क्योंकि हम अपने असली मकसद से कटे हुए महसूस करते हैं। सुसमाचार परमेश्वर के प्रेम को प्रकट करता है, जो उसके साथ रिश्ते से खुशी लौटाता है।',
    loneliness: 'अकेलापन चुभता है क्योंकि हम रिश्तों के लिए बने हैं। सुसमाचार तुझे परमेश्वर के परिवार में बुलाता है, जहाँ तू कभी अकेला नहीं है।',
    'lack of purpose': 'बिना मकसद के जिंदगी खाली लगती है। सुसमाचार दिखाता है कि तू परमेश्वर की महिमा के लिए बना है, जो तेरी जिंदगी को अनंत अर्थ देता है।',
    anxiety: 'चिंता हावी हो जाती है क्योंकि हम बोझ अकेले उठाते हैं। सुसमाचार यीशु की शांति देता है, जो तेरे चिंताओं को उठाता है और तुझे आराम देता है।',
    guilt: 'अपराध बोध तुझे भारी करता है क्योंकि तू जानता है कि तूने गड़बड़ की। सुसमाचार यीशु के बलिदान के माध्यम से माफी देता है, तेरी स्लेट साफ करता है और तुझे आजादी देता है।',
    other: 'चाहे तेरी कोई भी परेशानी हो, सुसमाचार यीशु के माध्यम से आशा देता है, जो टूटेपन को ठीक करता है और जिंदगी को बहाल करता है।',
  },
  it: {
    fear: 'La paura ci blocca perché abbiamo perso fiducia in un mondo rotto dal peccato. Il Vangelo dice che Gesù ha sconfitto la paura affrontando la morte stessa, offrendoti pace con la sua vittoria.',
    depression: 'La depressione pesa perché ci sentiamo scollegati dal nostro vero scopo. Il Vangelo rivela l’amore di Dio, che riporta gioia attraverso un rapporto con Lui.',
    loneliness: 'La solitudine fa male perché siamo fatti per la connessione. Il Vangelo ti invita nella famiglia di Dio, dove non sei mai solo.',
    'lack of purpose': 'Senza uno scopo, la vita sembra vuota. Il Vangelo ti mostra che sei stato creato per la gloria di Dio, dando alla tua vita un significato eterno.',
    anxiety: 'L’ansia ci travolge perché portiamo i nostri fardelli da soli. Il Vangelo offre la pace di Gesù, che porta le tue preoccupazioni e ti dà riposo.',
    guilt: 'I sensi di colpa ti pesano perché sai di aver combinato un casino. Il Vangelo offre il perdono attraverso il sacrificio di Gesù, cancellando i tuoi errori e dandoti libertà.',
    other: 'Qualsiasi sia il tuo problema, il Vangelo offre speranza attraverso Gesù, che guarisce ciò che è rotto e restaura la vita.',
  },
  ja: {
    fear: '恐怖は、罪で壊れた世界への信頼を失ったからお前をつかむ。福音は、イエスが死そのものに立ち向かって恐怖を打ち負かし、彼の勝利を通して平和をお前にくれるって教えてくれるよ。',
    depression: 'うつは、本当の目的から切り離されてる気がするから重くのしかかる。福音は神の愛を明らかにして、彼との関係で喜びを取り戻してくれる。',
    loneliness: '孤独は、俺たちがつながり合うために作られたから刺さる。福音はお前を神の家族に招いて、決して一人じゃないって教えてくれる。',
    'lack of purpose': '目的がないと、人生は空っぽに感じる。福音はお前が神の栄光のために作られたって示して、人生に永遠の意味を与えてくれる。',
    anxiety: '不安は、一人で重荷を背負ってるから押しつぶす。福音はイエスの平和をお前にくれて、悩みを背負って休息を与えてくれる。',
    guilt: '罪悪感はお前がやらかしたって知ってるから重くのしかかる。福音はイエスの犠牲で赦しをくれて、過去を清算して自由をお前にくれる。',
    other: 'どんな悩みでも、福音はイエスを通して希望をくれて、壊れたものを癒し、人生を新しくしてくれる。',
  },
  ko: {
    fear: '두려움은 죄로 망가진 세상에 대한 신뢰를 잃었기 때문에 널 붙잡아. 복음은 예수님이 죽음 자체를 맞서 두려움을 이겼다고 말하며, 그의 승리를 통해 너에게 평화를 줘.',
    depression: '우울증은 우리가 진짜 목적에서 단절된 것처럼 느껴지니까 무겁게 짓눌러. 복음은 하나님의 사랑을 보여주며, 그와의 관계를 통해 기쁨을 되찾게 해.',
    loneliness: '외로움은 우리가 연결되기 위해 만들어졌기 때문에 아파. 복음은 널 하나님의 가족으로 초대해서 절대 혼자가 아니게 해.',
    'lack of purpose': '목적이 없으면 인생이 공허하게 느껴져. 복음은 네가 하나님의 영광을 위해 만들어졌다고 보여주며, 인생에 영원한 의미를 줘.',
    anxiety: '불안은 혼자 짐을 지고 있기 때문에 널 압도해. 복음은 예수님의 평화를 주며, 네 걱정을 지고 쉴 곳을 줘.',
    guilt: '죄책감은 네가 실수했다는 걸 알기 때문에 널 짓눌러. 복음은 예수님의 희생으로 용서를 주며, 네 기록을 깨끗이 하고 자유를 줘.',
    other: '네가 어떤 고난을 겪든, 복음은 예수님을 통해 희망을 주며, 망가진 것을 치유하고 삶을 회복시켜.',
  },
  zh: {
    fear: '恐惧抓住你，因为我们对一个被罪破坏的世界的信任失去了。福音说耶稣通过直面死亡征服了恐惧，通过他的胜利给你平安。',
    depression: '抑郁沉重，因为我们感觉与真正的目标脱节了。福音揭示了神的爱，通过与他的关系恢复喜乐。',
    loneliness: '孤独刺痛，因为我们是为连接而生的。福音邀请你加入神的家庭，在那里你永远不孤单。',
    'lack of purpose': '没有目标，生活感觉空虚。福音告诉你，你是为神的荣耀而造，赋予你生命永恒的意义。',
    anxiety: '焦虑压倒你，因为我们独自承担重担。福音提供耶稣的平安，他替你承担忧虑，给你休息。',
    guilt: '内疚感让你沉重，因为你知道自己搞砸了。福音通过耶稣的牺牲提供宽恕，擦净你的记录，给你自由。',
    other: '不管你有什么困扰，福音通过耶稣提供希望，治愈破碎，恢复生命。',
  },
  pt: {
    fear: 'O medo te pega porque perdemos a confiança num mundo quebrado pelo pecado. O Evangelho diz que Jesus venceu o medo enfrentando a morte, te oferecendo paz pela vitória dele.',
    depression: 'A depressão pesa porque nos sentimos desconectados do nosso verdadeiro propósito. O Evangelho revela o amor de Deus, trazendo alegria de volta por um relacionamento com Ele.',
    loneliness: 'A solidão dói porque fomos feitos pra conexão. O Evangelho te convida pra família de Deus, onde nunca tá sozinho.',
    'lack of purpose': 'Sem propósito, a vida parece vazia. O Evangelho mostra que tu foi criado pra glória de Deus, dando um sentido eterno à tua vida.',
    anxiety: 'A ansiedade te esmaga porque carregamos fardos sozinhos. O Evangelho oferece a paz de Jesus, que carrega tuas preocupações e te dá descanso.',
    guilt: 'Sentimentos de culpa te pesam porque tu sabe que meteu os pés pelas mãos. O Evangelho oferece perdão pelo sacrifício de Jesus, limpando tua ficha e te dando liberdade.',
    other: 'Seja qual for teu problema, o Evangelho oferece esperança por Jesus, que cura o que tá quebrado e restaura a vida.',
  },
  ru: {
    fear: 'Страх хватает тебя, потому что мы потеряли доверие к миру, сломанному грехом. Евангелие говорит, что Иисус победил страх, столкнувшись со смертью, и дает тебе мир через свою победу.',
    depression: 'Депрессия давит, потому что мы чувствуем себя оторванными от настоящей цели. Евангелие открывает любовь Бога, возвращая радость через отношения с Ним.',
    loneliness: 'Одиночество ранит, потому что мы созданы для связи. Евангелие зовет тебя в семью Бога, где ты никогда не один.',
    'lack of purpose': 'Без цели жизнь кажется пустой. Евангелие показывает, что ты создан для славы Бога, давая твоей жизни вечный смысл.',
    anxiety: 'Тревога переполняет, потому что мы несем бремя в одиночку. Евангелие предлагает мир Иисуса, который берет твои заботы и дает покой.',
    guilt: 'Чувство вины давит на тебя, потому что ты знаешь, что накосячил. Евангелие предлагает прощение через жертву Иисуса, очищая твою совесть и давая свободу.',
    other: 'Какая бы у тебя ни была проблема, Евангелие дает надежду через Иисуса, который исцеляет сломленное и восстанавливает жизнь.',
  },
  es: {
    fear: 'El miedo te atrapa porque hemos perdido la confianza en un mundo roto por el pecado. El Evangelio dice que Jesús venció el miedo enfrentando la muerte misma, ofreciéndote paz por su victoria.',
    depression: 'La depresión pesa porque nos sentimos desconectados de nuestro verdadero propósito. El Evangelio revela el amor de Dios, restaurando la alegría por una relación con Él.',
    loneliness: 'La soledad duele porque estamos hechos para la conexión. El Evangelio te invita a la familia de Dios, donde nunca estás solo.',
    'lack of purpose': 'Sin propósito, la vida se siente vacía. El Evangelio te muestra que fuiste creado para la gloria de Dios, dándole un sentido eterno a tu vida.',
    anxiety: 'La ansiedad te abruma porque cargamos nuestras cargas solos. El Evangelio ofrece la paz de Jesús, que lleva tus preocupaciones y te da descanso.',
    guilt: 'Los sentimientos de culpa te pesan porque sabes que la has cagado. El Evangelio ofrece perdón por el sacrificio de Jesús, limpiando tu historial y dándote libertad.',
    other: 'Sea cual sea tu problema, el Evangelio ofrece esperanza por Jesús, que sana lo roto y restaura la vida.',
  },
  sw: {
    fear: 'Hofu inakushika kwa sababu tumepoteza imani katika dunia iliyovunjika na dhambi. Injili inasema Yesu alishinda hofu kwa kukabiliana na kifo chenyewe, akakupa amani kupitia ushindi wake.',
    depression: 'Unasumbufu unalemea kwa sababu tunahisi tumekatwa na kusudi letu la kweli. Injili inaonyesha upendo wa Mungu, ukirudisha furaha kupitia uhusiano naye.',
    loneliness: 'Upweke unauma kwa sababu tuliumbwa kwa ajili ya kuungana. Injili inakualika katika familia ya Mungu, ambapo huwezi kuwa peke yako.',
    'lack of purpose': 'Bila kusudi, maisha yanahisi kuwa tupu. Injili inakuonyesha uliumbwa kwa ajili ya utukufu wa Mungu, ikikupa maisha yako maana ya milele.',
    anxiety: 'Wasiwasi unakulemea kwa sababu unabeba mizigo peke yako. Injili inakupa amani ya Yesu, ambaye anabeba wasiwasi wako na kukupa raha.',
    guilt: 'Hisia za hatia zinakulemea kwa sababu unajua umeharibu. Injili inakupa msamaha kupitia sadaka ya Yesu, ikifuta rekodi yako na kukupa uhuru.',
    other: 'Chochote kinachokusumbua, Injili inakupa tumaini kupitia Yesu, ambaye huponya yaliyovunjika na kurudisha maisha.',
  },
};

export default function Final() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const issue = searchParams.get('issue')?.toLowerCase() || 'fear';

  // Map translated issue names to the base key 'guilt'
  const issueKeyMap: { [key: string]: string } = {
    'شعور بالذنب': 'guilt',
    'feelings of guilt': 'guilt',
    'sentiments de culpabilité': 'guilt',
    schuldgefühle: 'guilt',
    'अपराध बोध': 'guilt',
    'sensi di colpa': 'guilt',
    罪悪感: 'guilt',
    죄책감: 'guilt',
    内疚感: 'guilt',
    'sentimentos de culpa': 'guilt',
    'чувство вины': 'guilt',
    'sentimientos de culpa': 'guilt',
    'hisia za hatia': 'guilt',
  };

  const normalizedIssue = issueKeyMap[issue] || issue;

  const opening = openingTranslations[lang as keyof typeof openingTranslations]?.replace('[issue]', issue) || openingTranslations.en.replace('[issue]', issue);
  const messages = gospelMessages[lang as keyof typeof gospelMessages] || gospelMessages.en;
  const message = messages[normalizedIssue as keyof typeof messages] || messages.other;

  return (
    <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
      <p className="text-lg text-center">
        {opening}
        {' '}
        {message}
      </p>
    </div>
  );
}
