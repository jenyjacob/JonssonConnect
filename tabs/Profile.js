import React, { Component } from 'react';
 import { ActivityIndicator, AsyncStorage, Image, ListView, FlatList, StyleSheet, TextInput, View } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Tab, Tabs, Text, Title, Button, Left, Body, Right, H1, H2, H3, } from 'native-base';
 import * as firebase from 'firebase';

 export default class Profile extends Component {
  constructor(props) {
     super(props);
     this.state = {
       isLoading: true
     }
   }

   async componentDidMount() {
     this.setState({
       firstName: await AsyncStorage.getItem('firstName'),
       lastName: await AsyncStorage.getItem('lastName'),
       email: await AsyncStorage.getItem('email'),
       summary: await AsyncStorage.getItem('summary'),
        userPhoto: await AsyncStorage.getItem('userPhoto'),
       token: await AsyncStorage.getItem('token'),
       isLoading: false
     });
   }

   static navigationOptions = {
     tabBarLabel: 'Profile',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/temocicon.png')}
        style={{width: 30, height: 30}}>
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



         </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#F6F6F6',
  },
   cardStyle: {
     paddingTop: 30,
     alignItems: 'center',
   }
});
