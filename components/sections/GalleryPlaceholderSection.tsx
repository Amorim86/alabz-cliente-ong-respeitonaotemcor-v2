"use client";



import { useState, useEffect, useRef, useCallback } from "react";

import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";



const CATEGORIES = [
  "Todas",
  "Acolhimento",
  "Oficinas",
  "Comunidade",
  "Eventos",
  "Rede de Apoio",
];

export const GALLERY_ITEMS = [
  // ── ACOLHIMENTO ──────────────────────────────────────────────────────────
  {
    src: "/images/escuta-psicologica.webp",
    title: "Escuta psicológica",
    text: "Cena que simboliza o atendimento psicológico oferecido pela ONG, com foco na escuta, no cuidado emocional e no fortalecimento da saúde mental.",
    category: "Acolhimento",
  },
  {
    src: "/images/orientacao-juridica.webp",
    title: "Orientação jurídica",
    text: "Registro simbólico do atendimento jurídico, representando momentos de orientação e esclarecimento sobre direitos, documentos e demandas familiares.",
    category: "Acolhimento",
  },
  {
    src: "/images/crianca-pintura.webp",
    title: "Alegria e Acolhimento",
    text: "Promovemos momentos de lazer e descontração, garantindo o direito de brincar.",
    category: "Acolhimento",
  },
  // ── OFICINAS ─────────────────────────────────────────────────────────────
  {
    src: "/images/oficina-jiu-jitsu.webp",
    title: "Oficina de Jiu-Jitsu",
    text: "Prática esportiva e disciplina para o desenvolvimento integral de crianças e jovens.",
    category: "Oficinas",
  },
  {
    src: "/images/jiu-jitsu-infantil.webp",
    title: "Jiu-jitsu infantil",
    text: "Registro de uma aula de jiu-jitsu para crianças, mostrando a prática em grupo e o desenvolvimento de disciplina, foco, coordenação e convivência.",
    category: "Oficinas",
  },
  {
    src: "/images/oficina-aula.webp",
    title: "Acompanhamento Infantil",
    text: "Atividades socioeducativas e reforço escolar para crianças e jovens.",
    category: "Oficinas",
  },
  // ── COMUNIDADE ───────────────────────────────────────────────────────────
  {
    src: "/images/atendimento-social.webp",
    title: "Atendimento social",
    text: "Imagem que representa o atendimento social realizado pela ONG junto às famílias e pessoas em situação de vulnerabilidade.",
    category: "Comunidade",
  },
  {
    src: "/images/comunidade-livro-solidario.webp",
    title: "Livro Solidário",
    text: "Iniciativa comunitária para incentivo à leitura e circulação do conhecimento.",
    category: "Comunidade",
  },
  {
    src: "/images/comunidade-reconhecimento.webp",
    title: "Reconhecimento Comunitário",
    text: "Valorização e celebração de líderes, voluntários e apoiadores da causa.",
    category: "Comunidade",
  },
  {
    src: "/images/comunidade-acao.webp",
    title: "Ações na Comunidade",
    text: "Momentos de integração, convivência e fortalecimento dos laços comunitários.",
    category: "Comunidade",
  },
  {
    src: "/images/brecho-roupas.webp",
    title: "Brechó Solidário",
    text: "Curadoria e comercialização acessível de roupas e itens que apoiam diretamente as ações da ONG.",
    category: "Comunidade",
  },
  {
    src: "/images/comunidade-pascoa.webp",
    title: "Páscoa na Comunidade",
    text: "Celebração festiva de Páscoa e distribuição de momentos alegres para as crianças.",
    category: "Comunidade",
  },
  // ── EVENTOS ──────────────────────────────────────────────────────────────
  {
    src: "/images/evento-natal.webp",
    title: "Eventos Comunitários",
    text: "Ações festivas e distribuição de presentes para crianças da comunidade.",
    category: "Eventos",
  },
  // ── REDE DE APOIO ────────────────────────────────────────────────────────
  {
    src: "/images/rede-de-apoio.webp",
    title: "Rede de Apoio",
    text: "Acolhimento, escuta e fortalecimento comunitário para mulheres e famílias.",
    category: "Rede de Apoio",
  },
  {
    src: "/images/rede-de-apoio-as-blacks.webp",
    title: "Rede de Apoio - As Blacks",
    text: "Movimento fundado pela Negra Dirce para empoderar e dar visibilidade aos negócios de empreendedoras negras, oferecendo palestras, mentorias, cursos e workshops voltados ao empreendedorismo negro.",
    category: "Rede de Apoio",
  },
  {
    src: "/images/rede-de-apoio-marcha.webp",
    title: "Rede de Apoio - Marcha do Orgulho Negro",
    text: "Movimento idealizado pela Negra Dirce em 2020 para o engajamento na luta antirracista. Presente no calendário oficial do município, a marcha acontece anualmente no segundo sábado de novembro em São José dos Pinhais.",
    category: "Rede de Apoio",
  },
];

