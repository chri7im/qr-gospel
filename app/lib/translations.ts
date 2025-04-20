export type Language = 'Arabic' | 'English' | 'French' | 'German' | 'Hindi' | 'Italian' | 'Japanese' | 'Korean' | 'Mandarin' | 'Portuguese' | 'Russian' | 'Spanish' | 'Swahili';

type Translation = {
  [key in Language]: string;
};

type ConcernTranslation = {
  [key: string]: Translation;
};

type Messages = {
  about: Translation;
  questionnaireTitle: Translation;
  questionnaireOptions: Translation[];
  otherPrompt: Translation;
  finalOpening: Translation;
  concerns: ConcernTranslation;
  chooseLanguagePrompt: Translation;
};

export const messages: Messages = {
  about: {
    Arabic: 'عنّا: مهمتنا الوحيدة في هالعالم هي نشر أحلى خبر سمعته الدنيا! الحب، الأمل، الهدف—كلها لك!',
    English: 'About us: Our only mission in this world is to spread the greatest news this world has ever heard! '
             + 'Love, Hope, Purpose—all are up for grabs—for you!',
    French: 'À propos de nous : Notre seule mission dans ce monde, c’est de partager la meilleure nouvelle '
            + 'que t’as jamais entendue ! Amour, espoir, but—tout ça est à toi !',
    German: 'Über uns: Unsere einzige Mission in dieser Welt ist, die beste Nachricht zu verbreiten, '
            + 'die du je gehört hast! Liebe, Hoffnung, Sinn—alles für dich!',
    Hindi: 'हमारे बारे में: इस दुनिया में हमारा एकमात्र मिशन सबसे बड़ी खबर फैलाना है जो तूने कभी सुनी! '
           + 'प्यार, उम्मीद, मकसद—सब तेरे लिए!',
    Italian: 'Chi siamo: La nostra unica missione in questo mondo è diffondere la notizia più bella '
             + 'che tu abbia mai sentito! Amore, speranza, scopo—tutto per te!',
    Japanese: '俺たちについて: この世界での唯一の使命は、お前が聞いたこともない最高のニュースを広めることだよ！ '
              + '愛、希望、目的—全部お前のために！',
    Korean: '우리 소개: 이 세상에서 우리 유일한 임무는 네가 들어본 적 없는 최고의 소식을 전하는 거야! '
            + '사랑, 희망, 목적—다 너를 위해!',
    Mandarin: '关于我们: 我们在这世界上的唯一任务就是传播你听过的最棒的消息！爱、希望、目标—全都是给你的！',
    Portuguese: 'Sobre nós: Nossa única missão neste mundo é espalhar a melhor notícia que tu já ouviu! '
                + 'Amor, esperança, propósito—tudo pra ti!',
    Russian: 'О нас: Наша единственная миссия в этом мире — рассказать тебе самую крутую новость, '
             + 'которую ты когда-либо слышал! Любовь, надежда, цель—всё для тебя!',
    Spanish: 'Sobre nosotros: Nuestra única misión en este mundo es compartir la mejor noticia que hayas oído nunca! '
             + '¡Amor, esperanza, propósito—todo es para ti!',
    Swahili: 'Kuhusu sisi: Dhamira yetu pekee duniani ni kueneza habari njema zaidi uliyowahi kusikia! '
             + 'Upendo, tumaini, kusudi—yote ni kwa ajili yako!',
  },
  questionnaireTitle: {
    Arabic: 'سؤال: إيش اللي يضايقك أكثر في حياتك؟',
    English: 'Questionnaire: What bothers you most in life?',
    French: 'Question : Qu’est-ce qui te dérange le plus dans la vie ?',
    German: 'Frage: Was stört dich am meisten im Leben?',
    Hindi: 'सवाल: जिंदगी में तुझे सबसे ज्यादा क्या परेशान करता है?',
    Italian: 'Domanda: Cosa ti dà più fastidio nella vita?',
    Japanese: '質問: 人生で一番お前を悩ませるものは何？',
    Korean: '질문: 인생에서 너를 제일 괴롭히는 게 뭐야?',
    Mandarin: '问题：生活中最困扰你的是什么？',
    Portuguese: 'Pergunta: O que te incomoda mais na vida?',
    Russian: 'Вопрос: Что тебя больше всего беспокоит в жизни?',
    Spanish: 'Pregunta: ¿Qué te molesta más en la vida?',
    Swahili: 'Swali: Nini kinakusumbua zaidi maishani?',
  },
  questionnaireOptions: [
    {
      Arabic: 'الخوف',
      English: 'Fear',
      French: 'Peur',
      German: 'Angst',
      Hindi: 'डर',
      Italian: 'Paura',
      Japanese: '恐怖',
      Korean: '두려움',
      Mandarin: '恐惧',
      Portuguese: 'Medo',
      Russian: 'Страх',
      Spanish: 'Miedo',
      Swahili: 'Hofu',
    },
    {
      Arabic: 'الاكتئاب',
      English: 'Depression',
      French: 'Dépression',
      German: 'Depression',
      Hindi: 'उदासी',
      Italian: 'Depressione',
      Japanese: 'うつ',
      Korean: '우울증',
      Mandarin: '抑郁',
      Portuguese: 'Depressão',
      Russian: 'Депрессия',
      Spanish: 'Depresión',
      Swahili: 'Unasumbufu',
    },
    {
      Arabic: 'الوحدة',
      English: 'Loneliness',
      French: 'Solitude',
      German: 'Einsamkeit',
      Hindi: 'अकेलापन',
      Italian: 'Solitudine',
      Japanese: '孤独',
      Korean: '외로움',
      Mandarin: '孤独',
      Portuguese: 'Solidão',
      Russian: 'Одиночество',
      Spanish: 'Soledad',
      Swahili: 'Upweke',
    },
    {
      Arabic: 'قلة الهدف',
      English: 'Lack of Purpose',
      French: 'Manque de but',
      German: 'Sinnlosigkeit',
      Hindi: 'मकसद की कमी',
      Italian: 'Mancanza di scopo',
      Japanese: '目的の欠如',
      Korean: '목적 부족',
      Mandarin: '缺乏目标',
      Portuguese: 'Falta de propósito',
      Russian: 'Отсутствие цели',
      Spanish: 'Falta de propósito',
      Swahili: 'Ukosefu wa kusudi',
    },
    {
      Arabic: 'القلق',
      English: 'Anxiety',
      French: 'Anxiété',
      German: 'Unruhe',
      Hindi: 'चिंता',
      Italian: 'Ansia',
      Japanese: '不安',
      Korean: '불안',
      Mandarin: '焦虑',
      Portuguese: 'Ansiedade',
      Russian: 'Тревога',
      Spanish: 'Ansiedad',
      Swahili: 'Wasiwasi',
    },
    {
      Arabic: 'شعور بالذنب',
      English: 'Feelings of guilt',
      French: 'Sentiments de culpabilité',
      German: 'Schuldgefühle',
      Hindi: 'अपराध बोध',
      Italian: 'Sensi di colpa',
      Japanese: '罪悪感',
      Korean: '죄책감',
      Mandarin: '内疚感',
      Portuguese: 'Sentimentos de culpa',
      Russian: 'Чувство вины',
      Spanish: 'Sentimientos de culpa',
      Swahili: 'Hisia za hatia',
    },
    {
      Arabic: 'غيرها',
      English: 'Other',
      French: 'Autre',
      German: 'Anderes',
      Hindi: 'अन्य',
      Italian: 'Altro',
      Japanese: 'その他',
      Korean: '기타',
      Mandarin: '其他',
      Portuguese: 'Outro',
      Russian: 'Другое',
      Spanish: 'Otro',
      Swahili: 'Nyingine',
    },
  ],
  otherPrompt: {
    Arabic: 'قول لنا إيش اللي يضايقك أكثر:',
    English: 'Tell us what bothers you most:',
    French: 'Dis-nous ce qui te dérange le plus :',
    German: 'Sag uns, was dich am meisten stört:',
    Hindi: 'हमें बता कि तुझे सबसे ज्यादा क्या परेशान करता है:',
    Italian: 'Dimmi cosa ti dà più fastidio:',
    Japanese: 'お前を一番悩ませるものを教えて:',
    Korean: '너를 제일 괴롭히는 게 뭔지 말해줘:',
    Mandarin: '告诉我们最困扰你的是什么：',
    Portuguese: 'Conta pra gente o que te incomoda mais:',
    Russian: 'Скажи, что тебя больше всего беспокоит:',
    Spanish: 'Dinos qué te molesta más:',
    Swahili: 'Tuambie nini kinakusumbua zaidi:',
  },
  finalOpening: {
    Arabic: 'في قصة قديمة جدًا، هي جزء من دناك. القصة دي بتشرح سبب [issue] بتاعك.',
    English: 'There is a story so ancient, it is part of our DNA. That story explains the root cause of your [issue].',
    French: 'Y’a une histoire si ancienne qu’elle fait partie de ton ADN. Cette histoire explique pourquoi t’as [issue].',
    German: 'Es gibt eine Geschichte, so alt, dass sie in deiner DNA steckt. Die Geschichte erklärt, warum du [issue] hast.',
    Hindi: 'एक कहानी है जो इतनी पुरानी है कि वो तेरे डीएनए का हिस्सा है। वो कहानी बताती है कि तेरे [issue] की जड़ क्या है।',
    Italian: 'C’è una storia così antica che è parte del tuo DNA. Quella storia spiega perché hai [issue].',
    Japanese: 'すげえ古い話があって、それはお前のDNAの一部なんだ。その話はお前の[issue]の原因を説明してるよ。',
    Korean: '너무 오래된 이야기가 있어, 그건 너의 DNA 일부야. 그 이야기는 네 [issue]의 근본 원인을 설명해.',
    Mandarin: '有个故事特别古老，它是你DNA的一部分。那故事解释了你[issue]的根源。',
    Portuguese: 'Tem uma história tão antiga que tá no teu DNA. Essa história explica por que tu tens [issue].',
    Russian: 'Есть история такая древняя, что она часть твоей ДНК. Эта история объясняет, почему у тебя [issue].',
    Spanish: 'Hay una historia tan antigua que está en tu ADN. Esa historia explica por qué tienes [issue].',
    Swahili: 'Kuna hadithi ya zamani sana, ni sehemu ya DNA yako. Hadithi hiyo inaelezea sababu ya [issue] yako.',
  },
  concerns: {
    fear: {
      Arabic: 'الخوف بيمسك فينا لأننا فقدنا الثقة في عالم مكسور بالخطية. '
              + 'الإنجيل بيقول إن يسوع انتصر على الخوف بمواجهة الموت نفسه، '
              + 'وبيقدم لك السلام من خلال انتصاره.',
      English: 'Fear grips you because you’ve lost trust in a world broken by sin. '
               + 'The gospel tells you Jesus conquered fear by facing death itself, '
               + 'offering you peace through His victory.',
      French: 'La peur nous tient parce qu’on a perdu confiance en un monde brisé par le péché. '
              + 'L’Évangile dit que Jésus a vaincu la peur en affrontant la mort, '
              + 't’offrant la paix par sa victoire.',
      German: 'Angst packt uns, weil wir das Vertrauen in eine von Sünde zerbrochene Welt verloren haben. '
              + 'Das Evangelium sagt, dass Jesus die Angst besiegte, indem er dem Tod selbst begegnete, '
              + 'und dir Frieden durch seinen Sieg schenkt.',
      Hindi: 'डर हमें जकड़ लेता है क्योंकि हमने एक पाप से टूटी दुनिया में भरोसा खो दिया है। '
             + 'सुसमाचार कहता है कि यीशु ने मृत्यु का सामना करके डर पर विजय पाई, '
             + 'और तुझे अपने विजय के माध्यम से शांति देता है।',
      Italian: 'La paura ci blocca perché abbiamo perso fiducia in un mondo rotto dal peccato. '
               + 'Il Vangelo dice che Gesù ha sconfitto la paura affrontando la morte stessa, '
               + 'offrendoti pace con la sua vittoria.',
      Japanese: '恐怖は、罪で壊れた世界への信頼を失ったからお前をつかむ。'
                + '福音は、イエスが死そのものに立ち向かって恐怖を打ち負かし、'
                + '彼の勝利を通して平和をお前にくれるって教えてくれるよ。',
      Korean: '두려움은 죄로 망가진 세상에 대한 신뢰를 잃었기 때문에 널 붙잡아。'
              + '복음은 예수님이 죽음 자체를 맞서 두려움을 이겼다고 말하며、'
              + '그의 승리를 통해 너에게 평화를 줘。',
      Mandarin: '恐惧抓住你，因为我们对一个被罪破坏的世界的信任失去了。'
                + '福音说耶稣通过直面死亡征服了恐惧，通过他的胜利给你平安。',
      Portuguese: 'O medo te pega porque perdemos a confiança num mundo quebrado pelo pecado。'
                  + 'O Evangelho diz que Jesus venceu o medo enfrentando a morte，'
                  + 'te oferecendo paz pela vitória dele。',
      Russian: 'Страх хватает тебя, потому что мы потеряли доверие к миру, сломанному грехом。'
               + 'Евангелие говорит，что Иисус победил страх，столкнувшись со смертью，'
               + 'и дает тебе мир через свою победу。',
      Spanish: 'El miedo te atrapa porque hemos perdido la confianza en un mundo roto por el pecado。'
               + 'El Evangelio dice que Jesús venció el miedo enfrentando la muerte misma，'
               + 'ofreciéndote paz por su victoria。',
      Swahili: 'Hofu inakushika kwa sababu tumepoteza imani katika dunia iliyovunjika na dhambi。'
               + 'Injili inasema Yesu alishinda hofu kwa kukabiliana na kifo chenyewe，'
               + 'akakupa amani kupitia ushindi wake。',
    },
    depression: {
      Arabic: 'الاكتئاب بيثقل علينا لأننا بنحس إننا مفصولين عن هدفنا الحقيقي。'
              + 'الإنجيل بيكشف محبة الله، وبيرجع الفرح من خلال علاقة معاه。',
      English: 'Depression weighs heavy because you feel disconnected from your true purpose。'
               + 'The gospel reveals God’s love，restoring joy through a relationship with Him。',
      French: 'La dépression pèse lourd parce qu’on se sent déconnecté de notre vrai but。'
              + 'L’Évangile révèle l’amour de Dieu，qui restaure la joie par une relation avec Lui。',
      German: 'Depression lastet schwer，weil wir uns von unserem wahren Sinn entfremdet fühlen。'
              + 'Das Evangelium zeigt Gottes Liebe，die Freude durch eine Beziehung mit ihm zurückbringt。',
      Hindi: 'उदासी भारी पड़ती है क्योंकि हम अपने असली मकसद से कटे हुए महसूस करते हैं। '
             + 'सुसमाचार परमेश्वर के प्रेम को प्रकट करता है，जो उसके साथ रिश्ते से खुशी लौटाता है।',
      Italian: 'La depressione pesa perché ci sentiamo scollegati dal nostro vero scopo。'
               + 'Il Vangelo rivela l’amore di Dio，che riporta gioia attraverso un rapporto con Lui。',
      Japanese: 'うつは、本当の目的から切り離されてる気がするから重くのしかかる。'
                + '福音は神の愛を明らかにして、彼との関係で喜びを取り戻してくれる。',
      Korean: '우울증은 우리가 진짜 목적에서 단절된 것처럼 느껴지니까 무겁게 짓눌러。'
              + '복음은 하나님의 사랑을 보여주며，그와의 관계를 통해 기쁨을 되찾게 해。',
      Mandarin: '抑郁沉重，因为我们感觉与真正的目标脱节了。'
                + '福音揭示了神的爱，通过与他的关系恢复喜乐。',
      Portuguese: 'A depressão pesa porque nos sabemos desconectados do nosso verdadeiro propósito。'
                  + 'O Evangelho revela o amor de Deus，trazendo alegria de volta por um relacionamento com Ele。',
      Russian: 'Депрессия давит，потому что мы чувствуем себя оторванными от настоящей цели。'
               + 'Евангелие открывает любовь Бога，возвращая радость через отношения с Ним。',
      Spanish: 'La depresión pesa porque nos sentimos desconectados de nuestro verdadero propósito。'
               + 'El Evangelio revela el amor de Dios，restaurando la alegría por una relación con Él。',
      Swahili: 'Unasumbufu unalemea kwa sababu tunahisi tumekatwa na kusudi letu la kweli。'
               + 'Injili inaonyesha upendo wa Mungu，ukirudisha furaha kupitia uhusiano naye。',
    },
    loneliness: {
      Arabic: 'الوحدة بتوجع لأننا اتخلقنا عشان نكون متصلين。'
              + 'الإنجيل بيدعيك لعيلة الله，اللي عمرك ما هتبقى فيها لوحدك。',
      English: 'Loneliness stings because you were made for connection。'
               + 'The gospel invites you into God’s family，where you’re never alone。',
      French: 'La solitude fait mal parce qu’on est fait pour la connexion。'
              + 'L’Évangile t’invite dans la famille de Dieu，où t’es jamais seul。',
      German: 'Einsamkeit tut weh，weil wir für Gemeinschaft geschaffen sind。'
              + 'Das Evangelium lädt dich in Gottes Familie ein，wo du nie allein bist。',
      Hindi: 'अकेलापन चुभता है क्योंकि हम रिश्तों के लिए बने हैं। '
             + 'सुसमाचार तुझे परमेश्वर के परिवार में बुलाता है，जहाँ तू कभी अकेला नहीं है।',
      Italian: 'La solitudine fa male perché siamo fatti per la connessione。'
               + 'Il Vangelo ti invita nella famiglia di Dio，dove non sei mai solo。',
      Japanese: '孤独は、俺たちがつながり合うために作られたから刺さる。'
                + '福音はお前を神の家族に招いて、決して一人じゃないって教えてくれる。',
      Korean: '외로움은 우리가 연결되기 위해 만들어졌기 때문에 아파。'
              + '복음은 널 하나님의 가족으로 초대해서 절대 혼자가 아니게 해。',
      Mandarin: '孤独刺痛，因为我们是为连接而生的。'
                + '福音邀请你加入神的家庭，在那里你永远不孤单。',
      Portuguese: 'A solidão dói porque fomos feitos pra conexão。'
                  + 'O Evangelho te convida pra família de Deus，onde nunca tá sozinho。',
      Russian: 'Одиночество ранит，потому что мы созданы для связи。'
               + 'Евангелие зовет тебя в семью Бога，где ты никогда не один。',
      Spanish: 'La soledad duele porque estamos hechos para la conexión。'
               + 'El Evangelio te invita a la familia de Dios，donde nunca estás solo。',
      Swahili: 'Upweke unauma kwa sababu tuliumbwa kwa ajili ya kuungana。'
               + 'Injili inakualika katika familia ya Mungu，ambapo huwezi kuwa peke yako。',
    },
    'lack of purpose': {
      Arabic: 'من غير هدف，الحياة بتحس زي الفاضي。'
              + 'الإنجيل بيوريك إنك اتخلقت لمجد الله，وبيدي لحياتك معنى أبدي。',
      English: 'Without purpose，life feels empty。'
               + 'The gospel shows you were created for God’s glory，giving your life eternal meaning。',
      French: 'Sans but，la vie semble vide。'
              + 'L’Évangile te montre que t’es créé pour la gloire de Dieu，donnant un sens éternel à ta vie。',
      German: 'Ohne Sinn fühlt sich das Leben leer an。'
              + 'Das Evangelium zeigt，dass du für Gottes Herrlichkeit geschaffen bist，'
              + 'was deinem Leben ewigen Sinn gibt。',
      Hindi: 'बिना मकसद के जिंदगी खाली लगती है। '
             + 'सुसमाचार दिखाता है कि तू परमेश्वर की महिमा के लिए बना है，'
             + 'जो तेरी जिंदगी को अनंत अर्थ देता है।',
      Italian: 'Senza uno scopo，la vita sembra vuota。'
               + 'Il Vangelo ti mostra che sei stato creato per la gloria di Dio，'
               + 'dando alla tua vita un significato eterno。',
      Japanese: '目的がないと、人生は空っぽに感じる。'
                + '福音はお前が神の栄光のために作られたって示して、人生に永遠の意味を与えてくれる。',
      Korean: '목적이 없으면 인생이 공허하게 느껴져。'
              + '복음은 네가 하나님의 영광을 위해 만들어졌다고 보여주며，인생에 영원한 의미를 줘。',
      Mandarin: '没有目标，生活感觉空虚。'
                + '福音告诉你，你是为神的荣耀而造，赋予你生命永恒的意义。',
      Portuguese: 'Sem propósito，a vida parece vazia。'
                  + 'O Evangelho mostra que tu foi criado pra glória de Deus，'
                  + 'dando um sentido eterno à tua vida。',
      Russian: 'Без цели жизнь кажется пустой。'
               + 'Евангелие показывает，что ты создан для славы Бога，давая твоей жизни вечный смысл。',
      Spanish: 'Sin propósito，la vida se siente vacía。'
               + 'El Evangelio te muestra que fuiste creado para la gloria de Dios，'
               + 'dándole un sentido eterno a tu vida。',
      Swahili: 'Bila kusudi，maisha yanahisi kuwa tupu。'
               + 'Injili inakuonyesha uliumbwa kwa ajili ya utukufu wa Mungu，'
               + 'ikikupa maisha yako maana ya milele。',
    },
    anxiety: {
      Arabic: 'القلق بيغلبنا لأننا بنشيل همومنا لوحدنا。'
              + 'الإنجيل بيقدم سلام يسوع，اللي بيشيل همومك وبيديك راحة。',
      English: 'Anxiety overwhelms you because you carry burdens alone。'
               + 'The gospel offers Jesus’ peace，who carries your worries and gives you rest。',
      French: 'L’anxiété nous submerge parce qu’on porte nos fardeaux seuls。'
              + 'L’Évangile t’offre la paix de Jésus，qui porte tes soucis et te donne du repos。',
      German: 'Unruhe überwältigt uns，weil wir unsere Lasten allein tragen。'
              + 'Das Evangelium bietet den Frieden Jesu，der deine Sorgen trägt und dir Ruhe schenkt。',
      Hindi: 'चिंता हावी हो जाती है क्योंकि हम बोझ अकेले उठाते हैं। '
             + 'सुसमाचार यीशु की शांति देता है，जो तेरे चिंताओं को उठाता है और तुझे आराम देता है।',
      Italian: 'L’ansia ci travolge perché portiamo i nostri fardelli da soli。'
               + 'Il Vangelo offre la pace di Gesù，che porta le tue preoccupazioni e ti dà riposo。',
      Japanese: '不安は、一人で重荷を背負ってるから押しつぶす。'
                + '福音はイエスの平和をお前にくれて、悩みを背負って休息を与えてくれる。',
      Korean: '불안은 혼자 짐을 지고 있기 때문에 널 압도해。'
              + '복음은 예수님의 평화를 주며，네 걱정을 지고 쉴 곳을 줘。',
      Mandarin: '焦虑压倒你，因为我们独自承担重担。'
                + '福音提供耶稣的平安，他替你承担忧虑，给你休息。',
      Portuguese: 'A ansiedade te esmaga porque carregamos fardos sozinhos。'
                  + 'O Evangelho oferece a paz de Jesus，que carrega tuas preocupações e te dá descanso。',
      Russian: 'Тревога переполняет，потому что мы несем бремя в одиночку。'
               + 'Евангелие предлагает мир Иисуса，который берет твои заботы и дает покой。',
      Spanish: 'La ansiedad te abruma porque cargamos nuestras cargas solos。'
               + 'El Evangelio ofrece la paz de Jesús，que lleva tus preocupaciones y te da descanso。',
      Swahili: 'Wasiwasi unakulemea kwa sababu unabeba mizigo peke yako。'
               + 'Injili inakupa amani ya Yesu，ambaye anabeba wasiwasi wako na kukupa raha。',
    },
    guilt: {
      Arabic: 'شعور بالذنب بيثقل عليك لأنك عارف إنك أخطأت。'
              + 'الإنجيل بيقدم الغفران من خلال تضحية يسوع，'
              + 'بيمسح ذنوبك ويديك حرية。',
      English: 'Feelings of guilt weigh you down because you know you’ve messed up。'
               + 'The gospel offers forgiveness through Jesus’ sacrifice，'
               + 'wiping your slate clean and giving you freedom。',
      French: 'Les sentiments de culpabilité te pèsent parce que tu sais que t’as foiré。'
              + 'L’Évangile t’offre le pardon par le sacrifice de Jésus，'
              + 'effaçant ton ardoise et te donnant la liberté。',
      German: 'Schuldgefühle drücken dich，weil du weißt，dass du Mist gebaut hast。'
              + 'Das Evangelium bietet Vergebung durch Jesu Opfer，'
              + 'wischt deine Tafel sauber und gibt dir Freiheit。',
      Hindi: 'अपराध बोध तुझे भारी करता है क्योंकि तू जानता है कि तूने गड़बड़ की। '
             + 'सुसमाचार यीशु के बलिदान के माध्यम से माफी देता है，'
             + 'तेरी स्लेट साफ करता है और तुझे आजादी देता है।',
      Italian: 'I sensi di colpa ti pesano perché sai di aver combinato un casino。'
               + 'Il Vangelo offre il perdono attraverso il sacrificio di Gesù，'
               + 'cancellando i tuoi errori e dandoti libertà。',
      Japanese: '罪悪感はお前がやらかしたって知ってるから重くのしかかる。'
                + '福音はイエスの犠牲で赦しをくれて、過去を清算して自由をお前にくれる。',
      Korean: '죄책감은 네가 실수했다는 걸 알기 때문에 널 짓눌러。'
              + '복음은 예수님의 희생으로 용서를 주며，네 기록을 깨끗이 하고 자유를 줘。',
      Mandarin: '内疚感让你沉重，因为你知道自己搞砸了。'
                + '福音通过耶稣的牺牲提供宽恕，擦净你的记录，给你自由。',
      Portuguese: 'Sentimentos de culpa te pesam porque tu sabe que meteu os pés pelas mãos。'
                  + 'O Evangelho oferece perdão pelo sacrifício de Jesus，'
                  + 'limpando tua ficha e te dando liberdade。',
      Russian: 'Чувство вины давит на тебя，потому что ты знаешь，что накосячил。'
               + 'Евангелие предлагает прощение через жертву Иисуса，'
               + 'очищая твою совесть и давая свободу。',
      Spanish: 'Los sentimientos de culpa te pesan porque sabes que la has cagado。'
               + 'El Evangelio ofrece perdón por el sacrificio de Jesús，'
               + 'limpiando tu historial y dándote libertad。',
      Swahili: 'Hisia za hatia zinakulemea kwa sababu unajua umeharibu。'
               + 'Injili inakupa msamaha kupitia sadaka ya Yesu，'
               + 'ikifuta rekodi yako na kukupa uhuru。',
    },
    other: {
      Arabic: 'مهما كانت مشكلتك، الإنجيل بيقدم أمل من خلال يسوع، '
              + 'اللي بيشفي الكسر ويجدد الحياة。',
      English: 'Whatever your struggle，the gospel offers hope through Jesus，'
               + 'who heals brokenness and restores life。',
      French: 'Peu importe ton problème，l’Évangile offre de l’espoir par Jésus，'
              + 'qui guérit les cœurs brisés et restaure la vie。',
      German: 'Egal，welches Problem du hast，das Evangelium bietet Hoffnung durch Jesus，'
              + 'der Zerbrochenes heilt und das Leben wiederherstellt。',
      Hindi: 'चाहे तेरी कोई भी परेशानी हो，सुसमाचार यीशु के माध्यम से आशा देता है，'
             + 'जो टूटेपन को ठीक करता है और जिंदगी को बहाल करता है।',
      Italian: 'Qualsiasi sia il tuo problema，il Vangelo offre speranza attraverso Gesù，'
               + 'che guarisce ciò che è rotto e restaura la vita。',
      Japanese: 'どんな悩みでも、福音はイエスを通して希望をくれて、'
                + '壊れたものを癒し、人生を新しくしてくれる。',
      Korean: '네가 어떤 고난을 겪든，복음은 예수님을 통해 희망을 주며，'
              + '망가진 것을 치유하고 삶을 회복시켜。',
      Mandarin: '不管你有什么困扰，福音通过耶稣提供希望，'
                + '治愈破碎，恢复生命。',
      Portuguese: 'Seja qual for teu problema，o Evangelho oferece esperança por Jesus，'
                  + 'que cura o que tá quebrado e restaura a vida。',
      Russian: 'Какая бы у тебя ни была проблема，Евангелие дает надежду через Иисуса，'
               + 'который исцеляет сломленное и восстанавливает жизнь。',
      Spanish: 'Sea cual sea tu problema，el Evangelio ofrece esperanza por Jesús，'
               + 'que sana lo roto y restaura la vida。',
      Swahili: 'Chochote kinachokusumbua，Injili inakupa tumaini kupitia Yesu，'
               + 'ambaye huponya yaliyovunjika na kurudisha maisha。',
    },
  },
  chooseLanguagePrompt: {
    Arabic: 'اختر لغتك',
    English: 'Choose your language',
    French: 'Choisissez votre langue',
    German: 'Wähle deine Sprache',
    Hindi: 'अपनी भाषा चुनें',
    Italian: 'Scegli la tua lingua',
    Japanese: '言語を選んでください',
    Korean: '언어를 선택하세요',
    Mandarin: '请选择您的语言',
    Portuguese: 'Escolha seu idioma',
    Russian: 'Выбери свой язык',
    Spanish: 'Elige tu idioma',
    Swahili: 'Chagua lugha yako',
  },
};

export function t(key: keyof Messages, lang: Language, concern?: string): string {
  const translation = messages[key];
  if (key === 'concerns' && concern) {
    return (translation as ConcernTranslation)[concern]?.[lang] ?? (translation as ConcernTranslation)[concern].English;
  }
  if (key === 'questionnaireOptions') {
    const index = messages[key].findIndex((opt) => opt.English.toLowerCase() === concern?.toLowerCase());
    if (index !== -1) {
      return messages[key][index][lang] ?? messages[key][index].English;
    }
    return messages[key][messages[key].length - 1][lang] ?? messages[key][messages[key].length - 1].English; // Fallback to 'Other'
  }
  return (translation as Translation)[lang] ?? (translation as Translation).English;
}
