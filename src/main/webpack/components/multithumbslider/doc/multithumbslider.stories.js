import MultiThumbSlider from "../multithumbslider.hbs";

export default {
  title: "Components/Multi-Thumb Slider",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplatePrimary = ({ label, ...args }) => MultiThumbSlider(args);
export const Primary = TemplatePrimary.bind({});
