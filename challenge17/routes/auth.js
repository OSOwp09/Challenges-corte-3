const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require("../Controllers/auth");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-token");

//-----challenge 17------------
//-------Login-----------------
router.post(
	"/",
	[
		check("email", "El mail es obligatorio").isEmail(),
		check("password").isLength({ min: 6 }),
		validarCampos,
	],
	loginUsuario
);
//----------------------------

//------Registro--------------
router.post(
	"/new",
	[
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El mail es obligatorio").isEmail(),
		check("password").isLength({ min: 6 }),
		validarCampos,
	],
	crearUsuario
);

router.get("/renew", validarJWT, revalidarToken);
module.exports = router;
