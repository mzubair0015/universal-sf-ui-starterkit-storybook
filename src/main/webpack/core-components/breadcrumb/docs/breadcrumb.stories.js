
import BreadcrumbStandard  from '../standard.hbs';
import BreadcrumbStartLevel  from '../start-level.hbs';
import BreadcrumbShowHidden  from '../show-hidden.hbs';
import BreadcrumbHideCurrentPage  from '../hide-current-page.hbs';
import BreadcrumbDisableShadowing  from '../disable-shadowing.hbs';

export default {
  title: 'Core Components/Breadcrumb',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

const TemplateStandard = ({ label, ...args }) => BreadcrumbStandard();
export const Standard = TemplateStandard.bind();

const TemplateStartLevel = ({ label, ...args }) => BreadcrumbStartLevel();
export const StartLevel = TemplateStartLevel.bind();

const TemplateShowHidden = ({ label, ...args }) => BreadcrumbShowHidden();
export const ShowHidden = TemplateShowHidden.bind();

const TemplateHideCurrentPage = ({ label, ...args }) => BreadcrumbHideCurrentPage();
export const HideCurrentPage = TemplateHideCurrentPage.bind();

const TemplateDisableShadowing = ({ label, ...args }) => BreadcrumbDisableShadowing();
export const DisableShadowing = TemplateDisableShadowing.bind();
