export const apiTest = {
  type: 'object',
  properties: {
    baseUrl: {
      title: '域名地址',
      type: 'string',
      description: '不保存到数据库',
      placeholder: '默认是当前网站域名',
    },
    proxyPass: {
      title: '转发路径',
      type: 'string',
      description: '微服务等功能会用到',
      placeholder: '例如：/bp/account',
    },
    url: {
      title: 'api地址',
      type: 'string',
      required: true,
    },
    method: {
      title: '请求方式',
      type: 'string',
      default: 'get',
      enum: ['get', 'post', 'put', 'delete'],
      enumNames: ['get', 'post', 'put', 'delete'],
    },
    payload: {
      title: '参数',
      type: 'string',
      format: 'textarea',
      props: {
        autoSize: true,
      },
    },
  },
};
