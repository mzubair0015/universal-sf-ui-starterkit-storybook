import AlertDialog from "../alertdialog.hbs";

export default {
  title: "Components/Alert Dialog",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateAlertDialog = ({ label, ...args }) => AlertDialog(args);
export const Primary = TemplateAlertDialog.bind({});
