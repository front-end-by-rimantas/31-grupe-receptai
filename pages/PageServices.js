const Page = require('../components/Page.js');

class PageServices extends Page {
    constructor() {
        super();
        this.route = 'services';
        this.pageName = 'Services';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>Services - paslaugos</h1>
                <p>Mūsų paslaugos</p>

                <ul>
                    <li>Kepimas <a href="./kepimas">Read more ></a></li>
                    <li>Virimas <a href="./virimas">Read more ></a></li>
                    <li>Privezimas <a href="./vezimas">Read more ></a></li>
                </ul>

                <script src="/js/main.js"></script>`;
    }
}

module.exports = PageServices;