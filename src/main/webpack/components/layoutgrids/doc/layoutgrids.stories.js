import PillListLayout from "../pill-list/pill-list.hbs";
import ScrollableSearchLayout from "../scrollable-search/scrollable-search.hbs";
import SimpleListLayout from "../simple-list/simplelist.hbs";

export default {
  title: "Components/Grids/Layout Grids",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplatePillList = ({ label, ...args }) => PillListLayout(args);
export const PillList = TemplatePillList.bind({});

const TemplateScrollableSearch = ({ label, ...args }) =>
  ScrollableSearchLayout(args);
export const ScrollableSearchList = TemplateScrollableSearch.bind({});

const TemplateSimpleList = ({ label, ...args }) => SimpleListLayout(args);
export const SimpleList = TemplateSimpleList.bind({});
