/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const router = Router();

router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    crearUsuario
);

router.post(
    '/',
    [ // middlewares
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    loginUsuario
);

router.get('/renew', revalidarToken);

module.exports = router;