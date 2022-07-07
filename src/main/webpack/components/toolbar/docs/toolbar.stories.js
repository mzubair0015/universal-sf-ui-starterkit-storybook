import ToolbarStandard from "../toolbar.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/Toolbar",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => ToolbarStandard();
export const Standard = TemplateStandard.bind();