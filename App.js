/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


 import { YellowBox } from 'react-native';
 import _ from 'lodash';

 YellowBox.ignoreWarnings(['Setting a timer']);
 const _console = _.clone(console);
 console.warn = message => {
   if (message.indexOf('Setting a timer') <= -1) {
     _console.warn(message);
   }
 };


 import React, { Component } from 'react';
 import { Image, TextView, ListView } from 'react-native';
  import { TabNavigator } from "react-navigation";
  import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Title, Button, Icon, Left, Body, Right, H1, H2, H3 } from 'native-base';
 import{StackNavigator}from "react-navigation";
  import Home from './tabs/Home'
  import Jobs from './tabs/Jobs'
 import Events from './tabs/Events'
  import EventDetails from './tabs/EventDetails'
  import JobsDetails from './tabs/JobsDetails'
  import LoginScreen from './Screens/LoginScreen'
  import ArticleDetails from './tabs/ArticleDetails'
   // import TabNavigator from 'react-native-tab-navigator'
 import * as firebase from 'firebase';

 // Initialize Firebase


  export default class App extends Component {
    static navigationOptions = {
    header: null
 };
    render() {
      console.log("This should be printed in console!");

      return (
        <AppNavigator/>
      );
    }
  }
  export const HomeFeedStack = StackNavigator({
   Home: {
     screen: Home,
     navigationOptions:({navigation}) => ({
      title: "News Feed",
      headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#f8f6f6'},
      headerTitleStyle: { fontSize: 18, fontWeight: '800',alignSelf:'center'},
    })
   },
   ArticleDetails: {screen: ArticleDetails},
 });

 export const FeedStack = StackNavigator({
  EventsTab: {
     screen: Events,
     navigationOptions:({navigation}) => ({

      title: "Events",
      headerStyle: { paddingRight: 50, paddingLeft: 10, backgroundColor: '#f8f6f6'},
       headerTitleStyle: { fontSize: 18, fontWeight: '800',alignSelf:'center'},
    })
   },
   EventDetails: {screen: EventDetails},
 });

   export const JobsFeedStack = StackNavigator({
    JobsTab: {screen: Jobs,
      navigationOptions:({navigation}) => ({
       title: "Job Details",
       headerStyle: { paddingRight: 10, paddingLeft: 10, backgroundColor: '#f8f6f6'},
       headerTitleStyle: { fontSize: 18, fontWeight: '800',alignSelf:'center' },
     })},
    JobsDetails: {screen: JobsDetails},
  });


  export const TabNav = TabNavigator({
    HomeFeedStack: {screen: HomeFeedStack},
    JobsTab: {screen: JobsFeedStack},
    EventsTab: {screen: FeedStack}

 },{
    tabBarPosition : 'bottom',

    tabBarOptions : {
      showIcon: true,
      activeTintColor: '#104E8B',
      activeBackgroundColor: '#ffffff',
      inactiveBackgroundColor: '#ffffff',
      inactiveTintColor: '#B7C3D0',
      swipingEnbled: 'false',
      style:{
        backgroundColor:'transparent'
      }


    }
  });
  const AppNavigator = StackNavigator({
 LoginScreen:{screen: LoginScreen,
      navigationOptions:({navigation}) => ({
       header: null
     })},
    TabNav:{screen: TabNav,
     navigationOptions:({navigation}) => ({
     header: null})


    // navigationOptions:{ header:{ visible:false },
  }});

  /*AppScreenNavigator.navigationOptions = {
    title: "App"
  };*/

   // export default App;
