const express = require('express') //express framework
const http_request = require('request') //helpful npm module for easy http requests
const PORT = process.env.PORT || 3000; //allow environment variable to possible set PORT

const API_KEY = 'f1bdcecdc0b7928e94029cc76fcc3f10';

const app = express();

let ingredient = "";

let a = ['/', '/index.html', '/recipes.html'];

//middleware
app.use(express.static(__dirname + '/public')) //static server

//routes
app.get(a, (request, response) => {
  response.sendFile(__dirname+'/views/index.html')
})

//loadup page with the basil and cumin page
app.post(a, (req, res) =>{
  let API_URL = `http://food2fork.com/api/search?q=basil,cumin&key=${API_KEY}`;
  http_request(API_URL, (error, response, body)=>{
    res.json(JSON.stringify(body));
  })
});

app.get('/recipes', (req, res) => {
  let recipeIngredient = req.query.ingredient;
  if (!recipeIngredient){
    ingredient = 'basil';
    res.redirect('/')
  } else{
    ingredient = recipeIngredient;

    let API_URL = `http://food2fork.com/api/search?q=${ingredient}&key=${API_KEY}`;
    http_request(API_URL, (error, response, body) => {
      res.json(JSON.stringify(body));
    });
  }
});

//start server
app.listen(PORT, err => {
  if(err) console.log(err);
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/recipes.html`)
    console.log(`http://localhost:3000/recipes`)
    console.log(`http://localhost:3000/index.html`)
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3000`)
  };
});
