import MenuNav from "../menu-nav.hbs";

export default {
  title: "Components/Menubar Navigation",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateMenuNav = ({ label, ...args }) => MenuNav(args);
export const Default = TemplateMenuNav.bind({});
