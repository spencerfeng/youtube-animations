import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {
  BottomTabBarProps,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs'

export const TAB_BAR_MAX_HEIGHT = 80

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    height: TAB_BAR_MAX_HEIGHT,
    borderTopColor: '#cccccc',
    borderTopWidth: 1,
  },
})

const AppTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps<BottomTabBarOptions>) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <View style={styles.container}>
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
    </View>
  )
}

export default AppTabBar
