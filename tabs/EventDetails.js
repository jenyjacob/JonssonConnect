import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, FlatList, StyleSheet, View } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, Col, CardItem, Grid, Thumbnail, List, ListItem, Icon, Item, Input, Text, Title, Button, Left, Body, Right, Row, H1, H2, H3 } from 'native-base';
 import firebaseDbh from '../App';
 import firebaseListNews from '../App';
 import * as firebase from 'firebase';

 export default class EventDetails extends Component {

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
          dataSource: ds.cloneWithRows(responseJson.Events),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

   static navigationOptions = {
     tabBarLabel: 'Events',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/eventsicon.png')}
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
       <Container>
        <Content>
        <Image source={{uri: this.props.navigation.state.params.rowData.eventImageURL}} style={{ height: 200, width: null }}>
        </Image>
        <Card style={{flex: 0}}>
            <CardItem>
              <Body>
                <Text style={styles.nameStyle}>{this.props.navigation.state.params.rowData.eventName}</Text>
                <Text style={styles.hostStyle}>{this.props.navigation.state.params.rowData.hostedBy}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
              <Text style={{fontSize: 14, fontWeight: '800'}}>Details</Text>
              <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
              <Text style={styles.descriptionStyle}>{this.props.navigation.state.params.rowData.eventDescription}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
              <Button block bordered>
              <Text style={{fontSize: 12, fontWeight: '400'}}>Attend</Text>
              </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
  nameStyle: {
     fontWeight: '600',
     fontSize: 16,
  },
  descriptionStyle: {
     fontWeight: '400',
     fontSize: 12,
  },
  hostStyle: {
    fontSize: 12,
    color: '#808080',
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
    shadowOpacity: 0.8,
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
});
