import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-white">
      {/* SECCIÓN 1: Gradiente hasta el título */}
      <div className="sm:hidden fondo-gradiente sm:w-[650px] sm:h-[650px] sm:rounded-full sm:bg-gradient-to-br px-8 py-10 text-center pb-10 flex flex-col items-center justify-center sm:mx-auto sm:overflow-hidden">
        <Image
          className="mx-auto sm:mx-0 md:w-96 lg:w-[400px]"
          src="/assets/logo_unsta.svg"
          alt="Logo"
          width={250}
          height={1}
          priority
        />
        <h1 className="sm:text-xl text-sm font-bold tracking-[-.01em] mt-7 pb-3">
          CHANGE THE GAME
        </h1>
        <ul className="text-center text-xl sm:text-left mt-font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em] sm:text-lg">
            ¡Arranca el Torneo de Fútbol de la Semana de la Ingeniería! ⚽🔧
          </li>
        </ul>
      </div>

      {/* SECCIÓN 2: Video de fondo con contenido encima */}
      <div className="relative min-h-[400px] sm:min-h-full sm:w-full sm:h-screen overflow-hidden">
        {/* VIDEO DE FONDO */}
        <video
          className="absolute top-0 left-0 w-full h-100 sm:h-full object-cover z-[-2]"
          src="/assets/fondo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[-1]" />
        {/* TRANSICIÓN SUPERPUESTA */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#250700] to-transparent z-[-1]" />

        <div className="fondo-gradiente2 hidden sm:flex sm:flex-block sm:absolute sm:top-1/3 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[600px] sm:h-[600px] sm:rounded-full sm:bg-orange-500 sm:flex sm:flex-col sm:items-center sm:justify-center sm:text-white sm:text-center sm:z-10">
          <Image
            className="mx-auto max-w-[90%] h-auto sm:mb-10"
            src="/assets/logo_unsta.svg"
            alt="Logo ING UNSTA"
            width={250}
            height={1}
            priority
          />
          <p className="text-lg mt-2">CHANGE THE GAME</p>
          <p className="text-sm mt-1">
            ¡Arranca el Torneo de Fútbol de la Semana de la Ingeniería! ⚽🔧
          </p>
        </div>
        {/* CONTENIDO ENCIMA DEL VIDEO (BOTONES) */}
        <div className="sm:absolute sm:bottom-50 sm:w-full relative z-20 px-8 py-3 mt-10 sm:flex sm:gap-10 sm:justify-center">
          <div className="flex gap-2 items-center flex-col sm:flex-row mt-4">
            <Link
              className="bg-white text-black px-11 py-2 rounded-xl font-medium"
              href="/fixture"
            >
              VER FIXTURE
            </Link>
            <Link
              className="bg-white text-black px-10 py-2 rounded-xl font-medium"
              href="#"
            >
              GOLEADORES
            </Link>
            <Link
              className="bg-white text-black px-14 py-2 rounded-xl font-medium"
              href="#"
            >
              CANCHAS
            </Link>
          </div>
        </div>
        <div className="sm:absolute sm:bottom-16 sm:w-full text-xl mt-10 text-center z-20">
          #SemanaIngenieriaUNSTA
        </div>
      </div>

      <main className="fondo-gradiente-alrevez">
        <div className="w-full py-10"></div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer> */}
    </div>
  );
}
