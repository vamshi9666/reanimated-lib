import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import {} from "react-native-gesture-handler";
const { height } = Dimensions.get("window");
const {
  Value,
  cond,
  eq,
  set,
  timing,
  Clock,
  clockRunning,
  startClock,
  stopClock,
  block,
  interpolate,
  Extrapolate
} = Animated;

function runTiming({
  clock,
  value,
  dest
}: {
  clock: any;
  value: any;
  dest: any;
}) {
  // const clock = new Clock();
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 350,

    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(
      clockRunning(clock),
      [set(config.toValue, dest)],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
}

export enum Effect {
  SLIDE_FROM_BOTTOM = 1,
  SLIDE_FROM_TOP = 2
  // SLIDE_FROM_LEFT = 3,
  // SLIDE_FROM_RIGHT = 4
}
interface IProps {
  visible: Boolean;
  callbackNode: Animated.Value<number>;
  fromDirection?: String;
  showModal: Animated.Adaptable<number>;
  effect: Effect;
}
interface IState {}
class ReanimatedModal extends Component<IProps, IState> {
  private modalTranslateY: Animated.Value<number> = new Value(height);
  // private progress: Animated.Value<number> = new Value(0);
  private shadowOpacity: Animated.Value<number> = new Value(0);
  private fromCoordinate: Animated.Value<number> = new Value();
  private toCoordinate: Animated.Value<number> = new Value(0);

  private clock = new Clock();
  constructor(props: IProps) {
    super(props);
    this.state = {};
    if (props.effect === Effect.SLIDE_FROM_BOTTOM) {
      this.fromCoordinate.setValue(height);
      this.modalTranslateY.setValue(height);
    } else if (this.props.effect === Effect.SLIDE_FROM_TOP) {
      this.fromCoordinate.setValue(-height);
      this.modalTranslateY.setValue(-height);
      // private toCoordinate = new Value(0);
    }
  }

  render() {
    const { showModal } = this.props;
    return (
      <>
        <Animated.Code>
          {() =>
            block([
              // debug("callback node is ", showModal),
              // onChange(
              // this.modalTranslateY,
              set(
                this.props.callbackNode,
                interpolate(this.modalTranslateY, {
                  inputRange: [this.fromCoordinate, this.toCoordinate],
                  outputRange: [1, 0],
                  extrapolate: Extrapolate.CLAMP
                })
                // )
              ),
              set(
                this.shadowOpacity,
                interpolate(this.modalTranslateY, {
                  inputRange: [this.fromCoordinate, this.toCoordinate],
                  outputRange: [0, 1],
                  extrapolate: Extrapolate.CLAMP
                })
                // )
              ),
              cond(eq(showModal, 1), [
                set(
                  this.modalTranslateY,
                  runTiming({
                    clock: this.clock,
                    value: this.modalTranslateY,
                    dest: this.toCoordinate
                  })
                )
              ]),
              cond(eq(showModal, 2), [
                set(
                  this.modalTranslateY,
                  runTiming({
                    clock: this.clock,
                    value: this.modalTranslateY,
                    dest: this.fromCoordinate
                  })
                )
              ])
            ])
          }
        </Animated.Code>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "#000",
            opacity: this.shadowOpacity
          }}
        />

        <Animated.View
          style={{
            ...styles.container,
            transform: [{ translateY: this.modalTranslateY as any }]
          }}
        ></Animated.View>
      </>
    );
  }
}

export default ReanimatedModal;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: 32,
    flex: 1,
    marginVertical: 100,
    // height: 300,
    backgroundColor: "red"
  }
});
