const express = require('express');
const app =express();
const cors = require('cors');
const {ObjectId} = require('mongodb');

const bodyParser = require('body-parser');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());



const port = process.env.PORT || 4000

//const MongoClient = require('mongo').MongoClient;

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mxsrj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(`${process.env.DB_NAME}`).collection("products");
  const orderCollection = client.db(`${process.env.DB_NAME}`).collection("products");

  console.log("connect");

//add product

app.post('/addProduct',(req,res)=>{
    const newProduct = req.body;
    console.log('adding new product',newProduct)

    collection.insertOne(newProduct)
    .then(result=>{
        console.log('inserted count',result.insertOne);
        res.send(result.insertOne>0);
    })
});

//add order product

app.post('/addOrderProduct',(req,res)=>{
    const newOrder = req.body;
    console.log('adding new order',newOrder)

    orderCollection.insertOne(newOrder)
    .then(result=>{
        console.log('inserted count',result.insertCount);
        res.send(result.insertOne>0);
    })
});


//find product

app.get('/products',(req,res)=>{
     collection.find()
    .toArray((error,documents) =>{
        res.send(documents);
    })
});


//find order

app.get('/order/:email',(req,res)=>{
    const email = req.params.email;
    console.log(email)
    orderCollection.find({customerEmail:email})
    .toArray((error,documents)=>{
        res.send(document);
    })

});


//delete product
app.delete('/deleteProduct/:id',(req,res)=>{
    const id = ObjectId(req.params.id);
    console.log('delete this id',id);
    collection.findOneAndDelete({_id:id})
    .then(documents=>res.send(!!documents.value))
});


app.get('/product/:id',(req,res)=>{
    const id = objectID(req.params.id)
    console.log('find this id',id);
    collection.find({_id:id});
    collection.find({_id:id})
    .toArray((error,documents)=>{
        res.send(documents);
    })
});

});


app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})