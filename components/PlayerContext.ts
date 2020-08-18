import React from 'react'

import { Video } from './videos'

interface PlayerContextInterface {
  video: Video | null
  setVideo: (video: Video | null) => void
}

const PlayerContext = React.createContext<PlayerContextInterface | undefined>(
  undefined
)

export default PlayerContext
