import DatePickerDialog from "../datepicker.hbs"

export default {
  title: "Components/Modal/Date Picker",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateDatePicker = ({ label, ...args }) => DatePickerDialog(args);
export const DatePicker = TemplateDatePicker.bind({});