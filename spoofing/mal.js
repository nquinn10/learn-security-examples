const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');

//app.use(cookieParser());

// Assume the server is malicious. Doesn't do anything useful. Only changes cookies.
// end point sends back some html
// malicious server could steal information because it can read document.cookie
app.get("/malhome", (req, res) => {
  res.send(`<h1> You Won! </h1><script> console.log("Session = " + document.cookie); </script>`)
})


app.listen(8001);
