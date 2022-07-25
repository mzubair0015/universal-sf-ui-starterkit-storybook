import SimpleTable from "../simpletable.hbs";

export default {
  title: 'Components/Table/Simple',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateSimple = ({ label, ...args }) => SimpleTable(args);
export const Simple = TemplateSimple.bind({});