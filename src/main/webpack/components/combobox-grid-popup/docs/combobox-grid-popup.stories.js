import ComboboxGridPopup from "../combobox-grid-popup.hbs";


import "../../../site/main.scss";

export default {
  title: "Components/ComboboxGridPopup",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateGridPopup = ({ label, ...args }) => ComboboxGridPopup();
export const GridPopup = TemplateGridPopup.bind();