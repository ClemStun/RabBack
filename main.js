const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const inc = require('./DataManager/insertNewAccount.js');
const lin = require('./DataManager/connectionToAccount.js');
const fav = require('./DataManager/favorisManger.js');

const uri = "mongodb+srv://" + process.env.USER + ":" + process.env.PASS + "@" + process.env.LINK + "/radar_a_beats?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express();

app.use(cors());

app.get('/login', (req, res) => {
  
  let response = {};
  let l = req.query.login;
  let password = req.query.pw;
  
  if(l != null && password != null){

    lin.connectionToAccount(client, l, password).then(r => {

      if(r == 1){

        response = {
          connexion: true,
          message: "Connexion réussie"
        }

      }else if(r == -1){

        response = {
          connexion: false,
          message: "Le mot de passe est incorrect !"
        }

      }else if(r == -2){

        response = {
          connexion: false,
          message: "Cet utilisateur n'existe pas !"
        }

      }

      res.json(response);

    })

  }else{
    res.json(response);
  }


})

app.get('/register', (req, res) => {

  let response = {};
  let l = req.query.login;
  let password = req.query.pw;

  if(l != null && password != null){

    inc.insertNewAccount(client, l, password).then(r => {

      if(r == 1){

        response = {
          register: true,
          message: "Inscription réussie"
        }

      }else{

        response = {
          register: false,
          message: "Cet utilisateur existe déjà !"
        }

      }

      res.json(response);

    })

  }else{
    res.json(response);
  }

})

app.get('/favoris', (req, res) => {

  let l = req.query.login;

  if(l != null){

    fav.getFavoris(client, l).then(r => {
      res.json(r);
    })

  }else{
    res.json({});
  }

})

app.get('/favorisadd', (req, res) => {

  let login = req.query.login;
  let title = req.query.title;
  let artiste = req.query.artiste;
  let link = req.query.link;

  if(login != null && title != null && artiste != null && link != null){

    fav.addFavoris(client, login, title, artiste, link).then(r => {
      if(r == 1){

        res.json({
          add: true,
          message: "Ajouter aux favoris !"
        })

      }else if(r == -1){

        res.json({
          add: false,
          message: "Ajout impossible !"
        })

      }
    })

  }else{
    res.json({});
  }

})

app.listen(process.env.PORT || 80);
