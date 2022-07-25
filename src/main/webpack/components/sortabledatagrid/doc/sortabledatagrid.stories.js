import SortableDataGrid from "../sortabledatagrid.hbs";

export default {
  title: "Components/Grids/Data Grids/Sortable",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateSortable = ({ label, ...args }) => SortableDataGrid(args);
export const Sortable = TemplateSortable.bind({});