const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const multer = require('multer');
const session = require('express-session');
const {
	v4: uuidv4
} = require('uuid');
const files = multer({
	fieldSize: 1024 * 1024 * 5
}).fields([{
	name: 'image',
	maxCount: 1
}]);

// CONTROLLERS
const contactController = require('./src/controller/contactController.class.js');
const userController = require('./src/controller/userController.class.js');
const petsController = require('./src/controller/petsController.class.js');
const contactCtrl = new contactController();
const userCtrl = new userController();
const petsCtrl = new petsController();

// ENV
require('dotenv').config();

// APP
const app = express();
app.set('view engine', 'ejs');
app.set('views', './public/views');
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));
app.use(session({
	secret: uuidv4(),
	resave: true,
	saveUninitialized: true
}));

// ROUTES
app.get('/', (req, res) => {
	if (req.session.loggedin) {
		res.render('pets', {
			session: req.session,
		});
	} else {
		res.render('index', {
			session: req.session,
		});
	}
});

app.get('/register', (req, res) => {
	if (req.session.loggedin) {
		res.redirect('/');
	} else {
		res.render('register', {
			session: req.session,
		});
	}
});

app.post('/register', [], function (req, res, next) {
	req.body.password = crypto.createHash('sha256').update(process.env.PASSWORD + req.body.password).digest('hex');
	userCtrl.register(req.body).then(result => {
		res.status(200).send();
	}).catch(error => {
		res.status(error.code).send(error.message);
	});
});

app.get('/login', (req, res) => {
	if (req.session.loggedin) {
		res.redirect('/');
	} else {
		res.render('login', {
			session: req.session,
		});
	}
});

app.post('/login', (req, res) => {
	req.body.password = crypto.createHash('sha256').update(process.env.PASSWORD + req.body.password).digest('hex');
	userCtrl.login(req).then(result => {
		res.status(200).send();
	}).catch(error => {
		res.status(error.code).send(error.message);
	});
});

app.get('/api/pets', (req, res) => {
	petsCtrl.getPets().then(result => {
		res.status(200).send(result);
	}).catch(error => {
		res.status(error.code).send(error.message);
	});
});

app.get('/contact', (req, res) => {
	if (req.session.loggedin) {
		res.render('contact', {
			pet: req.query.pet == undefined ? '' : req.query.pet,
			session: req.session,
		});
	} else {
		res.redirect('/');
	}
});

app.post('/contact', (req, res) => {
	contactCtrl.save(req).then(result => {
		res.status(200).send();
	}).catch(error => {
		res.status(error.code).send(error.message);
	});
});

app.get('/logout', (req, res) => {
	req.session.loggedin = false;
	req.session.user = null;
	req.session.destroy();
	res.redirect('/');
});

app.get('/profile', (req, res) => {
	if (!req.session.loggedin) {
		res.redirect('/');
	} else {
		res.render('profile', {
			session: req.session,
		});
	}
});


app.post('/profile', files, (req, res) => {
	userCtrl.editProfile(req).then(result => {
		res.status(200).send();
	}).catch(error => {
		res.status(error.code).send(error.message);
	});
});


// SERVIDOR
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Servidor online`);
});