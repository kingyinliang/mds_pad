
import React, { Component } from 'react'
import {
  StyleSheet, Text, View, ScrollView, StatusBar,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { BoxShadow } from 'react-native-shadow'
import { getPixel } from '../../utils/adjust'

export default class Index extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  renderItem() {
    const shadowBox = {
      width: getPixel(448),
      height: getPixel(152),
      color: '#000',
      border: 2,
      radius: 6,
      opacity: 0.21,
      x: 2,
      y: 7,
      style: { marginVertical: 10 },
    }
    const itemAry = []
    const colorAry = ['gray', 'green', 'blue', 'yellow', 'black', 'orange']
    for (let i = 0; i < colorAry.length; i += 1) {
      itemAry.push(
        <BoxShadow setting={shadowBox}>
          <View key={i} style={[styles.itemStyle, { backgroundColor: '#fff' }]}></View>
        </BoxShadow>
      )
    }
    return itemAry
  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <StatusBar translucent={true} backgroundColor='transparent'></StatusBar>
        <View style={styles.header}>
          <Text style={styles.header_title}>炒 麦</Text>
        </View>
        <View style={styles.header_icon}>
          <Icon type='antdesign' name='setting' color='#fff' onPress={() => { navigation.push('Setting') }} />
        </View>
        <View style={{ marginTop: getPixel(110) }}>
          <ScrollView style={styles.scrollViewStyle}>
            { this.renderItem() }
          </ScrollView>
        </View>
        {/* <View >
          <Header
            centerComponent={{ text: '炒麦', style: { color: '#fff', fontSize: 24} }}
            rightComponent={<Icon type={'antdesign'} name={'setting'} color={'#fff'} onPress={()=>{navigation.push('Setting')}} />}
            containerStyle={{
              backgroundColor: '#2A56C6',
              justifyContent: 'center',
              alignItems: 'center',
              height: 70
            }}
          />
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: getPixel(480),
    height: getPixel(110),
    backgroundColor: '#2A56C6',
  },
  header_title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    lineHeight: getPixel(110),
  },
  header_icon: {
    position: 'absolute',
    top: 0,
    right: getPixel(0),
    height: getPixel(100),
    width: getPixel(60),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollViewStyle: {
    marginLeft: getPixel(16),
    marginTop: getPixel(15),
  },
  // shadowBox: {
  //   shadowColor: '#ccc',
  //   shadowOffset: { width: 11, height: 17 },
  //   shadowRadius: 8,
  //   shadowOpacity: 0.2,
  //   elevation: 2,
  //   marginVertical: 10
  // },
  itemStyle: {
    width: getPixel(448),
    height: getPixel(152),
  },
})
