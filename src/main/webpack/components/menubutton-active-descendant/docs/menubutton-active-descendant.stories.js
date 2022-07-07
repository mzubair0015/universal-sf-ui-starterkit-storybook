import MenuButtonActiveDescendant from "../menubutton-active-descendant.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/MenubuttonActiveDescendant",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateActiveDescendant = ({ label, ...args }) => MenuButtonActiveDescendant();
export const ActiveDescendant = TemplateActiveDescendant.bind();