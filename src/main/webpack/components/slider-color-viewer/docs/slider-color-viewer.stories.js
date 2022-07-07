import SliderColorViewer from "../slider-color-viewer.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/SliderColorViewer",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateColorViewer = ({ label, ...args }) => SliderColorViewer();
export const ColorViewer = TemplateColorViewer.bind();