import CarouselWithButtonControls from "../carousel-with-button-controls.hbs";

export default {
  title: "Components/Carousel/Button Controls",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateButtonControls = ({ label, ...args }) =>
  CarouselWithButtonControls(args);
export const ButtonControls = TemplateButtonControls.bind({});
