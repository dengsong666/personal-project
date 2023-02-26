import http from './http'

export const getDailySentence = () => http('GET', { url: 'https://api.xygeng.cn/one' })
