/**
 * JonssonConnect Jobs Feed
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, FlatList, StyleSheet, View, TextInput, ImageBackground } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Text, Title, Button, Left, Body, Right, H1, H2, H3 } from 'native-base';
 import * as firebase from 'firebase';

 export default class Jobs extends Component {

   constructor(props) {
     super(props);
     this.state = {
       isLoading: true
     }
   }

   componentDidMount() {
    return fetch('https://jonssonconnect.firebaseio.com/.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.Jobs),
          data: responseJson.Jobs,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

   static navigationOptions = {
     tabBarLabel: 'Jobs',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/briefcaseicon.png')}
        style={{width: 22, height: 22}}>
       </Image>
     )
   }



   render() {
     if (this.state.isLoading) {
       return (
         <View style={{flex: 1, paddingTop: 20}}>
           <ActivityIndicator />
         </View>
       );
     }
     return (
       <Container style={styles.containerStyle}>
        <Content>
        <Image source={require('../images/jcjobsbanner.png')} style={{ height: 180, width: null }}></Image>
        <Content style={{ backgroundColor: '#f8f6f6'}}>
          <Text style={styles.colorHeader}>Trending<Text style={styles.bigHeader}> Jobs</Text> </Text>
          <Text style={{fontWeight: '800', color: '#008542', paddingLeft: 15}}>________</Text>
        </Content>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => {
             const {uri} = rowData;
             return (
               <Content>
                <List style={{ backgroundColor: '#FFFFFF'}}>
                  <ListItem>
                    <Left>
                      <Thumbnail square source={{uri: rowData.companyImageURL}} />
                      <Body>
                        <Text onPress={() => this.props.navigation.navigate("JobsDetails", {rowData})} style={styles.positionTitleStyle}>
                          {rowData.positionTitle}
                        </Text>
                        <Text onPress={() => this.props.navigation.navigate("JobsDetails", {rowData})} style={styles.companyNameStyle}>
                          {rowData.companyName}
                        </Text>
                        <Text onPress={() => this.props.navigation.navigate("JobsDetails", {rowData})} style={styles.jobLocationStyle}>
                          {rowData.jobLocation}
                        </Text>
                      </Body>
                    </Left>
                  </ListItem>
                </List>
              </Content>
             )
           }}
         />
         </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
  listStyle: {
     backgroundColor: '#FFFFFF',
  },
  bigHeader: {
    fontSize: 18,
    fontWeight: '800',
    paddingTop: 10,
    paddingLeft: 15,
  },
  colorHeader: {
    fontSize: 18,
    fontWeight: '800',
    paddingTop: 10,
    paddingLeft: 15,
    color: '#008542',
  },
  containerStyle: {
    backgroundColor: '#FFFFFF',
  },
  companyNameStyle: {
    fontWeight: '500',
    fontSize: 12,
    paddingTop: 3,
  },
  positionTitleStyle: {
     fontWeight: '800',
     fontSize: 14,
  },
  jobLocationStyle: {
     fontSize: 12,
     color: '#808080',
     paddingTop: 3,
  },
  buttonStyle: {
    fontSize: 12,
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
  searchbarColor: {
    backgroundColor: '#0039A6',
  },
  searchButton: {
    fontSize: 12,
    color: '#ffffff',
  },
  textInput: {
    height: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
