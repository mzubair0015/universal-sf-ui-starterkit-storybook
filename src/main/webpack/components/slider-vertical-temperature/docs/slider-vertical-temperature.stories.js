import SliderVerticaltemperature from "../slider-vertical-temperature.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/SliderVerticalTemperature",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateVerticaltemperature = ({ label, ...args}) => SliderVerticaltemperature();
export const Verticaltemperature = TemplateVerticaltemperature.bind();