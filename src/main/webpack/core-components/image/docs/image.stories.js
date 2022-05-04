import ImageCaption from "../caption.hbs";
import ImageStandard from "../image.hbs";
import ImageEmpty from "../empty-image.hbs";
import LinkedImage from "../linked.hbs";
import SvgGifImage from "../svg-gif.hbs";
import "../../../site/main.scss";

export default {
  title: "Core Components/Image",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    text: {
      control: { type: "text" },
    },
  },
};
const TemplateStandard = ({ label, ...args }) => ImageStandard();
export const Standard = TemplateStandard.bind();

const TemplateImageEmpty = ({ label, ...args }) => ImageEmpty();
export const EmptyImage = TemplateImageEmpty.bind();

const TemplateImageCaption = ({ label, ...args }) => ImageCaption();
export const Caption = TemplateImageCaption.bind();

const TemplateLinkedImage = ({ label, ...args }) => LinkedImage();
export const Linked = TemplateLinkedImage.bind();

const TemplateSvgGif = ({ label, ...args }) => SvgGifImage();
export const SvgGif = TemplateSvgGif.bind();
