"use client";

   import { useState } from "react";
   import Link from "next/link";
   import { useSearchParams } from "next/navigation";

   const questions = {
     ar: {
       title: "سؤال: إيش اللي يضايقك أكثر في حياتك؟",
       options: ["الخوف", "الاكتئاب", "الوحدة", "قلة الهدف", "القلق", "شعور بالذنب", "غيرها"],
     },
     en: {
       title: "Questionnaire: What bothers you most in life?",
       options: ["Fear", "Depression", "Loneliness", "Lack of Purpose", "Anxiety", "Feelings of guilt", "Other"],
     },
     fr: {
       title: "Question : Qu’est-ce qui te dérange le plus dans la vie ?",
       options: ["Peur", "Dépression", "Solitude", "Manque de but", "Anxiété", "Sentiments de culpabilité", "Autre"],
     },
     de: {
       title: "Frage: Was stört dich am meisten im Leben?",
       options: ["Angst", "Depression", "Einsamkeit", "Sinnlosigkeit", "Unruhe", "Schuldgefühle", "Anderes"],
     },
     hi: {
       title: "सवाल: जिंदगी में तुझे सबसे ज्यादा क्या परेशान करता है?",
       options: ["डर", "उदासी", "अकेलापन", "मकसद की कमी", "चिंता", "अपराध बोध", "अन्य"],
     },
     it: {
       title: "Domanda: Cosa ti dà più fastidio nella vita?",
       options: ["Paura", "Depressione", "Solitudine", "Mancanza di scopo", "Ansia", "Sensi di colpa", "Altro"],
     },
     ja: {
       title: "質問: 人生で一番お前を悩ませるものは何？",
       options: ["恐怖", "うつ", "孤独", "目的の欠如", "不安", "罪悪感", "その他"],
     },
     ko: {
       title: "질문: 인생에서 너를 제일 괴롭히는 게 뭐야?",
       options: ["두려움", "우울증", "외로움", "목적 부족", "불안", "죄책감", "기타"],
     },
     zh: {
       title: "问题：生活中最困扰你的是什么？",
       options: ["恐惧", "抑郁", "孤独", "缺乏目标", "焦虑", "内疚感", "其他"],
     },
     pt: {
       title: "Pergunta: O que te incomoda mais na vida?",
       options: ["Medo", "Depressão", "Solidão", "Falta de propósito", "Ansiedade", "Sentimentos de culpa", "Outro"],
     },
     ru: {
       title: "Вопрос: Что тебя больше всего беспокоит в жизни?",
       options: ["Страх", "Депрессия", "Одиночество", "Отсутствие цели", "Тревога", "Чувство вины", "Другое"],
     },
     es: {
       title: "Pregunta: ¿Qué te molesta más en la vida?",
       options: ["Miedo", "Depresión", "Soledad", "Falta de propósito", "Ansiedad", "Sentimientos de culpa", "Otro"],
     },
     sw: {
       title: "Swali: Nini kinakusumbua zaidi maishani?",
       options: ["Hofu", "Unasumbufu", "Upweke", "Ukosefu wa kusudi", "Wasiwasi", "Hisia za hatia", "Nyingine"],
     },
   };

   export default function Questionnaire() {
     const searchParams = useSearchParams();
     const lang = searchParams.get("lang") || "en";
     const [selected, setSelected] = useState("");

     const { title, options } = questions[lang as keyof typeof questions] || questions.en;

     return (
       <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
         <h1 className="text-xl font-bold mb-4 text-center">{title}</h1>
         <div className="space-y-4 w-full">
           {options.map((option) => (
             <button
               key={option}
               onClick={() => setSelected(option)}
               className={`w-full p-3 rounded-lg ${
                 selected === option ? "bg-blue-500 text-white" : "bg-gray-200"
               }`}
             >
               {option}
             </button>
           ))}
         </div>
         {selected && (
           <Link
             href={
               selected === options[options.length - 1]
                 ? `/other?lang=${lang}&issue=${selected}`
                 : `/final?lang=${lang}&issue=${selected}`
             }
           >
             <button className="mt-8 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
               →
             </button>
           </Link>
         )}
       </div>
     );
   }