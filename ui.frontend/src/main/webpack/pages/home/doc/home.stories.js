import Handlebars from 'handlebars/runtime.js';
import Header  from '../../../components/header/header.hbs';
import BreadcrumbStandard  from '../../../core-components/breadcrumb/standard.hbs';
import Carousel  from '../../../core-components/carousel/image-slides.hbs';
import TeaserWithImage  from '../../../core-components/teaser/with-image.hbs';
import CardGroup  from '../../../components/cardgroup/cardgroup.hbs';
import Footer  from '../../../components/footer/footer.hbs';
import Home  from '../home.hbs';

// Register all partials
Handlebars.registerPartial('Header', Header);
Handlebars.registerPartial('Breadcrumb', BreadcrumbStandard);
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
  Primary.parameters = {
    tags: ['visual']  // Add visual tag to enable visual testing
  };
  