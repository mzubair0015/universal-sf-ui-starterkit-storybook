import ComboboxInlineAutocomplete from "../combobox-inline-autocomplete.hbs";


import "../../../site/main.scss";

export default {
  title: "Components/ComboboxInlineAutocomplete",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateInlineAutocomplete = ({ label, ...args }) => ComboboxInlineAutocomplete();
export const InlineAutocomplete = TemplateInlineAutocomplete.bind();
