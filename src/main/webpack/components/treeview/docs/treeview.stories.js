import TreeComputed from "../tree-computed.hbs";
import TreeDeclared from "../tree-declared.hbs";
import TreeNavigation from "../tree-nav.hbs";

export default {
  title: "Components/Tree View",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateTreeComputed = ({ label, ...args }) => TreeComputed(args);
export const FileDirectoryComputed = TemplateTreeComputed.bind({});

const TemplateTreeDeclared = ({ label, ...args }) => TreeDeclared(args);
export const FileDirectoryDeclared = TemplateTreeDeclared.bind({});

const TemplateTreeNavigation = ({ label, ...args }) => TreeNavigation(args);
export const Navigation = TemplateTreeNavigation.bind({});
