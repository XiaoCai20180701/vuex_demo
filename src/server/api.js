/**
 * api接口统一管理
 */
import { get } from './http'

export const getGoodsInfo = () => get('/getGoodsInfo', '')
