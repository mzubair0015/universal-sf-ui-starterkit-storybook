import ButtonStandard from "../button-standard.htl";
import ButtonLinked from "../button-linked.htl";
import ButtonIcon from "../button-icon.htl";

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: "Core Components/Button",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    text: {
      control: { type: "text" },
    },
    variant: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
  },
};

const TemplateStandard = ({ label, ...args }) => ButtonStandard;
export const Standard = TemplateStandard.bind();

const TemplateLinked = ({ label, ...args }) => ButtonLinked;
export const Linked = TemplateLinked.bind();

const TemplateIcon = ({ label, ...args }) => ButtonIcon;
export const Icon = TemplateIcon.bind();

// const Template = ({ label, ...args }) => ButtonStandard;
// export const Standard = Template.bind();
