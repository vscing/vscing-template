// 开发环境基础配置
const developmentConfig =  {
    title: '寻雾启示',
    uploadHost: 'http://cms.xunwukeji.cn',
    apiHost: 'http://cms.xunwukeji.cn/api', // api地址
    tokenType: 'Bearer ',
    log : true, // 是否开启输出日志
    base: '/',
}

// 生产环境基础配置
const productionConfig =  {
    title: '寻雾启示',
    uploadHost: 'http://cms.xunwukeji.cn',
    apiHost: 'http://cms.xunwukeji.cn/api', // api地址
    tokenType: 'Bearer ',
    log: false, // 是否开启输出日志
    base: '/web/',
}

// 系统环境配置
const env = (() => {
    if (process.env.NODE_ENV === 'production') {
        return productionConfig //生产环境
    } else {
        return developmentConfig //开发环境
    }
})()

export {
    developmentConfig,
    productionConfig,
    env
}
