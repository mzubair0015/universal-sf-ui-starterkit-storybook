import Meter from "../meter.hbs";

export default {
  title: "Components/Meter",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateMeter = ({ label, ...args }) => Meter(args);
export const Primary = TemplateMeter.bind({});
