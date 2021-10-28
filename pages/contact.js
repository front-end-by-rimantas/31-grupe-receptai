function pageContact() {
    return `<!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Receptai</title>

                <base href="http://localhost:3000/contact/">
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
                <link rel="manifest" href="/site.webmanifest">
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
                <meta name="msapplication-TileColor" content="#da532c">
                <meta name="theme-color" content="#ffffff">

                <link rel="stylesheet" href="/css/reset.css">
                <link rel="stylesheet" href="/css/main.css">
                <link rel="stylesheet" href="/css/components/button.css">
            </head>

            <body>
                <h1>Receptai - susisiekite su mumis!</h1>
                <p>Cia bus patys blogiausi receptai pasaulyje - uzsukite kai bus paruosta 😈🍕</p>

                <form>
                    <div>
                        <label for="name">Vardas</label>
                        <input id="name" type="text">
                    </div>
                    <div>
                        <label for="email">El. paštas</label>
                        <input id="email" type="email">
                    </div>
                    <div>
                        <label for="message">Žinute</label>
                        <textarea id="message"></textarea>
                    </div>
                    <div>
                        <button type="submit">Siųsti</button>
                    </div>
                </form>
                <script src="/js/main.js"></script>
            </body>

            </html>`;
}

module.exports = pageContact;