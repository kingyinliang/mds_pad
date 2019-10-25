
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity, Image,
} from 'react-native'
import { Header, Icon } from 'react-native-elements'
import {
  Accordion, List, Toast, Modal, Provider,
} from '@ant-design/react-native'
import { getPixel } from '../../utils/adjust'
import * as Action from '../../actions/wheatAction'
import { WHEAT_API } from '../../utils/api'

class Index extends Component {
  constructor() {
    super()
    this.state = {
      uploadStatus: false,
      checkedMap: new Map(),
    }
  }

  onChange = (activeSections) => {
    const { changeActiveSections } = this.props
    changeActiveSections(activeSections)
    // this.setState({ activeSections })
  }

  getOrderList() {
    const { orderList } = this.props
    const isModified = orderList.some((item) => { return item.pkgOrderEntity.isModified })
    if (isModified) {
      Modal.alert('提示', '当前有未上传数据，是否继续同步订单？', [
        {
          text: '取消',
          onPress: () => {},
          style: 'cancel',
        },
        { text: '继续', onPress: () => this.retrieveOrder() },
      ])
    } else {
      this.retrieveOrder()
    }
  }

  retrieveOrder() {
    this.setState({ uploadStatus: false })
    const { saveOrderList, orderList, user } = this.props
    const { workShop, productLine } = user
    const cOrderList = []
    orderList.forEach((element) => { cOrderList.push(element.pkgOrderEntity.orderId) })
    global.$post(WHEAT_API.RETRIEVE_ORDERS, { workShop, productLine, orderList: cOrderList }).then((res) => {
      if (res.data.code === 0) {
        res.data.list.forEach((item) => { item.pkgOrderEntity.isModified = false })
        saveOrderList(res.data.list, res.data.wheatDeviceList, res.data.flourDeviceList)
        Toast.success('同步订单完成')
      }
    }).catch(() => {
      Toast.fail('网络不给力，请稍后再试！')
    })
  }

  upLoadOrder() {
    const { uploadStatus } = this.state
    if (uploadStatus) {
      const { orderList } = this.props
      const { checkedMap } = this.state
      const resultList = []
      orderList.forEach((element) => {
        if (checkedMap.get(element.pkgOrderEntity.orderId)) {
          resultList.push(element)
        }
      })
      if (resultList.length === 0) {
        Toast.info('请选择要上传的订单', 1)
      } else {
        Modal.alert('提示', '请确认是否上传？', [
          {
            text: '取消',
            onPress: () => {},
            style: 'cancel',
          },
          { text: '确认', onPress: () => this.doUpload(resultList) },
        ])
      }
    } else {
      this.setState({ uploadStatus: true })
    }
  }

  doUpload(resultList) {
    const { checkedMap } = this.state
    global.$post(WHEAT_API.UPLOAD_ORDERS, resultList).then((res) => {
      if (res.data.code === 0) {
        Toast.success('上传成功')
        this.setState({ uploadStatus: false })
        checkedMap.clear()
        this.retrieveOrder()
      } else {
        Toast.fail(res.data.msg)
      }
    }).catch(() => {
      Toast.fail('网络异常，请稍后尝试')
    })
  }

  changeCheckBox(orderId, flag) {
    const { checkedMap } = this.state
    checkedMap.set(orderId, flag)
    this.setState({ checkedMap })
  }

  toggleAll(flag) {
    const { orderList } = this.props
    const { checkedMap } = this.state
    for (const item of orderList) {
      checkedMap.set(item.pkgOrderEntity.orderId, flag)
    }
    this.setState({ checkedMap })
  }

  renderCheckBoxList(orderList) {
    const { checkedMap } = this.state
    const itemAry = []
    for (let i = 0; i < orderList.length; i += 1) {
      const { orderId } = orderList[i].pkgOrderEntity
      if (!Array.from(checkedMap.keys()).includes(orderId)) {
        checkedMap.set(orderId, false)
      }
      const checked = checkedMap.get(orderId)
      itemAry.push(
        <TouchableOpacity onPress={() => { this.changeCheckBox(orderId, !checked) }}>
          <View style={{
            width: getPixel(164), flex: 1, alignItems: 'center', backgroundColor: 'red',
          }}
          >
            <Image style={{ width: getPixel(24), height: getPixel(24) }} source={checked ? require('../../assets/img/sel.png') : require('../../assets/img/no-sel.png')}></Image>
          </View>
        </TouchableOpacity>
      )
    }
    return itemAry
  }

