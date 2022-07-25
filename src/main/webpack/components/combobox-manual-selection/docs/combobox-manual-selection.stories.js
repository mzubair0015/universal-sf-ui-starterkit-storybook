import ComboboxManualSelection from "../combobox-manual-selection.hbs";


import "../../../site/main.scss";

export default {
  title: "Components/ComboboxManualSelection",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateManualSelection = ({ label, ...args }) => ComboboxManualSelection();
export const ManualSelection = TemplateManualSelection.bind();
