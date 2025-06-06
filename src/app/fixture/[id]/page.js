"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import PartidoFecha from "./components/PartidoFecha";
import { useEffect, useState } from "react";
import { indexEquipos } from "../../lib/api/equipos";
import { indexPartidos } from "../../lib/api/partidos";

export default function GrupoDetalle({ params }) {
  const { id } = params;
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePartidos = await indexPartidos({
          cantidad: 20,
          pagina: 1,
          grupo: id,
        });
        const partidos = responsePartidos.data;

        const responseEquipos = await indexEquipos({
          cantidad: 10,
          pagina: 1,
          grupo: id,
          puntero: 1,
        });
        let equipos = responseEquipos.data;

        equipos.sort((a, b) => {
          if (b.puntos === a.puntos) {
            return b.GF - a.GF;
          }
          return b.puntos - a.puntos;
        });

        setEquipos(equipos);
        setEquipos(equipos);
        setPartidos(partidos);
      } catch (error) {
        console.error("Error al obtener los datos del grupo:", error);
      }
    };

    fetchData();
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
        <div className="sm:flex sm:justify-center">
          {/* TARJETA “Equipos” con ancho máximo y centrado */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 w-full sm:w-3/4 lg:w-2/3 mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Equipos</h2>

            {/* Tabla de posiciones */}
            <div className="overflow-x-auto">
              <table className="table-fixed min-w-full mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    {/* Esta columna ocupa el 40% del ancho total */}
                    <th className="w-2/5 pr-24 p-2 text-left align-middle">
                      Equipo
                    </th>
                    <th className="p-2 text-center align-middle">PTS</th>
                    <th className="p-2 text-center align-middle">PJ</th>
                    <th className="p-2 text-center align-middle">PG</th>
                    <th className="p-2 text-center align-middle">PE</th>
                    <th className="p-2 text-center align-middle">PP</th>
                    <th className="p-2 text-center align-middle">GF</th>
                    <th className="p-2 text-center align-middle">GC</th>
                    <th className="p-2 text-center align-middle">DG</th>
                  </tr>
                </thead>
                <tbody>
                  {equipos.map((equipo) => (
                    <tr key={equipo.id} className="border-b min-h-[64px]">
                      <td className="p-2 align-middle">
                        <div className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            <Image
                              src={`/teams/${equipo.nombre}.svg`}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-contain"
                              alt={`Escudo de ${equipo.nombre}`}
                            />
                          </div>
                          <span className="text-xs font-medium break-words max-w-[120px]">
                            {equipo.nombre}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 text-center font-bold align-middle">
                        {equipo.puntos}
                      </td>
                      <td className="p-2 text-center align-middle">
                        {equipo.PJ}
                      </td>
                      <td className="p-2 text-center align-middle">
                        {equipo.PG}
                      </td>
                      <td className="p-2 text-center align-middle">
                        {equipo.PE}
                      </td>
                      <td className="p-2 text-center align-middle">
                        {equipo.PP}
                      </td>
                      <td className="p-2 text-center align-middle">
                        {equipo.GF}
                      </td>
                      <td className="p-2 text-center align-middle">
                        {equipo.GC}
                      </td>
                      <td className="p-2 text-center align-middle">
                        {equipo.DG}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-gray-500 mb-4 text-center">
              <p>
                PTS: Puntos, PJ: Partidos jugados, PG: Partidos ganados, PE:
                Partidos empatados, PP: Partidos perdidos, GF: Goles a favor,
                DG: Diferencia de goles
              </p>
            </div>
          </div>
        </div>

        {/* Sección de partidos */}
        <div className="bg-white rounded-lg shadow-md p-4 w-full sm:w-3/4 lg:w-2/3 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Partidos</h2>
          <div className="space-y-3">
            {partidos.map((partido, index) => (
              <PartidoFecha
                key={partido.id || index}
                partido={partido}
                equipos={equipos}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
