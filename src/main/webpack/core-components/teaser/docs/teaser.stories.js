import "../../../site/main.scss";
import TeaserCTA from "../cta.hbs";
import TeaserLinked from "../linked.hbs";
import TeaserMultipleCta from "../multiple-cta.hbs";
import TeaserWithImage from "../with-image.hbs";
import TeaserWithoutImage from "../without-image.hbs";
export default {
  title: "Core Components/Teaser",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    text: {
      control: { type: "text" },
    },
  },
};

const TemplateCTA = ({ label, ...args }) => TeaserCTA();
export const CTA = TemplateCTA.bind();

const TemplateLinked = ({ label, ...args }) => TeaserLinked();
export const Linked = TemplateLinked.bind();

const TemplateMultipleCta = ({ label, ...args }) => TeaserMultipleCta();
export const MultipleCta = TemplateMultipleCta.bind();

const TemplateWithImage = ({ label, ...args }) => TeaserWithImage();
export const WithImage = TemplateWithImage.bind();

const TemplateWithoutImage = ({ label, ...args }) => TeaserWithoutImage();
export const WithoutImage = TemplateWithoutImage.bind();
