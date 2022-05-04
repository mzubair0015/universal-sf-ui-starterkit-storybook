import "../../../site/main.scss";
import SimpleContainer from "../simple-container.hbs";
export default {
  title: "Core Components/Container",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    text: {
      control: { type: "text" },
    },
  },
};
const TemplateSimple = ({ label, ...args }) =>
  SimpleContainer({ label: () => label });
export const Simple = TemplateSimple.bind();
