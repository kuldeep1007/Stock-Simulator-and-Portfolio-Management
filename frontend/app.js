var express = require('express')
var app = express()

app.use(express.static('assets'))

app.get('/',
  (req, res) => res.sendFile('home.html', {root: __dirname})
);

app.get('/signIn',
  (req, res) => res.sendFile('sign-in.html', {root: __dirname})
);

app.get('/signUp',
  (req, res) => res.sendFile('sign-up.html', {root: __dirname})
);

app.get('/:data/watch',
  (req, res) => res.sendFile('search.html', {root: __dirname})
);

app.get('/:data/buy',
  (req, res) => res.sendFile('buy.html', {root: __dirname})
);

app.get('/:data/dashboard',
  (req, res) => res.sendFile('dashboard.html', {root: __dirname})
);

app.get('/:data/sell',
  (req, res) => res.sendFile('sell.html', {root: __dirname})
);

app.get('/:data/portfolio',
  (req, res) => res.sendFile('portfolio.html', {root: __dirname})
);


app.listen(3001, () => {
    console.log("Connection Established");
})