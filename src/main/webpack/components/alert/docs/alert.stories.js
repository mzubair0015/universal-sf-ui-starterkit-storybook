import AlertStandard from "../alert.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/Alert",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => AlertStandard();
export const Standard = TemplateStandard.bind();
