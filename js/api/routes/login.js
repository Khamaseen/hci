// SAMPLE DO NOT FORGET::

// SENDING HTML PAGES TO THE CLIENT, which do get loaded:
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });