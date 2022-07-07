import ComboboxWithoutAutocomplete from "../combobox-without-autocomplete.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/ComboboxWithoutAutocomplete",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateWithoutAutocomplete = ({ label, ...args }) => ComboboxWithoutAutocomplete();
export const WithoutAutocomplete = TemplateWithoutAutocomplete.bind();