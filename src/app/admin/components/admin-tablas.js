import React from "react";
import { indexEquipos } from "../../lib/api/equipos";
import { useState, useEffect } from "react";
import Image from "next/image";

const AdminTablas = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEquipos = await indexEquipos({
          cantidad: 100,
          pagina: 1,
          puntero: 1,
        });
        const equipos = responseEquipos.data;
        setEquipos(equipos);
      } catch (error) {
        console.error("Error al obtener los datos del grupo:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
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
                        src={
                          `/teams/${equipo.nombre}.svg` ||
                          "/teams/escudo_test.svg"
                        }
                        width={64}
                        height={64}
                        alt={`Escudo de ${equipo.nombre}`}
                      />
                    </div>
                    <span className="text-sm">{equipo.nombre}</span>
                  </div>
                </td>
                <td className="p-2 text-center font-bold">{equipo.puntos}</td>
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
    </div>
  );
};

export default AdminTablas;
