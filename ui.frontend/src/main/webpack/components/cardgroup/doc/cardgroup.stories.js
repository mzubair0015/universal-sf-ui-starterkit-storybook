import Handlebars from 'handlebars/runtime.js';
import CardGroup from "../cardgroup.hbs";
import CardgroupJSON from "./cardgroup.json";

import TeaserWithImage  from '../../../core-components/teaser/with-image.hbs';

Handlebars.registerPartial('TeaserWithImage', TeaserWithImage);

export default {
  title: "Components/CardGroup",
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
        code: `${JSON.stringify(CardgroupJSON)}`,
      },
    },
  },
};

const Template = ({ ...args }) => CardGroup(args);
export const Primary = Template.bind({});
Primary.args = CardgroupJSON;
Primary.parameters = {
  docs: {
    source: {
      code: `${JSON.stringify(CardgroupJSON, null, " ")}`,
    },
  },
};

// export const Primary = (args, { loaded }) => `${JSON.stringify(loaded, null, 1)} ${Object.keys(loaded).map((key) => loaded[key] )}`;
// Primary.loaders = [async () => await render({ name: "Alex" })];
