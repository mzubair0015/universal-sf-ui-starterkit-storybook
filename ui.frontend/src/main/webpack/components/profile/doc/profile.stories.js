import Profile from "../profile.hbs";
import ProfileJSON from "./profile.json";

export default {
  title: "Components/Profile",
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      source: {
        code: `${JSON.stringify(ProfileJSON)}`,
      },
    },
  },
};

const Template = ({ ...args }) => Profile(args);
export const Primary = Template.bind({});
Primary.args = ProfileJSON;
Primary.parameters = {
  docs: {
    source: {
      code: `${JSON.stringify(ProfileJSON, null, " ")}`,
    },
  },
};

// export const Primary = (args, { loaded }) => `${JSON.stringify(loaded, null, 1)} ${Object.keys(loaded).map((key) => loaded[key] )}`;
// Primary.loaders = [async () => await render({ name: "Alex" })];
