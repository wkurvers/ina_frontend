import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Toolbar } from "react-native-material-ui";
import { Header } from "react-navigation";

export default class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Instellingen"
          iconSet="MaterialCommunityIcons"
          leftElement={"menu"}
          onLeftElementPress={() => {
            this.props.navigation.openDrawer();
          }}
        />
        <Text>I'm the Settings component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
