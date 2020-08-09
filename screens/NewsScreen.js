import React, {useState, useEffect, Component}from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Alert,ImageBackground } from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-reanimated';

var dataList=[];
class NewsScreen extends React.Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[],
    dataList2:[]
  });
}
componentDidMount(){
    firebase.database().ref('/Notices').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
          date:child.val().date,
          time:child.val().time,
          user:child.val().user,
          name:child.val().name,
          title:child.val().title,
          description:child.val().description,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
    });

    firebase.database().ref('Admins').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList2=[]
      snapshot.forEach((child) => {
        dataList2.push({
         email:child.val().email,
          _key:child.key
        });
      });
      
     this.setState({dataList2:dataList2})
    });

 

}
 DeleteMessage(val){
  Alert.alert(
    'Are you sure you want to delete?',
    '',
    [
      {text: 'NO', onPress: () =>{}, style: 'cancel'},
      {text: 'YES', onPress: () => firebase.database().ref('/Notices').child(val).remove()},
    ]
  );
  
}

render(){

    return (
     
      <ImageBackground source={require('../assets/grey.png')} style={{width:'100%', height:'100%'}}>
      <View style={styles.container}>
      <ScrollView>
        
      {this.state.dataList.map((item, key) => ((item.description!='')?
          <View key={key} style={{backgroundColor:'#CED8F6', borderColor:'black', borderWidth:2,margin:5}}>
            <View style={{flexDirection:"row"}}>
              <Text>{item.date}</Text>
              <Text style={{marginLeft:230}}>{item.time}</Text>
              </View>
            
            <Text>admin:-</Text>
            <Text style={styles.text,{fontWeight:"bold", fontSize:20, textAlign:'center'}}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
            
            {this.state.dataList2.map((item1, key) => ((item1.email==firebase.auth().currentUser.email)?
                <TouchableOpacity
                onPress={()=>{this.DeleteMessage(item._key)}}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        marginLeft:280,
                        backgroundColor:'#8A0808',
                        padding:15
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Delete</Text>
                </TouchableOpacity>
                :null))}
            <View style={styles.separator} />
          </View>
          :null))}
      </ScrollView>
      <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:200, marginLeft:100}}
                    onPress={() =>this.props.navigation.goBack()}
                >
                <LinearGradient
                    colors={['#2E2E2E', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Back</Text>
                </LinearGradient>
                </TouchableOpacity>
    </View>
    </ImageBackground>

    );
        }
};


export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
    paddingRight:10,
    textAlign:"center",
    paddingBottom:20
  },
  button: {
    alignItems: 'center',
    marginTop: 50
},
signIn: {
    width: '25%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},
signIn1: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
});