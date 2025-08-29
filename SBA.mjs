
import http from 'http';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Marvel API keys (replace with your actual keys)
const PUBLIC_KEY = '864a968f01763b15293bd28f79504e64';
const PRIVATE_KEY = '8246929d53aca8824778f9bb52c426e0c4b26304';

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve index.html
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf-8', (err, html) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Failed to load index.html');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            }
        });
    }

    else if (req.url === '/api/marvel') {
        const ts = Date.now().toString();
        const hash = crypto
            .createHash('md5')
            .update(ts + PRIVATE_KEY + PUBLIC_KEY)
            .digest('hex');

        const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=10`;

        axios.get(apiUrl)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response.data));
            })
            .catch(err => {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to fetch Marvel data' }));
                console.error('Marvel API error:', err.message);
            });
    }

    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('✅ Server running at http://localhost:3000');
});
