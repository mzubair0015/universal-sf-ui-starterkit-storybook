import "../../../site/main.scss";
import LanguageNavSingleLevel from "../singlelevel.hbs";
import LanguageNavMultiLevel from "../multilevel.hbs";

export default {
  title: "Core Components/LanguageNavigation",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};
const TemplateSingleLevel = ({ label, ...args }) => LanguageNavSingleLevel();
export const SingleLevel = TemplateSingleLevel.bind();

const TemplateMultiLevel = ({ label, ...args }) => LanguageNavMultiLevel();
export const MultiLevel = TemplateMultiLevel.bind();
