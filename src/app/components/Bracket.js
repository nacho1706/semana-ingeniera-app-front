import { Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BracketOro() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 py-8 px-4 sm:p-8">
      {/* === HEADER === */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl md:text-3xl font-light tracking-wider mb-2">
          EL CAMINO AL TÍTULO
        </h1>
        <div className="text-red-500 text-xl md:text-2xl font-bold mb-4">
          SEMANA INGENIERIA
        </div>
        <div className="flex items-center justify-center">
          <h2 className="text-white text-lg md:text-xl font-semibold tracking-wide">
            CUARTOS DE FINAL
          </h2>
          <div className="ml-2">
            <Trophy size={24} className="mx-auto text-yellow-500" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[1420px] mx-auto text-center mb-8">
          {/* GRID PRINCIPAL */}
          <div
            className="mt-6 sm:ml-0 grid grid-cols-[130px_130px_130px_130px_130px_130px_130px_130px_130px_130px_130px] grid-rows-[130px_130px_130px_130px_130px] gap-0 sm:justify-center"
            style={{ minWidth: "1430px" }}
          >
            <div className="col-start-1 row-start-1 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/LA MASIA FC.svg"}
                  alt="Equipo A"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            {/** Vertical que une A y B (fila1→fila2) **/}
            <div className="col-start-2 row-start-1 -row-span-2 flex items-end justify-center align-bottom">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            <div className="col-start-2 row-start-2 flex items-start justify-center">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            {/** Horizontal que une vertical con semifinal (fila2, col2→col3) **/}
            <div className="col-start-2 row-start-2 flex justify-center items-center">
              <div className=" bg-gray-400 w-full h-px"></div>
            </div>
            <div className="col-start-2 row-start-1 flex justify-baseline items-center">
              <div className=" bg-gray-400 w-1/2 h-px"></div>
            </div>
            {/** Logo Semifinal Superior (fila2, col3) **/}
            <div className="col-start-3 row-start-2 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/ADOBE FC.svg"}
                  alt="Semifinal 1"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="col-start-4 row-start-2 -row-span-2 flex items-end justify-center align-bottom">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            <div className="col-start-4 row-start-2 flex items-center justify-baseline">
              <div className="w-1/2 bg-gray-400 h-px"></div>
            </div>

            {/* =========== FILA 2 (Equipo B) =========== */}
            <div className="col-start-1 row-start-2 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/ADOBE FC.svg"}
                  alt="Equipo B"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* === FILA 3: Solo “espacio” para centrar la final entre semifinales superiores e inferiores === */}
            {/** Aquí va el logo de la FINAL (col5, fila3) **/}
            <div className="col-start-5 row-start-3 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/default.svg"}
                  alt="FINAL"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* =========== FILA 4 (Equipo C) =========== */}
            <div className="col-start-1 row-start-4 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/DOMINIO X+2.svg"}
                  alt="Equipo C"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            {/** Vertical que une C y D (fila4→fila5, col2) **/}
            <div className="col-start-2 row-start-4 -row-span-2 flex items-end justify-center align-bottom">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            <div className="col-start-2 row-start-5 flex items-start justify-center">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            {/** Horizontal que une vertical con semifinal (fila2, col2→col3) **/}
            <div className="col-start-2 row-start-4 flex justify-center items-center">
              <div className=" bg-gray-400 w-full h-px"></div>
            </div>
            <div className="col-start-2 row-start-5 flex justify-baseline items-center">
              <div className=" bg-gray-400 w-1/2 h-px"></div>
            </div>
            {/** Logo Semifinal Inferior (fila5, col3) **/}
            <div className="col-start-3 row-start-4 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/EDIPO.svg"}
                  alt="Semifinal 2"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/** Conector a la final: Horizontal (fila5, col4) **/}
            <div className="col-start-4 row-start-4 -row-span-2 flex justify-center">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            <div className="col-start-4 row-start-4 flex items-center justify-baseline">
              <div className="w-1/2 bg-gray-400 h-px"></div>
            </div>
            <div className="col-start-4 row-start-3 -row-span-2 flex justify-center">
              <div className="w-px bg-gray-400 h-full"></div>
            </div>
            <div className="col-start-4 row-start-3 flex items-center justify-end">
              <div className="w-1/2 bg-gray-400 h-px"></div>
            </div>
            {/** Nota: columna 4, fila2→fila4 ya está dibujado con border-l arriba (no se repite) */}

            {/* =========== FILA 5 (Equipo D) =========== */}
            <div className="col-start-1 row-start-5 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/EDIPO.svg"}
                  alt="Equipo D"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* segunda mitad  ================================================================================================================================*/}

            <div className="col-start-11 row-start-1 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/ARQUERO FANTASMA.svg"}
                  alt="Equipo A"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            {/** Vertical que une A y B (fila1→fila2) **/}
            <div className="col-start-10 row-start-1 -row-span-2 flex items-end justify-center align-bottom">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            <div className="col-start-10 row-start-2 flex items-start justify-center">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            {/** Horizontal que une vertical con semifinal (fila2, col2→col3) **/}
            <div className="col-start-10 row-start-2 flex justify-center items-center">
              <div className=" bg-gray-400 w-full h-px"></div>
            </div>
            <div className="col-start-10 row-start-1 flex justify-end items-center">
              <div className=" bg-gray-400 w-1/2 h-px"></div>
            </div>
            {/** Logo Semifinal Superior (fila2, col3) **/}
            <div className="col-start-9 row-start-2 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/WARESOFT.svg"}
                  alt="Semifinal 1"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="col-start-8 row-start-2 -row-span-2 flex items-end justify-center align-bottom">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            <div className="col-start-8 row-start-2 flex items-center justify-end">
              <div className="w-1/2 bg-gray-400 h-px"></div>
            </div>

            {/* =========== FILA 2 (Equipo B) =========== */}
            <div className="col-start-11 row-start-2 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/WARESOFT.svg"}
                  alt="Equipo B"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* === FILA 3: Solo “espacio” para centrar la final entre semifinales superiores e inferiores === */}
            {/** Aquí va el logo de la FINAL (col5, fila3) **/}
            <div className="col-start-11 row-start-4 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/EVOLUTIONS FC.svg"}
                  alt="FINAL"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* =========== FILA 4 (Equipo C) =========== */}
            <div className="col-start-11 row-start-5 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/SAN SOCALO.svg"}
                  alt="Equipo C1"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            {/** Vertical que une C y D (fila4→fila5, col2) **/}
            <div className="col-start-10 row-start-4 -row-span-2 flex items-end justify-center align-bottom">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            <div className="col-start-10 row-start-5 flex items-start justify-center">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            {/** Horizontal que une vertical con semifinal (fila2, col2→col3) **/}
            <div className="col-start-10 row-start-4 flex justify-center items-center">
              <div className=" bg-gray-400 w-full h-px"></div>
            </div>
            <div className="col-start-10 row-start-5 flex justify-end items-center">
              <div className=" bg-gray-400 w-1/2 h-px"></div>
            </div>
            {/** Logo Semifinal Inferior (fila5, col3) **/}
            <div className="col-start-9 row-start-4 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/EVOLUTIONS FC.svg"}
                  alt="Semifinal 2"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/** Conector a la final: Horizontal (fila5, col4) **/}
            <div className="col-start-8 row-start-4 -row-span-2 flex justify-center">
              <div className="w-px bg-gray-400 h-1/2"></div>
            </div>
            <div className="col-start-8 row-start-4 flex items-center justify-end">
              <div className="w-1/2 bg-gray-400 h-px"></div>
            </div>
            <div className="col-start-8 row-start-3 -row-span-2 flex justify-center">
              <div className="w-px bg-gray-400 h-full"></div>
            </div>
            <div className="col-start-8 row-start-3 flex items-center justify-start">
              <div className="w-1/2 bg-gray-400 h-px"></div>
            </div>
            {/** Nota: columna 4, fila2→fila4 ya está dibujado con border-l arriba (no se repite) */}

            {/* =========== FILA 5 (Equipo D) =========== */}
            <div className="col-start-7 row-start-3 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shadow-lg relative">
                <Image
                  src={"/teams/default.svg"}
                  alt="Equipo D"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <div className="col-start-6 row-start-3 flex items-center justify-center">
              <div className="w-1/2 bg-gray-400 h-px"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Link
          href="eliminatorias/oro"
          className="bg-white text-black px-10 py-2 rounded-xl font-medium"
        >
          VER DETALLES GRUPO
        </Link>
      </div>
    </div>
  );
}
