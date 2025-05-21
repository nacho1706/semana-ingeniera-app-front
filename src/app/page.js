import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-white">
      {/* SECCIÓN 1: Gradiente hasta el título */}
      <div className="fondo-gradiente px-8 py-10 text-center sm:text-left pb-10">
        <Image
          className="dark:invert mx-auto sm:mx-0"
          src="/assets/logo_unsta.svg"
          alt="Logo"
          width={250}
          height={1}
          priority
        />
        <h1 className="sm:text-3xl text-sm font-bold tracking-[-.01em] mt-7 pb-3">
          CHANGE THE GAME
        </h1>
        <ul className="text-sm/6 text-center text-xl sm:text-left mt-font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            ¡Arranca el Torneo de Fútbol de la Semana de la Ingeniería! ⚽🔧
          </li>
        </ul>
      </div>

      {/* SECCIÓN 2: Video de fondo con contenido encima */}
      <div className="relative min-h-screen overflow-hidden">
        {/* VIDEO DE FONDO */}
        <video
          className="absolute top-0 left-0 w-full h-100 object-cover z-[-2]"
          src="/assets/fondo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[-1]" />
        {/* TRANSICIÓN SUPERPUESTA */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#250700] to-transparent z-[-1]" />
        <div className="absolute bottom-110 left-0 w-full h-32 bg-gradient-to-t from-[#250700] to-transparent z-[-1]" />
        {/* CONTENIDO ENCIMA DEL VIDEO */}
        <div className="relative z-10 px-8 py-3 mt-10">
          <div className="flex gap-2 items-center flex-col sm:flex-row mt-4">
            <a
              className="bg-white text-black px-11 py-2 rounded-xl font-medium"
              href="#"
            >
              VER FIXTURE
            </a>
            <a
              className="bg-white text-black px-10 py-2 rounded-xl font-medium"
              href="#"
            >
              GOLEADORES
            </a>
            <a
              className="bg-white text-black px-14 py-2 rounded-xl font-medium"
              href="#"
            >
              CANCHAS
            </a>
          </div>

          <div className="text-xl mt-10 text-center">
            #SemanaIngenieriaUNSTA
          </div>
        </div>
        
        <main className="fondo-gradiente-alrevez px-8 py-30 mt-30"></main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </div>
  );
}
