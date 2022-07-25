import MenuEditor from "../menu-editor.hbs";

export default {
  title: "Components/Menubar Editor",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateMenuEditor = ({ label, ...args }) => MenuEditor(args);
export const Default = TemplateMenuEditor.bind({});
