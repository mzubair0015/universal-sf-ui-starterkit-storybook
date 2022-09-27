import AccordionStandard from "../title.hbs";
import "../../../site/main.scss";

export default {
  title: "Core Components/Title",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    text: {
      control: { type: "text" },
    },
  },
};

const TemplateStandard = ({ label, ...args }) => AccordionStandard();
export const Standard = TemplateStandard.bind();
