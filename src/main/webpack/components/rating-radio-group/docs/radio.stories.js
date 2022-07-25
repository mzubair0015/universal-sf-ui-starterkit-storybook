import RadioRating from "../rating-radio-group.hbs";

export default {
  title: "Components/Radio Rating",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateRadioRating = ({ label, ...args }) => RadioRating(args);
export const Rating = TemplateRadioRating.bind({});
