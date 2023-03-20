import http from './http'

export const getDailySentence = () => http.get({ url: 'https://api.xygeng.cn/one' })
