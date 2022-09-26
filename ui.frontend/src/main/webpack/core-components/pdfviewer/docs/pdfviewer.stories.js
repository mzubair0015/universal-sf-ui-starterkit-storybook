import PdfViewerFullWindow from "../full-window.hbs";
import PdfViewerInline from "../inline.hbs";
import PdfViewerSizedContainer from "../sized-container.hbs";

export default {
  title: "Core Components/PdfViewer",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateFullWindow = ({ label, ...args }) => PdfViewerFullWindow();
export const FullWindow = TemplateFullWindow.bind();

const TemplateInline = ({ label, ...args }) => PdfViewerInline();
export const Inline = TemplateInline.bind();

const TemplateSizedContainer = ({ label, ...args }) =>
  PdfViewerSizedContainer();
export const SizedContainer = TemplateSizedContainer.bind();
