import Checkbox from "../checkbox.hbs";

export default {
  title: "Components/Checkbox",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateCheckbox = ({ label, ...args }) => Checkbox(args);
export const Primary = TemplateCheckbox.bind({});
