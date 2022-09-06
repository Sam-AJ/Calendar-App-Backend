/*
    Rutas de eventos
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const router = Router();

router.use(validateJWT);

// Obtener eventos
router.get('/', getEvents);

// Crear eventos
router.post(
    '/',
    [
        check('title', 'Debe escribir un título').not().isEmpty(),
        check('start', 'Debe indicar una fecha de inicio').custom(isDate),
        check('end', 'Debe indicar una fecha de finalización').custom(isDate),
        validateFields
    ],
    createEvent
);

// Actualizar evento
router.put('/:id', updateEvent);

// Eliminar evento
router.delete('/:id', deleteEvent);

module.exports = router;