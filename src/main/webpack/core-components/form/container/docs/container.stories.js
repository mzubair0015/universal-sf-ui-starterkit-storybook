import FormContainerStandard from "../standard.hbs";

export default {
  title: "Core Components/CoreFormContainer",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => FormContainerStandard();
export const Standard = TemplateStandard.bind();
