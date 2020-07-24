/** Home page config
 *  ------------------------------------------------------------------------------------------------
**/
import pageSettings from './pageSettings';

const workConfig = [
  {
    label: 'Work',
    name: 'workPageInstructions',
    widget: 'instructions',
    instructions: 'An individual work project.',
    flavour: 'header',
    required: false,
  },
  {
    label: 'Layout',
    name: 'layout',
    widget: 'hidden',
    default: 'layouts/work',
  },
  {
    label: 'Tags',
    name: 'tags',
    widget: 'hidden',
    default: 'work',
  },
  {
    label: 'Permalink Override (Pattern: /your-slug/index.html)',
    name: 'permalink',
    widget: 'string',
    required: false,
    hint: 'You probably don\'t need to set this but you can force a different link for this page if you would like including subdirectories. i.e. some/deep/path/index.html',
  },
  {
    label: 'Project Title',
    name: 'title',
    widget: 'string',
    default: 'Project Title',
    hint: 'Shown at the bottom of the project page. This also sets the URL. By default the URL will be a base level of /title. For that reason the following titles are not allowed: admin, index',
    pattern: ['^(?!admin$)(?!index$)(?!Admin$)(?!Index$).*', 'The following titles are not allowed: admin, index'],
  },
  {
    label: 'Project Date',
    name: 'projectDate',
    widget: 'string',
    default: '1988',
    required: false,
    hint: 'Shown in parentheses after the project title if included.',
  },
  {
    label: 'Project Information',
    name: 'description',
    widget: 'markdown',
    required: false,
    buttons: [
      'bold',
      'italic',
      'code',
      'link',
      'heading-one',
      'heading-two',
      'heading-three',
      'heading-four',
      'heading-five',
      'heading-six',
      'quote',
      'bulleted-list',
      'numbered-list',
    ],
    editorComponents: [
      'code-block',
    ],
  },
  {
    label: 'Project Content',
    name: 'projectContent',
    required: false,
    widget: 'list',
    showDetails: true,
    hint: 'This will normally be images but you can optionally include code to embed video too.',
    fields: [
      {
        label: 'Content Name',
        name: 'name',
        widget: 'string',
        required: false,
        hint: 'Just for your own reference to make sorting this list easier.',
      },
      {
        label: 'Image',
        name: 'image',
        widget: 'extraImage',
        showDetails: true,
        required: false,
      },
      {
        label: 'Or',
        name: 'workPageInstructionsVideo',
        widget: 'instructions',
        instructions: 'If you leave the image blank you can paste embed code for a video (or anything else) here.\n For example choose Share/Embed from Youtube or Vimeo and paste the iframe code below.',
        flavour: 'divider',
        required: false,
      },
      {
        label: 'Video/Embed',
        name: 'embed',
        widget: 'text',
        required: false,
        hint: 'this will probably be code that starts with <iframe....',
      },
      {
        label: 'Video Height Ratio',
        name: 'embedRatio',
        widget: 'number',
        required: false,
        default: 56.25,
        step: 0.001,
        hint: 'this defines the content ratio. It is a percentage value for height versus width. 16:9 is 56.25, 4:3 is 75',
      },
    ],
  },
  // include general page settings
  ...pageSettings,
];

export default workConfig;
