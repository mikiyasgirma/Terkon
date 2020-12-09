const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

var serviceAccount = require("./terkon_admin_sdk_permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const app = express();
app.use( cors( {origin: true} ) );
const db = admin.firestore();

//create document items
app.post('/api/create/items', async (req, res) =>{
        try{
            await db.collection('items').doc('/' + req.body.id + '/')
            .create({
                id: req.body.id,
                name: req.body.name,
                category: req.body.category,
                measurment_unit: req.body.measurment_unit,
                bottling_options: req.body.bottling_options,
                variants: req.body.variants
            })
            return res.status(200).send();
        }catch(error){
            console.log(error);
            return res.status(500).send(error);
        }
});
//create subcollection recipes
app.post('/api/create/items/1/recipes', async (req, res) =>{
        try{
            await db.collection('items').doc('/' + req.body.id + '/').collection('recipes').doc('/'+ req.body.id+ '/')
            .create({
                id: req.body.id,
                material_name: req.body.material_name,
                formula_quantity: req.body.formula_quantity,
                for_variant: req.body.for_variant
            })
            return res.status(200).send();
        }catch(error){
            console.log(error);
            return res.status(500).send(error);
        }
});
//create subcollection tests
app.post('/api/create/items/itemList/tests', async (req, res) =>{
    try{
        await db.collection('items').doc('itemList').collection('tests').doc('/'+ req.body.id+ '/')
        .create({
            type_of_test: req.body.type_of_test,
            standards: req.body.standards        
        })
        return res.status(200).send();
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});
//create collection materials
app.post('/api/create/materials', async(req, res) =>{
    try{
        await db.collection('materials').doc('/' + req.body.id + '/')
        .create({
            id: req.body.id,
            name: req.body.name,
            category: req.body.category,
            capacity: req.body.capacity,
            quantity: req.body.quantity,
            exp_date: req.body.exp_date,
            committed: req.body.committed,
            reorder_point: req.body.reorder_point
        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//create collection products
app.post('/api/create/products', async(req, res) =>{
    try{
        await db.collection('products').doc('/' + req.body.id + '/')
        .create({
            id: req.body.id,
            name: req.body.name,
            unit_price: req.body.unit_price,
            bottled: req.body.bottled,
            packed: req.body.packed,
            quantity: req.body.quantity,
            prod_date: req.body.prod_date,
            exp_date: req.body.exp_date

        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//create collection salesPerson
app.post('/api/create/sales_person', async(req, res) =>{
    try{
        await db.collection('salesPerson').doc('/' + req.body.id + '/')
        .create({
            id: req.body.id,
            name: req.body.name,
            zone: req.body.zone,
            email: req.body.email,
            commission: req.body.commission
        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//create collection company
app.post('/api/create/companies', async(req, res) =>{
    try{
        await db.collection('companies').doc('/' + req.body.id + '/')
        .create({
            id: req.body.id,
            name: req.body.name,
            tin_number: req.body.tin_number,
            location: req.body.location,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            sub_city: req.body.sub_city,
            house_number: req.body.house_number,
            zone: req.body.zone,
            company_sales_personnel_name: req.body.company_sales_personnel_name
        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//create collection agents
app.post('/api/create/agents', async(req, res) =>{
    try{
        await db.collection('agents').doc('/' + req.body.id + '/')
        .create({
            id: req.body.id,
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city
        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//create collection units of settings
app.post('/api/create/settings/units', async(req, res) =>{
    try{
        await db.collection('settings').doc('/' + req.body.id + '/')
        .create({
            id: req.body.id,
            killogram: req.body.killogram,
            pieces: req.body.pieces,
            milliliter: req.body.milliliter
        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//create collection vat_rate of settings
app.post('/api/create/settings/vat_rate', async(req, res) =>{
    try{
        await db.collection('settings').doc('/' + req.body.id + '/')
        .create({
            vatRate: req.body.vatRate
        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

//create collection bank_account of settings
app.post('/api/create/settings/bank_account', async(req, res) =>{
    try{
        await db.collection('settings').doc('/' + req.body.id + '/')
        .create({
            id: req.body.id,
            bankName: req.body.bankName,
            bankAccount: req.body.bankAccount
        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

//create collection sales_zone of settings
app.post('/api/create/settings/sales_zone', async(req, res) =>{
    try{
        await db.collection('settings').doc('/' + req.body.id + '/')
        .create({
            id: req.body.id,
            zoneName: req.body.zoneName,
            areaName: req.body.areaName
        })
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

exports.app = functions.https.onRequest(app);

                    //read
//read products
app.get('/api/get/products/:id', async(req, res) =>{
    try{
        const document=  db.collection('products').doc(req.params.id);
        let product = await document.get();
        let response = product.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//read products
app.get('/api/get/materials/:id', async(req, res) =>{
    try{
        const document=  db.collection('materials').doc(req.params.id);
        let material = await document.get();
        let response = material.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//read agents
app.get('/api/get/agents/:id', async(req, res) =>{
    try{
        const document=  db.collection('agents').doc(req.params.id);
        let agents = await document.get();
        let response = agents.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//read salesPerson
app.get('/api/get/sales_person/:id', async(req, res) =>{
    try{
        const document=  db.collection('salesPerson').doc(req.params.id);
        let salesPerson = await document.get();
        let response = salesPerson.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//read company
app.get('/api/get/company/:id', async(req, res) =>{
    try{
        const document=  db.collection('companies').doc(req.params.id);
        let company = await document.get();
        let response = company.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//read units of settings
app.get('/api/get/settings/unit/:id', async(req, res) =>{
    try{
        const document=  db.collection('settings').doc(req.params.id);
        let unit = await document.get();
        let response = unit.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
//read vat_rate of settings
app.get('/api/get/settings/vat_rate/:id', async(req, res) =>{
    try{
        const document=  db.collection('settings').doc(req.params.id);
        let vatRate = await document.get();
        let response = vatRate.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

//read bank_account of settings
app.get('/api/get/settings/bank_account/:id', async(req, res) =>{
    try{
        const document=  db.collection('settings').doc(req.params.id);
        let bank_account = await document.get();
        let response = bank_account.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

//read sales zone of settings
app.get('/api/get/settings/sales_zone/:id', async(req, res) =>{
    try{
        const document=  db.collection('settings').doc(req.params.id);
        let sales_zone = await document.get();
        let response = sales_zone.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

//read items
app.get('/api/get/items/:id', async(req, res) =>{
    try{
        const document=  db.collection('items').doc(req.params.id);
        let items = await document.get();
        let response = items.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

//read recipes
app.get('/api/get/items/1/recipes/:id', async(req, res) =>{
    try{
        const document=  db.collection('items').doc('/'+ req.body.id + '/').collection('recipes').doc('/' + req.body.id + '/');
        let recipes = await document.get();
        let response = recipes.data();

        return res.status(200).send(response);
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})
