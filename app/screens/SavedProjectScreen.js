
import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import line from "../assets/images/Line.png";
import Router from "../helpers/Router";
import SavedApi from "../helpers/SavedApi"
import User from "../helpers/User";

export default class SavedProjects extends Component {
  constructor() {
    super();

    this.state = {
      data: []
     };

    User.getUserId().then(userId => {
      if (userId != null) {
        let response = SavedApi.getAllFollows(userId).then(result => {
          if (result['bool']) {

            this.setState({
              data: result['projects']
            })
            console.log(this.state.data)
          }else {
            alert(result['msg'])
          }
          });
      } else {
        alert('Je moet inloggen om je gevolgde projecten te zien.')
      }
    });




  }

  static navigationOptions = ({ navigation }) => ({
    title: "Opgeslagen"
   });

  handelEnd = () => {};

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={Platform.OS == "android" ? "#0085cc" : "#00a6ff"}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={{ height: Header.HEIGHT }}>
            <Toolbar
              centerElement="Opgeslagen"
              iconSet="MaterialCommunityIcons"
              leftElement={"menu"}
              onLeftElementPress={() => {
                this.props.navigation.openDrawer();
              }}
            />
          </View>
          <View>
            <FlatList
              data={this.state.data}
              onEndReached={() => this.handelEnd()}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableHighlight
                  style={styles.cardContainer}
                  onPress={() =>
                    Router.goTo(
                      this.props.navigation,
                      "ProjectStack",
                      "ProjectDetailScreen",
                      {
                        id: item.id,
                        name: item.name,
                        url: item.url,
                        desc: item.desc,
                        start_date: item.start_date,
                        end_date: item.end_date,
                        created_at: item.created_at,
                        like_count: item.like_count,
                        follower_count: item.follower_count,
                        location: item.location
                      }
                    )
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.cardImage}>
                      <Image
                        source={{ uri: item.url }}
                        resizeMode="cover"
                        style={styles.image}
                      />
                    </View>
                    <Image
                      source={line}
                      resizeMode="stretch"
                      style={{ width: "100%", height: "2%" }}
                    />
                    <Text numberOfLines={2} style={styles.cardTitle}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#00a6ff"
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  card: {
    backgroundColor: "#F1F1F1",
    margin: 10,
    width: "100%",
    height: 180,
    marginBottom: 10,
    elevation: 3,
    borderRadius: 4,
  },

  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

  cardImage: {
    height: "70%",
    width: "100%",
  },
  cardTitle: {
    margin: 5,
    fontSize: 15,
    fontWeight: "bold"
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius:4,
    borderTopRightRadius:4,
  }
});
