import Handlebars from 'handlebars/runtime.js';
import Header  from '../../../components/header/header.hbs';
import Breadcrumb  from '../../../core-components/breadcrumb/standard.hbs';
import Carousel  from '../../../core-components/carousel/image-slides.hbs';
import Footer  from '../../../components/footer/footer.hbs';
import Home  from '../home.hbs';

Handlebars.registerPartial('Header', Header);
Handlebars.registerPartial('Breadcrumb', Breadcrumb);
Handlebars.registerPartial('Carousel', Carousel);
Handlebars.registerPartial('Footer', Footer);

// import '../../../site/main.scss';

export default {
    title: 'Pages/Home',
    // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
    argTypes: {
    },
  };
  
  const TemplateHome = ({ label, ...args }) => Home();
  export const Primary = TemplateHome.bind();