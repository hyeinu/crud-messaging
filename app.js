const PORT = 8080;
const express = require('express');
const morgan = require('morgan');
const moment = require('moment');
const bodyParser = require('body-parser');
const Msg = require('./models/messages');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views')

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

//ROUTES

app.get('/', (req, res, next) =>{
  Msg.getAll(function(err, msgs){
    res.render('index', { title: "Message Board", msgs });
  })
})

////////CRUD methods encapsulated in these 5 methods



app.route('/msg')
   .get((req, res) => {
     Msg.getAll(function(err, msgs){
      res.status(err ? 400: 200).send(err || msgs);
     });
   })
   .post((req, res) =>{
    let msg = req.body
    msg.time = moment().format('L');
    Msg.create(msg, function(err){
     res.status(err ? 400: 200).send(err);
    })
  });

app.route('/msg/:id')
   .get((req, res) =>{
     Msg.getOne(req.params.id, function(err, cat){
      res.status(err ? 400: 200).send(err || msgs);
     })
   })
   .put((req, res) =>{
     Msg.update(req.params.id, req.body, function(err, msgs){
       res.status(err ? 400: 200).send(err || msgs);
     })
   })
   .delete((req, res) =>{
     Msg.delete(req.params.id, function(err){
       res.status(err ? 400 : 200).send(err);
     })
   })

app.listen(PORT, err => {
   console.log(err || `Server is listening on port ${PORT}`)
 });
