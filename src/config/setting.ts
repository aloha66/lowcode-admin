export const elements = [
  {
    text: '输入框',
    name: 'input',
    widget: 'input',
    schema: {
      title: '输入框',
      type: 'string',
    },
    setting: {
      props: {
        title: '选项',
        type: 'object',
        labelWidth: 80,
        properties: {
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
          },
          addonBefore: {
            title: '前tab',
            type: 'string',
          },
          addonAfter: {
            title: '后tab',
            type: 'string',
          },
          prefix: {
            title: '前缀',
            type: 'string',
          },
          suffix: {
            title: '后缀',
            type: 'string',
          },
        },
      },
      minLength: {
        title: '最短字数',
        type: 'number',
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
      },
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        props: {
          placeholder: '填写正则表达式',
        },
      },
    },
  },
  {
    text: '大输入框',
    name: 'textarea',
    widget: 'textarea',
    schema: {
      title: '编辑框',
      type: 'string',
      format: 'textarea',
    },
    setting: {
      props: {
        title: '选项',
        type: 'object',
        labelWidth: 80,
        properties: {
          autoSize: {
            title: '高度自动',
            type: 'boolean',
          },
          row: {
            title: '指定高度',
            type: 'number',
          },
        },
      },
      minLength: {
        title: '最短字数',
        type: 'number',
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
      },
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        props: {
          placeholder: '填写正则表达式',
        },
      },
    },
  },

  {
    text: '日期选择',
    name: 'date',
    widget: 'date',
    schema: {
      title: '日期选择',
      type: 'string',
      format: 'date',
    },
    setting: {
      format: {
        title: '格式',
        type: 'string',
        enum: ['dateTime', 'date', 'time'],
        enumNames: ['日期时间', '日期', '时间'],
      },
    },
  },
  {
    text: '数字输入框',
    name: 'number',
    widget: 'number',
    schema: {
      title: '数字输入框',
      type: 'number',
    },
    setting: {},
  },
  {
    text: '是否选择',
    name: 'checkbox',
    widget: 'checkbox',
    schema: {
      title: '是否选择',
      type: 'boolean',
      widget: 'checkbox',
    },
    setting: {
      default: {
        title: '是否默认勾选',
        type: 'boolean',
      },
    },
  },
  {
    text: '是否switch',
    name: 'switch',
    widget: 'switch',
    schema: {
      title: '是否选择',
      type: 'boolean',
      widget: 'switch',
    },
    setting: {
      default: {
        title: '是否默认开启',
        type: 'boolean',
      },
    },
  },
  {
    text: '下拉单选',
    name: 'select',
    widget: 'select',
    schema: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      widget: 'select',
    },
    setting: {
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        widget: 'select',
        props: {
          mode: 'tags',
        },
      },
      enumNames: {
        title: '选项名称',
        type: 'array',
        enum: [],
        widget: 'select',
        props: {
          mode: 'tags',
        },
      },
    },
  },
  {
    text: '点击单选',
    name: 'radio',
    widget: 'radio',
    schema: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      widget: 'radio',
    },
    setting: {
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        widget: 'select',
        props: {
          mode: 'tags',
        },
      },
      enumNames: {
        title: '选项名称',
        type: 'array',
        enum: [],
        widget: 'select',
        props: {
          mode: 'tags',
        },
      },
    },
  },
  {
    text: '下拉多选',
    name: 'multiSelect',
    widget: 'multiSelect',
    schema: {
      title: '多选',
      description: '下拉多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['杭州', '武汉', '湖州', '贵阳'],
      widget: 'multiSelect',
    },
    setting: {
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        widget: 'select',
        props: {
          mode: 'tags',
        },
      },
      enumNames: {
        title: '选项名称',
        type: 'array',
        enum: [],
        widget: 'select',
        props: {
          mode: 'tags',
        },
      },
    },
  },
  {
    text: '点击多选',
    name: 'checkboxes',
    widget: 'checkboxes',
    schema: {
      title: '多选',
      description: '点击多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['杭州', '武汉', '湖州', '贵阳'],
    },
    setting: {
      enum: {
        title: '选项字段',
        type: 'array',
        enum: [],
        widget: 'select',
        props: {
          mode: 'tags',
        },
      },
      enumNames: {
        title: '选项名称',
        type: 'array',
        enum: [],
        widget: 'select',
        props: {
          mode: 'tags',
        },
      },
    },
  },
  {
    text: 'HTML',
    name: 'html',
    widget: 'html',
    schema: {
      title: 'HTML',
      type: 'string',
      widget: 'html',
    },
    setting: {
      default: {
        title: '展示内容',
        type: 'string',
      },
    },
  },
];
