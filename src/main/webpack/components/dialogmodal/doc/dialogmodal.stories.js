import ModalDialog from "./../modal/modal.hbs";
import DatePickerDialog from "./../datepicker/datepicker.hbs";

export default {
  title: "Components/Dialog (Modal)",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateModal = ({ label, ...args }) => ModalDialog(args);
export const Modal = TemplateModal.bind({});

const TemplateDatePicker = ({ label, ...args }) => DatePickerDialog(args);
export const DatePicker = TemplateDatePicker.bind({});
