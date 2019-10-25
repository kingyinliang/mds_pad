export const SAVE_ORDER_LIST = 'SAVE_ORDER_LIST'
export const CHANGE_ACTIVE_SECTIONS = 'CHANGE_ACTIVE_SECTIONS'
export function saveOrderList(orderList, wheatDeviceList, flourDeviceList) {
  return {
    type: SAVE_ORDER_LIST,
    data: {
      orderList, wheatDeviceList, flourDeviceList,
    },
  }
}
export function changeActiveSections(activeSections) {
  return {
    type: CHANGE_ACTIVE_SECTIONS,
    data: {
      activeSections,
    },
  }
}