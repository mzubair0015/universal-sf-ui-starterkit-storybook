import DisclosureNavLinks from "../disclosure-nav-toplinks.hbs";

export default {
  title: "Components/Disclosure Navigation Menu with Top-Level Links",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateDisclosureNavLinks = ({ label, ...args }) =>
  DisclosureNavLinks(args);
export const Default = TemplateDisclosureNavLinks.bind({});
