import React from 'react'
import { Value } from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'

export const animations = {
  translationY: new Value(0),
  gestureState: new Value(State.UNDETERMINED),
}

export const AnimationContext = React.createContext(animations)
