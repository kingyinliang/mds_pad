import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView,
} from 'react-native'
import { Icon, Header } from 'react-native-elements'
import {
  List, Picker, Provider, Button, Toast,
} from '@ant-design/react-native'
import { BoxShadow } from 'react-native-shadow'
import { getPixel } from '../../../utils/adjust'
import { dateFormat } from '../../../utils/util'

class Index extends Component {
  constructor() {
    super()
    this.state = {
      inPortBatch: '',
      startWeight: '',
      endWeight: '',
      wheatDeviceVal: [''],
      wheatDeviceName: '请选择',
      flourDeviceVal: [''],
      flourDeviceName: '请选择',
      wheatDeviceDataList: [],
      flourDeviceDataList: [],
    }
  }

  componentWillMount() {
    const { navigation, flourDeviceList, wheatDeviceList } = this.props
    const order = navigation.getParam('order')
    const detailId = navigation.getParam('detailId')
    const { wheatDeviceDataList, flourDeviceDataList } = this.state
    wheatDeviceDataList.push({ value: '', label: '请选择', no: '' })
    flourDeviceDataList.push({ value: '', label: '请选择', no: '' })
    for (const item of wheatDeviceList) {
      wheatDeviceDataList.push({ value: item.holderId, label: item.holderName, no: item.holderNo })
    }
    for (const item of flourDeviceList) {
      flourDeviceDataList.push({ value: item.holderId, label: item.holderName, no: item.holderNo })
    }
    const detail = order.inList.find(item => item.id === detailId)
    if (detail) {
      this.setState({
        wheatDeviceVal: [detail.wheatDeviceId],
        wheatDeviceName: detail.wheatDeviceName,
        flourDeviceVal: [detail.flourDeviceId],
        flourDeviceName: detail.flourDeviceName,
        inPortBatch: detail.inPortBatch,
        startWeight: `${detail.startWeight}`,
        endWeight: `${detail.endWeight}`,
      })
    }
  }

  changeFlourPick(flourDeviceVal) {
    const { flourDeviceDataList } = this.state
    const flour = flourDeviceDataList.find(item => item.value === flourDeviceVal[0])
    this.setState({ flourDeviceVal, flourDeviceName: flour.label })
  }

  changeWheatPick(wheatDeviceVal) {
    const { wheatDeviceDataList } = this.state
    const wheat = wheatDeviceDataList.find(item => item.value === wheatDeviceVal[0])
    const date = new Date()
    const inPortBatch = wheatDeviceVal[0] === '' ? '' : dateFormat(date, 'yyMMdd') + wheat.no
    this.setState({ wheatDeviceVal, wheatDeviceName: wheat.label, inPortBatch })
  }

  validate() {
    const {
      wheatDeviceVal, flourDeviceVal, inPortBatch, startWeight, endWeight,
    } = this.state
    let flag = false
    if (flourDeviceVal[0] === '') {
      Toast.info('麦粉罐不能为空')
    } else if (wheatDeviceVal[0] === '') {
      Toast.info('粮仓号不能为空')
    } else if (inPortBatch === '') {
      Toast.info('入库批次不能为空')
    } else if (inPortBatch.length > 10) {
      Toast.info('入库批次长度不能超过10')
    } else if (startWeight === '') {
      Toast.info('起始数不能为空')
    } else if (endWeight === '') {
      Toast.info('结束数不能为空')
    } else {
      flag = true
    }
    return flag
  }

  save() {
    if (this.validate()) {
      const { navigation, user } = this.props
      const order = navigation.getParam('order')
      order.pkgOrderEntity.isModified = true
      const detailId = navigation.getParam('detailId')
      let detail = order.inList.find(item => item.id === detailId)
      const {
        wheatDeviceVal, wheatDeviceName, flourDeviceVal, flourDeviceName, inPortBatch, startWeight, endWeight,
      } = this.state
      if (detail) {
        // 修改
        const [flourDeviceId] = flourDeviceVal
        detail.flourDeviceId = flourDeviceId
        detail.flourDeviceName = flourDeviceName
        const [wheatDeviceId] = wheatDeviceVal
        detail.wheatDeviceId = wheatDeviceId
        detail.wheatDeviceName = wheatDeviceName
        detail.inPortBatch = inPortBatch
        detail.startWeight = startWeight
        detail.endWeight = endWeight
        detail.inPortWeight = endWeight - startWeight
        detail.changer = user.userName
      } else {
        // 新增
        detail = {}
        detail.orderId = order.pkgOrderEntity.orderId
        const [flourDeviceId] = flourDeviceVal
        detail.flourDeviceId = flourDeviceId
        detail.flourDeviceName = flourDeviceName
        const [wheatDeviceId] = wheatDeviceVal
        detail.wheatDeviceId = wheatDeviceId
        detail.wheatDeviceName = wheatDeviceName
        detail.inPortBatch = inPortBatch
        detail.startWeight = startWeight
        detail.endWeight = endWeight
        detail.inPortWeight = endWeight - startWeight
        detail.creator = user.userName
        detail.changer = user.userName
        order.inList.push(detail)
      }
      Toast.success('修改成功', 2, () => { navigation.replace('Wheat') })
    }
  }

