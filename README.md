# hci
progressive web application to help new/young mothers stay off the sigaret.
This app uses html, css, js.

Major components are notifications, timeline, chat(s), facebook-like page.

### DATABASE
The database is written in MongoDB, where nodejs is used to write to this database. MongoDB's installation is on the local machine, e.g. on linux it would be found somewhere in /etc/..., this makes it at this point difficult to be run after cloning the repository. Another thing is that the database itself, the place where mongod writes the data to, is also located on the local machine, meaning at this point the data is not persistent to be transferred at git. Further research will go into this to change this. Meanwhile the backend side connecting with the db is run locally by Khamaseen (Dennis). --- To experience a similar set up, stubs will be made, these can be turned on and off by commenting in and out the different scripts. (??)

For the MongoDB the package 'mongoose' (gotta love the naming) is used.

Running the db locally. After installation of MongoDB and creating the db folder MongoDB is run by the command: 'mongod' which sets up the deamon. Now, when the db is open and running, the node package 'mongoose' can be used to connect with this db and use CRUD operations. The command: node 'javascriptfileofmongoose.js'. 

With the program 'mongodb-compass' it is possible to get a visual representation of the db. Run it from the terminal with: 'mongodb-compass'.

###LINK TO HTML CSS JS TUTORIAL 
-> https://www.youtube.com/watch?v=7cwRaTqR4k0&list=PLoYCgNOIyGAB_8_iq1cL8MVeun7cB6eNc&index=8 

###LINK TO PWA 
-> https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/

###LINKS TO NODE
-> https://expressjs.com/
-> https://www.npmjs.com/package/flat-cache
-> https://www.npmjs.com/package/nodemon

####CHAT
-> https://socket.io/get-started/chat

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


