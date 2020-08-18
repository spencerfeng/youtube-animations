import React from 'react'
import { StyleSheet, View } from 'react-native'

import FooterIcon from './FooterIcon'

const HEADER_HEIGHT = 80

const Footer = () => (
  <View style={styles.container}>
    <FooterIcon name="ios-home" label="Home" />
    <FooterIcon name="md-trending-up" label="Trending" />
    <FooterIcon name="logo-youtube" label="Subscriptions" />
    <FooterIcon name="ios-mail" label="Inbox" />
    <FooterIcon name="iso-folder" label="Folder" />
  </View>
)

export default Footer

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})
