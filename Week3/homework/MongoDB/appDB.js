const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const dbName = 'new_world';

// make db connection
const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();

// parses json data sent to us by the user
app.use(bodyParser.json());

// serve static html file to user
app.get('/', (req, res) => {
  res.send('MongoDb CRUD Operations');
});

// read all documents
app.get('/getAllDocuments/:collection', (req, res) => {
  // get all  documents within our any collection <collection> is a parameter
  // send back to user as json
  client
    .db(dbName)
    .collection(req.params.collection)
    .find({})
    .toArray((err, documents) => {
      if (err) console.log(err);
      else {
        res.json(documents);
      }
    });
});

//create
app.post('/createCity', (req, res) => {
  // Document to be inserted
  const newCity = req.body;

  client
    .db(dbName)
    .collection('city')
    .insertOne(newCity, (err, result) => {
      if (err) {
        const error = new Error('Failed to insert city');
        error.status = 400;
      } else
        res.json({
          result: result,
          document: result.ops[0],
          msg: 'Successfully inserted!!!',
          error: null,
        });
    });
});

// update the city  properties by city name
app.put('/updateCityProperties/:cityName', (req, res) => {
  // Find Document By Name and Update
  client
    .db(dbName)
    .collection('city')
    .updateOne({ name: req.params.cityName }, { $set: req.body }, (err, result) => {
      if (err) console.log(err);
      else {
        res.json(result);
      }
    });
});

// finding by the city name
app.get('/findCityByName/:cityName', (req, res) => {
  client
    .db(dbName)
    .collection('city')
    .findOne({ name: req.params.cityName }, (err, result) => {
      if (err) console.log(err);
      else {
        res.json(result);
      }
    });
});

// finding by the country code
app.get('/findCityByName/:countryCode', (req, res) => {
  client
    .db(dbName)
    .collection('city')
    .findOne({ countryCode: req.params.countryCode }, (err, result) => {
      if (err) console.log(err);
      else {
        res.json(result);
      }
    });
});

//delete
app.delete('/deleteCityByName/:cityName', (req, res) => {
  // Find city and delete document from cities

  client
    .db(dbName)
    .collection('city')
    .deleteOne({ name: nameOfCity }, (err, result) => {
      if (err) console.log(err);
      else res.json(result);
    });
});

app.listen(3000, () => {
  console.log('connected to database, app listening on port 3000');
});