  renderItemList(order) {
    const { navigation } = this.props
    const itemArr = []
    for (let i = 0; i < order.inList.length; i += 1) {
      itemArr.push(
        <List.Item key={i} style={{ paddingLeft: getPixel(10) }} arrow='horizontal' onPress={() => { navigation.push('WheatDialog', { order, detailId: order.inList[i].id }) }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{
              width: getPixel(138), fontSize: getPixel(18), fontWeight: '500', lineHeight: getPixel(27), color: 'rgba(51,51,51,1)',
            }}
            >
              {order.inList[i].flourDeviceName}
            </Text>
            <Text style={{
              width: getPixel(100), fontSize: getPixel(18), fontWeight: '500', lineHeight: getPixel(27), color: 'rgba(51,51,51,1)',
            }}
            >
              {order.inList[i].startWeight}
            </Text>
            <Text style={{
              width: getPixel(100), fontSize: getPixel(18), fontWeight: '500', lineHeight: getPixel(27), color: 'rgba(51,51,51,1)',
            }}
            >
              {order.inList[i].endWeight}
            </Text>
            <Text style={{
              width: getPixel(110), fontSize: getPixel(18), fontWeight: '500', lineHeight: getPixel(27), color: 'rgba(51,51,51,1)',
            }}
            >
              {order.inList[i].inPortWeight}
            </Text>
          </View>
        </List.Item>
      )
    }
    return itemArr
  }

