const Page = require('../components/Page.js');

class PageAbout extends Page {
    constructor() {
        super();
        this.route = 'about';
        this.pageName = 'About';
        this.pageTemplateName = 'about';
    }

    bodyHTML() {
        return `<h1>Receptai - apie mus</h1>
                <p>Cia bus patys blogiausi receptai pasaulyje - uzsukite kai bus paruosta 😈🍕</p>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat sint, tenetur dolore fugit quo! Consectetur maxime incidunt cumque impedit ut amet fugit, odio exercitationem eius, tempora ratione consequatur minima.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat sint, tenetur dolore fugit quo! Consectetur maxime incidunt cumque impedit ut amet fugit, odio exercitationem eius, tempora ratione consequatur minima.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor fugiat sint, tenetur dolore fugit quo! Consectetur maxime incidunt cumque impedit ut amet fugit, odio exercitationem eius, tempora ratione consequatur minima.</p>

                <img src="/img/saliami-1.jpg" alt="Saliamis">
                <img src="/img/vaikiska-pica.png" alt="Vaikiska pica">
                <script src="/js/main.js"></script>`;
    }
}

module.exports = PageAbout;