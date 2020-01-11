const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const mailgun = require("mailgun-js");  
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

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

app.get('/api/mail/share_photo', (req, res) => {
  const name = req.query.name || 'Inquiry';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);