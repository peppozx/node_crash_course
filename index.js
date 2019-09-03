// //Common js
// const Person = require('./person');

// //ES6
// //Import Person from './person';

// const person1 = new Person("John Doe", 30);

// console.log(person1);
// person1.greeting();

// console.log(__dirname);
// console.log(__filename.replace(__dirname, ""));

// ===================================================

// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message', data => console.log(`Called Listener: ${data.id} | ${data.msg}`));


// logger.log('Hello World');
// logger.log('Hello');
// logger.log('World');

const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {

	// if (req.url === '/') {
	// 	fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
	// 		if (err) throw err;
	// 		res.writeHead(200, { 'Content-Type': 'text/html' });
	// 		res.end(content);
	// 	})
	// }else if (req.url === '/about') {
	// 	fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
	// 		if (err) throw err;
	// 		res.writeHead(200, { 'Content-Type': 'text/html' });
	// 		res.end(content);
	// 	})
	// }else if (req.url === '/api/users') {
	// 	const users = [
	// 		{name: 'Bob Smith', age: 40},
	// 		{name: 'John Doe', age: 30}, 
	// 	];
	// 	res.writeHead(200, { 'Content-Type': 'application/json'});
	// 	res.end(JSON.stringify(users));
	// }

	// Build file path
	let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

	// Extension of file
	let extname = path.extname(filePath);

	// Initial content type
	let contentType = 'text/html'

	// Check ext name and set content type
	switch(extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;

	}

	// Read file
	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code == 'ENOENT') {
				// Page not found
				fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
					if (err) throw err;
					res.writeHead(200, { 'Content-Type': contentType})
					res.end(content, 'utf8');
				});
			}else {
				res.writeHead(500);
				res.end(`Server error: ${err.code}`);
			}
		}else {
			// Success
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(content, 'utf8');
		}
	});


});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));