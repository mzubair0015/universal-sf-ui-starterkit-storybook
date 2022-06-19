import SimpleTable from "./../simple/simple.hbs";
import SortableTable from "./../sortable/sortable.hbs";

export default {
  title: "Components/Table",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateSimple = ({ label, ...args }) => SimpleTable(args);
export const Simple = TemplateSimple.bind({});

const TemplateSortable = ({ label, ...args }) => SortableTable(args);
export const Sortable = TemplateSortable.bind({});
