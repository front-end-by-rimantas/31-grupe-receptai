const http = require('http');
const { StringDecoder } = require('string_decoder');
const utils = require('./utils.js');
const data = require('./data.js');

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

        const textFileExtensions = ['css', 'js', 'svg'];
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

            responseContent = `<!DOCTYPE html>
                                <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Receptai</title>

                                        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
                                        <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">
                                        <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
                                        <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
                                        <link rel="manifest" href="./site.webmanifest">
                                        <link rel="mask-icon" href="./safari-pinned-tab.svg" color="#5bbad5">
                                        <meta name="msapplication-TileColor" content="#da532c">
                                        <meta name="theme-color" content="#ffffff">

                                        <link rel="stylesheet" href="./css/reset.css">
                                        <link rel="stylesheet" href="./css/main.css">
                                        <link rel="stylesheet" href="./css/components/button.css">
                                    </head>
                                    <body>
                                        <h1>Receptai</h1>
                                        <p>Cia bus patys blogiausi receptai pasaulyje - uzsukite kai bus paruosta 😈🍕</p>
                                        <div class="btn">Click me!</div>
                                        <img src="./img/saliami-1.jpg" alt="Saliamis">
                                        <img src="./img/vaikiska-pica.png" alt="Vaikiska pica">
                                        <script src="./js/main.js"></script>
                                    </body>
                                </html>`;
        }

        res.end(responseContent);
    })
});

server.routes = {};

server.api = {};

server.init = () => {
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    })
}

module.exports = server;