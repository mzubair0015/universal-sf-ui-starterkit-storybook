import ButtonStandard from "../button.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/Button",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => ButtonStandard();
export const Standard = TemplateStandard.bind();
