import DownloadStandard from "../standard.hbs";
import DownloadTitleDesc from "../title-description.hbs";
import DownloadDisplayInline from "../display-inline.hbs";
import DownloadDirectUpload from "../direct-upload.hbs";

export default {
  title: "Core Components/Download",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => DownloadStandard();
export const Standard = TemplateStandard.bind();

const TemplateTitleDescription = ({ label, ...args }) => DownloadTitleDesc();
export const TitleDescription = TemplateTitleDescription.bind();

const TemplateDisplayInline = ({ label, ...args }) => DownloadDisplayInline();
export const DisplayInline = TemplateDisplayInline.bind();

const TemplateDirectUpload = ({ label, ...args }) => DownloadDirectUpload();
export const DirectUpload = TemplateDirectUpload.bind();
