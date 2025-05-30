// app/goleadores/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getJugadores } from "../../lib/api/jugadores";
import { indexEquipos } from "../../lib/api/equipos";

export default function EquipoGolesPage() {
  const { id: equipoId } = useParams();       // debe venir de app/…
  const [jugadores, setJugadores] = useState([]);
  const [equipo, setEquipo] = useState(null);

  // 1) Carga jugadores
  useEffect(() => {
    if (!equipoId) return;
    (async () => {
      const res = await getJugadores({
        cantidad: 15,
        pagina: 1,
        id_equipo: equipoId,              // OK: string o number
      });
      setJugadores(res.data || []);
    })();
  }, [equipoId]);

  // 2) Carga datos del equipo
  useEffect(() => {
    if (!equipoId) return;
    (async () => {
      const res = await indexEquipos({
        cantidad: 1,
        pagina: 1,
        id: [equipoId],                     // ← ¡no como [equipoId]!
      });
      setEquipo(res.data?.[0] || null);
    })();
  }, [equipoId]);

  if (!equipo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#ffaa8d] via-[#ff7f5c] to-[#ff5533] flex items-center justify-center">
        <p className="text-white text-lg">Cargando datos del equipo…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffaa8d] via-[#ff7f5c] to-[#ff5533] text-white">
      <header className="p-4 flex items-center">
        <Link href="/goleadores" className="flex items-center">
          <ArrowLeft size={24} className="mr-2" />
          <span>Volver</span>
        </Link>
      </header>

      <main className="py-8 px-4">
        {/* Logo y título */}
        <div className="text-center mb-6">
          <Image
            src={`/teams/${equipo.nombre}.svg`}
            alt={`Logo de ${equipo.nombre}`}
            width={96}
            height={96}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold">{equipo.nombre}</h1>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg text-black">
            <thead className="bg-orange-500">
              <tr>
                <th className="p-3 text-left text-white">#</th>
                <th className="p-3 text-left text-white">Jugador</th>
                <th className="p-3 text-center text-white">Goles</th>
              </tr>
            </thead>
            <tbody>
              {jugadores.length > 0 ? (
                jugadores.map((j, idx) => (
                  <tr
                    key={j.id}
                    className={
                      idx % 2 === 0
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "bg-white hover:bg-gray-100"
                    }
                  >
                    <td className="p-3 font-medium text-gray-700">{idx + 1}</td>
                    <td className="p-3 text-gray-800">{j.nombre}</td>
                    <td className="p-3 text-center font-semibold text-green-600">
                      {j.goles}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No hay datos de goles para este equipo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
