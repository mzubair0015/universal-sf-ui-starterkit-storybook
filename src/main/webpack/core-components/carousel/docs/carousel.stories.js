
import CarouselImage  from '../image-slides.hbs';
import CarouselTeaser  from '../teaser-slides.hbs';
import CarouselAutoTransition  from '../auto-transition.hbs';
import CarouselPauseOnHover  from '../pause-hover.hbs';

export default {
  title: 'Core Components/Carousel',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateImage = ({ label, ...args }) => CarouselImage();
export const Image = TemplateImage.bind();

const TemplateTeaser = ({ label, ...args }) => CarouselTeaser();
export const Teaser = TemplateTeaser.bind();

const TemplateAutoTransition = ({ label, ...args }) => CarouselAutoTransition();
export const AutoTransition = TemplateAutoTransition.bind();

const TemplatePauseOnHover = ({ label, ...args }) => CarouselPauseOnHover();
export const PauseOnHover = TemplatePauseOnHover.bind();
