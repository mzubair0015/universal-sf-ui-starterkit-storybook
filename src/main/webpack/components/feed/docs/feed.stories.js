import FeedStandard from "../feed.hbs";

import "../../../site/main.scss";

export default {
  title: "Components/Feed",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateStandard = ({ label, ...args }) => FeedStandard();
export const Standard = TemplateStandard.bind();
