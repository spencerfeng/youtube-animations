import React, { useContext, useRef } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import {
  BottomTabBarProps,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs'
import Animated, {
  Node,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import {
  TAB_BAR_MAX_HEIGHT,
  TAB_BAR_TOP_PADDING,
  TAB_BAR_BORDER_TOP_WIDTH,
} from '../constants'

import AnimationContext from './AnimationContext'
import { bottomBound } from './VideoModal'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopColor: '#cccccc',
  },
})

const AppTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps<BottomTabBarOptions>) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  const animationContext = useContext(AnimationContext)

  const tabBarHeight = useRef<Node<number>>(
    interpolate(
      animationContext?.modalTY?.current === undefined
        ? 0
        : animationContext?.modalTY?.current,
      {
        inputRange: [0, bottomBound],
        outputRange: [0, TAB_BAR_MAX_HEIGHT],
        extrapolate: Extrapolate.CLAMP,
      }
    )
  )

  const tabBarTopPadding = useRef<Node<number>>(
    interpolate(
      animationContext?.modalTY?.current === undefined
        ? 0
        : animationContext?.modalTY?.current,
      {
        inputRange: [0, bottomBound],
        outputRange: [0, TAB_BAR_TOP_PADDING],
        extrapolate: Extrapolate.CLAMP,
      }
    )
  )

  const tabBarBorderTopWidth = useRef<Node<number>>(
    interpolate(
      animationContext?.modalTY?.current === undefined
        ? 0
        : animationContext?.modalTY?.current,
      {
        inputRange: [0, bottomBound],
        outputRange: [0, TAB_BAR_BORDER_TOP_WIDTH],
        extrapolate: Extrapolate.CLAMP,
      }
    )
  )

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: tabBarHeight.current,
          paddingTop: tabBarTopPadding.current,
          borderTopWidth: tabBarBorderTopWidth.current,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          // eslint-disable-next-line no-nested-ternary
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}
          >
            <Text
              style={{
                color: isFocused ? '#000000' : '#cccccc',
                textAlign: 'center',
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
}

export default AppTabBar
