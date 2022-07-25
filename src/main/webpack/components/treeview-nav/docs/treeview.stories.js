import TreeNavigation from "../treeview-nav.hbs";

export default {
  title: "Components/Treeview Navigation",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateTreeNavigation = ({ label, ...args }) => TreeNavigation(args);
export const Default = TemplateTreeNavigation.bind({});
