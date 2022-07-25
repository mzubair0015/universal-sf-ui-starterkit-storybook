import GroupedOptionsListbox from "../groupedoptionslistbox.hbs";
export default {
  title: 'Components/Listbox/Grouped Options',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateGroupedOptions = ({ label, ...args }) => GroupedOptionsListbox(args);
export const GroupedOptions = TemplateGroupedOptions.bind({});