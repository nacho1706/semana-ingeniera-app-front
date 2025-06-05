"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PartidoFecha from "../../fixture/[id]/components/PartidoFecha";
import { indexPartidos } from "../../lib/api/partidos";
import { indexEquipos } from "../../lib/api/equipos";

export default function GrupoDetalle({ params }) {
  const { categoria } = params;
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [id, setId] = useState("");

  // 1) Asigna el id según la categoría, solo una vez al montar o cuando cambie "categoria"
  useEffect(() => {
    switch (categoria) {
      case "oro":
        setId("9");
        break;
      case "plata":
        setId("10");
        break;
      case "bronce":
        setId("11");
        break;
      default:
        setId("");
    }
  }, [categoria]);

  useEffect(() => {
    if (id === "") {
      return;
    }

    const fetchData = async () => {
      try {
        const responsePartidos = await indexPartidos({
          cantidad: 30,
          pagina: 1,
          fecha_array: ["2025-06-05", "2025-06-06", "2025-06-07"],
        });
        const partidosData = responsePartidos.data;
        console.log("partidos:", partidosData);

        const responseEquipos = await indexEquipos({
          cantidad: 10,
          pagina: 1,
          puntero: 1,
        });
        const equiposData = responseEquipos.data;

        setEquipos(equiposData);
        setPartidos(partidosData);
      } catch (error) {
        console.error("Error al obtener los datos del grupo:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FF5501] to-[#FE3104] text-black">
      <header className="p-4 flex items-center">
        <Link href="/" className="text-white mr-4">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-white text-2xl font-bold">{/* título opcional */}</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 w-full sm:w-3/4 lg:w-2/3 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Partidos</h2>
          <div className="space-y-3">
            {partidos.map((partido, index) => (
              <PartidoFecha
                key={partido.id ?? index}
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
