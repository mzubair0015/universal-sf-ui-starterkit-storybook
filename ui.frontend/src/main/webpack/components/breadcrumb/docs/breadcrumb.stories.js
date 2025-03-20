
import Handlebars from 'handlebars/runtime.js';
import Breadcrumb  from '../breadcrumb.hbs';
import Standard  from '../../../core-components/breadcrumb/standard.hbs';
Handlebars.registerPartial('Standard', Standard);


export default {
  title: 'Components/Breadcrumb',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateStandard = ({ label, ...args }) => Breadcrumb();
export const breadcrumb = TemplateStandard.bind();
