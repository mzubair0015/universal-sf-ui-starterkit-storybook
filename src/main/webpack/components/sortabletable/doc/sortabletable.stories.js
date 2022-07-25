import SortableTable from "../sortabletable.hbs";

export default {
  title: 'Components/Table/Sortable',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateSortable = ({ label, ...args }) => SortableTable(args);
export const Sortable = TemplateSortable.bind({});