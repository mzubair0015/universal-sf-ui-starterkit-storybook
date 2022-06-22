import Disclosure from "../disclosure-image.hbs";
import DisclosureFaq from "../disclosure-faq.hbs";
import DisclosureNav from "../disclosure-nav.hbs";
import DisclosureNavLinks from "../disclosure-nav-links.hbs";

export default {
  title: "Components/Disclosure",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateDisclosure = ({ label, ...args }) => Disclosure(args);
export const ImageDescription = TemplateDisclosure.bind({});

const TemplateDisclosureFaq = ({ label, ...args }) => DisclosureFaq(args);
export const FAQ = TemplateDisclosureFaq.bind({});

const TemplateDisclosureNav = ({ label, ...args }) => DisclosureNav(args);
export const NavigationMenu = TemplateDisclosureNav.bind({});

const TemplateDisclosureNavLinks = ({ label, ...args }) =>
  DisclosureNavLinks(args);
export const TopLevelLinks = TemplateDisclosureNavLinks.bind({});
