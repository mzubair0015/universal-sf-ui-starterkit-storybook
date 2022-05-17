import Footer from "../footer.hbs";
import footerJSON from "./footer.json";

export default {
  title: "Components/Footer",
  argTypes: {
    variation: {
      control: { type: "select", options: ["primary", "secondary"] },
    },
    content: {
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      source: {
        code: `${JSON.stringify(footerJSON)}`,
      },
    },
  },
};

const Template = ({ ...args }) => Footer(args);
export const Primary = Template.bind({});
Primary.args = footerJSON;
Primary.parameters = {
  docs: {
    source: {
      code: `${JSON.stringify(footerJSON, null, " ")}`,
    },
  },
};

// export const Primary = (args, { loaded }) => `${JSON.stringify(loaded, null, 1)} ${Object.keys(loaded).map((key) => loaded[key] )}`;
// Primary.loaders = [async () => await render({ name: "Alex" })];
