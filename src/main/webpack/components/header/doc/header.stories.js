
import Header  from '../header.hbs';

export default {
  title: 'Components/Header',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateHeader = ({ label, ...args }) => Header(args);
export const Primary = TemplateHeader.bind({});