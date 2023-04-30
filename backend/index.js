
const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

let openForBusiness = false;

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

app.get('/swish/', (req, res) => {
  res.send({"Open":[{openForBusiness}]});
});

app.post('/storeStatus/', (req, res) => {

  if(req.body.isAdmin){

      if(!openForBusiness) openForBusiness = true;
      else if (openForBusiness) openForBusiness = false;
 
  }

  res.send({"Open":[{openForBusiness}]});
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});