import ComboboxStandard from "../combobox.hbs";
import "../../../site/main.scss";

export default {
  title: "Components/Combobox",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => ComboboxStandard();
export const Standard = TemplateStandard.bind();