const FULL_WIDTH_PX = 120;

const COLLAPSED_WIDTH_PX = 38;

const GAP_PX = 4;

const MARGIN_PX = 2;



function Thumbnails({

  items,

  index,

  setIndex,

}: {

  items: typeof GALLERY_ITEMS;

  index: number;

  setIndex: (i: number) => void;

}) {

  const thumbnailsRef = useRef<HTMLDivElement>(null);



  useEffect(() => {

    if (thumbnailsRef.current) {

      let scrollPosition = 0;

      for (let i = 0; i < index; i++) {

        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;

      }

      scrollPosition += MARGIN_PX;



      const containerWidth = thumbnailsRef.current.offsetWidth;

      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;

      scrollPosition -= centerOffset;



      thumbnailsRef.current.scrollTo({

        left: scrollPosition,

        behavior: "smooth",

      });

    }

  }, [index]);



  return (

    <div

      ref={thumbnailsRef}

      className="overflow-x-auto w-full max-w-full flex justify-center pt-1"

      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}

    >

      <style>{`

        .overflow-x-auto::-webkit-scrollbar {

          display: none;

        }

      `}</style>

      <div className="flex gap-1 h-[60px] md:h-[68px] py-1 mx-auto" style={{ width: "fit-content" }}>

        {items.map((item, i) => (

          <motion.button

            key={i}

            type="button"

            onClick={() => setIndex(i)}

            initial={false}

            animate={i === index ? "active" : "inactive"}

            variants={{

              active: {

                width: FULL_WIDTH_PX,

                marginLeft: MARGIN_PX,

                marginRight: MARGIN_PX,

              },

              inactive: {

                width: COLLAPSED_WIDTH_PX,

                marginLeft: 0,

                marginRight: 0,

              },

            }}

            transition={{ duration: 0.3, ease: "easeOut" }}

            className={`relative shrink-0 h-full overflow-hidden rounded-lg border shadow-sm bg-white transition-colors duration-300 ${

              i === index ? "border-[var(--color-secondary)] ring-2 ring-[var(--color-secondary)]/40" : "border-white/20 opacity-70 hover:opacity-100"

            }`}

          >

            <img

              src={item.src}

              alt={item.title}

              className="w-full h-full object-cover pointer-events-none select-none"

              draggable={false}

            />

            {i !== index && (

              <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-colors" />

            )}

          </motion.button>

        ))}

      </div>

    </div>

  );

}



