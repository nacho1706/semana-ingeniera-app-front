import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import PartidoFecha from "./components/PartidoFecha";

export default function GrupoDetalle({ params }) {
  const { id } = params;

  // Datos de ejemplo para los equipos con puntos y estadísticas
  const equipos = [
    {
      id: 1,
      nombre: "Equipo Azul",
      tipo: "striped-blue",
      puntos: 9,
      pj: 4,
      pg: 3,
      pe: 0,
      pp: 1,
      gf: 2,
    },
    {
      id: 2,
      nombre: "Equipo Rojo",
      tipo: "red",
      puntos: 7,
      pj: 4,
      pg: 2,
      pe: 1,
      pp: 1,
      gf: 2,
    },
    {
      id: 3,
      nombre: "Equipo Naranja",
      tipo: "striped-orange",
      puntos: 4,
      pj: 4,
      pg: 1,
      pe: 1,
      pp: 2,
      gf: 2,
    },
    {
      id: 4,
      nombre: "Equipo Negro",
      tipo: "striped-black",
      puntos: 1,
      pj: 4,
      pg: 0,
      pe: 1,
      pp: 3,
      gf: 2,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FF5501] to-[#FE3104] text-black">
      <header className="p-4 flex items-center">
        <Link href="/fixture" className="text-white mr-4">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-white text-2xl font-bold">GRUPO {id}</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">Equipos</h2>

          {/* Tabla de posiciones */}
          <div className="overflow-x-auto sm:flex sm:justify-center">
            <table className="w-full sm:w-200 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left pr-16">Equipo</th>
                  <th className="p-2 text-center">PTS</th>
                  <th className="p-2 text-center">PJ</th>
                  <th className="p-2 text-center">PG</th>
                  <th className="p-2 text-center">PE</th>
                  <th className="p-2 text-center">PP</th>
                  <th className="p-2 text-center">GF</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((equipo) => (
                  <tr key={equipo.id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <Image
                            className="w-16 h-16 mx-auto sm:h-32"
                            src="/teams/escudo_test.svg"
                            width={64}
                            height={64}
                            alt={`Equipo 3 del grupo ${equipo.tipo}`}
                          />
                        </div>
                        <span className="text-sm">{equipo.nombre}</span>
                      </div>
                    </td>
                    <td className="p-2 text-center font-bold">
                      {equipo.puntos}
                    </td>
                    <td className="p-2 text-center">{equipo.pj}</td>
                    <td className="p-2 text-center">{equipo.pg}</td>
                    <td className="p-2 text-center">{equipo.pe}</td>
                    <td className="p-2 text-center">{equipo.pp}</td>
                    <td className="p-2 text-center">{equipo.gf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-gray-500 mb-4">
            <p>
              PTS: Puntos, PJ: Partidos jugados, PG: Partidos ganados, PE:
              Partidos empatados, PP: Partidos perdidos, GF: Goles a favor,
            </p>
          </div>
        </div>

        {/* Sección de partidos */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4 text-center">Partidos</h2>
          <div className="space-y-3">
            <PartidoFecha/>
            <PartidoFecha/>
          </div>
        </div>
      </main>
    </div>
  );
}
