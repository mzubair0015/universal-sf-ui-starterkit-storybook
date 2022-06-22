import MenuNav from "../menu-nav.hbs";
import MenuEditor from "../menu-editor.hbs";

export default {
  title: "Components/Menubar",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateMenuNav = ({ label, ...args }) => MenuNav(args);
export const Navigation = TemplateMenuNav.bind({});

const TemplateMenuEditor = ({ label, ...args }) => MenuEditor(args);
export const Editor = TemplateMenuEditor.bind({});
