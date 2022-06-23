import TabsAuto from "../tabs-automatic.hbs";
import TabsManual from "../tabs-manual.hbs";

export default {
  title: "Components/Tabs",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateTabsAuto = ({ label, ...args }) => TabsAuto(args);
export const Automatic = TemplateTabsAuto.bind({});

const TemplateTabsManual = ({ label, ...args }) => TabsManual(args);
export const Manual = TemplateTabsManual.bind({});
