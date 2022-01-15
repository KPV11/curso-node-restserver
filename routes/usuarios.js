
const { Router } = require('express');
const {check} = require('express-validator');

const { ValidarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExist, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');



const router = Router();

router.get('/',usuariosGet);

router.put('/:id',[
    check('id','No es ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    ValidarCampos
],usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExist),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    ValidarCampos
],usuariosPost);

router.delete('/:id',[
    check('id','No es ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    ValidarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);








module.exports = router;


