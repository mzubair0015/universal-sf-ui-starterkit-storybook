import Spinbutton from "../spinbutton.hbs";

export default {
  title: "Components/Spinbutton",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateSpinbutton = ({ label, ...args }) => Spinbutton(args);
export const Default = TemplateSpinbutton.bind({});
