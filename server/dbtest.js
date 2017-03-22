var connFactory = require("./db/connectionFactory.js");

connFactory(function (err, conn) {
  console.log("Connected!!", conn);
  conn.close();
});



/*var path = require("path");
var Q = require("q");

var connFactory = require("./db/connectionFactory.js");

var Ciudad = require("./model/ciudad.js");
var Estadio = require("./model/estadio.js");

var dataCiudades = require("./data/ciudades.json");
var dataEstadios = require("./data/estadios.json");

function createCiudades(conn) {
  var promises = [];
   var repoCiudad = conn.getRepository("Ciudad");

   return repoCiudad.query("select 1 from ciudad;") //repoCiudad.query("delete from ciudad;")
    .then(function () {
      dataCiudades.data.forEach(function(cData) {
        var ciudad = new Ciudad(cData.cod, cData.nombre);
        promises.push(repoCiudad.persist(ciudad)
          .then(function (d) {
            console.log("Inserted: ", d);
          })); 
      });

      return Q.all(promises)
    })
}

function createEstadios(conn) {
  var promises = [];
  var repoEstadio = conn.getRepository("Estadio");
  
   return repoEstadio.query("delete from estadio;")
    .then(function () {
      dataEstadios.data.forEach(function(cData) {
        console.log(cData);
        var estadio = new Estadio(cData.is, cData.nombre, cData.ciudad);
        promises.push(
          repoEstadio.persist(estadio)
            .then(d => console.log("Inserted: ", d))
            .catch(err => console.error(err))
          );
      });

      return Q.all(promises)
    })
}


connFactory().then(conn => {
  console.log("Connected");
  createCiudades(conn)
    .then(createEstadios(conn))
    // .then(function () {
    //     conn.close();
    // });

  // pais.find().then(res => {
  //   console.log("=>", res);
  //   conn.close();
  // });



  
  
}).catch(error => console.error(error));

// CREATE USER 'union'@'%' IDENTIFIED BY 'Maw274IGNPZjYcMM';
// GRANT ALL PRIVILEGES ON *.* TO 'union'@'%';

*/