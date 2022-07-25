import SingleSelectRearrangableListbox from "../singleselectrearrangablelistbox.hbs";

export default {
  title: 'Components/Listbox/Single Select Rearrangable',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateSingleSelectRearrangable = ({ label, ...args }) => SingleSelectRearrangableListbox(args);
export const SingleSelectRearrangable = TemplateSingleSelectRearrangable.bind({});