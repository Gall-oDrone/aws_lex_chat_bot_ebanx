'use strict';

const uuidV1 = require('uuid/v1');
const AWS = require('./node_modules/aws-sdk');
const promisify = require('es6-promisify');
const _ = require('lodash');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.saveUserToDatabase = function(userId, initial, nombre, direccion, telefono, email) {
  console.log('saveUserToDatabase');

  const item = {};
  item.nombre = nombre;
  item.direccion = direccion;
  item.telefono = telefono;
  item.email = email;
  item.userId = userId;
  item.initial = initial;

  return saveItemToTable('MrCorso-table7', item);
};



  module.exports.findSlotValues = function(productId) {
    const params = {
      TableName: 'MrCorso-table8',
      Key: {
        productId
      },
      // ProjectionExpression: 'priceId'
    };

    const getAsync = promisify(dynamo.get, dynamo);
    return getAsync(params).then(response => {
      if (_.isEmpty(response)) {
        return Promise.reject(new Error(`productId:${productId} not found`));
      }
      console.log('response.Item JSS: ' + JSON.stringify(response.Item));
      return Promise.resolve(response.Item);
    });
  };

function saveItemToTable(tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  };

  const putAsync = promisify(dynamo.put, dynamo);

  return putAsync(params)
    .then(() => {
      console.log(`Saving item ${JSON.stringify(item)}`);
      return item;
    })
    .catch(error => {
      Promise.reject(error);
    });
}

module.exports.updateUserAddressInfoToDatabase = function(userId, initial, nombre, direccion, telefono, email) {
  const params = {
    TableName: "MrCorso-table7",
    Key: {
      userId: userId
    },
    // ConditionExpression: 'attribute_exists(userId)',
    UpdateExpression: 'set direccion = :direccion, email = :email, initial = :initial, nombre = :nombre, telefono = :telefono',
    ExpressionAttributeValues: {
      ':initial': initial,
      ':nombre': nombre,
      ':direccion': direccion,
      ':telefono': telefono,
      ':email': email,
    },
    ReturnValues: 'UPDATED_NEW'
  };
  console.log(`params ${JSON.stringify(params)}`);
  const updateAsync = promisify(dynamo.update, dynamo);
  return updateAsync(params)
    .then(() => {
      console.log(`Updating item ${JSON.stringify(params)}`);
      return params;
    })
    .catch(error => {
      Promise.reject(error);
    });
}