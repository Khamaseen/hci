# hci
progressive web application to help new/young mothers stay off the sigaret.
This app uses html, css, js.

Major components are notifications, timeline, chat(s), facebook-like page.

###LINK TO HTML CSS JS TUTORIAL 
-> https://www.youtube.com/watch?v=7cwRaTqR4k0&list=PLoYCgNOIyGAB_8_iq1cL8MVeun7cB6eNc&index=8 

###LINK TO PWA 
-> https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/

###LINKS TO NODE
-> https://expressjs.com/
-> https://www.npmjs.com/package/flat-cache
-> https://www.npmjs.com/package/nodemon


###Snippet Node JS: 


const express = require("express");
const app = express();

const DATABASE = [];

app.post("/api/comments/add", (request, response) => {

  const text = request.query.text;
  
  if (text) {
  
    const comment = {
    
      id: Math.ceil(Math.random() * 1e10),
      
      text: text,
      
      date: Date.now() / 1000,
      
    };
    
    DATABASE.push(comment);
    
    response.json(comment);
    
  } else {
  
    response.status(500).send("Text missing");
    
  }
  
});

app.get("/api/comments", (request, response) => {

  response.json(DATABASE);
  
});

app.listen(1337);


