import Checkbox from "../checkbox.hbs";
import CheckboxMixed from "../checkbox-mixed.hbs";

export default {
  title: "Components/Checkbox",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateCheckbox = ({ label, ...args }) => Checkbox(args);
export const TwoStates = TemplateCheckbox.bind({});

const TemplateCheckboxMixed = ({ label, ...args }) => CheckboxMixed(args);
export const Mixed = TemplateCheckboxMixed.bind({});
