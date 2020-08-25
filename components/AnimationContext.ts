import React from 'react'
import { Value } from 'react-native-reanimated'

export interface AnimationContextInterface {
  modalTY: React.MutableRefObject<Value<number>>
}

const AnimationContext = React.createContext<
  AnimationContextInterface | undefined
>(undefined)

export default AnimationContext
