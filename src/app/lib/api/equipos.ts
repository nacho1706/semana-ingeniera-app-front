import api from "./axios";

export const showEquipo = async (id: number) => {
  const { data } = await api.get(`/equipos/${id}`);
  return data;
}

export const indexEquipos = async (params: {
  pagina?: number;
  cantidad?: number;
  grupo?: number;
  puntero?: boolean;
}) => {
  const { data } = await api.get("/equipos/index", { params });
  return data;
};