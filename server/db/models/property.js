'use strict';
module.exports = function(sequelize, DataTypes) {
  var property = sequelize.define('property', {
    key: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return property;
};