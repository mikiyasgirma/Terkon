const admin = require('firebase-admin');
const express = require('express');


const db = admin.firestore();

const item = function() {
    db.collection('items').doc('itemList')
      .create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
}

module.exports = item();