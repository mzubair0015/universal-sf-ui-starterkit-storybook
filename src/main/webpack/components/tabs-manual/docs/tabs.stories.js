import TabsManual from "../tabs-manual.hbs";

export default {
  title: "Components/Tabs with Manual Activation",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateTabsManual = ({ label, ...args }) => TabsManual(args);
export const Manual = TemplateTabsManual.bind({});
