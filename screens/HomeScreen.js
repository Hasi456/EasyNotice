import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar,ImageBackground,Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';

var dataList=[];
class HomeScreen extends React.Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[]
  });
}
componentDidMount(){
    firebase.database().ref('Admins').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
         email:child.val().email,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
    });
  }
  render(){
    return (
      <View>
        
        <ImageBackground source={require('../assets/grey.png')} style={{width:'100%', height:'100%'}}>
          <Image source={require('../assets/logo-Transparent.png')} style={{width:150, height:135, marginLeft:110}}></Image>
        <Text style={{fontSize:30, fontWeight:"bold", textAlign:"center"}}>Home Screen</Text>
      
    
        {/* {(firebase.database().ref('User').on('value',snapshot=>{snapshot.val().email})==firebase.auth() */}
        
        <TouchableOpacity
                    style={styles.signIn, {marginTop:50,width:300, marginLeft:30}}
                    onPress={() =>this.props.navigation.navigate('NewsScreen')}
                >
                <LinearGradient
                    colors={['#2E2E2E', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>View Notices</Text>
                </LinearGradient>
                </TouchableOpacity>
              {/* :null} */}
        
        {this.state.dataList.map((item, key) => ((item.email==firebase.auth().currentUser.email)?
          <TouchableOpacity
                    style={styles.signIn, {marginBottom:30,width:300, marginLeft:30, marginTop:10}}
                    onPress={() =>this.props.navigation.navigate('NoticeScreen')}
                >
                <LinearGradient
                    colors={['#2E2E2E', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Add New Notice</Text>
                </LinearGradient>
                </TouchableOpacity>
                :null))}
          {this.state.dataList.map((item, key) => ((item.email==firebase.auth().currentUser.email)?    
        <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:300, marginLeft:30}}
                    onPress={() =>this.props.navigation.navigate('SettingsScreen')}
                >
                <LinearGradient
                    colors={['#2E2E2E', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Employee Questions</Text>
                </LinearGradient>
                </TouchableOpacity>
                :null))}
            {this.state.dataList.map((item, key) => ((item.email==firebase.auth().currentUser.email)?
            <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:300, marginLeft:30}}
                    onPress={() =>this.props.navigation.navigate('AdminRegScreen')}
                >
                <LinearGradient
                    colors={['#2E2E2E', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Register new Admin</Text>
                </LinearGradient>
                </TouchableOpacity>
                 :null))}
    
      </ImageBackground>
      </View>
    )
                 }
  };

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
     backgroundColor:'#F1F8E0'
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