export default function GalleryPlaceholderSection() {

  const [index, setIndex] = useState(0);

  const [activeCategoryPill, setActiveCategoryPill] = useState("Todas");

  const [isDragging, setIsDragging] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);



  const safeIndex = Math.min(Math.max(0, index), GALLERY_ITEMS.length - 1);

  const currentItem = GALLERY_ITEMS[safeIndex];



  const x = useMotionValue(0);



  // Sincroniza a pílula ativa quando o usuário navega pelo carrossel/miniaturas

  const updateIndex = useCallback((newIndex: number) => {

    const validIdx = (newIndex + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;

    setIndex(validIdx);

    const newCategory = GALLERY_ITEMS[validIdx].category;

    setActiveCategoryPill((currentPill) => {

      if (currentPill === "Todas" && validIdx === 0) return "Todas";

      return newCategory;

    });

  }, []);



  useEffect(() => {

    if (!isDragging && containerRef.current) {

      const containerWidth = containerRef.current.offsetWidth || 1;

      const targetX = -safeIndex * containerWidth;



      animate(x, targetX, {

        type: "spring",

        stiffness: 300,

        damping: 30,

      });

    }

  }, [safeIndex, x, isDragging]);



  const goToNext = useCallback(() => {

    updateIndex(safeIndex + 1);

  }, [safeIndex, updateIndex]);



  const goToPrev = useCallback(() => {

    updateIndex(safeIndex - 1);

  }, [safeIndex, updateIndex]);



  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "ArrowRight") goToNext();

      if (e.key === "ArrowLeft") goToPrev();

      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [goToNext, goToPrev, isFullscreen]);



  useEffect(() => {

    if (isFullscreen) {

      document.body.style.overflow = "hidden";

    } else {

      document.body.style.overflow = "auto";

    }

    return () => {

      document.body.style.overflow = "auto";

    };

  }, [isFullscreen]);



  const handleCategoryClick = (cat: string) => {

    setActiveCategoryPill(cat);

    if (cat === "Todas") {

      setIndex(0);

      return;

    }

    const targetIdx = GALLERY_ITEMS.findIndex((item) => item.category === cat);

    if (targetIdx !== -1) {

      setIndex(targetIdx);

    }

  };



  return (

    <section

      className="laptop-compact relative flex w-full flex-col justify-between overflow-hidden bg-[#F7F4EA] py-4 md:py-6 lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0 lg:py-4"

      id="galeria"

      tabIndex={-1}

    >

      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-between px-4 md:px-12">

        {/* Header com titulo e pílulas de filtro na mesma linha */}

        <motion.div

          className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 mb-2 shrink-0"

          initial={{ opacity: 0, y: 20 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: 0.6, ease: "easeOut" }}

        >

          <div>

            <p className="font-utility text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">

              Registros e Memória

            </p>

            <h2 className="mt-0.5 font-display text-2xl font-bold uppercase leading-tight text-[var(--color-primary)] md:text-3xl lg:text-[clamp(1.7rem,2.3vw,2.5rem)]">

              Galeria da ONG

            </h2>

            <p className="mt-0.5 text-xs text-[var(--foreground)]/72 max-w-xl">

              Registros reais das nossas ações, oficinas, encontros e momentos comunitários.

            </p>

          </div>



          {/* Pílulas de Filtro - Apenas UMA ativa por vez */}

          <div

            className="flex flex-nowrap overflow-x-auto gap-1.5 pb-1 lg:justify-end shrink-0"

            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}

          >

            {CATEGORIES.map((cat) => {

              const isPillActive = activeCategoryPill === cat;

              return (

                <button

                  key={cat}

                  type="button"

                  onClick={() => handleCategoryClick(cat)}

                  className={`shrink-0 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${

                    isPillActive

                      ? "bg-[var(--color-primary)] text-[var(--color-secondary)] border-[var(--color-primary)] shadow-sm"

                      : "bg-white/60 text-[var(--color-primary)] border-[var(--color-primary)]/15 hover:bg-white hover:text-[var(--color-primary)]"

                  }`}

                >

                  {cat}

                </button>

              );

            })}

          </div>

        </motion.div>



        <div className="flex flex-1 flex-col justify-between gap-2 min-h-0">

          {/* Main Visual Carousel with Drag */}

          <div

            className="relative flex-1 w-full min-h-[350px] sm:min-h-[420px] md:min-h-[460px] lg:h-[58vh] lg:min-h-0 rounded-2xl overflow-hidden bg-[var(--color-primary)] group shadow-2xl cursor-pointer"

            ref={containerRef}

            onClick={() => {

              if (!isDragging) setIsFullscreen(true);

            }}

          >

            <motion.div

              className="absolute inset-0 flex w-full h-full"

              drag="x"

              dragElastic={0.2}

              dragMomentum={false}

              onDragStart={() => setIsDragging(true)}

              onDragEnd={(e, info) => {

                setTimeout(() => setIsDragging(false), 50);

                const containerWidth = containerRef.current?.offsetWidth || 1;

                const offset = info.offset.x;

                const velocity = info.velocity.x;



                let newIndex = safeIndex;

                if (Math.abs(velocity) > 500) {

                  newIndex = velocity > 0 ? safeIndex - 1 : safeIndex + 1;

                } else if (Math.abs(offset) > containerWidth * 0.3) {

                  newIndex = offset > 0 ? safeIndex - 1 : safeIndex + 1;

                }



                updateIndex(newIndex);

              }}

              style={{ x }}

            >

              {GALLERY_ITEMS.map((item, i) => (

                <div key={i} className="relative shrink-0 w-full h-full overflow-hidden">

                  <img

                    src={item.src}

                    alt={item.title}

                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"

                    draggable={false}

                  />

                  {/* Gradient Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-10" />



                  {/* Fullscreen Hint Icon */}

                  <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">

                    <Maximize2 className="w-4 h-4" />

                  </div>



                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-8 flex flex-col pointer-events-none z-20">

                    <div className="max-w-2xl text-left">

                      <span className="text-[var(--color-secondary)] font-utility text-xs font-bold tracking-widest mb-1 block uppercase">

                        {item.category} • {String(i + 1).padStart(2, "0")} / {String(GALLERY_ITEMS.length).padStart(2, "0")}

                      </span>

                      <h3 className="text-xl md:text-3xl font-extrabold uppercase text-white mb-1.5 leading-tight">

                        {item.title}

                      </h3>

                      <p className="text-xs md:text-sm text-white/85 line-clamp-2">

                        {item.text}

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </motion.div>



            {/* Nav Controls - Infinite Loop */}

            <button

              type="button"

              onClick={(e) => {

                e.stopPropagation();

                goToPrev();

              }}

              className="absolute left-4 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100"

              aria-label="Anterior"

            >

              <ChevronLeft className="w-5 h-5" />

            </button>



            <button

              type="button"

              onClick={(e) => {

                e.stopPropagation();

                goToNext();

              }}

              className="absolute right-4 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100"

              aria-label="Próximo"

            >

              <ChevronRight className="w-5 h-5" />

            </button>

          </div>



          {/* Animated Expanding Thumbnails Bar */}

          <div className="shrink-0 mt-1">

            <Thumbnails items={GALLERY_ITEMS} index={safeIndex} setIndex={updateIndex} />

          </div>

        </div>

      </div>



      {/* FULLSCREEN LIGHTBOX - Infinite Loop */}

      <AnimatePresence>

        {isFullscreen && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            transition={{ duration: 0.3 }}

            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col"

          >

            {/* Close Button */}

            <div className="flex justify-end p-4 md:p-6 absolute top-0 w-full z-10">

              <button

                type="button"

                onClick={() => setIsFullscreen(false)}

                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"

                aria-label="Fechar galeria"

              >

                <X className="w-6 h-6" />

              </button>

            </div>



            {/* Fullscreen Image Content */}

            <div className="flex-1 relative flex items-center justify-center px-12 pb-24 md:pb-0">

              <div className="relative w-full max-w-6xl h-[65vh] md:h-[75vh]">

                <img

                  src={currentItem.src}

                  alt={currentItem.title}

                  className="w-full h-full object-contain"

                />

              </div>



              <button

                type="button"

                onClick={goToPrev}

                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-10 opacity-100"

              >

                <ChevronLeft className="w-6 h-6" />

              </button>



              <button

                type="button"

                onClick={goToNext}

                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-10 opacity-100"

              >

                <ChevronRight className="w-6 h-6" />

              </button>

            </div>



            {/* Text at Bottom inside Modal */}

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">

              <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">

                <div>

                  <span className="text-[var(--color-secondary)] font-utility text-xs tracking-widest mb-1.5 block uppercase font-bold">

                    {currentItem.category} • {String(safeIndex + 1).padStart(2, "0")} / {String(GALLERY_ITEMS.length).padStart(2, "0")}

                  </span>

                  <h3 className="text-2xl md:text-3xl font-extrabold uppercase text-white mb-1.5 leading-tight">

                    {currentItem.title}

                  </h3>

                  <p className="text-white/80 max-w-2xl text-sm md:text-base">

                    {currentItem.text}

                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>

  );

}

