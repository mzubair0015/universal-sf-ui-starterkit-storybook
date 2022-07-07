import SliderMediaseek from "../slider-media-seek.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/SliderMediaseek",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateMediaseek = ({ label, ...args}) => SliderMediaseek();
export const Mediaseek = TemplateMediaseek.bind();