import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons'

interface FooterIconProps {
  name: string
  label: string
}

const FooterIcon = ({ name, label }: FooterIconProps) => (
  <View style={styles.container}>
    <Ionicons name={name} size={24} color="gray" />
    <Text style={styles.label}>{label.toUpperCase()}</Text>
  </View>
)

export default FooterIcon

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
  },
  label: {
    color: 'gray',
    marginTop: 8,
    fontSize: 8,
    fontWeight: '500',
  },
})
