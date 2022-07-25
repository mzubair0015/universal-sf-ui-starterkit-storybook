import ComboboxDatePicker from "../combobox-date-picker.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/ComboboxDatePicker",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateDatePicker = ({ label, ...args }) => ComboboxDatePicker();
export const DatePicker = TemplateDatePicker.bind();