  render() {
    const { navigation } = this.props
    const order = navigation.getParam('order')
    const {
      wheatDeviceDataList, flourDeviceDataList, wheatDeviceVal, wheatDeviceName, flourDeviceVal, flourDeviceName, inPortBatch, startWeight, endWeight,
    } = this.state
    const shadowBox = {
      width: getPixel(448),
      height: getPixel(478),
      color: '#000',
      border: getPixel(2),
      radius: getPixel(6),
      opacity: 0.11,
      x: getPixel(2),
      y: getPixel(7),
      style: { marginVertical: getPixel(7) },
    }
    return (
      <Provider>
        <View style={styles.container}>
          <Header
            statusBarProps={{ translucent: true, backgroundColor: 'transparent' }}
            centerComponent={{ text: '入库信息', style: { color: '#fff', fontSize: 24 } }}
            leftComponent={<Icon type='antdesign' name='left' color='#fff' onPress={() => { navigation.goBack() }} />}
            containerStyle={{
              backgroundColor: '#2A56C6',
              position: 'absolute',
              top: 0,
              zIndex: 9999,
              height: getPixel(100),
              width: getPixel(480),
            }}
          />
          <ScrollView style={styles.scrollViewStyle}>
            <View style={{ marginTop: getPixel(110) }}>
              <BoxShadow setting={shadowBox}>
                <View style={styles.itemStyle}>
                  <View>
                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>订单编号：</Text>
                      <Text style={styles.itemContainer}>{order.pkgOrderEntity.orderNo}</Text>
                    </View>
                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>产品品项：</Text>
                      <Text style={styles.itemContainer}>
                        {order.pkgOrderEntity.materialCode ? order.pkgOrderEntity.materialCode : '' }
                        {' '}
                        { order.pkgOrderEntity.materialName ? order.pkgOrderEntity.materialName : ''}
                      </Text>
                    </View>
                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>计划产量：</Text>
                      <Text style={styles.itemContainer}>
                        {order.pkgOrderEntity.planOutput}
                        {' '}
                        KG
                      </Text>
                    </View>
                    <View style={styles.itemRow}>
                      <Text style={styles.itemTitle}>生产日期：</Text>
                      <Text style={styles.itemContainer}>
                        {order.pkgOrderEntity.productDate ? order.pkgOrderEntity.productDate : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginLeft: getPixel(10) }}>
                    <List>
                      <View
                        style={{
                          flexDirection: 'row', alignItems: 'center', height: getPixel(60),
                        }}
                      >
                        <Text style={{
                          width: getPixel(100), fontSize: getPixel(18), color: 'rgba(51,51,51,1)', lineHeight: getPixel(27),
                        }}
                        >
                          麦粉罐
                        </Text>
                        <Picker
                          data={flourDeviceDataList}
                          cols={1}
                          okText='完成'
                          value={flourDeviceVal}
                          onChange={(val) => { this.changeFlourPick(val) }}
                        >
                          <Text style={{
                            width: getPixel(250), fontSize: getPixel(18), color: 'rgba(153,153,153,1)', lineHeight: getPixel(27),
                          }}
                          >
                            {flourDeviceName}
                          </Text>
                        </Picker>
                        <TouchableOpacity style={{
                          width: getPixel(60), height: getPixel(60), alignItems: 'center', justifyContent: 'center',
                        }}
                          onPress={() => { this.changeFlourPick(['']) }}
                        >
                          <Image style={{ width: getPixel(20), height: getPixel(20) }} source={require('../../../assets/img/del.png')} />
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        flexDirection: 'row', alignItems: 'center', height: getPixel(60),
                      }}
                      >
                        <Text style={{
                          width: getPixel(100), fontSize: getPixel(18), color: 'rgba(51,51,51,1)', lineHeight: getPixel(27),
                        }}
                        >
                          粮仓号
                        </Text>
                        <Picker
                          data={wheatDeviceDataList}
                          cols={1}
                          okText='完成'
                          value={wheatDeviceVal}
                          onChange={(val) => { this.changeWheatPick(val) }}
                        >
                          <Text style={{
                            width: getPixel(250), fontSize: getPixel(18), color: 'rgba(153,153,153,1)', lineHeight: getPixel(27),
                          }}
                          >
                            {wheatDeviceName}
                          </Text>
                        </Picker>
                        <TouchableOpacity style={{
                          width: getPixel(60), height: getPixel(60), alignItems: 'center', justifyContent: 'center',
                        }}
                          onPress={() => { this.changeWheatPick(['']) }}
                        >
                          <Image
                            style={{ width: getPixel(20), height: getPixel(20) }}
                            source={require('../../../assets/img/del.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        flexDirection: 'row', alignItems: 'center', height: getPixel(60),
                      }}
                      >
                        <Text style={{
                          width: getPixel(100), fontSize: getPixel(18), color: 'rgba(51,51,51,1)', lineHeight: getPixel(27),
                        }}
                        >
                          入库批次
                        </Text>
                        <TextInput
                          style={{
                            width: getPixel(250), paddingLeft: 0, fontWeight: '400', fontSize: getPixel(18), color: 'rgba(51,51,51,1)',
                          }}
                          placeholder='请输入'
                          onChangeText={val => this.setState({ inPortBatch: val.replace(/\s+/g, '') })}
                          value={inPortBatch}
                        />
                        <TouchableOpacity style={{
                          width: getPixel(60), height: getPixel(60), alignItems: 'center', justifyContent: 'center',
                        }}
                          onPress={() => this.setState({ inPortBatch: '' })}
                        >
                          <Image
                            style={{ width: getPixel(20), height: getPixel(20) }}
                            source={require('../../../assets/img/del.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        flexDirection: 'row', alignItems: 'center', height: getPixel(60),
                      }}
                      >
                        <Text style={{
                          width: getPixel(100), fontSize: getPixel(18), color: 'rgba(51,51,51,1)', lineHeight: getPixel(27),
                        }}
                        >
                          起始数
                        </Text>
                        <TextInput
                          style={{
                            width: getPixel(250), paddingLeft: 0, fontWeight: '400', fontSize: getPixel(18), color: 'rgba(51,51,51,1)',
                          }}
                          placeholder='请输入'
                          onChangeText={val => this.setState({ startWeight: val.replace(/\s+/g, '') })}
                          keyboardType='numeric'
                          value={startWeight}
                        />
                        <TouchableOpacity style={{
                          width: getPixel(60), height: getPixel(60), alignItems: 'center', justifyContent: 'center',
                        }}
                          onPress={() => this.setState({ startWeight: '' })}
                        >
                          <Image
                            style={{ width: getPixel(20), height: getPixel(20) }}
                            source={require('../../../assets/img/del.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        flexDirection: 'row', alignItems: 'center', height: getPixel(60),
                      }}
                      >
                        <Text style={{
                          width: getPixel(100), fontSize: getPixel(18), color: 'rgba(51,51,51,1)', lineHeight: getPixel(27),
                        }}
                        >
                          结束数
                        </Text>
                        <TextInput
                          style={{
                            width: getPixel(250), paddingLeft: 0, fontWeight: '400', fontSize: getPixel(18), color: 'rgba(51,51,51,1)',
                          }}
                          placeholder='请输入'
                          onChangeText={val => this.setState({ endWeight: val.replace(/\s+/g, '') })}
                          keyboardType='numeric'
                          value={endWeight}
                        />
                        <TouchableOpacity style={{
                          width: getPixel(60), height: getPixel(60), alignItems: 'center', justifyContent: 'center',
                        }}
                          onPress={() => this.setState({ endWeight: '' })}
                        >
                          <Image
                            style={{ width: getPixel(20), height: getPixel(20) }}
                            source={require('../../../assets/img/del.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </List>
                  </View>
                </View>
              </BoxShadow>
            </View>
          </ScrollView>
          <View style={{
            position: 'absolute', top: getPixel(650), width: getPixel(480), flex: 1, alignItems: 'center',
          }}
          >
            <Button type='primary' style={{ backgroundColor: 'rgba(75,116,255,1)', width: getPixel(436), height: getPixel(64) }} onPress={() => { this.save() }}>
              <Text style={{
                fontSize: getPixel(20), color: '#fff', fontWeight: '400', lineHeight: getPixel(30),
              }}
              >
                保存修改
              </Text>
            </Button>
          </View>
        </View>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // 粮仓罐
    wheatDeviceList: state.wheat.wheatDeviceList,
    // 麦粉罐
    flourDeviceList: state.wheat.flourDeviceList,
    // 用户信息
    user: state.user,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateModifyFlag: flag => dispatch(Action.updateModifyFlag(flag)),
//   }
// }

export default connect(mapStateToProps)(Index)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  scrollViewStyle: {
    width: getPixel(448),
    marginLeft: getPixel(16),
    marginTop: getPixel(10),
  },
  itemStyle: {
    width: getPixel(448),
    height: getPixel(478),
    backgroundColor: '#fff',
    paddingLeft: getPixel(10),
    borderStyle: 'solid',
    borderWidth: getPixel(1),
    borderColor: 'rgba(0,0,0,0.11)',
  },
  itemRow: {
    flexDirection: 'row',
  },
  itemTitle: {
    width: getPixel(100),
    color: 'rgba(153,153,153,1)',
    fontSize: getPixel(18),
    lineHeight: getPixel(38),
  },
  itemContainer: {
    flex: 1,
    color: 'rgba(51,51,51,1)',
    fontSize: getPixel(18),
    lineHeight: getPixel(38),
  },
})