import SimpleListLayout from "../simplelist.hbs";

export default {
  title: "Components/Grids/Layout Grids/Simple List",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateSimpleList = ({ label, ...args }) => SimpleListLayout(args);
export const SimpleList = TemplateSimpleList.bind({});
