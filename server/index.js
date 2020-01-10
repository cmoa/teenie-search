const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const mailgun = require("mailgun-js");  
const mg = mailgun({apiKey: process.env.REACT_APP_MAILGUN_API_KEY, domain: process.env.REACT_APP_MAILGUN_DOMAIN});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/mail/share_photo', (req, res) => {
	const sender = req.query.sender || 'Sender';
	const message = req.query.message || 'Message';
	const contact = req.query.contact || 'Contact';

	const data = {
		from: "Mailgun Sandbox <postmaster@sandbox1f8a0605ffa94e749e35b298621acd19.mailgun.org>",
		to: "srticknor@gmail.com",
		subject: "New message from in-gallery Teenie Search app!",
		template: "collection_inquiry",
		'h:X-Mailgun-Variables': {
		  "message": message,
		  "sender": sender,
		  "contact": contact,
		  // "photo": photo,
		}
	};

    mg.messages().send(data, function (error, body) {
    	console.log(body);
    	console.log(error)
        res.setHeader('Content-Type', 'application/json');
  		res.send(JSON.stringify({ greeting: `Hello ${sender}!` }));
    });
});

app.get('/api/mail/collection_inquiry', (req, res) => {
  const name = req.query.name || 'Inquiry';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);