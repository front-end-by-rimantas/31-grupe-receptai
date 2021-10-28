const http = require('http');
const { StringDecoder } = require('string_decoder');
const utils = require('./utils.js');
const data = require('./data.js');
const pageHome = require('../pages/home.js');
const page404 = require('../pages/404.js');
const pageAbout = require('../pages/about.js');

const server = {};

server.db = null;

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const parsedPathName = parsedURL.pathname;
    const httpMethod = req.method.toLowerCase();
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', async () => {
        buffer += decoder.end();

        const textFileExtensions = ['css', 'js', 'svg', 'webmanifest'];
        const binaryFileExtensions = ['woff2', 'woff', 'ttf', 'eot', 'otf', 'png', 'jpg', 'ico'];
        const urlParts = trimmedPath.split('.');
        const fileExtension = urlParts[urlParts.length - 1];
        const isTextFile = textFileExtensions.includes(fileExtension);
        const isBinaryFile = binaryFileExtensions.includes(fileExtension);

        const MIMES = {
            css: 'text/css',
            js: 'text/javascript',
            svg: 'image/svg+xml',
            woff2: 'font/woff2',
            woff: 'font/woff',
            ttf: 'font/ttf',
            eot: 'application/vnd.ms-fontobject',
            otf: 'font/otf',
            png: 'image/png',
            jpg: 'image/jpeg',
            ico: 'image/x-icon',
            webmanifest: 'application/manifest+json',
        }

        const payload = utils.parseJSONtoObject(buffer);
        let responseContent = '';

        const isAPI = false;

        if (isTextFile || isBinaryFile) {

            let fileContent = '';
            if (isTextFile) {
                fileContent = await data.readStaticTextFile(trimmedPath);
            } else {
                fileContent = await data.readStaticBinaryFile(trimmedPath);
            }

            if (fileContent === '') {
                // nepavyko rasti norimo failo
                res.writeHead(404, {
                    'Content-Type': MIMES[fileExtension],
                })
            } else {
                // pavyko rasti norima faila
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                })
            }

            return res.end(fileContent);

        } else if (isAPI) {

            // console.log('grazinam API response...');

        } else {

            if (trimmedPath in server.routes) {
                responseContent = server.routes[trimmedPath]();
            } else {
                responseContent = await data.readHTMLFile(trimmedPath);
                if (responseContent === '') {
                    responseContent = server.routes['404']();
                }
            }
        }

        res.end(responseContent);
    })
});

server.routes = {
    '': pageHome,
    '404': page404,
    'about': pageAbout,
    // 'contact': 'contact',
    // 'receptai': 'receptai',
    // 'receptai/blynai': 'receptai/blynai',
    // 'receptai/duona': 'receptai/duona',
    // 'receptai/cepelinai': 'receptai/cepelinai',
};

server.api = {};

server.init = () => {
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    })
}

module.exports = server;