"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminPartidos from "./components/admin-partidos";
import ModalResultado from "./components/modal-resultado";
import { indexEquipos } from "../lib/api/equipos";
import { getJugadores } from "../lib/api/jugadores";
import { indexPartidos, updatePartido } from "../lib/api/partidos";

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("partidos");

  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [partidos, setPartidos] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    }
  }, []);

  useEffect(() => {
    const fetchEquiposYJugadoresYPartidos = async () => {
      try {
        const equiposResponse = await indexEquipos({ cantidad: 100, pagina: 1 });
        const jugadoresResponse = await getJugadores({ cantidad: 500, pagina: 1 });
        const partidosResponse = await indexPartidos({ cantidad: 100, pagina: 1 });

        setEquipos(equiposResponse.data || []);
        setJugadores(jugadoresResponse.data || []);
        setPartidos(partidosResponse.data || []);
      } catch (e) {
        console.error("Error cargando datos:", e);
      }
    };

    if (isAuthenticated) fetchEquiposYJugadoresYPartidos();
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validCode = process.env.CLAVE_ADMIN;
    if (code === validCode) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Código incorrecto");
    }
  };

  const handleEditarResultado = (partido) => {
    const actualizado = partidos.find((p) => p.id === partido.id) || partido;
    setPartidoSeleccionado(actualizado);
    setMostrarModal(true);
  };

  const getEquipoById = (id) => equipos.find((e) => e.id === id) || { nombre: "Desconocido" };
  const getJugadorById = (id) => jugadores.find((j) => j.id === id) || { nombre: "Sin nombre", equipoId: null };
  const getJugadoresByEquipo = (equipoId) => jugadores.filter((j) => j.equipoId === equipoId);

  const handleActualizarPartido = async () => {
    try {
      const response = await indexPartidos({ cantidad: 100, pagina: 1 });
      setPartidos(response.data || []);

      if (partidoSeleccionado) {
        const actualizado = response.data.find((p) => p.id === partidoSeleccionado.id);
        if (actualizado) setPartidoSeleccionado(actualizado);
      }
    } catch (error) {
      console.error("Error actualizando lista de partidos", error);
    }
  };

  const guardarResultadoFinal = async (partidoId, resultado) => {
    try {
      await updatePartido({ id: partidoId, resultado, estado:"JUGADO" });
      await handleActualizarPartido();
    } catch (error) {
      console.error("Error actualizando resultado final", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {console.log("partidosres", partidos)}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Acceso Administrador</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Código de acceso
              </label>
              <input
                id="code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingresa el código"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Panel de Administración</h1>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            setIsAuthenticated(false);
          }}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex mb-6 border-b">
          {[
            { id: "partidos", label: "Partidos" },
          ].map(({ id, label }) => (
            <button
              key={id}
              className={`px-4 py-2 ${
                activeTab === id ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-600"
              }`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
        {activeTab === "partidos" && (
          <AdminPartidos
            onEditarResultado={handleEditarResultado}
            visible
            partidos={partidos}
            setPartidos={setPartidos}
          />
        )}
      </main>

      {mostrarModal && partidoSeleccionado && (
        <ModalResultado
          partido={partidoSeleccionado}
          onCerrar={() => setMostrarModal(false)}
          onActualizarPartido={handleActualizarPartido}
          onFinalizarPartido={guardarResultadoFinal}
        />
      )}
    </div>
  );
}
