import LinkStandard from "../link.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/Link",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => LinkStandard();
export const Standard = TemplateStandard.bind();
