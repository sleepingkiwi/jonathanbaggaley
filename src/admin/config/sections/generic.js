import pageSettings from './pageSettings';


/** generic repeatable content using blocks
 *  ------------------------------------------------------------------------------------------------
**/

const contentBlockOptions = [
  {
    label: 'Collapse Top Padding?',
    name: 'collapseTop',
    widget: 'boolean',
    default: false,
    required: false,
    hint: 'If you want to combine layouts, you can collapse the padding at the top which helps group content without too much padding.',
  },
  {
    label: 'Collapse Bottom Padding?',
    name: 'collapseBottom',
    widget: 'boolean',
    default: false,
    required: false,
    hint: 'If you want to combine layouts, you can also collapse the padding at the bottom. Collapse top & bottom if you want edge to edge content.',
  },
];

const contentBlockContentTypes = {
  label: 'Content Types',
  name: 'content',
  widget: 'list',
  types: [
    {
      label: 'Header',
      name: 'header',
      widget: 'object',
      fields: [
        {
          label: 'Header',
          name: 'header',
          widget: 'string',
          required: false,
        },
        {
          label: 'Sub-Header',
          name: 'subHeader',
          widget: 'string',
          required: false,
          hint: 'smaller text that appears below the header',
        },
        {
          label: 'Text alignment',
          name: 'textAlign',
          widget: 'select',
          options: ['left', 'center', 'right'],
          default: 'left',
        },
      ],
    },
    {
      label: 'Text',
      name: 'text',
      widget: 'object',
      fields: [
        {
          label: 'Text Content',
          name: 'text',
          widget: 'markdown',
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
          label: 'Text alignment',
          name: 'textAlign',
          widget: 'select',
          options: ['left', 'center', 'right'],
          default: 'left',
        },
      ],
    },
    {
      label: 'Quote',
      name: 'quote',
      widget: 'object',
      fields: [
        {
          label: 'Quote Text',
          name: 'quoteText',
          widget: 'string',
          required: false,
          hint: 'You do not need to add “” quotation marks yourself.',
        },
        {
          label: 'Quote Attribution',
          name: 'quoteAttribution',
          widget: 'string',
          required: false,
        },
        {
          label: 'Text alignment',
          name: 'textAlign',
          widget: 'select',
          options: ['left', 'center', 'right'],
          default: 'left',
        },
      ],
    },
    {
      label: 'Image',
      name: 'image',
      widget: 'object',
      fields: [
        {
          label: 'Image',
          name: 'image',
          widget: 'extraImage',
          showDetails: true,
        },
      ],
    },
    {
      label: 'CTA',
      name: 'cta',
      widget: 'object',
      fields: [
        {
          label: 'CTA Text',
          name: 'cta',
          widget: 'string',
          required: false,
          hint: 'If you include text here we will render a CTA button.',
        },
        {
          label: 'CTA Link',
          name: 'ctaURL',
          widget: 'string',
          required: false,
          hint: 'Link for the CTA',
        },
        {
          label: 'Text alignment',
          name: 'textAlign',
          widget: 'select',
          options: ['left', 'center', 'right'],
          default: 'left',
          hint: 'controls button alignment, text inside the button is always centered',
        },
      ],
    },
  ],
};

const genericContentBlocks = [
  {
    label: 'Repeatable content blocks',
    name: 'genericInstructions',
    widget: 'instructions',
    flavour: 'divider',
    instructions: 'Add content in configurable blocks, either one or two columns wide. You can add as many blocks as you\'d like in this section.',
    required: false,
  },
  {
    label: 'Content Blocks',
    name: 'genericContentBlocks',
    widget: 'list',
    types: [
      {
        label: 'One Column',
        name: 'oneColumn',
        widget: 'object',
        fields: [
          ...contentBlockOptions,
          contentBlockContentTypes,
        ],
      },
      {
        label: 'Two Columns',
        name: 'twoColumns',
        widget: 'object',
        fields: [
          ...contentBlockOptions,
          {
            label: 'Column Weighting',
            name: 'columnWeighting',
            widget: 'select',
            options: ['left', 'even', 'right'],
            default: 'left',
            hint: 'It normally makes sense to give more weighting to the column with text in it. You can choose an even weighting if you want columns with evenly sized images.',
          },
          {
            label: 'Column Alignment',
            name: 'columnAlignment',
            widget: 'select',
            options: ['top', 'center', 'bottom'],
            default: 'center',
            hint: 'Should the content in each column align at the top/bottom edge or in the center?',
          },
          {
            label: 'Combined Column Width',
            name: 'columnWidth',
            widget: 'select',
            options: ['wide', 'content', 'text'],
            default: 'wide',
            hint: 'Normally double columns are almost twice the width of single column content. Choose `content` for two columns to match single column images, or `text` to match text blocks.',
          },
          {
            ...contentBlockContentTypes,
            label: 'Left Column Content',
            name: 'leftColumnContent',
          },
          {
            ...contentBlockContentTypes,
            label: 'Right Column Content',
            name: 'rightColumnContent',
          },
        ],
      },
    ],
  },
];

export default genericContentBlocks;


/** We also export the fields for the generic page config
 *  ------------------------------------------------------------------------------------------------
**/
export const genericPageConfig = [
  {
    label: 'Custom Page',
    name: 'genericPageInstructions',
    widget: 'instructions',
    instructions: 'This page can contain whatever you want!',
    flavour: 'header',
    required: false,
  },
  {
    label: 'Layout',
    name: 'layout',
    widget: 'hidden',
    default: 'layouts/page.njk',
  },
  {
    label: 'Tags',
    name: 'tags',
    widget: 'hidden',
    default: 'page',
  },
  {
    label: 'Title',
    name: 'title',
    widget: 'string',
    hint: 'for custom pages this also sets the URL. By default the URL will be a base level of /title. For that reason the following titles are not allowed: admin, index',
    pattern: ['^(?!admin$)(?!index$)(?!Admin$)(?!Index$).*', 'The following titles are not allowed: admin, index'],
  },
  {
    label: 'Permalink Override (Pattern: /your-slug/index.html)',
    name: 'permalink',
    widget: 'string',
    required: false,
    hint: 'You probably don\'t need to set this but you can force a different link for this page if you would like includingsubdirectories. i.e. some/deep/path/index.html',
  },
  ...genericContentBlocks,
  // include general page settings
  ...pageSettings,
];
