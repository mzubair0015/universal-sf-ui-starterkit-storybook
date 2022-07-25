import CheckboxMixed from "../checkbox-mixed-state.hbs";

export default {
  title: "Components/Checkbox Mixed State",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateCheckboxMixed = ({ label, ...args }) => CheckboxMixed(args);
export const Mixed = TemplateCheckboxMixed.bind({});
