import React, { Component } from 'react'
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Icon } from 'react-native-elements'
import Login from '../login'
import Wheat from './page/wheat'
import WheatDialog from './page/wheat/page/dialog'
import Kjmaking from './page/kjmaking'
import Craft from './page/kjmaking/craft'
import Bean from './page/kjmaking/bean'
import Setting from './page/setting'
import Loading from '../loading'

const SELECTED_COLOR = '#fff'
const UNSELECTED_COLOR = '#000'
const SELECTED_BGCOLOR = 'deepskyblue'
const UNSELECTED_BGCOLOR = 'pink'
const KJMAKINGORDER = ['Kjmaking', 'Craft', 'Bean', 'Setting']

export class TabBarIcon extends Component {
  render() {
    const { name, color } = this.props
    return (
      <Icon
        name={name}
        color={color}
      />
    )
  }
}
// const WheatTabNavigator = createBottomTabNavigator({
//   Wheat: {
//     screen: Wheat,
//     navigationOptions: {
//       tabBarLabel: '首页',
//       tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//           focused={focused}
//           name='g-translate'
//           color={focused ? SELECTED_COLOR : UNSELECTED_COLOR}
//         />
//       ),
//     },
//   },
//   Setting: {
//     screen: Setting,
//     navigationOptions: {
//       tabBarLabel: '设置',
//       tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//           focused={focused}
//           name='g-translate'
//           color={focused ? SELECTED_COLOR : UNSELECTED_COLOR}
//         />
//       ),
//     },
//   },
// },
// {
//   initialRouteName: 'Wheat',
//   order: WHEATORDER,
//   tabBarOptions: {
//     activeTintColor: SELECTED_COLOR,
//     activeBackgroundColor: SELECTED_BGCOLOR,
//     inactiveTintColor: UNSELECTED_COLOR,
//     inactiveBackgroundColor: UNSELECTED_BGCOLOR,
//     style: {
//       backgroundColor: 'pink',
//     },
//     labelStyle: {
//       paddingBottom: 5,
//       fontSize: 14,
//     },
//   },
// })
const KjmakingTabNavigator = createBottomTabNavigator(
  {
    Kjmaking: {
      screen: Kjmaking,
      navigationOptions: {
        tabBarLabel: '种曲领用',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='g-translate'
            color={focused ? SELECTED_COLOR : UNSELECTED_COLOR}
          />
        ),
      },
    },
    Craft: {
      screen: Craft,
      navigationOptions: {
        tabBarLabel: '工艺控制',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='g-translate'
            color={focused ? SELECTED_COLOR : UNSELECTED_COLOR}
          />
        ),
      },
    },
    Bean: {
      screen: Bean,
      navigationOptions: {
        tabBarLabel: '豆粕',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='g-translate'
            color={focused ? SELECTED_COLOR : UNSELECTED_COLOR}
          />
        ),
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: '设置',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='g-translate'
            color={focused ? SELECTED_COLOR : UNSELECTED_COLOR}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Kjmaking',
    order: KJMAKINGORDER,
    tabBarOptions: {
      activeTintColor: SELECTED_COLOR,
      activeBackgroundColor: SELECTED_BGCOLOR,
      inactiveTintColor: UNSELECTED_COLOR,
      inactiveBackgroundColor: UNSELECTED_BGCOLOR,
      style: {
        backgroundColor: 'pink',
      },
      labelStyle: {
        paddingBottom: 5,
        fontSize: 14,
      },
    },
  }
)
const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Setting: {
      screen: Setting,
    },
    Wheat: {
      screen: Wheat,
    },
    WheatDialog: {
      screen: WheatDialog,
    },
    Kjmaking: {
      screen: KjmakingTabNavigator,
    },
    Loading: {
      screen: Loading,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    transitionConfig: () => ({
      // 设置横向切换动画
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
    /* The header config from HomeScreen is now here */
    // defaultNavigationOptions: {
    //   headerStyle: {
    //     backgroundColor: '#f4511e',
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   },
    // },
    // navigationOptions: {
    //   tabBarLabel: 'Home!',
    // },
  }
)

const AppContainer = createAppContainer(RootStack)
export default AppContainer
