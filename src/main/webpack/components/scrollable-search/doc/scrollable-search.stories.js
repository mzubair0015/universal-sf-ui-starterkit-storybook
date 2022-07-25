import ScrollableSearchLayout from "../scrollable-search.hbs";

export default {
  title: "Components/Grids/Layout Grids/Scrollable Search",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateScrollableSearch = ({ label, ...args }) =>
  ScrollableSearchLayout(args);
export const ScrollableSearch = TemplateScrollableSearch.bind({});
