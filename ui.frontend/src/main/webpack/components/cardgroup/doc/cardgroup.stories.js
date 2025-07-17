import Handlebars from 'handlebars/runtime.js';
import CardGroup from "../cardgroup.hbs";
import CardgroupJSON from "./cardgroup.json";
import CardgroupSecondaryJSON from "./cardgroup-secondary.json";

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
  }
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
  tags: ['visual']
};

export const Secondary = Template.bind({});
Secondary.args = CardgroupSecondaryJSON;
Secondary.parameters = {
  docs: {
    source: {
      code: `${JSON.stringify(CardgroupSecondaryJSON, null, " ")}`,
    },
  },
  tags: ['visual']
};

// export const Primary = (args, { loaded }) => `${JSON.stringify(loaded, null, 1)} ${Object.keys(loaded).map((key) => loaded[key] )}`;
// Primary.loaders = [async () => await render({ name: "Alex" })];
