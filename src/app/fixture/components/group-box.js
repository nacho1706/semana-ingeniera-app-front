"use client";

import { indexEquipos } from "../../../app/lib/api/equipos";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function GroupBox({ groupNumber }) {

const [equiposGrupo, setEquiposGrupo] = useState([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await indexEquipos({ cantidad: 4, pagina: 1, grupo: groupNumber });
        const equipos = response.data;

        setEquiposGrupo(equipos);
      } catch (error) {
        console.error("Error al cargar los equipos:", error);
      }
    };

    fetchEquipos();
  }, [groupNumber]);

return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden pb-6 sm:pb-16">
        <div className="bg-white p-2 text-center">
            <h2 className="font-bold text-lg">GRUPO {groupNumber}</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2">
        {equiposGrupo.map((equipo) => (
          <div key={equipo.id} className="flex flex-col items-center">
            <Image
              className="w-16 h-16 sm:h-32"
              src={`/teams/${equipo.nombre}.svg` || "/teams/escudo_test.svg"}
              width={64}
              height={64}
              alt={`Escudo de ${equipo.nombre}`}
            />
            <div className="mt-3"></div>
            {/* <span className="mt-2 text-center text-sm">{equipo.nombre}</span> */}
          </div>
        ))}
      </div>
    </div>
)
}