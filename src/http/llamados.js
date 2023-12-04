import axios from 'axios';

import {
  ATENDER,
  CAMBIAR_PRIORIDAD, CREAR_ATENCION, CURAR, LEER_ATENCIONES, LOGIN, URL_LLAMADO,
} from './constants';

const handleError = (error) => ({
  isError: true,
  error: error?.response?.data?.detail || error?.message,
  data: null,
});

export const onLogin = async ({ username, password }) => {
  const urlLogin = URL_LLAMADO + LOGIN;
  try {
    const isLogged = axios.post(urlLogin, {
      username,
      password,
      scope: '',
      client_id: '',
      client_secret: '',
      grant_type: '',
    }, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const content = (await isLogged).data;

    if (!content?.access_token) {
      throw new Error('Usuario no encontrado o contraseña invalida');
    }

    return {
      isError: false,
      error: null,
      data: content?.access_token,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const onCrearAtencion = async (cita) => {
  const tokenUser = localStorage.getItem('tokenUser');
  const urlLlamado = URL_LLAMADO + CREAR_ATENCION;

  try {
    const request = axios.post(urlLlamado, cita, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${tokenUser}`,
      },
    });

    const content = (await request).data;

    return {
      data: content?.turn_number,
      isError: false,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const leerAtenciones = async (isAtendidos = false) => {
  const tokenUser = localStorage.getItem('tokenUser');

  const urlLlamado = URL_LLAMADO + LEER_ATENCIONES;

  try {
    const request = axios.get(urlLlamado, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${tokenUser}`,
      },
      params: {
        atendidos: isAtendidos,
      },
    });

    const content = (await request).data;

    return {
      isError: false,
      error: null,
      data: content,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const onCambiaPrioridad = async ({ id, turn_number: turnNumber }) => {
  const tokenUser = localStorage.getItem('tokenUser');
  const urlLlamado = URL_LLAMADO + CAMBIAR_PRIORIDAD;

  try {
    const request = axios.post(urlLlamado, { id, turn_number: turnNumber }, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${tokenUser}`,
      },
    });

    const content = (await request).data;

    return {
      data: content,
      isError: false,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const onAtender = async ({ id, estado }) => {
  const tokenUser = localStorage.getItem('tokenUser');
  const urlLlamado = URL_LLAMADO + ATENDER;

  try {
    const request = axios.post(urlLlamado, { id, estado }, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${tokenUser}`,
      },
    });

    const content = (await request).data;

    return {
      data: content,
      isError: false,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const onCurar = async ({ id, comment }) => {
  const tokenUser = localStorage.getItem('tokenUser');
  const urlLlamado = URL_LLAMADO + CURAR;

  try {
    const request = axios.post(urlLlamado, { id, comment, estado: 'atendido' }, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${tokenUser}`,
      },
    });

    const content = (await request).data;

    return {
      data: content,
      isError: false,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
};
