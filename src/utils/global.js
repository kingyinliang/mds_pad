
import {
  Dimensions, PixelRatio, Platform,
} from 'react-native'
import { getPixel } from './adjust'
import * as storage from './storage'
import * as http from './http'
import * as util from './util'

const { height, width } = Dimensions.get('window')
// 系统是iOS
global.iOS = (Platform.OS === 'ios')
// 系统是安卓
global.Android = (Platform.OS === 'android')
// 获取屏幕宽度
global.SCREEN_WIDTH = width
// 获取屏幕高度
global.SCREEN_HEIGHT = height
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get()
// 最小线宽
global.pixel = 1 / PixelRatio
global.getPixel = getPixel
global.saveData = storage.saveData
global.loadData = storage.loadData
global.removeData = storage.removeData
global.$post = http.$POST
global.$get = http.$GET
global.dataFormat = util.dateFormat
