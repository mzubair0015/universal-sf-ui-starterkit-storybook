import Disclosure from "../disclosure-img-desc.hbs";

export default {
  title: "Components/Disclosure of Image Description",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateDisclosure = ({ label, ...args }) => Disclosure(args);
export const Default = TemplateDisclosure.bind({});
