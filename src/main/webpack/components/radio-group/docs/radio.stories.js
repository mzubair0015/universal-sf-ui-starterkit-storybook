import Radio from "../radio-group.hbs";

export default {
  title: "Components/Radio Group",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateRadio = ({ label, ...args }) => Radio(args);
export const Default = TemplateRadio.bind({});
