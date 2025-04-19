"use client";

   import Link from "next/link";
   import { useSearchParams } from "next/navigation";

   const aboutTranslations = {
     ar: "عنّا: مهمتنا الوحيدة في هالعالم هي نشر أحلى خبر سمعته الدنيا! الحب، الأمل، الهدف—كلها لك!",
     en: "About us: Our only mission in this world is to spread the greatest news this world has ever heard! Love, Hope, Purpose—all are up for grabs—for you!",
     fr: "À propos de nous : Notre seule mission dans ce monde, c’est de partager la meilleure nouvelle que t’as jamais entendue ! Amour, espoir, but—tout ça est à toi !",
     de: "Über uns: Unsere einzige Mission in dieser Welt ist, die beste Nachricht zu verbreiten, die du je gehört hast! Liebe, Hoffnung, Sinn im Leben—all das und mehr wartet auf dich!",
     hi: "हमारे बारे में: इस दुनिया में हमारा एकमात्र मिशन सबसे बड़ी खबर फैलाना है जो तूने कभी सुनी! प्यार, उम्मीद, मकसद—सब तेरे लिए!",
     it: "Chi siamo: La nostra unica missione in questo mondo è diffondere la notizia più bella che tu abbia mai sentito! Amore, speranza, scopo—tutto per te!",
     ja: "俺たちについて: この世界での唯一の使命は、お前が聞いたこともない最高のニュースを広めることだよ！愛、希望、目的—全部お前のために！",
     ko: "우리 소개: 이 세상에서 우리 유일한 임무는 네가 들어본 적 없는 최고의 소식을 전하는 거야! 사랑, 희망, 목적—다 너를 위해!",
     zh: "关于我们: 我们在这世界上的唯一任务就是传播你听过的最棒的消息！爱、希望、目标—全都是给你的！",
     pt: "Sobre nós: Nossa única missão neste mundo é espalhar a melhor notícia que tu já ouviu! Amor, esperança, propósito—tudo pra ti!",
     ru: "О нас: Наша единственная миссия в этом мире — рассказать тебе самую крутую новость, которую ты когда-либо слышал! Любовь, надежда, смысл жизни—ждут тебя!",
     es: "Sobre nosotros: Nuestra única misión en este mundo es compartir la mejor noticia que hayas oído nunca! ¡Amor, esperanza, propósito—todo es para ti!",
     sw: "Kuhusu sisi: Dhamira yetu pekee duniani ni kueneza habari njema zaidi uliyowahi kusikia! Upendo, tumaini, kusudi—yote ni kwa ajili yako!",
   };

   export default function About() {
     const searchParams = useSearchParams();
     const lang = searchParams.get("lang") || "en";

     return (
       <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
         <p className="text-lg text-center mb-8">
           {aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en}
         </p>
         <Link href={`/questionnaire?lang=${lang}`}>
           <button className="px-6 py-2 bg-blue-500 text-white rounded-full">
             Get it now for free
           </button>
         </Link>
       </div>
     );
   }