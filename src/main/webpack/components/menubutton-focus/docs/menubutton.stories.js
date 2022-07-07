import MenuButtonFocus from "../menubutton-focus.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/MenubuttonFocus",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateFocus = ({ label, ...args }) => MenuButtonFocus();
export const Focus = TemplateFocus.bind();