import React, { useContext } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather, FontAwesome } from '@expo/vector-icons'

import PlayerContext from './PlayerContext'

const { width } = Dimensions.get('window')
export const PLACEHOLDER_WIDTH = width / 3

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 8,
  },
  placeholder: {
    width: PLACEHOLDER_WIDTH,
  },
})

interface PlayerControlsProps {
  title: string
}

const PlayerControls = ({ title }: PlayerControlsProps) => {
  const playerContext = useContext(PlayerContext)

  const handlePressCloseVideoButton = () => {
    playerContext?.setVideo(null)
    playerContext?.setIsAnimationFinished(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.placeholder} />
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
      <FontAwesome name="play" size={24} color="gray" />
      <TouchableWithoutFeedback onPress={handlePressCloseVideoButton}>
        <Feather name="x" size={24} color="gray" />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default PlayerControls
