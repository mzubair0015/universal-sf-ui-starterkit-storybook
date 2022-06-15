import Accordion from "../accordion.hbs";

export default {
  title: "Components/Accordion",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateAccordion = ({ label, ...args }) => Accordion(args);
export const Primary = TemplateAccordion.bind({});
