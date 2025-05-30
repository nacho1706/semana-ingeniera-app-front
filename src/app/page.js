"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] text-white">
      {/* SECCIÓN 1: Gradiente hasta el título */}
      <div className="sm:hidden fondo-gradiente px-8 py-10 text-center pb-10 flex flex-col items-center justify-center sm:mx-auto sm:w-[650px] sm:h-[650px] sm:rounded-full sm:bg-gradient-to-br sm:overflow-hidden">
        <Image
          className="mx-auto sm:mx-0 md:w-96 lg:w-[400px]"
          src="/assets/logo_unsta.svg"
          alt="Logo"
          width={250}
          height={1}
          priority
        />
        <h1 className="text-sm sm:text-xl font-bold tracking-[-.01em] mt-7 pb-3">
          CHANGE THE GAME
        </h1>
        <ul className="text-xl sm:text-left mt-font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em] sm:text-lg">
            ¡Arranca el Torneo de Fútbol de la Semana de la Ingeniería! ⚽🔧
          </li>
        </ul>
      </div>

      {/* SECCIÓN 2: Video de fondo con contenido encima */}
      <div className="relative min-h-[400px] sm:min-h-full sm:h-screen overflow-hidden">
        {/* VIDEO DE FONDO */}
        <video
          className="absolute top-0 left-0 w-full h-100 sm:h-full object-cover z-[-2]"
          src="/assets/fondo.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[-1]" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#250700] to-transparent z-[-1]" />

        <div className="hidden sm:flex sm:absolute sm:top-1/3 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[600px] sm:h-[600px] sm:rounded-full sm:bg-orange-500 sm:flex-col sm:items-center sm:justify-center sm:text-white sm:text-center sm:z-10">
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
        <div className="relative z-20 px-8 py-3 mt-10 sm:absolute sm:bottom-50 sm:w-full sm:flex sm:gap-10 sm:justify-center">
          <div className="flex flex-col items-center gap-2 sm:flex-row mt-4">
            <Link
              href="/fixture"
              className="bg-white text-black px-11 py-2 rounded-xl font-medium"
            >
              VER FIXTURE
            </Link>
            <Link
              href="/goleadores"
              className="bg-white text-black px-10 py-2 rounded-xl font-medium"
            >
              GOLEADORES
            </Link>
            <Link
              href="#"
              className="bg-white text-black px-14 py-2 rounded-xl font-medium"
            >
              CANCHAS
            </Link>
          </div>
        </div>
        <div className="sm:absolute sm:bottom-16 sm:w-full text-xl mt-10 text-center z-20">
          #SemanaIngenieriaUNSTA
        </div>
      </div>

      {/* <main className="fondo-gradiente-alrevez">
        <div className="w-full py-10"></div>
      </main> */}

      {/* otras secciones */}
      <footer className="py-4 flex justify-end items-center bg-black px-8">
        <Link href="https://www.linkedin.com/in/ignacio-albarracin" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-gray-300">
          <Linkedin size={20} />
          <span className="ml-2 text-sm">Developed by Ignacio Albarracin</span>
        </Link>
      </footer>
    </div>
);
}
