import React, { useState, useEffect, useRef } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import { Value } from 'react-native-reanimated'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons'

import { Home, videos } from './components'
import PlayerContext from './components/PlayerContext'
import { Video } from './components/videos'
import AppTabBar from './components/AppTabBar'
import AnimationContext from './components/AnimationContext'
import { bottomBound } from './components/VideoModal'

const Tab = createBottomTabNavigator()

const App = () => {
  const [ready, setReady] = useState(false)
  const [video, setVideo] = useState<Video | null>(null)
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(true)

  const modalTY = useRef<Value<number>>(new Value(bottomBound))

  useEffect(() => {
    async function loadVideos() {
      await Promise.all(
        videos.map((v) =>
          Promise.all([
            Asset.loadAsync(v.video),
            Asset.loadAsync(v.avatar),
            Asset.loadAsync(v.thumbnail),
          ])
        )
      )

      setReady(true)
    }

    loadVideos()
  }, [])

  if (!ready) {
    return <AppLoading />
  }

  return (
    <AnimationContext.Provider value={{ modalTY }}>
      <PlayerContext.Provider
        value={{ video, setVideo, isAnimationFinished, setIsAnimationFinished }}
      >
        <NavigationContainer>
          <Tab.Navigator tabBar={(props) => <AppTabBar {...props} />}>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="ios-home" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PlayerContext.Provider>
    </AnimationContext.Provider>
  )
}

export default App
