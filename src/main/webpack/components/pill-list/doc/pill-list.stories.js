import PillListLayout from "../pill-list.hbs";

export default {
  title: "Components/Grids/Layout Grids/Pill List",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplatePillList = ({ label, ...args }) => PillListLayout(args);
export const PillList = TemplatePillList.bind({});
