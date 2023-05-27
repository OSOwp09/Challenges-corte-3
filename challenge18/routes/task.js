const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validar-token");
const { listarTask, crearTask, actualizarTask, eliminarTask } = require("../Controllers/Task");

router.use(validarJWT);

router.get("/", listarTask);
router.post("/", crearTask);

// Challenge 18
router.post("/update", actualizarTask)
router.post("/delete", eliminarTask)
//----------------

module.exports = router;
