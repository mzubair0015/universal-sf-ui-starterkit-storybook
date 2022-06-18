import CarouselWithButtons from "../carousel-with-button-controls.hbs";
import CarouselWithTabs from "./../carousel-with-tab-controls.hbs";

export default {
  title: "Components/Carousel",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateButtonControls = ({ label, ...args }) =>
  CarouselWithButtons(args);
export const ButtonControls = TemplateButtonControls.bind({});

const TemplateTabControls = ({ label, ...args }) => CarouselWithTabs(args);
export const TabControls = TemplateTabControls.bind({});
