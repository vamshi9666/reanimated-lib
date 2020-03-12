import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { ReanimatedModal, Effect } from "reanimated-modal";
import Animated from "react-native-reanimated";
const { Value, eq, cond } = Animated;

export default class App extends React.Component {
  state = {
    modalVisible: false
  };
  modalVisible = new Value(0);
  progress = new Value(0);
  render() {
    const { modalVisible } = this;
    // const { modalVisible } = this.state;
    const { progress } = this;
    return (
      <View style={styles.container}>
        <ReanimatedModal
          visible
          effect={Effect.SLIDE_FROM_BOTTOM}
          showModal={modalVisible}
          callbackNode={progress}
        ></ReanimatedModal>
        <Button
          title={"open"}
          onPress={() => {
            this.modalVisible.setValue(cond(eq(this.modalVisible, 1), 2, 1));
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50
  }
});
