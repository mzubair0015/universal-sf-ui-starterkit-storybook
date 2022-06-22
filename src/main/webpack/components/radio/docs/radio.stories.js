import Radio from "../radio.hbs";
import RadioRating from "../radio-rating.hbs";
import RadioActive from "../radio-activedescendant.hbs";

export default {
  title: "Components/Radio",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateRadio = ({ label, ...args }) => Radio(args);
export const Default = TemplateRadio.bind({});

const TemplateRadioRating = ({ label, ...args }) => RadioRating(args);
export const Rating = TemplateRadioRating.bind({});

const TemplateRadioActive = ({ label, ...args }) => RadioActive(args);
export const ActiveDescendant = TemplateRadioActive.bind({});
