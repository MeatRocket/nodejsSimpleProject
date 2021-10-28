const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
//server stuff end

const xlsx = require('xlsx');
const file = xlsx.readFile('./testing.xlsx');
const sheet = file.Sheets['Sheet1'];
const content = xlsx.utils.sheet_to_json(sheet);
//reading xlsx file from sheet 1

app.use(bodyParser.json());
app.use(cors()); //using cors so we can call it from html file

app.get('/', function (req, res) {
  return res.send();
})


app.get('/Users', function (req, res) {
    return res.send(content);
})

app.post('/AddUser' , function(req, res){
  content.push(req.body);
  //console.log(req.body);
  xlsx.utils.sheet_add_json(file.sheet,content);
  xlsx.writeFile(file,'./testing.xlsx');
  return res.send(content);
})

app.post('/Authenticate' , function(req, res){
  x = req.body.Username;
  y = req.body.Password;

  for (let index = 0; index < content.length; index++) {
    a = content[index].Username;
    b = content[index].Password;
    if( x == a && b == y){
        return res.send("User Exists !");
    }
  }

  return res.send("User Doesnt Exist ;-;");
})



app.get('/Getusers', function (req, res) {
  var x = req.query.Username;
  for (let index = 0; index < content.length; index++) {
    y = content[index].Username;
    console.log(x);
    if(x == y)
    {
       return res.send("User Found! :)");
    }
  }
  
  return res.send("User Not Found :(");
})

app.listen(3000);