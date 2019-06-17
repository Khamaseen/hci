
const express = require('express')
const app = express();

// // app.get('address', callback(req, response) {} )
// app.get()
// app.post()
// app.put()
// app.delete()

// //app.listen(listen on port, callback function when require a listen)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`));

console.log("running");