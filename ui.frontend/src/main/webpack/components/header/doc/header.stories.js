import Header from "../header.hbs";

export default {
  title: "Components/Header",
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    title: {
      control: 'text',
      description: 'Header title text'
    }
  }
};

// Create a template for the header
const Template = ({ ...args }) => Header(args);

// Create the default story
export const Default = Template.bind({});
Default.args = {
  title: 'Default Header'
};
Default.parameters = {
  tags: ['visual']  // Add visual tag to enable visual testing
};

export { Header };
