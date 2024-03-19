const express = require("express")
const session = require("express-session")

const app = express();
app.use(express.urlencoded({ extended: false }))

// middleware on session and sets session id in cookie of browser
// bc middleware, will be activated on all incoming requests
app.use(
  session({
    secret: "SOMESECRET",
    cookie: {httpOnly: false},
    resave: false,
    saveUninitialized: false
  })
)

// only logged in user should be able to access this
// once session is set in cookie - all http requests will have the cookie info sent to any server
// session id can be stolen - someone can access to users session
// session hijacking attempt
app.post("/sensitive", (req, res) => {
  if (req.session.user === 'Admin') { // post sensitive endpoint to check if user is admin
    req.session.sensitive = 'supersecret';
    res.send({message: 'Operation successful'});
  }
  else {
    res.send({message: 'Unauthorized Access'});
  }
})

app.get("/", (req, res) => {
  let name = "Guest"

  if (req.session.user) name = req.session.user

  // once submitted, POST action is sent and calls post endpoint
  res.send(`
  <h1>Welcome, ${name}</h1>
  <form action="/register" method="POST">
    <input type="text" name="name" placeholder="Your name">
    <button>Submit</button>
  </form>
  <form action="/forget" method="POST">
    <button>Logout</button>
  </form>
  `)
})

// once post is called, session is created
app.post("/register", (req, res) => {
  // name = req.body.name.trim()
  // res.redirect("/")
  req.session.user = req.body.name.trim()
  res.send(`<p>Thank you</p> <a href="/">Back home</a>`)
})

app.post("/forget", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/")
  })
})

app.listen(8000)
