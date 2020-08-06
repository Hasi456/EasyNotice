import React, {useState, useEffect, Component}from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Alert,ImageBackground } from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-reanimated';

var dataList=[];
class SettingsScreen extends React.Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[],
    ntime:'',
    ndate:'',
    respond:''

  });
}
componentDidMount(){
    firebase.database().ref('/Questions').on('value',snapshot=>{
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
          respond:child.val().respond,
        //  respond:child.val().respond,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
    });

 

}
 DeleteMessage(val){
  Alert.alert(
    'Are you sure you want to delete?',
    '',
    [
      {text: 'NO', onPress: () =>{}, style: 'cancel'},
      {text: 'YES', onPress: () => firebase.database().ref('/Questions').child(val).remove()},
    ]
  );
  
}

handleRespondChange(val){
        
  this.setState({
      respond:val,
      ndate: new Date(),
      ntime: new Date()
  });


}



sendReply(val){
  if((this.state.respond=='')){
    Alert.alert("Sending Failed","You must enter Message")
     return;

  }else if((this.state.respond==null)){
    Alert.alert("Sending Failed","You must enter  Message")
    return;
  }else{
    firebase.database().ref('Questions').child(val).update(
     {
        ndate:this.state.ndate.getFullYear() + " - "+ parseInt(this.state.ndate.getMonth()+1) +" - "+this.state.ndate.getDate(),
        ntime:this.state.ndate.getHours() + " : " + this.state.ndate.getMinutes(),
        respond:this.state.respond

    }
  ).then(() => {
    console.log('INSERTED !')
    Alert.alert('Replied Successfully')
    
    setData({

        ndate:'',
        ntime:'',
        respond:''
    })
    
}).catch((error) => {
    console.log(error);
});
}

}

render(){

    return (
     
      <ImageBackground source={require('../assets/grey.png')} style={{width:'100%', height:'100%'}}>
      <View style={styles.container}>
      <ScrollView>
        
        {this.state.dataList.map((item, key) => (
          <View key={key} style={{backgroundColor:'#CED8F6', borderColor:'black', borderWidth:2,margin:5}}>
            <View style={{flexDirection:"row"}}>
              <Text>{item.date}</Text>
              <Text style={{marginLeft:230}}>{item.time}</Text>
              </View>
            
            <Text>To admin:-</Text>
            <Text style={styles.text,{fontWeight:"bold", fontSize:20, textAlign:'center'}}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
           {(item.respond!='')? 
        <Text style={styles.text,{fontWeight:"bold", fontSize:20, textAlign:'center'}}>Replied : {item.respond}</Text>
           :null}
            <View style={{flexDirection:"column",alignItems:"flex-end"}}>
            <TextInput 
                    placeholder="Reply employee"
                    style={styles.textInputArea}
                    autoCapitalize="none"
                    numberOfLines={20}
                    multiline={true}
                   onChangeText={(val) =>this.handleRespondChange(val)}
                    // value={data.description}
                />
            
            <TouchableOpacity
                onPress={()=>{this.sendReply(item._key)}
              }
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        backgroundColor:'#0080FF',
                        padding:15
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{this.DeleteMessage(item._key)}}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        backgroundColor:'#8A0808',
                        padding:10
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Delete</Text>
                </TouchableOpacity>
                </View>
            <View style={styles.separator} />
          </View>
        ))}
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


export default SettingsScreen;

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
    textAlign:"center"
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
    fontSize: 15,
    fontWeight: 'bold'
},
signIn1: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
textInput: {
  flex: 1,
 // marginTop: Platform.OS === 'ios' ? 0 : -12,
  paddingLeft:2,
  color: '#05375a',
},
textInputArea:{
textAlign: 'center',
width:330,
borderWidth: 1,
borderColor: '#9E9E9E',
borderRadius: 20 ,
backgroundColor : "#FFFFFF",
height: 100,

}
});