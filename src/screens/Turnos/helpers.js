import _ from 'lodash';

/**
 * función para parsear las citas del local storage
 * @param {Object[]} citas
 * @returns {Object[]}
 */
export const parseCitas = (citas) => {
  try {
    return JSON.parse(citas) || [];
  } catch (error) {
    return [];
  }
};

export const defaultExport = 1;

export const getProximosTurnos = (citas, isFromSeguimiento = false) => {
  const copyCitas = _.cloneDeep(citas) || [];

  try {
    const citaActual = copyCitas[0];

    if (citaActual && (citaActual.estado === 'atender' || isFromSeguimiento)) {
      copyCitas.shift();

      return copyCitas;
    }

    return copyCitas;
  } catch (error) {
    return [];
  }
};
