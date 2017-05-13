"use strict";

const router = require("express").Router();
const controllers = require("../controllers");
const paisController = controllers.pais;
const ciudadController = controllers.ciudad;
const estadioController = controllers.estadio;
const equipoController = controllers.equipo;
const torneoController = controllers.torneo;
const propertiesController = controllers.property;

router.get("/", (req, res) => res.status(200).send({
    message: "Welcome to the API!"
}));

router.post("/paises", paisController.create);
router.put("/paises/:paisId", paisController.update);
router.get("/paises", paisController.all);
router.get("/paises/:paisId", paisController.find);
router.delete("/paises/:paisId", paisController.delete);

router.get("/paises/:paisId/ciudades", ciudadController.allByPais);
router.get("/ciudades", ciudadController.all);
// router.post("/ciudades", ciudadController.create);
// router.put("/ciudades/:ciudadId", ciudadController.update);
// router.delete("/ciudades/:ciudadId", ciudadController.delete);

router.get("/paises/:paisId/ciudades/:ciudadId/estadios", estadioController.allByCiudad);
router.get("/paises/:paisId/estadios", estadioController.allByPais);
router.get("/estadios", estadioController.all);
router.get("/estadio/:estadioId", estadioController.byId);
router.get("/ciudades/estadio", estadioController.ciudades);
router.post("/estadios", estadioController.create);
router.put("/estadios/:estadioId", estadioController.update);


router.get("/paises/:paisId/equipos", equipoController.allByPais);
router.get("/paises/:paisId/ciudades/:ciudadId/equipos", equipoController.allByCiudad);
router.get("/equipos", equipoController.all);
router.get("/equipos/:equipoId", equipoController.byId);
router.post("/equipos", equipoController.create);
router.put("/equipos/:equipoId", equipoController.update);

router.get("/torneos", torneoController.all);
router.post("/torneos", torneoController.create);

router.get("/properties", propertiesController.all);
router.get("/properties/:key", propertiesController.byKey);
router.post("/properties", propertiesController.create);
router.put("/properties/:id", propertiesController.update);
router.delete("/properties/:id", propertiesController.delete);

module.exports = router;
