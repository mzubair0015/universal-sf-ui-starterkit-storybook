import Breadcrumb from "../breadcrumb.hbs";

export default {
  title: "Components/Breadcrumb",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateBreadcrumb = ({ label, ...args }) => Breadcrumb(args);
export const Primary = TemplateBreadcrumb.bind({});
