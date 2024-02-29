
////
//  Path:  /api/login
////
const {Router}= require('express');
const { crearUsuario, login, tokenRenew } = require('../controllers/auth_controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar_token');

const router= Router();


router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio',).not().isEmpty().isEmail(),
    //check('email','El correo no es válido').not().isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty().isStrongPassword(),
    //check('password','La contraseña es débil').not().isStrongPassword(),
    validarCampos,
] ,crearUsuario);

router.post('/',[
    check('email','El correo es obligatorio',).not().isEmpty().isEmail(),
    //check('email','El correo no es válido').not().isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty().isStrongPassword(),
    //check('password','La contraseña es débil').not().isStrongPassword(),
] ,login,);

router.get('/renewToken',[
    validarJWT
] ,tokenRenew,);



module.exports=router;