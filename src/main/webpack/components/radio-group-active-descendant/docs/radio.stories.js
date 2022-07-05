import RadioActive from "../radio-group-active-descendant.hbs";

export default {
  title: "Components/Radio Active Descendant",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateRadioActive = ({ label, ...args }) => RadioActive(args);
export const ActiveDescendant = TemplateRadioActive.bind({});
