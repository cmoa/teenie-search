require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var path = require("path");

const mailgun = require("mailgun-js"); 
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/mail/collection_inquiry', (req, res) => {
	const sender = req.query.sender || 'ERROR';
	const message = req.query.message || 'ERROR';
	const contact = req.query.contact || 'Left no contact information.';
	const accession = req.query.accession || '';
	const image = req.query.image || '';

	const data = {
		from: "Mailgun Sandbox <postmaster@sandbox1f8a0605ffa94e749e35b298621acd19.mailgun.org>",
		to: process.env.COLLECTION_REP_EMAIL,
		subject: "New message from Teenie Search in-gallery app!",
		template: "collection_inquiry",
		'v:message' : message,
		'v:image' : image,
 		'v:sender' : sender,
		'v:contact' : contact,
		'v:accession' : accession,
		'v:query' : `https://collection.cmoa.org/?page=1&perPage=10&q=%22${accession}%22&view=grid`
	};

    mg.messages().send(data, function (error, body) {
  		res.end()
    });
});

app.get('/api/mail/share_photograph', (req, res) => {

	if (!req.query.to) res.end();
	const accession = req.query.accession || '';
	const image = req.query.image || '';
	const title = req.query.title || '';
	const date = req.query.date || '';
	const description = req.query.description || '';

	const data = {
		from: "Mailgun Sandbox <postmaster@sandbox1f8a0605ffa94e749e35b298621acd19.mailgun.org>",
		to: req.query.to,
		subject: "Here is the image you requested from the Teenie Harris Archive.",
		template: "share_photograph",
		'v:title' : title,
		'v:image' : image,
		'v:date' : date,
		'v:title' : title,
		'v:description' : description,
		'v:query' : `https://collection.cmoa.org/?page=1&perPage=10&q=%22${accession}%22&view=grid`
	};

    mg.messages().send(data, function (error, body) {
  		res.end()
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
	response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen((process.env.PORT || 5000), () =>
  console.log('Express server is running on localhost:5000')
);