import React from 'react'

import { Video } from './videos'

export interface PlayerContextInterface {
  video: Video | null
  setVideo: (video: Video | null) => void
  isAnimationFinished: boolean
  setIsAnimationFinished: (isAnimationFinished: boolean) => void
}

const PlayerContext = React.createContext<PlayerContextInterface | undefined>(
  undefined
)

export default PlayerContext
