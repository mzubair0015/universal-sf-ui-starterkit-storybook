import TreeComputed from "../tree-computed.hbs";
import TreeDeclared from "../tree-declared.hbs";

export default {
  title: "Components/Treeview",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateTreeComputed = ({ label, ...args }) => TreeComputed(args);
export const FileDirectoryComputed = TemplateTreeComputed.bind({});

const TemplateTreeDeclared = ({ label, ...args }) => TreeDeclared(args);
export const FileDirectoryDeclared = TemplateTreeDeclared.bind({});