  renderOrder() {
    const { navigation, orderList } = this.props
    // const { uploadStatus } = this.state
    // let checkList = this.renderCheckBoxList(orderList)
    // let itemAry = [];
    // for (let i = 0; i < orderList.length; i++) {
    //   let order = orderList[i].pkgOrderEntity
    //   itemAry.push(
    //     <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
    //       {uploadStatus &&  checkList[i]}
    //       <View style={{flex:1}}>
    //         <View style={styles.itemRow} >
    //           <Text style={styles.itemTitle}>订单编号：</Text>
    //           <Text style={styles.itemContainer}>{order.orderNo}</Text>
    //           {order.orderStatus === 'saved' && <Image source={require('../../assets/img/upload2.png')}/>}
    //         </View>
    //         <View style={styles.itemRow} >
    //           <Text style={styles.itemTitle}>产品品项：</Text><Text style={styles.itemContainer}>{order.materialCode?order.materialCode:''} {order.materialName?order.materialName:''}</Text>
    //         </View>
    //         <View style={styles.itemRow} >
    //           <Text style={styles.itemTitle}>计划产量：</Text><Text style={styles.itemContainer}>{order.planOutput} KG</Text>
    //         </View>
    //         <View style={styles.itemRow} >
    //           <Text style={styles.itemTitle}>生产日期：</Text><Text style={styles.itemContainer}>{order.productDate?order.productDate:''}</Text>
    //         </View>
    //       </View>
    //     </View>
    //   )
    // }
    const resultArr = []
    for (let i = 0; i < orderList.length; i += 1) {
      resultArr.push(
        <Accordion.Panel key={i}>
          <List style={styles.itemListStyle}>
            <View style={{
              paddingLeft: getPixel(10), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            }}
            >
              <Text style={{
                fontSize: getPixel(20), fontWeight: '500', lineHeight: getPixel(40), color: 'rgba(51,51,51,1)',
              }}
              >
                小麦粉入库
              </Text>
              <TouchableOpacity onPress={() => { navigation.push('WheatDialog', { order: orderList[i], detailId: null }) }}>
                <Icon iconStyle={{ marginRight: getPixel(20) }} type='antdesign' name='plus' />
              </TouchableOpacity>
            </View>
            <List.Item style={{ paddingLeft: getPixel(10) }}>
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              }}
              >
                <Text style={{
                  width: getPixel(138), fontSize: getPixel(18), fontWeight: '400', lineHeight: getPixel(27), color: 'rgba(153,153,153,1)',
                }}
                >
                  麦粉计量仓
                </Text>
                <Text style={{
                  width: getPixel(100), fontSize: getPixel(18), fontWeight: '400', lineHeight: getPixel(27), color: 'rgba(153,153,153,1)',
                }}
                >
                  起始
                </Text>
                <Text style={{
                  width: getPixel(100), fontSize: getPixel(18), fontWeight: '400', lineHeight: getPixel(27), color: 'rgba(153,153,153,1)',
                }}
                >
                  结束
                </Text>
                <Text style={{
                  width: getPixel(110), fontSize: getPixel(18), fontWeight: '400', lineHeight: getPixel(27), color: 'rgba(153,153,153,1)',
                }}
                >
                  数量(KG)
                </Text>
              </View>
            </List.Item>
            {this.renderItemList(orderList[i])}
          </List>
        </Accordion.Panel>
      )
    }
    return resultArr
  }

  renderCheckBox(i) {
    const { orderList } = this.props
    const { checkedMap } = this.state
    const { orderId } = orderList[i].pkgOrderEntity
    if (!Array.from(checkedMap.keys()).includes(orderId)) {
      checkedMap.set(orderId, false)
    }
    const checked = checkedMap.get(orderId)
    return (
      <TouchableOpacity onPress={() => { this.changeCheckBox(orderId, !checked) }}>
        <View style={{
          width: getPixel(64), height: getPixel(64), flex: 1, alignItems: 'center', justifyContent: 'center',
        }}
        >
          <Image style={{ width: getPixel(24), height: getPixel(24) }} source={checked ? require('../../assets/img/sel.png') : require('../../assets/img/no-sel.png')}></Image>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader(content, i) {
    const { orderList } = this.props
    const { uploadStatus } = this.state
    const order = orderList[i].pkgOrderEntity
    const checkBox = this.renderCheckBox(i)
    return (
      <View style={[{ flex: 1, flexDirection: 'row', alignItems: 'center' }, styles.itemStyle]}>
        {uploadStatus && checkBox}
        <View style={{ flex: 1 }}>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>订单编号：</Text>
            <Text style={styles.itemContainer}>{order.orderNo}</Text>
            {order.isModified
              ? <Image style={{ width: getPixel(40), height: getPixel(40) }} source={require('../../assets/img/toUpload.png')} />
              : order.orderStatus === 'saved' && <Image style={{ width: getPixel(40), height: getPixel(40) }} source={require('../../assets/img/upload2.png')} />
            }
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>产品品项：</Text>
            <Text style={styles.itemContainer}>
              {order.materialCode ? order.materialCode : ''}
              {order.materialName ? order.materialName : ''}
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>计划产量：</Text>
            <Text style={styles.itemContainer}>
              {`${order.planOutput} KG`}
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>生产日期：</Text>
            <Text style={styles.itemContainer}>{order.productDate ? order.productDate : ''}</Text>
            <Image style={{ width: getPixel(16), height: getPixel(10), marginRight: getPixel(10) }} source={require('../../assets/img/up.png')} />
          </View>
        </View>
      </View>
    )
  }

  renderOrderList() {
    const orderList = this.renderOrder()
    const { activeSections } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Accordion
          onChange={this.onChange}
          duration={500}
          align='center'
          renderHeader={(content, index) => this.renderHeader(content, index)}
          activeSections={activeSections}
        >
          {orderList}
        </Accordion>
        <View style={{ height: 70 }}></View>
      </View>
    )
  }
  // bb(a, b) {
  //   return (
  //     <View>
  //       <Text>你好</Text>
  //     </View>
  //   )
  // }
  // cc(i) {
  //   return (
  //     <Accordion.Panel key={i}> <List ><Item>AAAAAA</Item><Item>BBBBB</Item></List></Accordion.Panel>
  //   )
  // }
  // renderText() {
  //   return (
  //     <Accordion
  //         onChange={this.onChange}
  //         activeSections={this.state.activeSections}
  //         duration={500}
  //         renderHeader={(content, index) => this.bb(content, index)}
  //         align='center'>
  //         <Accordion.Panel header='谢谢1'>
  //           <List>
  //             <List.Item>Content 1</List.Item>
  //             <List.Item>Content 2</List.Item>
  //             <List.Item>Content 3</List.Item>
  //           </List>
  //         </Accordion.Panel>
  //         <Accordion.Panel header='谢谢2'>
  //           <List>
  //             <List.Item>Content 1</List.Item>
  //             <List.Item>Content 2</List.Item>
  //             <List.Item>Content 3</List.Item>
  //           </List>
  //         </Accordion.Panel>
  //       </Accordion>
  //   )
  // }

  render() {
    const { navigation } = this.props
    const { uploadStatus, checkedMap } = this.state
    const allChecked = Array.from(checkedMap.values()).reduce((acc, cur) => { return acc && cur }, true)
    return (
      <Provider>
        <View style={styles.container}>
          <Header
            statusBarProps={{ translucent: true, backgroundColor: 'transparent' }}
            leftComponent={uploadStatus && <TouchableOpacity onPress={() => { this.toggleAll(!allChecked) }}><Text style={{ color: '#fff', fontSize: 24 }}>{allChecked ? '取消' : '全选'}</Text></TouchableOpacity>}
            centerComponent={{ text: '炒 麦', style: { color: '#fff', fontSize: 24 } }}
            rightComponent={uploadStatus ? <TouchableOpacity onPress={() => { this.setState({ uploadStatus: false }) }}><Text style={{ color: '#fff', fontSize: 24 }}>完成</Text></TouchableOpacity> : <Icon type='antdesign' name='setting' color='#fff' onPress={() => { navigation.push('Setting') }} />}
            containerStyle={{
              backgroundColor: '#2A56C6',
              position: 'absolute',
              top: 0,
              height: getPixel(100),
              width: getPixel(480),
            }}
          />
          <ScrollView
            style={styles.scrollViewStyle}
          >
            {this.renderOrderList()}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.footerBar}>
              <TouchableOpacity style={[styles.footerButLeft, uploadStatus ? styles.footerButSel : {}]} onPress={() => { this.upLoadOrder() }}>
                <Text style={[styles.footerButTex, uploadStatus ? styles.footerButTexSel : {}]}>上传</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.footerButRight, !uploadStatus ? styles.footerButSel : {}]} onPress={() => { this.getOrderList() }}>
                <Text style={[styles.footerButTex, !uploadStatus ? styles.footerButTexSel : {}]}>同步</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Provider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    orderList: state.wheat.orderList,
    activeSections: state.wheat.activeSections,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderList: (orderList, wheatDeviceList, flourDeviceList) => dispatch(Action.saveOrderList(orderList, wheatDeviceList, flourDeviceList)),
    changeActiveSections: activeSections => dispatch(Action.changeActiveSections(activeSections)),
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
  scrollViewStyle: {
    width: getPixel(480),
    marginTop: getPixel(110),
    paddingBottom: 300,
  },
  itemStyle: {
    width: getPixel(448),
    marginTop: getPixel(20),
    backgroundColor: '#fff',
    paddingLeft: getPixel(10),
    borderStyle: 'solid',
    borderWidth: getPixel(1),
    borderColor: 'rgba(0,0,0,0.11)',
    borderTopLeftRadius: getPixel(5),
    borderTopRightRadius: getPixel(5),
  },
  itemListStyle: {
    width: getPixel(448),
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: getPixel(1),
    borderColor: 'rgba(0,0,0,0.11)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderBottomLeftRadius: getPixel(5),
    borderBottomRightRadius: getPixel(5),
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: getPixel(38),
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
    width: getPixel(1000),
  },
  footer: {
    position: 'absolute',
    bottom: getPixel(24),
    width: getPixel(480),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footerButLeft: {
    width: getPixel(160),
    height: getPixel(56),
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.11)',
    borderWidth: getPixel(1),
    borderRightWidth: 0,
    borderTopLeftRadius: getPixel(6),
    borderBottomLeftRadius: getPixel(6),
  },
  footerButRight: {
    width: getPixel(160),
    height: getPixel(56),
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.11)',
    borderWidth: getPixel(1),
    borderLeftWidth: 0,
    borderTopRightRadius: getPixel(6),
    borderBottomRightRadius: getPixel(6),
  },
  footerButTex: {
    fontSize: getPixel(20),
    textAlign: 'center',
    lineHeight: getPixel(56),
    color: '#3165EC',
  },
  footerButSel: {
    backgroundColor: '#3165EC',
    borderStyle: 'solid',
    borderWidth: getPixel(1),
    borderColor: '#3165EC',
  },
  footerButTexSel: {
    color: '#fff',
  },
})
