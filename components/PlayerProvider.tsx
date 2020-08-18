import React, { useState } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'

import PlayerContext from './PlayerContext'
import VideoModal from './VideoModal'
import { Video } from './videos'

interface PlayerProviderProps {
  children: React.ReactNode
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoModal: {
    position: 'absolute',
  },
})

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [video, setVideo] = useState<Video | null>(null)

  return (
    <PlayerContext.Provider value={{ video, setVideo }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFill}>{children}</View>
      </View>
      <View style={styles.videoModal}>
        {video && <VideoModal {...{ video }} />}
      </View>
    </PlayerContext.Provider>
  )
}

export default PlayerProvider
