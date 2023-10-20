import Joi from 'joi';

const messages = {
  'any.required': 'El campo {{#label}} es obligatorio',
  'number.max': 'Se supera los {{#label}} del pokémon',
  'string.empty': 'El campo {{#label}} es obligatorio',
  'number.min': 'El campo {{#label}} debe ser mayor',
};

const hp = Joi
  .number()
  .required()
  .label('Puntos de salud')
  .messages(messages);

const trainerName = Joi
  .string()
  .required()
  .label('Nombre entrenador')
  .messages(messages);

const trainerId = Joi
  .string()
  .label('Id Entrenador')
  .required()
  .messages(messages);

const pokemonName = Joi
  .string()
  .label('Pokémon')
  .required()
  .messages(messages);

const cambioEstado = Joi
  .object()
  .allow(null)
  .optional()
  .messages(messages);

const nivel = Joi
  .number()
  .label('Puntos de combate')
  .required()
  .min(1)
  .max(100)
  .messages(messages);

const fullSchema = ({ maxHP }) => {
  const schema = {
    hp,
    trainerName,
    trainerId,
    cambioEstado,
    nivel,
    pokemonName,
  };

  if (maxHP) {
    schema.hp = hp.max(maxHP);
  }

  return Joi.object(schema);
};

export default fullSchema;
