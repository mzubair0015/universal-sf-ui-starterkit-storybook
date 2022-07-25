import ContentFragmentStandard from "../standard.hbs";
import ContentFragmentVariations from "../variations.hbs";
import ContentFragmentStructured from "../structured.hbs";
import ContentFragmentElements from "../elements.hbs";

export default {
  title: "Core Components/ContentFragment",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => ContentFragmentStandard();
export const Standard = TemplateStandard.bind();

const TemplateVariations = ({ label, ...args }) => ContentFragmentVariations();
export const Variations = TemplateVariations.bind();

const TemplateStructured = ({ label, ...args }) => ContentFragmentStructured();
export const Structured = TemplateStructured.bind();

const TemplateElements = ({ label, ...args }) => ContentFragmentElements();
export const Elements = TemplateElements.bind();
