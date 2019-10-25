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
  StyleSheet, View, Text, StatusBar, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView,
} from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import { MAIN_API } from './src/utils/api'
import * as Action from './src/actions/userAction'
import { getPixel } from './src/utils/adjust'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '', // 19040001
      password: '', // 00000000
      secureTextEntry: true,
      savePassword: true,
      autoLogin: false,
      errMsg: '',
      isLoading: false,
    }
  }

  componentWillMount() {
    // 保存密码，自动登录
    global.loadData('user').then((user) => {
      this.setState({ username: user.userName, savePassword: user.savePassword, autoLogin: user.autoLogin })
      if (user.autoLogin) {
        this.setState({ password: user.password })
        this.login()
      } else if (user.savePassword) {
        this.setState({ password: user.password })
      }
    }).catch(() => {
    })
  }

  componentWillUnmount() {
    this.setState({ errMsg: '' })
  }

  loginAction() {
    this.setState({ isLoading: true })
    const { navigation, saveUser } = this.props
    const {
      username, password, savePassword, autoLogin,
    } = this.state
    global.$post(MAIN_API.LOGIN_API, { username, password }).then((res) => {
      if (res.data.code === 0 && res.data.r.list.length > 0) {
        const {
          userId, userName, realName, workNum, workNumTemp,
        } = res.data.r.list[0]
        const workshop = res.data.deptList.find(item => item.deptType === 'workshop')
        const workShop = workshop ? workshop.deptId : ''
        const productline = res.data.deptList.find(item => item.deptType === 'proLine')
        const productLine = productline ? productline.deptId : ''
        // store
        saveUser(userId, userName, realName, workNum, workNumTemp, workShop, productLine)
        // 数据持久化
        global.saveData('token', res.data.r.Authorization)
        global.saveData('user', {
          userId, userName, password, realName, workNum, workNumTemp, workShop, productLine, savePassword, autoLogin,
        })
        navigation.push('Loading')
      } else {
        this.setState({ errMsg: res.data.msg })
      }
    }).catch(() => {
      this.setState({ errMsg: '网络异常，请稍后尝试' })
    }).finally(() => {
      this.setState({ isLoading: false })
    })
  }

  render() {
    const {
      username, password, errMsg, isLoading, secureTextEntry, savePassword, autoLogin,
    } = this.state
    return (
      <ImageBackground source={require('./src/assets/img/bg.png')} style={{ width: '100%', height: '100%' }}>
        <ScrollView style={styles.container}>
          <StatusBar translucent={true} backgroundColor='transparent'></StatusBar>
          <View style={styles.avatar}>
            <Image
              style={styles.avatarImage}
              source={require('./src/assets/img/avatar1.png')}
            />
          </View>
          <View style={{ marginTop: getPixel(40) }}>
            <View style={styles.input}>
              <TouchableOpacity style={styles.icon}>
                <Image
                  style={styles.icon20}
                  resizeMode='contain'
                  source={require('./src/assets/img/user.png')}
                />
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid='transparent'
                style={{ fontSize: getPixel(20), color: '#fff', flex: 1 }}
                multiline={false}
                onChangeText={(val) => { this.setState({ username: val }) }}
                value={username}
              />
              <TouchableOpacity
                style={{ width: getPixel(40) }}
                onPress={() => { this.setState({ username: '' }) }}
              >
                <Image
                  style={styles.icon16}
                  resizeMode='contain'
                  source={require('./src/assets/img/close.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.input, { marginTop: getPixel(18) }]}>
              <TouchableOpacity
                style={styles.icon}
              >
                <Image
                  style={styles.icon20}
                  resizeMode='contain'
                  source={require('./src/assets/img/lock.png')}
                />
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid='transparent'
                style={{ fontSize: getPixel(20), color: '#fff', flex: 1 }}
                multiline={false}
                secureTextEntry={secureTextEntry}
                onChangeText={(val) => { this.setState({ password: val }) }}
                value={password}
              />
              <TouchableOpacity
                style={{ width: getPixel(40) }}
                onPress={() => { this.setState({ secureTextEntry: !secureTextEntry }) }}
              >
                <Image
                  style={styles.icon20}
                  resizeMode='contain'
                  source={secureTextEntry ? require('./src/assets/img/eye.png') : require('./src/assets/img/eye-o.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', height: getPixel(40) }}>
            <CheckBox
              title='记住密码'
              iconLeft
              checkedIcon={<Image style={styles.icon16} source={require('./src/assets/img/check-square.png')} />}
              uncheckedIcon={<Image style={styles.icon16} source={require('./src/assets/img/square.png')} />}
              checked={savePassword}
              onPress={() => { this.setState({ savePassword: !savePassword }) }}
              containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
              textStyle={{ color: '#fff', fontSize: getPixel(16), fontWeight: '400' }}
            />
            <CheckBox
              title='自动登录'
              iconLeft
              checkedIcon={<Image style={styles.icon16} source={require('./src/assets/img/check-square.png')} />}
              uncheckedIcon={<Image style={styles.icon16} source={require('./src/assets/img/square.png')} />}
              checked={autoLogin}
              onPress={() => { this.setState({ autoLogin: !autoLogin }) }}
              containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
              textStyle={{ color: '#fff', fontSize: getPixel(16), fontWeight: '400' }}
            />
          </View>
          <View style={{ height: getPixel(25) }}>
            <Text style={{ fontSize: getPixel(17), color: 'rgba(245,34,45,1)', fontWeight: '400' }}>{errMsg}</Text>
          </View>
          <View style={{ marginTop: getPixel(15) }}>
            <Button
              raised
              title='登录'
              buttonStyle={{ height: getPixel(64), backgroundColor: '#4B74FF' }}
              titleStyle={{ fontSize: getPixel(20), fontWeight: '500' }}
              loading={isLoading}
              onPress={() => { this.loginAction() }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
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
    saveUser: (userId, userName, realName, workNum, workNumTemp, workShop, productLine) => dispatch(Action.saveUser(userId, userName, realName, workNum, workNumTemp, workShop, productLine)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    width: getPixel(368),
    marginLeft: getPixel(56),
  },
  avatar: {
    marginTop: getPixel(175),
    flex: 1,
    alignItems: 'center',
  },
  avatarImage: {
    borderTopLeftRadius: getPixel(60),
    borderTopRightRadius: getPixel(60),
    borderBottomLeftRadius: getPixel(60),
    borderBottomRightRadius: getPixel(60),
    width: getPixel(120),
    height: getPixel(120),
  },
  input: {
    height: getPixel(64),
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: getPixel(6),
    borderTopRightRadius: getPixel(6),
    borderBottomLeftRadius: getPixel(6),
    borderBottomRightRadius: getPixel(6),
  },
  icon: {
    width: getPixel(60),
    paddingLeft: getPixel(20),
  },
  icon20: {
    width: getPixel(20),
    height: getPixel(20),
  },
  icon16: {
    width: getPixel(16),
    height: getPixel(16),
  },
})
