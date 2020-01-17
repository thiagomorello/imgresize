//const imgURL = "https://s3-us-west-2.amazonaws.com/imoview.com.br/sol/Imoveis/3355/u2vXOPUSSbADTdtJ7NAnQA5-qzQ8_734MgUhaZ9RJ1gzNGPd2AmgoqadJSHQK3iInMlkkH5fuzv_fKhfoRdFE=w1024-h768.jpg";
const express = require('express');
const cors = require('cors');

const app = express();

var Jimp = require("jimp")

app.get('/rc',function(req, res){
  const size = req.query.size.split('x');
  size[0] = parseInt(size[0]);
  size[1] = parseInt(size[1]);
  const link = req.query.img;

  Jimp.read(link, function(err,img){
    if (err) throw err;
    img.resize(size[0], size[1]).getBase64( Jimp.AUTO , function(e,img64){
        if(e)throw e
        res.send('<img src="'+img64+'">')
    });
  });
});
app.use(express.json());
//app.use(routes);
app.listen(3000);
