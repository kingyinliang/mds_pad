import storage from '../storage'
/**
 *
 * @param {*} key
 * @param {*} data
 * @param {*} expires
 * 异步保存, 使用key保存数据, 默认过期时间一天
 * 注意:请不要在key中使用_下划线符号!
 */
export function saveData(key, data, expires = 1000 * 3600 * 24) {
  return new Promise((resolve, reject) => {
    storage.save({ key, data, expires }).then(() => {
      resolve('success')
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 *
 * @param {*} key
 * 异步查询， 使用key查询
 */
export function loadData(key) {
  return new Promise((resolve, reject) => {
    storage.load({
      key,
      autoSync: false,
      syncInBackground: false,
    }).then((value) => {
      if (value && value !== '') {
        return resolve(value)
      }
      return resolve(null)
    }).catch((error) => {
      return reject(error)
    })
  })
  // storage.load({
  //   key,
  //   // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
  //   autoSync: true,
  //   // syncInBackground(默认为true)意味着如果数据过期，
  //   // 在调用sync方法的同时先返回已经过期的数据。
  //   // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
  //   syncInBackground: false,
  //   // 你还可以给sync方法传递额外的参数
  //   syncParams: {
  //     extraFetchOptions: {
  //       // 各种参数
  //     },
  //     someFlag: true
  //   },
  // }).then(ret => {
  //     // 如果找到数据，则在then方法中返回
  //     // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
  //     // 你只能在then这个方法内继续处理ret数据
  //     // 而不能在then以外处理
  //     // 也没有办法“变成”同步返回
  //     // 你也可以使用“看似”同步的async/await语法
  //     // 更新data值
  // }).catch(err => {
  //   //如果没有找到数据且没有sync方法，
  //   //或者有其他异常，则在catch中返回
  //   switch (err.name) {
  //     case 'NotFoundError':
  //       // 更新
  //       break;
  //     case 'ExpiredError':
  //       // TODO
  //       break;
  //   }
  // })
}

/**
 *
 * @param {*} key
 * 异步删除
 */
export function removeData(key) {
  return new Promise((resolve, reject) => {
    storage.remove({ key }).then(() => {
      resolve('success')
    }).catch((error) => {
      return reject(error)
    })
  })
}

/**
 * 异步删除所有数据
 */
export async function clearData() {
  return new Promise((resolve, reject) => {
    storage.clearMap().then(() => {
      resolve('success')
    }).catch((error) => {
      return reject(error)
    })
  })
}
