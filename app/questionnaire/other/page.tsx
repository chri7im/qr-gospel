"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const prompts = {
  ar: "قول لنا إيش اللي يضايقك أكثر:",
  en: "Tell us what bothers you most:",
  fr: "Dis-nous ce qui te dérange le plus :",
  de: "Sag uns, was dich am meisten stört:",
  hi: "हमें बता कि तुझे सबसे ज्यादा क्या परेशान करता है:",
  it: "Dimmi cosa ti dà più fastidio:",
  ja: "お前を一番悩ませるものを教えて:",
  ko: "너를 제일 괴롭히는 게 뭔지 말해줘:",
  zh: "告诉我们最困扰你的是什么：",
  pt: "Conta pra gente o que te incomoda mais:",
  ru: "Скажи, что тебя больше всего беспокоит:",
  es: "Dinos qué te molesta más:",
  sw: "Tuambie nini kinakusumbua zaidi:",
};

export default function Other() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const [customIssue, setCustomIssue] = useState("");

  const prompt = prompts[lang as keyof typeof prompts] || prompts.en;

  return (
    <div className="w-full max-w-md h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4 text-center">{prompt}</h1>
      <input
        type="text"
        value={customIssue}
        onChange={(e) => setCustomIssue(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
        placeholder="Enter your issue"
      />
      {customIssue && (
        <Link href={`/final?lang=${lang}&issue=${customIssue}`}>
          <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
            →
          </button>
        </Link>
      )}
    </div>
  );
}