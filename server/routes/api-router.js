"use strict";

const router = require("express").Router();
const controllers = require("../controllers");
const paisController = controllers.pais;
const ciudadController = controllers.ciudad;
const estadioController = controllers.estadio;
const equipoController = controllers.equipo;

router.get("/", (req, res) => res.status(200).send({
    message: "Welcome to the API!"
}));

router.post("/paises", paisController.create);
router.put("/paises/:paisId", paisController.update);
router.get("/paises", paisController.all);
router.get("/paises/:paisId", paisController.find);
router.delete("/paises/:paisId", paisController.delete);

router.get("/paises/:paisId/ciudades", ciudadController.allByPais);

router.get("/paises/:paisId/ciudades/:ciudadId/estadios", estadioController.allByCiudad);
router.get("/paises/:paisId/estadios", estadioController.allByPais);
router.get("/estadio/:estadioId", estadioController.byId);
router.get("/ciudades/estadio", estadioController.ciudades);
router.post("/estadios", estadioController.create);
router.put("/estadios/:estadioId", estadioController.update);

module.exports = router;
