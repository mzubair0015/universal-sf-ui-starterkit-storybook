import SliderRating from "../slider-rating.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/SliderRating",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateRating = ({ label, ...args}) => SliderRating();
export const Rating = TemplateRating.bind();
