import Checkbox from "../checkbox-two-state.hbs";

export default {
  title: "Components/Checkbox Two State",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateCheckbox = ({ label, ...args }) => Checkbox(args);
export const TwoStates = TemplateCheckbox.bind({});
