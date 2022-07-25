import CarouselWithTabControls from "../carousel-with-tab-controls.hbs";

export default {
  title: "Components/Carousel/Tab Controls",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {},
};

const TemplateTabControls = ({ label, ...args }) =>
  CarouselWithTabControls(args);
export const TabControls = TemplateTabControls.bind({});