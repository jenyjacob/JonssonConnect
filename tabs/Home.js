/**
 * JonssonConnect Application
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, AsyncStorage, Image, ListView, ImageBackground, FlatList, RefreshControl, StyleSheet, TextInput, View, TouchableHighlight,Linking } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Tab, Tabs, Text, Title, Button, Left, Body, Right, H1, H2, H3 } from 'native-base';
 import { StatusBar } from 'react-native'
 import * as firebase from 'firebase';
 import firebaseApp from '../App';
 import rootRef from '../App';


 export default class Home extends Component {
  constructor(props) {
     super(props);
     this.state = {
       isLoading: true,
       refreshing: false,
     }
   }

   async componentDidMount() {
     this.setState({
      firstName: await AsyncStorage.getItem('firstName'),
      lastName: await AsyncStorage.getItem('lastName'),
      userPhoto: await AsyncStorage.getItem('userPhoto'),
      headline: await AsyncStorage.getItem('headline'),
       industry: await AsyncStorage.getItem('industry'),
    });
    return fetch('https://jonssonconnect.firebaseio.com/.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.Articles),
        }, function() {
          });
      })
      .catch((error) => {
        this.setState({
            isLoading: false,
            networkFailed: true,
          })
      });
  }
  firstSearch() {
      //return fetch('https://jonssonconnect.firebaseio.com/.json')
      //return fetch('https://jonssonconnect.firebaseio.com/Articles.json')
      return fetch('/Users/mendoza/Downloads/articles.json')
       .then((response) => response.json())
       .then((responseJson) => {
         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({
           isLoading: false,
           //dataSource: ds.cloneWithRows(responseJson.Articles),
           dataSource: ds.cloneWithRows(responseJson.filter(x => x.articleName == 'UT Dallas Team Wins Grand Prize at Texas A&M Hackathon')),
         }, function() {
           });
       })
       .catch((error) => {
         //console.error(error);
         this.setState({
           isLoading: false,
           networkFailed: true,
         })
       });
     }

     _onRefresh() {
       this.setState({refreshing: true});
       return fetch('https://jonssonconnect.firebaseio.com/.json')
       //return fetch('https://jonssonconnect.firebaseio.com/Articles.json')
       //return fetch('/Users/mendoza/Downloads/articles.json')
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.Articles),
            refreshing: false,
            //dataSource: ds.cloneWithRows(responseJson.filter(x => x.articleName == 'UT Dallas Team Wins Grand Prize at Texas A&M Hackathon')),
          }, function() {
            });
        })
        .catch((error) => {
          //console.error(error);
          this.setState({
            isLoading: false,
            networkFailed: true,
          })
        });
     }


   static navigationOptions = ({
      navigation }) => ({
       headerRight: <TouchableHighlight onPress={() =>
         navigation.navigate('LoginScreen')
       }><Image
       source={require('../images/logout.png')}/></TouchableHighlight>,
     tabBarLabel: 'Home',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/temocicon.png')}
        style={{width: 32, height: 32}}>
       </Image>
     )

 });

   render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>

            <ActivityIndicator />
          </View>
        );
      }
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]

      const date = new Date()
      var month = monthNames[date.getMonth()]
      var year = date.getFullYear()
      var day = date.getDate()


     return (
       <Container style={styles.containerStyle}>
    
             <Content
               refreshControl={
                 <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this._onRefresh.bind(this)}
                 />
               }
             >

               <View style={styles.container2}>

                 <ImageBackground
                   style={styles.backdrop}
                   blurRadius={0}
                   source={{uri: 'https://images.unsplash.com/photo-1502679726485-931beda67f88?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=de463bf685e4e3df80b0957fd4a2fa1c&auto=format&fit=crop&w=2255&q=80'}}>
                <View style={styles.backdropView}>
                <Thumbnail style={{ paddingTop: 30 }} source={{uri: this.state.userPhoto.toString() }} />
                  <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '300', paddingBottom: 5, paddingTop: 5}}>Hello, {this.state.firstName.toString()}.</Text>
                  <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '100', paddingBottom: 5}}>Search the news for today,</Text>
                     </View>
                 </ImageBackground>
               </View>
               <Content style={{ backgroundColor: '#f8f6f6'}}>
                 <Card>
                   <CardItem style={{ borderLeftColor: '#398564', borderLeftWidth: 4, borderRightColor: '#398564', borderRightWidth: 4}}>
                     <Body>
                       <Text style={{ fontSize: 22, fontWeight: '800', color: '#343d46'}}>Today, {month} {day}, {year}</Text>
                     </Body>
                   </CardItem>
                 </Card>
               </Content>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => {
             const {uri} = rowData;
             return (
              <Content style={{ borderLeftColor: rowData.articleColor, borderLeftWidth: 3}}>
                <Text style={{fontSize: 18, fontWeight: '800'}}></Text>
                <Text style={{color: rowData.articleColor,fontSize: 10, fontWeight: '100', paddingLeft: 10, paddingRight: 5, }}>
                  {rowData.articleType}
                </Text>
                <Text onPress={() => this.props.navigation.navigate("ArticleDetails", {rowData})} style={styles.nameStyle}>
                    {rowData.articleName}
                </Text>
                <Text style={styles.dateStyle}>{monthNames[parseInt(rowData.postedOn.toString().substr(5, 5).substr(0, 2)) - 1]} {parseInt(rowData.postedOn.toString().substr(8, 2))}, {rowData.postedOn.toString().substr(0, 4)}

                </Text>

              </Content>
             )
           }}
         />
         <Content style={{ borderLeftColor:'#398564' , borderLeftWidth: 3}} >
         <Card>

             <Body>
             <Text style={styles.Donate}> Make a Gift</Text>
             <Text style={styles.Donatetext}> Please Click the Donate button to make an online donation.</Text>
              <Text style={styles.Donatetext}>You will be redirected to a webpage</Text>
             <View style = {styles.DonateButton}>
             <Button rounded sucess onPress={ ()=>{ Linking.openURL('https://giving.utdallas.edu/')}} style = {styles.buttoncolor}>
             <Text>
               Donate Now
             </Text>
             </Button>
             </View>
             </Body>


     </Card>

         </Content>
         </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
   containerStyle: {
       backgroundColor: '#FFFFFF',
     },
     container2: {
       flex: 1,
       justifyContent: 'flex-start',
       alignItems: 'center',
       width: null,
       backgroundColor: '#FFFFFF'
     },
     backdrop: {
       width: null,
       height: 200
     },
     backdropView: {
       height: 230,
       width: 420,
       backgroundColor: 'rgba(0,0,0,0)',
       paddingLeft: 15,
       alignItems: 'center',
       justifyContent: 'center',

     },
     hostStyle: {
       fontWeight: '800',
       fontSize: 14,
     },
     seperator: {
       fontWeight: '100',
       color: '#D3D3D3',
       paddingLeft: 10,
     },
     nameStyle: {
       fontSize: 18,
       fontWeight: '800',
       paddingTop: 5,
       paddingLeft: 15,
       paddingRight: 5,
     },
     dateStyle: {
       fontSize: 10,
       fontWeight: '100',
       paddingTop: 10,
       paddingLeft: 15,
       paddingRight: 5,
       color: '#878787',
     },
     bigHeader: {
       fontSize: 24,
       fontWeight: '800',
       paddingTop: 10,
       paddingLeft: 15,
     },
     colorHeader: {
       fontSize: 24,
       fontWeight: '800',
       paddingTop: 10,
       paddingLeft: 15,
       color: '#C75B12',
     },
     jonssonHeader: {
       fontSize: 24,
       fontWeight: '800',
       paddingBottom: 20,
       paddingLeft: 10,
     },
     eventDescriptionStyle: {
       fontSize: 10,
     },
     typeStyle: {
       fontSize: 14,
       fontWeight: '800',
       paddingTop: 10,
       paddingLeft: 15,
       paddingRight: 5,
       color: '#0085c2',
     },
     summaryStyle: {
       fontSize: 18,
       fontWeight: '800',
       paddingTop: 10,
       paddingLeft: 15,
       paddingRight: 5,
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
       backgroundColor: '#00A1DE',
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
  Donate: {
    fontSize: 22,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  Donatetext:{
    alignItems:'center',
     fontSize: 14,
      fontWeight: '100',
       paddingBottom: 5,
  },
  DonateButton: {
    alignItems:'center',
    paddingTop: 10,
    paddingBottom: 5,
  },
  buttoncolor:{
    backgroundColor:'#69BE28',
  },
});
