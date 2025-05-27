"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import PartidoFecha from "./components/PartidoFecha";
import { useEffect, useState } from "react";
import { indexEquipos } from "../../lib/api/equipos";

export default function GrupoDetalle({ params }) {
  const { id } = params;
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await indexEquipos({ cantidad: 4, pagina: 1, grupo: id, puntero: 1});
        const equipos = response.data;
        setEquipos(equipos);

        const response2 = await 
      } catch (error) {
        console.error("Error al obtener los equipos del grupo:", error);
      }
    };

    fetchEquipos();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FF5501] to-[#FE3104] text-black">
      <header className="p-4 flex items-center">
        <Link href="/fixture" className="text-white mr-4">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-white text-2xl font-bold">GRUPO {id}</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="sm:flex sm:flex-row sm:justify-center sm:align-center">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">Equipos</h2>

            {/* Tabla de posiciones */}
            <div className="overflow-x-auto sm:flex sm:justify-center sm:px-10">
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
                    <th className="p-2 text-center">DG</th>
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
                              src={`/teams/${equipo.nombre}.svg` || "/teams/escudo_test.svg"}
                              width={64}
                              height={64}
                              alt={`Equipo 3 del grupo ${equipo}`}
                            />
                          </div>
                          <span className="text-sm">{equipo.nombre}</span>
                        </div>
                      </td>
                      <td className="p-2 text-center font-bold">
                        {equipo.puntos}
                      </td>
                      <td className="p-2 text-center">{equipo.PJ}</td>
                      <td className="p-2 text-center">{equipo.PG}</td>
                      <td className="p-2 text-center">{equipo.PE}</td>
                      <td className="p-2 text-center">{equipo.PP}</td>
                      <td className="p-2 text-center">{equipo.GF}</td>
                      <td className="p-2 text-center">{equipo.DG}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-gray-500 mb-4 sm:flex sm:justify-center">
              <p>
                PTS: Puntos, PJ: Partidos jugados, PG: Partidos ganados, PE:
                Partidos empatados, PP: Partidos perdidos, GF: Goles a favor,
              </p>
            </div>
          </div>
        </div>
        {/* Sección de partidos */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4 text-center">Partidos</h2>
          <div className="space-y-3">
            <PartidoFecha equipos={equipos}/>
          </div>
        </div>
      </main>
    </div>
  );
}
