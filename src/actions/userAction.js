export const SAVE_USER = 'SAVE_USER'

export function saveUser(userId, userName, realName, workNum, workNumTemp, workShop, productLine) {
  return {
    type: SAVE_USER,
    data: {
      userId, userName, realName, workNum, workNumTemp, workShop, productLine,
    },
  }
}
