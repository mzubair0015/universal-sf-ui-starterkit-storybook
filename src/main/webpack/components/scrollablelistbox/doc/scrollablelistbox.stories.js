import ScrollableListbox from "../scrollablelistbox.hbs";

export default {
  title: 'Components/Listbox/Scrollable',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateScrollable = ({ label, ...args }) => ScrollableListbox(args);
export const Scrollable = TemplateScrollable.bind({});