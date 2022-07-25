import DisclosureNav from "../disclosure-nav-menu.hbs";

export default {
  title: "Components/Disclosure Navigation Menu",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateDisclosureNav = ({ label, ...args }) => DisclosureNav(args);
export const Default = TemplateDisclosureNav.bind({});
