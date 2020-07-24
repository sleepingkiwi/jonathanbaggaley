/** page settings - things that appear on pretty much every page!
 *  ------------------------------------------------------------------------------------------------
**/

import { metaConfigPage } from './meta';

const pageSettings = [
  {
    label: 'Page Settings & SEO',
    name: 'genericPageSettingsInstructions',
    widget: 'instructions',
    flavour: 'divider',
    instructions: 'Settings for this page that affect the overall appearence or overwrite global defaults.',
    required: false,
  },
  // include all of the social & meta options at the end
  ...metaConfigPage,
  {
    label: 'Hide navigation menu?',
    name: 'noNav',
    widget: 'boolean',
    default: false,
    required: false,
    hint: 'Set to true for standalone pages where you don\'t want the nav to appear.',
  },
  {
    label: 'Hide site name',
    name: 'noLogo',
    widget: 'boolean',
    default: false,
    required: false,
    hint: 'Set to true if you also want to hide the site name that normally appears above the nav.',
  },
];

export default pageSettings;
