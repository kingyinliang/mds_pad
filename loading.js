/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet, View, Image, Animated, StatusBar,
} from 'react-native'
import { Toast } from '@ant-design/react-native'
import * as Action from './src/actions/wheatAction'
import { getPixel } from './src/utils/adjust'
import { WHEAT_API } from './src/utils/api'

class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeInOpacity: new Animated.Value(1), // 透明度初始值设为0
    }
  }

  componentWillMount() {
    const { navigation, saveOrderList, user } = this.props
    const { workShop, productLine } = user
    const { fadeInOpacity } = this.state
    global.$post(WHEAT_API.RETRIEVE_ORDERS, { workShop, productLine, orderList: [] }).then((res) => {
      if (res.data.code === 0) {
        saveOrderList(res.data.list, res.data.wheatDeviceList, res.data.flourDeviceList)
        Animated.timing( // 随时间变化而执行动画
          fadeInOpacity, // 动画中的变量值
          {
            toValue: 0, // 透明度最终变为1，即完全不透明
            duration: 1000, // 让动画持续一段时间
          }
        ).start(() => { navigation.replace('Wheat') })
      }
    }).catch(() => {
      Toast.fail('网络不给力，请稍后再试！')
    })
  }

  render() {
    const { fadeInOpacity } = this.state
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content'></StatusBar>
        <Animated.View style={{ opacity: fadeInOpacity }}>
          <Image source={require('./src/assets/img/loading.gif')} style={{ width: getPixel(124), height: getPixel(124) }} />
        </Animated.View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderList: (orderList, wheatDeviceList, flourDeviceList) => dispatch(Action.saveOrderList(orderList, wheatDeviceList, flourDeviceList)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Loading)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
