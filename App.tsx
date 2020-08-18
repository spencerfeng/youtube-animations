import React, { useState, useEffect } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'

import { Home, PlayerProvider, videos } from './components'

const App = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function loadVideos() {
      await Promise.all(
        videos.map((video) =>
          Promise.all([
            Asset.loadAsync(video.video),
            Asset.loadAsync(video.avatar),
            Asset.loadAsync(video.thumbnail),
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
    <PlayerProvider>
      <Home />
    </PlayerProvider>
  )
}

export default App
