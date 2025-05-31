"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PlusCircle, Filter, XCircle } from "lucide-react";
import { createPartido, indexPartidos, deletePartido } from "../../lib/api/partidos";
import { indexEquipos } from "../../lib/api/equipos";

export default function AdminPartidos({ onEditarResultado, visible = true }) {
  // — Hooks siempre al tope —
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [filtroGrupo, setFiltroGrupo] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [showPartidoForm, setShowPartidoForm] = useState(false);
  const [nuevoPartido, setNuevoPartido] = useState({
    grupo: "",
    equipo1Id: "",
    equipo2Id: "",
    fecha: "",
    cancha: "",
  });

  // — Paginación —
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const itemsPerPage = 10;

  // — Fetch de equipos —
  const fetchEquipos = useCallback(async () => {
    try {
      const resp = await indexEquipos({ cantidad: 100, pagina: 1 });
      setEquipos(resp.data || []);
    } catch (err) {
      console.error("Error al obtener equipos:", err);
    }
  }, []);

  // — Fetch de partidos —
  const fetchPartidos = useCallback(async () => {
    try {
      const resp = await indexPartidos({
        cantidad: itemsPerPage,
        pagina: currentPage,
      });
      setPartidos(resp.data || []);
      setCurrentPage(resp.current_page ?? currentPage);
      setLastPage(resp.total_pages ?? lastPage);
    } catch (err) {
      console.error("Error al obtener partidos:", err);
    }
  }, [currentPage, lastPage]);

  // — Efectos —
  useEffect(() => {
    fetchEquipos();
  }, [fetchEquipos]);

  useEffect(() => {
    fetchPartidos();
  }, [fetchPartidos]);

  useEffect(() => {
    const listener = (e) => {
      if (e.detail === "actualizarPartidos") fetchPartidos();
    };
    window.addEventListener("partidoActualizado", listener);
    return () => window.removeEventListener("partidoActualizado", listener);
  }, [fetchPartidos]);

  if (!visible) return null;

  // — Helpers —
  const getEquipoById = (id) =>
    equipos.find((e) => e.id === id) || { nombre: "Desconocido", id_grupo: null };

  const formatFecha = (f) => {
    if (!f) return "Desconocida";
    const d = new Date(f);
    return d
      .toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", " -");
  };

  const gruposUnicos = [
    ...new Set(equipos.map((e) => e.id_grupo).filter(Boolean)),
  ].sort();

  const partidosFiltrados = partidos.filter((p) => {
    const e1 = getEquipoById(p.equipos?.[0]);
    const e2 = getEquipoById(p.equipos?.[1]);
    const grupoOk =
      !filtroGrupo ||
      e1.id_grupo?.toString() === filtroGrupo ||
      e2.id_grupo?.toString() === filtroGrupo;
    const estadoOk =
      !filtroEstado || p.estado?.toUpperCase() === filtroEstado.toUpperCase();
    return grupoOk && estadoOk;
  });

  const handleCrearPartido = async (e) => {
    e.preventDefault();
    if (nuevoPartido.equipo1Id === nuevoPartido.equipo2Id)
      return alert("Los equipos no pueden ser iguales");
    if (!nuevoPartido.grupo || !nuevoPartido.equipo1Id || !nuevoPartido.equipo2Id)
      return alert("Seleccioná grupo y ambos equipos");

    try {
      const partidoData = {
        equipos: [
          Number(nuevoPartido.equipo1Id),
          Number(nuevoPartido.equipo2Id),
        ],
        fecha: nuevoPartido.fecha,
        estado: "PENDIENTE",
        resultado: null,
        cancha: nuevoPartido.cancha,
      };
      const nuevo = await createPartido(partidoData);
      setPartidos((prev) => [nuevo, ...prev]);
      setNuevoPartido({
        grupo: "",
        equipo1Id: "",
        equipo2Id: "",
        fecha: "",
        cancha: "",
      });
      setShowPartidoForm(false);
      alert("Partido creado correctamente");
    } catch (err) {
      console.error("Error creando partido:", err);
    }
  };

  const handleEliminarPartido = async (id) => {
    if (!confirm("¿Querés eliminar este partido?")) return;
    try {
      await deletePartido(id);
      setPartidos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error eliminando partido:", err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestión de Partidos</h2>
        <button
          onClick={() => setShowPartidoForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg flex items-center text-sm"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Nuevo Partido
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <Filter className="h-4 w-4 text-black" />
          <select
            value={filtroGrupo}
            onChange={(e) => setFiltroGrupo(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="">Todos los grupos</option>
            {gruposUnicos.map((g) => (
              <option key={g} value={g}>
                Grupo {g}
              </option>
            ))}
          </select>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="">Todos los estados</option>
            <option value="JUGADO">Finalizados</option>
            <option value="PENDIENTE">Pendientes</option>
          </select>
          {(filtroGrupo || filtroEstado) && (
            <button
              onClick={() => {
                setFiltroGrupo("");
                setFiltroEstado("");
              }}
              className="text-sm text-black hover:text-black"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Formulario Crear Partido */}
      {showPartidoForm && (
        <form
          onSubmit={handleCrearPartido}
          className="bg-white rounded-lg shadow p-4 mb-6"
        >
          <h3 className="font-bold mb-4">Crear Nuevo Partido</h3>

          {/* Grupo */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Grupo</label>
            <select
              required
              value={nuevoPartido.grupo}
              onChange={(e) =>
                setNuevoPartido({
                  ...nuevoPartido,
                  grupo: e.target.value,
                  equipo1Id: "",
                  equipo2Id: "",
                })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="">Seleccionar grupo</option>
              {gruposUnicos.map((g) => (
                <option key={g} value={g}>
                  Grupo {g}
                </option>
              ))}
            </select>
          </div>

          {/* Equipos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Equipo 1</label>
              <select
                required
                value={nuevoPartido.equipo1Id}
                onChange={(e) =>
                  setNuevoPartido({ ...nuevoPartido, equipo1Id: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                disabled={!nuevoPartido.grupo}
              >
                <option value="">Seleccionar equipo</option>
                {equipos
                  .filter((eq) => eq.id_grupo?.toString() === nuevoPartido.grupo)
                  .map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.nombre} (Grupo {eq.id_grupo})
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Equipo 2</label>
              <select
                required
                value={nuevoPartido.equipo2Id}
                onChange={(e) =>
                  setNuevoPartido({ ...nuevoPartido, equipo2Id: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                disabled={!nuevoPartido.equipo1Id}
              >
                <option value="">Seleccionar equipo</option>
                {equipos
                  .filter(
                    (eq) =>
                      eq.id_grupo?.toString() === nuevoPartido.grupo &&
                      eq.id.toString() !== nuevoPartido.equipo1Id
                  )
                  .map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.nombre} (Grupo {eq.id_grupo})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Fecha y Cancha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha y Hora</label>
              <input
                type="datetime-local"
                required
                value={nuevoPartido.fecha}
                onChange={(e) =>
                  setNuevoPartido({ ...nuevoPartido, fecha: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cancha</label>
              <select
                required
                value={nuevoPartido.cancha}
                onChange={(e) =>
                  setNuevoPartido({ ...nuevoPartido, cancha: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">Seleccionar cancha</option>
                <option value="1">Cancha 1</option>
                <option value="2">Cancha 2</option>
                <option value="3">Cancha 3</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowPartidoForm(false)}
              className="px-4 py-2 border rounded-md text-black"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              Guardar
            </button>
          </div>
        </form>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Eliminar</th>
              <th className="sm:px-6 px-18 py-3 text-center text-xs font-medium text-black uppercase">Fecha</th>
              <th className="sm:px-6 px-18 py-3 text-center text-xs font-medium text-black uppercase">Equipos</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Resultado</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Estado</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase">Cancha</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-black uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partidosFiltrados.map((p) => {
              const e1 = getEquipoById(p.equipos?.[0]);
              const e2 = getEquipoById(p.equipos?.[1]);
              return (
                <tr key={p.id}>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleEliminarPartido(p.id)} className="text-red-600 hover:text-red-800">
                      <XCircle className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">{formatFecha(p.fecha)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-medium text-black">{e1.nombre} vs {e2.nombre}</div>
                    <div className="text-sm text-black">Grupo {e1.id_grupo}</div>
                  </td>
                  <td className="px-6 py-4 text-center">{p.resultado ?? "Pendiente"}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 inline-flex py-1 text-xs leading-5 font-semibold rounded-full ${
                        p.estado?.toUpperCase() === "JUGADO"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {p.estado?.toUpperCase() === "JUGADO" ? "Finalizado" : "Programado"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-black">{p.cancha || "Desconocida"}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => onEditarResultado(p)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      {p.estado?.toUpperCase() === "JUGADO" ? "Editar" : "Registrar"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {lastPage > 1 && (
        <div className="flex justify-between items-center bg-white rounded-b-lg shadow p-4 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-black">Página {currentPage} de {lastPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, lastPage))}
            disabled={currentPage === lastPage}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
