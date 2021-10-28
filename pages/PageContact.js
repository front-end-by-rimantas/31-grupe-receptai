const Page = require('../components/Page.js');

class PageContact extends Page {
    constructor() {
        super();
        this.route = 'contact';
        this.pageName = 'Contact';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>Receptai - susisiekite su mumis!</h1>
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
                <script src="/js/main.js"></script>`;
    }
}

module.exports = PageContact;