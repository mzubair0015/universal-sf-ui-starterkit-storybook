
import AccordionStandard  from '../standard.hbs';
import AccordionSampleContent  from '../sample-content.hbs';
import AccordionExpandedItem  from '../expanded-item.hbs';
import AccordionExpandedItems  from '../expanded-items.hbs';
import AccordionSingleExpansion  from '../single-expansion.hbs';
import AccordionNested  from '../nested.hbs';

import '../../../site/main.scss';

export default {
  title: 'Core Components/Accordion',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    text: {
      control: { type: "text" }
    }
  },
};

const TemplateStandard = ({ label, ...args }) => AccordionStandard();
export const Standard = TemplateStandard.bind();

const TemplateSampleContent = ({ label, ...args }) => AccordionSampleContent();
export const SampleContent = TemplateSampleContent.bind();

const TemplateExpandedItem = ({ label, ...args }) => AccordionExpandedItem();
export const ExpandedItem = TemplateExpandedItem.bind();

const TemplateExpandedItems = ({ label, ...args }) => AccordionExpandedItems();
export const ExpandedItems = TemplateExpandedItems.bind();

const TemplateSingleExpansion = ({ label, ...args }) => AccordionSingleExpansion();
export const SingleExpansion = TemplateSingleExpansion.bind();

const TemplateNested = ({ label, ...args }) => AccordionNested();
export const Nested = TemplateNested.bind();