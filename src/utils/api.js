
// const HOST = 'http://10.10.1.23:8080/xhqy-fc/app' // 本地环境
const HOST = 'https://apimarket-dev.shinho.net.cn/xhqy-fc/app' // 开发环境
// const HOST = 'https://apimarket-test.shinho.net.cn/xhqy-fc/app' // 测试环境
// const HOST = 'https://apimarket.shinho.net.cn/xhqy-fc/app' // 生产环境

export const MAIN_API = {
  /**
   *  LOGIN_API 登录
   */
  LOGIN_API: `${HOST}/sys/login`,
  /**
   *  LOGOUT_API 退出登录
   */
  LOGOUT_API: `${HOST}/sys/logout`,
}
/**
 * 炒麦
 */
export const WHEAT_API = {
  /**
   * 同步订单
   */
  RETRIEVE_ORDERS: `${HOST}/getOrderOnApp`,
  /**
   * 上传订单
   */
  UPLOAD_ORDERS: `${HOST}/uploadDataOnApp`,
}
/**
 * 制曲
 */
export const KJMAKING_API = {
}