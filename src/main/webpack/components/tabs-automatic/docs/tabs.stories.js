import TabsAuto from "../tabs-automatic.hbs";

export default {
  title: "Components/Tabs with Automatic Activation",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateTabsAuto = ({ label, ...args }) => TabsAuto(args);
export const Automatic = TemplateTabsAuto.bind({});
