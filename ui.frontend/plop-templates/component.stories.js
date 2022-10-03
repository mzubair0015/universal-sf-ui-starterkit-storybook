import {{pascalCase name}}Standard from "../{{dashCase name}}.hbs";
import "../../../site/main.scss";

export default {
  title: "Core Components/{{titleCase name}}",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    text: {
      control: { type: "text" },
    },
  },
};

const TemplateStandard = ({ label, ...args }) => {{pascalCase name}}Standard();
export const Standard = TemplateStandard.bind();
