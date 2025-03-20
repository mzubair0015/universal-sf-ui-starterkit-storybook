import Handlebars from 'handlebars/runtime.js';
import Header  from '../../../components/header/header.hbs';
import Breadcrumb  from '../../../components/breadcrumb/breadcrumb.hbs';
import Carousel  from '../../../core-components/carousel/image-slides.hbs';
import TeaserWithImage  from '../../../core-components/teaser/with-image.hbs';
import CardGroup  from '../../../components/cardgroup/cardgroup.hbs';
import Footer  from '../../../components/footer/footer.hbs';
import Home  from '../home.hbs';

Handlebars.registerPartial('Header', Header);
Handlebars.registerPartial('Breadcrumb', Breadcrumb);
Handlebars.registerPartial('Carousel', Carousel);
Handlebars.registerPartial('Footer', Footer);
Handlebars.registerPartial('CardGroup', CardGroup);
Handlebars.registerPartial('TeaserWithImage', TeaserWithImage);

// import '../../../site/main.scss';

export default {
    title: 'Pages/Home',
    // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
    argTypes: {
    },
  };
  
  const TemplateHome = ({ label, ...args }) => Home();
  export const Primary = TemplateHome.bind();