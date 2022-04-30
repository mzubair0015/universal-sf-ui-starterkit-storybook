
import Footer  from '../footer.hbs';

// import '../../../site/main.scss';

export default {
  title: 'Components/Footer',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
   
  },
};

const TemplateFooter = ({ label, ...args }) => Footer(args);
export const Primary = TemplateFooter.bind({});