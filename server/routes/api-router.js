"use strict";

const router = require("express").Router();
const controllers = require("../controllers");
const paisController = controllers.pais;

router.get("/", (req, res) => res.status(200).send({
    message: "Welcome to the API!"
}));

router.post("/paises", paisController.create);
router.put("/paises/:paisId", paisController.update);
router.get("/paises", paisController.all);
router.get("/paises/:paisId", paisController.find);
router.delete("/paises/:paisId", paisController.delete);

module.exports = router;
