import ModalDialog from "../dialogmodal.hbs";

export default {
  title: "Components/Modal/Dialog",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateModal = ({ label, ...args }) => ModalDialog(args);
export const Dialog = TemplateModal.bind({});
