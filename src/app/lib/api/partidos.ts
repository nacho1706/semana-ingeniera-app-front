import api from './axios';

export const indexPartidos = async (params: {
  pagina?: number;
  cantidad?: number;
  equipos?: Array<number>;
  fecha?: Date;
  cancha?: number;
}) => {
  const { data } = await api.get('/partidos/index', { params });
  return data;
};

// export const showPartido = async (id: number) => {
//   const { data } = await api.get(`/partidos/show/${id}`);
//   return data;
// };

export const createPartido = async (partido: {
  equipos: Array<number>;
  fecha: Date;
  cancha: number;
}) => {
  const { data } = await api.post('/partidos/create', partido);
  return data;
}

export const updatePartido = async (partido: {
  id: number;
  equipos?: Array<number>;
  fecha?: Date;
  cancha?: number;
  resultado?: string;
}) => {
  const { data } = await api.put(`/partidos/update/${partido.id}`, partido);
  return data;
};

export const deletePartido = async (id: number) => {
  const { data } = await api.delete(`/partidos/delete/${id}`);
  return data;
}


