import React, { useState, useEffect } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home, videos } from './components'
import PlayerContext from './components/PlayerContext'
import { Video } from './components/videos'
import AppTabBar from './components/AppTabBar'

const Tab = createBottomTabNavigator()

const App = () => {
  const [ready, setReady] = useState(false)
  const [video, setVideo] = useState<Video | null>(null)
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(true)

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
    <PlayerContext.Provider
      value={{ video, setVideo, isAnimationFinished, setIsAnimationFinished }}
    >
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <AppTabBar {...props} />}>
          <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
      </NavigationContainer>
    </PlayerContext.Provider>
  )
}

export default App
