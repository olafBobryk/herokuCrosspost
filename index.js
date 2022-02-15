const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const Reddit = require('reddit');
const nlp = require('compromise');
const Instagram = require('instagram-web-api')


nlp.extend(require('compromise-sentences'))

const app = express();

const fs = require('fs');


fs.readdir('./routes', (err, files) => {
    files.forEach(file => {
      app.use(require(`./routes/${file}`))
    });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});