const express = require('express');
const cors = require('cors');
const fs = require('fs');
const jimp = require('jimp');


const app = express();


async function resizeImg(img, size){
  await img.resize(size[0], size[1]).quality(90);
  return img.getBufferAsync(jimp.MIME_JPEG);
}

app.get('/rc',function(req, res){
  const size = req.query.size.split('x');
  size[0] = parseInt(size[0]);
  size[1] = parseInt(size[1]);
  const link = req.query.img;

  res.set("Content-Type", "image/jpeg");
  jimp.read(link, async (err, img) =>{
    const buffer =  await resizeImg(img, size);
    res.status(200).send(new Buffer.from(buffer));
  });

});
app.use(express.json());
//app.use(routes);
app.listen(3000);
