
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet, View, Text, Image,
} from 'react-native'
import {
  Icon, Header, Avatar,
} from 'react-native-elements'
import {
  List, Toast, Provider,
} from '@ant-design/react-native'
import * as Action from '../../actions/userAction'
import { getPixel } from '../../utils/adjust'

class Index extends Component {
  render() {
    const { navigation, user } = this.props
    return (
      <Provider>
        <View style={styles.container}>
          <Header
            statusBarProps={{ translucent: true, backgroundColor: 'transparent' }}
            centerComponent={{ text: '个人设置', style: { color: '#fff', fontSize: 24 } }}
            leftComponent={<Icon type='antdesign' name='left' color='#fff' onPress={() => { navigation.goBack() }} />}
            containerStyle={{
              backgroundColor: '#446BCF',
              position: 'absolute',
              top: 0,
              height: getPixel(100),
              width: getPixel(480),
            }}
          />
          <View style={{
            marginTop: getPixel(90), width: getPixel(480), height: getPixel(300), backgroundColor: '#446BCF', flex: 1, alignItems: 'center', justifyContent: 'center',
          }}
          >
            <Avatar
              rounded
              size='xlarge'
              source={require('../../assets/img/avatar2.png')}
            />
            <Text style={{
              marginTop: getPixel(10), color: 'rgba(248,248,248,1)', lineHeight: getPixel(30), fontWeight: '500', fontSize: getPixel(20),
            }}
            >
              {`${user.realName} ${user.userName}`}
            </Text>
            {/* <Button style={{ marginTop: 20 }} onPress={() => { navigation.push('Login') }}>退出</Button> */}
          </View>
          <View style={{
            width: getPixel(480), marginTop: getPixel(10),
          }}
          >
            <List>
              <List.Item
                style={{ height: getPixel(80) }}
                arrow='horizontal'
                thumb={<Image style={{ width: getPixel(18), height: getPixel(15) }} resizeMode='contain' source={require('../../assets/img/list.png')} />}
                onPress={() => { Toast.info('组织信息') }}
              >
                组织信息
              </List.Item>
              <List.Item
                style={{ height: getPixel(80) }}
                arrow='horizontal'
                thumb={<Image style={{ width: getPixel(18), height: getPixel(15) }} resizeMode='contain' source={require('../../assets/img/edit.png')} />}
                onPress={() => { Toast.info('修改密码') }}
              >
                修改密码
              </List.Item>
              <List.Item
                style={{ height: getPixel(80) }}
                arrow='horizontal'
                thumb={<Image style={{ width: getPixel(18), height: getPixel(15) }} resizeMode='contain' source={require('../../assets/img/email.png')} />}
                onPress={() => { Toast.info('修改邮箱') }}
              >
                修改邮箱
              </List.Item>
            </List>
          </View>
        </View>
      </Provider>
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
    saveUser: (userId, userName, realName, workNum, workNumTemp) => dispatch(Action.saveUser(userId, userName, realName, workNum, workNumTemp)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
})