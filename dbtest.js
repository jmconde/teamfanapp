var typeorm = require("typeorm");
var Pais = require("./model/pais.js");
var PaisEntity = require("./entity/pais.js");
var path = require("path");

typeorm.createConnection({
  driver: {
    type: "mysql",
    host: "xintana.co",
    port: 3306,
    username: "unionapp_user",
    password: "Maw274IGNPZjYcMM",
    database: "unionapp"
  },
  entitySchemas: [
    PaisEntity
  ],
  autoSchemaSync: true
}).then(conn => {
  console.log("Connected");
  var pais = conn.getRepository("Pais");
  pais.find().then(res => {
    console.log("=>", res);
  })
}).catch(error => console.error(error));

// CREATE USER 'union'@'%' IDENTIFIED BY 'Maw274IGNPZjYcMM';
// GRANT ALL PRIVILEGES ON *.* TO 'union'@'%';

