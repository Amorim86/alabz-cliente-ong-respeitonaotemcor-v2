"use client";

import { useEffect, useState } from "react";

const REVIEWS = [
  { name: "Selma Soares", text: "Acolhedora, receptiva e um lugar maravilhoso de letramento racial e atendimentos profissionais." },
  { name: "Nathália Pinheiro Antonelo", text: "Estou há aproximadamente dois anos fazendo terapia. Atendimento muito atencioso, valor acessível e atuação maravilhosa." },
  { name: "Edward Romero", text: "Um lugar onde recebi carinho, atenção e fui tratado com muito respeito desde o primeiro dia." },
  { name: "Karell Peña Ventoza", text: "Esse espaço é um verdadeiro lugar de igualdade, amor e esperança para a comunidade." },
];

function ReviewCard({ review, isCompact = false }: { review: (typeof REVIEWS)[number]; isCompact?: boolean }) {
  return (
    <article
      className={[
        "min-w-0 bg-[var(--color-primary)] p-5 text-white shadow-[0_18px_48px_rgba(8,29,66,0.18)]",
        isCompact ? "mx-auto flex min-h-[220px] w-full max-w-[330px] flex-col" : "flex h-full flex-col p-6",
      ].join(" ")}
    >
      <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-4 bg-white/6 p-4">
        <span className="font-display text-4xl font-extrabold leading-none">4,9</span>
        <div className="min-w-0">
          <p className="text-sm tracking-widest text-[var(--color-secondary)]">★★★★★</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/86">29 avaliações no Google</p>
        </div>
      </div>

      <div className="mt-5 min-w-0">
        <h3 className="mb-2 text-base font-extrabold">{review.name}</h3>
        <p key={review.name} className="review-typewriter break-words text-sm leading-relaxed text-white/78">&quot;{review.text}&quot;<span aria-hidden="true" className="review-caret" /></p>
      </div>
    </article>
  );
}

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const staticReviews = REVIEWS.slice(1, 3);

  useEffect(() => {
    const cycle = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % REVIEWS.length);
    }, 7000);

    return () => window.clearInterval(cycle);
  }, []);

  return (
    <section className="laptop-compact relative flex w-full overflow-hidden bg-[#F7F4EA] py-10 md:py-14 lg:min-h-[calc(100dvh-var(--header-height))] lg:items-center lg:py-8" id="depoimentos" tabIndex={-1}>
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-12">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="col-span-12 mx-auto flex w-full max-w-[42rem] flex-col justify-center text-center lg:col-span-6 lg:mx-0 lg:text-left">
            <span className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Nossa reputação</span>
            <h2 className="mx-auto mb-4 max-w-[12ch] font-display text-[2rem] font-extrabold leading-[1.04] text-[var(--color-primary)] md:text-5xl lg:mx-0 lg:mb-6 lg:max-w-none">
              Acolhimento reconhecido por quem viveu de perto.
            </h2>
            <p className="mx-auto mb-4 max-w-[36rem] text-sm leading-relaxed text-[var(--foreground)]/74 md:text-base lg:mx-0 lg:mb-8 lg:text-justify">
              O impacto do nosso trabalho aparece nas histórias de quem encontrou escuta, orientação e uma rede de apoio dentro da comunidade.
            </p>
          </div>

          <div className="hidden lg:col-span-6 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-6">
            <div className="flex flex-col justify-center gap-4">
              {staticReviews.map((review) => (
                <article key={review.name} className="min-w-0 bg-[var(--color-primary)] p-5 text-white shadow-[0_14px_36px_rgba(8,29,66,0.16)]">
                  <p className="mb-3 text-xs tracking-widest text-[var(--color-secondary)]">★★★★★</p>
                  <h3 className="mb-1.5 text-sm font-extrabold">{review.name}</h3>
                  <p className="text-[0.82rem] leading-relaxed text-white/75">&quot;{review.text}&quot;</p>
                </article>
              ))}
            </div>
            <ReviewCard review={REVIEWS[currentIndex]} />
          </div>

          <div className="col-span-12 flex justify-center px-1 lg:hidden">
            <ReviewCard review={REVIEWS[currentIndex]} isCompact />
          </div>
        </div>
      </div>
    </section>
  );
}
