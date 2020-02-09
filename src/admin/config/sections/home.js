/** Home page config
 *  ------------------------------------------------------------------------------------------------
**/
import pageSettings from './pageSettings';
import genericContentBlocks from './generic';

const homeConfig = {
  name: 'index',
  label: 'Homepage',
  delete: false,
  file: 'src/index.md',
  slug: 'index',
  create: false,
  fields: [
    {
      label: 'Home Page',
      name: 'homePageInstructions',
      widget: 'instructions',
      flavour: 'header',
      instructions: 'The home page is the same as normal pages, you just cannot delete it!',
      required: false,
    },
    {
      label: 'Layout',
      name: 'layout',
      widget: 'hidden',
      default: 'layouts/home',
    },
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
      default: 'Home',
    },
    // we can add generic content here too
    ...genericContentBlocks,
    // we also include all of the regular page settings!
    ...pageSettings,
  ], // fields
};

export default homeConfig;
