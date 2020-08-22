import React, { useRef, useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Video } from 'expo-av'
import Constants from 'expo-constants'
import Animated, {
  Value,
  Node,
  useCode,
  startClock,
  cond,
  eq,
  set,
  Clock,
  block,
  stopClock,
  and,
  clockRunning,
  not,
  event,
  add,
  lessThan,
  spring,
  multiply,
  interpolate,
  Extrapolate,
  or,
} from 'react-native-reanimated'
import { clamp } from 'react-native-redash'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import { Video as VideoModel } from './videos'
import VideoContent from './VideoContent'
import PlayerControls, { PLACEHOLDER_WIDTH } from './PlayerControls'

const { width, height } = Dimensions.get('window')
const { statusBarHeight } = Constants

const PLAYER_CONTROLS_MIN_HEIGHT = 80
const SNAP_POINT_THRESHOLD_POINT = 100
const VIDEO_WIDTH_CHANGE_HEIGHT_DELTA = 50

const bottomBound = height - statusBarHeight - PLAYER_CONTROLS_MIN_HEIGHT

const AnimatedVideo = Animated.createAnimatedComponent(Video)

interface VideoModalProps {
  video: VideoModel
}

const withOffset = (
  offset: Value<number>,
  translationY: Value<number>,
  gestureState: Value<State>,
  velocityY: Value<number>,
  snapPoint: Node<number>,
  slideDirection: Value<number>
) => {
  const clock = new Clock()

  const state = {
    finished: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0),
  }

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  }

  return block([
    cond(
      eq(slideDirection, 0),
      [
        cond(
          or(eq(gestureState, State.END), eq(gestureState, State.UNDETERMINED)),
          [
            cond(and(not(state.finished), not(clockRunning(clock))), [
              startClock(clock),
              set(offset, bottomBound),
              set(state.position, offset),
              set(config.toValue, new Value(0)),
            ]),
            spring(clock, state, config),
            cond(
              state.finished,
              [
                stopClock(clock),
                set(state.finished, 0),
                set(offset, 0),
                set(slideDirection, -1),
              ],
              [set(offset, state.position)]
            ),
            state.position,
          ],
          [
            cond(eq(gestureState, State.BEGAN), [
              cond(clockRunning(clock), [
                stopClock(clock),
                set(slideDirection, -1),
                add(translationY, offset),
              ]),
            ]),
          ]
        ),
      ],
      [
        cond(eq(slideDirection, -1), [
          cond(
            or(
              eq(gestureState, State.END),
              eq(gestureState, State.UNDETERMINED)
            ),
            [
              cond(and(not(state.finished), not(clockRunning(clock))), [
                startClock(clock),
                set(offset, add(translationY, offset)),
                set(state.position, offset),
                set(config.toValue, snapPoint),
              ]),
              spring(clock, state, config),
              cond(
                state.finished,
                [
                  stopClock(clock),
                  set(state.finished, 0),
                  set(offset, snapPoint),
                ],
                set(offset, state.position)
              ),
              state.position,
            ],
            [
              cond(eq(gestureState, State.BEGAN), [
                cond(clockRunning(clock), stopClock(clock)),
              ]),
              add(translationY, offset),
            ]
          ),
        ]),
      ]
    ),
  ])
}

const VideoModal = ({ video }: VideoModalProps) => {
  const slideDirection = useRef<Value<-1 | 0 | 1>>(new Value(0))
  const tY = useRef<Value<number>>(new Value(bottomBound))
  const gestureState = useRef<Value<State>>(new Value(State.UNDETERMINED))
  const translationY = useRef<Value<number>>(new Value(0))
  const offset = useRef<Value<number>>(new Value(0))
  const velocityY = useRef<Value<number>>(new Value(0))
  const snapPoint = useRef<Node<number>>(
    cond(
      lessThan(
        add(
          add(offset.current, translationY.current),
          multiply(velocityY.current, 0.2)
        ),
        bottomBound - SNAP_POINT_THRESHOLD_POINT
      ),
      0,
      bottomBound
    )
  )
  const videoControlsHeight = useRef<Node<number>>(
    interpolate(tY.current, {
      inputRange: [0, bottomBound],
      outputRange: [width / 1.78, PLAYER_CONTROLS_MIN_HEIGHT],
      extrapolate: Extrapolate.CLAMP,
    })
  )

  const videoWidth = useRef<Node<number>>(
    interpolate(tY.current, {
      inputRange: [bottomBound - VIDEO_WIDTH_CHANGE_HEIGHT_DELTA, bottomBound],
      outputRange: [width, PLACEHOLDER_WIDTH],
      extrapolate: Extrapolate.CLAMP,
    })
  )

  const videoContentOpacity = useRef<Node<number>>(
    interpolate(tY.current, {
      inputRange: [0, bottomBound],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    })
  )

  useEffect(() => {
    if (video) {
      slideDirection.current.setValue(0)
    }
  }, [video])

  useCode(
    () => [
      set(
        tY.current,
        clamp(
          withOffset(
            offset.current,
            translationY.current,
            gestureState.current,
            velocityY.current,
            snapPoint.current,
            slideDirection.current
          ),
          0,
          bottomBound
        )
      ),
    ],
    [
      translationY.current,
      slideDirection.current,
      offset.current,
      gestureState.current,
      velocityY.current,
      snapPoint.current,
    ]
  )

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationY: translationY.current,
        velocityY: velocityY.current,
        state: gestureState.current,
      },
    },
  ])

  return (
    <>
      <View style={{ height: statusBarHeight, backgroundColor: 'white' }} />
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY: tY.current }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.playerControls,
              {
                height: videoControlsHeight.current,
              },
            ]}
          >
            <AnimatedVideo
              source={video.video}
              style={{
                width: videoWidth.current,
                height: videoControlsHeight.current,
              }}
              resizeMode={Video.RESIZE_MODE_COVER}
              shouldPlay={false}
            />
            <View style={{ ...StyleSheet.absoluteFillObject }}>
              <PlayerControls title={video.title} onPress={() => true} />
            </View>
          </Animated.View>
          <Animated.View style={styles.videoContentContainer}>
            <Animated.View style={{ opacity: videoContentOpacity.current }}>
              <VideoContent {...{ video }} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

export default VideoModal

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    elevation: 1,
    shadowColor: 'black',
    shadowOpacity: 0.18,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  playerControls: {
    width,
    backgroundColor: 'white',
  },
  videoContentContainer: {
    backgroundColor: 'white',
    width,
    height: height - width / 1.78 - statusBarHeight,
  },
})
