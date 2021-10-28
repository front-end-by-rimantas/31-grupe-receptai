const Page = require('../components/Page.js');

class PageReceptai extends Page {
    constructor() {
        super();
        this.route = 'receptai';
        this.pageName = 'Receptai';
        this.pageTemplateName = 'receptai';
    }

    bodyHTML() {
        return `<h1>Receptai</h1>
                <p>Cia bus patys blogiausi receptai pasaulyje - uzsukite kai bus paruosta 😈🍕</p>

                <ul>
                    <li>Blynai <a href="./blynai">Read more ></a></li>
                    <li>Duona <a href="./duona">Read more ></a></li>
                    <li>Cepelinai <a href="./cepelinai">Read more ></a></li>
                </ul>

                <script src="/js/main.js"></script>`;
    }
}

module.exports = PageReceptai;