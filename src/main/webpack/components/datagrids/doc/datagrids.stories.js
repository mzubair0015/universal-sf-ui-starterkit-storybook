import MinimalDataGrid from "./../minimal/minimal.hbs";
import ScrollableDataGrid from "../scrollable/scrollable.hbs";
import SortableDataGrid from "../sortable/sortable.hbs";

export default {
  title: "Components/Grids/Data Grids",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateMinimal = ({ label, ...args }) => MinimalDataGrid(args);
export const Minimal = TemplateMinimal.bind({});

const TemplateScrollable = ({ label, ...args }) => ScrollableDataGrid(args);
export const Scrollable = TemplateScrollable.bind({});

const TemplateSortable = ({ label, ...args }) => SortableDataGrid(args);
export const Sortable = TemplateSortable.bind({});
