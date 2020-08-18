import React from 'react'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native'

import Icon from './Icon'
import videos, { Video } from './videos'

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  views: {
    color: 'gray',
    marginBottom: 16,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upNext: {
    borderTopWidth: 1,
    borderColor: 'lightgray',
    paddingTop: 8,
    padding: 16,
  },
  upNextTitle: {
    fontWeight: 'bold',
    color: 'gray',
  },
  thumbnail: {
    flexDirection: 'row',
    marginTop: 16,
  },
  thumbnailImage: {
    height: 100,
    width: 100,
  },
  thumbnailContent: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  thumbnailTitle: {
    fontSize: 16,
  },
  thumbnailUsername: {
    color: 'gray',
  },
})

interface VideoContentProps {
  video: Video
}

const VideoContent = ({ video }: VideoContentProps) => {
  return (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.views}>{`${video.views} views`}</Text>
        <View style={styles.icons}>
          <Icon name="ios-thumbs-up" label="10" />
          <Icon name="ios-thumbs-down" label="0" />
          <Icon name="ios-share-alt" label="Share" />
          <Icon name="ios-download" label="Download" />
          <Icon name="ios-save" label="Save" />
        </View>
      </View>
      <View style={styles.upNext}>
        <Text style={styles.upNextTitle}>Up next</Text>
        {videos.map((v) => (
          <View key={v.id} style={styles.thumbnail}>
            <Image source={v.thumbnail} style={styles.thumbnailImage} />
            <View style={styles.thumbnailContent}>
              <Text numberOfLines={2} style={styles.thumbnailTitle}>
                {v.title}
              </Text>
              <Text style={styles.thumbnailUsername}>{v.username}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default VideoContent
