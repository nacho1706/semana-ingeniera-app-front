"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminPartidos from "./components/admin-partidos";
import ModalResultado from "./components/modal-resultado";
import AdminTablas from "./components/admin-tablas";
import { indexEquipos } from "../lib/api/equipos";
import { indexPartidos, updatePartido } from "../lib/api/partidos";
import { getJugadores } from "../lib/api/jugadores";

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("partidos");

  const [equipos, setEquipos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [partidos, setPartidos] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);

  // Inicializar estado de autenticación desde localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    }
  }, []);

  // Cargar datos tras autenticación
  useEffect(() => {
    async function fetchDatos() {
      try {
        const equiposRes = await indexEquipos({ cantidad: 100, pagina: 1 });
        const jugadoresRes = await getJugadores({ cantidad: 500, pagina: 1 });
        const partidosRes = await indexPartidos({ cantidad: 100, pagina: 1 });

        setEquipos(equiposRes.data || []);
        setJugadores(jugadoresRes.data || []);
        setPartidos(partidosRes.data || []);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    }

    if (isAuthenticated) {
      fetchDatos();
    }
  }, [isAuthenticated]);

  // Manejar login
  const handleSubmit = (e) => {
    e.preventDefault();
    const validCode = process.env.NEXT_PUBLIC_CLAVE_ADMIN;
    if (code === validCode) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Código incorrecto");
    }
  };

  // Cuando se pide editar un resultado
  const handleEditarResultado = (partido) => {
    setPartidoSeleccionado(
      partidos.find((p) => p.id === partido.id) || partido
    );
    setMostrarModal(true);
  };

  // Refrescar lista de partidos y el seleccionado
  const handleActualizarPartido = async () => {
    try {
      const res = await indexPartidos({ cantidad: 100, pagina: 1 });
      setPartidos(res.data || []);
      if (partidoSeleccionado) {
        const actualizado = res.data.find((p) => p.id === partidoSeleccionado.id);
        if (actualizado) setPartidoSeleccionado(actualizado);
      }
    } catch (err) {
      console.error("Error actualizando partidos:", err);
    }
  };

  // Guardar el resultado final
  const guardarResultadoFinal = async (partidoId, resultado) => {
    try {
      await updatePartido({ id: partidoId, resultado, estado: "JUGADO" });
      await handleActualizarPartido();
    } catch (err) {
      console.error("Error guardando resultado:", err);
    }
  };

  // Mostrar formulario de login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Acceso Administrador</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="code" className="text-sm font-medium text-gray-700">
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

  // Panel de administración
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <ArrowLeft className="h-5 w-5 mr-4 cursor-pointer" />
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
        {/* Navegación de pestañas */}
        <div className="flex mb-6 border-b">
          {[
            { id: "partidos", label: "Partidos" },
            { id: "equipos",  label: "Equipos"  },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 ${
                activeTab === id
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contenido de cada pestaña */}
        {activeTab === "partidos" && (
          <AdminPartidos
            onEditarResultado={handleEditarResultado}
            visible={true}
            partidos={partidos}
            setPartidos={setPartidos}
          />
        )}
        {activeTab === "equipos" && (
          <AdminTablas />
        )}
      </main>

      {/* Modal de resultado */}
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
