import MenuButtonNavigation from "../menubutton-navigation.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/MenubuttonNavigation",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateNavigation = ({ label, ...args }) => MenuButtonNavigation();
export const Navigation = TemplateNavigation.bind();