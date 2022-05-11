
import Footer  from '../footer.hbs';
import footerConfig from '../doc/footer.json';

// import '../../../site/main.scss';

export default {
  title: 'Components/Footer',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
   
  },
  parameters: {
    docs: {
        source: {
            code: `${JSON.stringify(footerConfig)}`,
        },
    },
},
};

const TemplateFooter = ({ label, ...args }) => Footer(args);
export const Primary = TemplateFooter.bind({});
Primary.args = footerConfig;
Primary.parameters = {
  docs: {
      source: {
          code: `${JSON.stringify(footerConfig)}`,
      },
  },
};