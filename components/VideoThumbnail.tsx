import React, { useContext } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'

import PlayerContext from './PlayerContext'
import { Video } from './videos'

interface VideoThumbnailProps {
  video: Video
}

const VideoThumbnail = ({ video }: VideoThumbnailProps) => {
  const playerContext = useContext(PlayerContext)

  const handlePressVideoThumbnail = () => {
    if (playerContext?.isAnimationFinished) {
      playerContext.setVideo(video)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePressVideoThumbnail}>
      <View>
        <Image source={video.thumbnail} style={styles.thumbnail} />
        <View style={styles.description}>
          <Image source={video.avatar} style={styles.avatar} />
          <View>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.subtitle}>
              {`${video.username} • ${
                video.views
              } views • ${video.published.fromNow()}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default VideoThumbnail

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
    height: 200,
  },
  description: {
    flexDirection: 'row',
    margin: 16,
    marginBottom: 32,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    color: 'gray',
  },
})
