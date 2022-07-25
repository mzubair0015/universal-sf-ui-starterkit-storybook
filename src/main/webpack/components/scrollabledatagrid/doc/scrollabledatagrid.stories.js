import ScrollableDataGrid from "../scrollabledatagrid.hbs";
export default {
  title: "Components/Grids/Data Grids/Scrollable",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateScrollable = ({ label, ...args }) => ScrollableDataGrid(args);
export const Scrollable = TemplateScrollable.bind({});