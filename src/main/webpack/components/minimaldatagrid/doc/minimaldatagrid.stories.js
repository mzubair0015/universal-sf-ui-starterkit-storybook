import MinimalDataGrid from "../minimaldatagrid.hbs";

export default {
  title: "Components/Grids/Data Grids/Minimal",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateMinimal = ({ label, ...args }) => MinimalDataGrid(args);
export const Minimal = TemplateMinimal.bind({});