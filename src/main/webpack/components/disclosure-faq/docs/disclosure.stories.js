import DisclosureFaq from "../disclosure-faq.hbs";

export default {
  title: "Components/Disclosure of Answers to Frequently Asked Questions",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateDisclosureFaq = ({ label, ...args }) => DisclosureFaq(args);
export const Default = TemplateDisclosureFaq.bind({});
