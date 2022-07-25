import MultiSelectRearrangableListbox from "../multiselectrearrangablelistbox.hbs";

export default {
  title: 'Components/Listbox/Multi Select Rearrangable',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateMultiSelectRearrangable = ({ label, ...args }) => MultiSelectRearrangableListbox(args);
export const MultiSelectRearrangable = TemplateMultiSelectRearrangable.bind({});