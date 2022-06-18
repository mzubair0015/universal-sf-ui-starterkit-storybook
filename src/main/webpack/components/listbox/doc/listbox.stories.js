import GroupedOptionsListbox from "./../grouped-options/grouped-options.hbs";
import MultiSelectRearrangableListbox from "./../multi-select-rearrangable/multi-select-rearrangable.hbs";
import ScrollableListbox from "./../scrollable/scrollable.hbs";
import SingleSelectRearrangableListbox from "./../single-select-rearrangeable/single-select-rearrangable.hbs";

export default {
  title: 'Components/Listbox',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateGroupedOptions = ({ label, ...args }) => GroupedOptionsListbox(args);
export const GroupedOptions = TemplateGroupedOptions.bind({});

const TemplateMultiSelectRearrangable = ({ label, ...args }) => MultiSelectRearrangableListbox(args);
export const MultiSelectRearrangable = TemplateMultiSelectRearrangable.bind({});

const TemplateScrollable = ({ label, ...args }) => ScrollableListbox(args);
export const Scrollable = TemplateScrollable.bind({});

const TemplateSingleSelectRearrangable = ({ label, ...args }) => SingleSelectRearrangableListbox(args);
export const SingleSelectRearrangable = TemplateSingleSelectRearrangable.bind({});