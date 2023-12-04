import _ from 'lodash';

import moment from 'moment';

// material ui core
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// material ui icons
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import BarHP from '../../components/BarHP/BarHP';
import LevelHP from '../../components/LevelHP/LevelHP';

const columnsTurnos = (params) => {
  const {
    bajarPrioridad, subirPrioridad, isFromSeguimiento = false, isFromHistorial = false,
  } = params;
  const columns = [
    {
      field: 'trainerName',
      headerName: 'Entrenador',
      align: 'center',
      headerAlign: 'center',
      width: 100,
    },
    {
      field: 'pokemonName',
      headerName: 'Pokémon',
      align: 'center',
      headerAlign: 'center',
      width: 100,
    },
    {
      field: 'hp',
      headerName: 'HP',
      width: 100,
      renderCell: ({ row, ...data }) => {
        const { stats } = row.pokemonInfo;

        const hpStat = _.find(stats, (stat) => stat.stat.name === 'hp');

        return (
          <BarHP
            currentHP={row[data.field]}
            maxHP={hpStat?.base_stat}
          />
        );
      },
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'nivel',
      headerName: 'Nivel',
      renderCell: ({ row, ...data }) => (<LevelHP level={row[data.field]} />),
      align: 'center',
      headerAlign: 'center',
      width: 100,
    },
    {
      field: 'turnNumber',
      headerName: 'Turno',
      align: 'center',
      headerAlign: 'center',
      width: 100,
    },
    {
      field: 'cambioEstado',
      headerName: 'Estado',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      renderCell: ({ row }) => (row?.cambioEstado?.imgSrc
        ? (
          <img
            loading="lazy"
            width="60"
            src={row.cambioEstado.imgSrc}
            alt="foto estado"
          />
        )
        : null),
    },
    {
      field: 'createdAt',
      headerName: 'Fecha Ingreso',
      align: 'center',
      autoWidth: true,
      headerAlign: 'center',
      width: 150,
      renderCell: ({ row }) => moment(row.createdAt).format('YYYY-MM-DD hh:mm A'),
    },
  ];

  if (isFromHistorial) {
    columns.push({
      field: 'fechaAtencion',
      headerName: 'Fecha Atención',
      align: 'center',
      autoWidth: true,
      headerAlign: 'center',
      width: 150,
      flexGrow: 1,
      renderCell: ({ row }) => moment(row.fechaAtencion).format('YYYY-MM-DD hh:mm A'),
    });
  }

  if (isFromSeguimiento) {
    columns.push({
      field: 'id',
      headerName: 'Acciones',
      align: 'center',
      width: 100,
      headerAlign: 'center',
      renderCell: ({ row }) => (
        <div>
          <Tooltip title="Bajar prioridad">
            <IconButton
              onClick={() => bajarPrioridad(row)}
              color="error"
              size="small"
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Subir prioridad">

            <IconButton
              onClick={() => subirPrioridad(row)}
              color="success"
              size="small"
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    });
  }

  return columns;
};

export default columnsTurnos;
