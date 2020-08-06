import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firebase from'@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { color } from 'react-native-reanimated';

const AddDevicesScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        user:'',
        pname:'',
        cname:'',
        age: '',
        sno:'',
        phoneNo: '',
        date:''
        
    });

    
    const handlePNameChange = (val) => {
            setData({
                ...data,
                pname: val,
                user:firebase.auth().currentUser.email,
                date:new Date()
            });
        
        }
    

    const handleCNameChange = (val) => {
       
            setData({
                ...data,
                cname: val,
                user:firebase.auth().currentUser.email,
                date:new Date()
            });
              
      }

      const handleAgeChange = (val) => {
       
        setData({
            ...data,
            age: val,
            user:firebase.auth().currentUser.email,
            date:new Date()
        });
          
  }

    const handleSNoChange = (val) => {
       
        setData({
            ...data,
            sno: val,
            user:firebase.auth().currentUser.email,
            date:new Date()
        });
        
  }

    const handlePhoneNoChange = (val) => {
        
            setData({
                ...data,
                phoneNo: val,
                user:firebase.auth().currentUser.email,
                date:new Date()
            });
       
      
    }

    
    const sendRequest=()=>{
        if((data.pname==''||data.cname==''||data.age==''||data.sno==''||data.phoneNo=='')){
            Alert.alert("Adding Failed","Please enter all required fields")
             return;
        
    }else if((data.pname==null||data.cname==null||data.age==null||data.sno==null||data.phoneNo==null)){
        Alert.alert("Adding Failed","Please enter all required fields")
        return;
        }else{
        firebase.database().ref('Confirmations').child(data.date.toString()).set(
            {
                user:data.user,
                pname:data.pname,
                cname:data.cname,
                age:data.age,
                sno:data.sno,
                phoneNo:data.phoneNo,
                date:data.date
            }
        ).then(() => {
            console.log('INSERTED !')
            Alert.alert('Request Sent Successfully','Your device will appear in your devices list after verifying')
            
            setData({
                user:firebase.auth().currentUser.email,
                pname:'',
                cname:'',
                age:'',
                sno:'',
                phoneNo:'',
                date:new Date()
            })
        
            
        }).catch((error) => {
            console.log(error);
        });
    }
    }
   
        return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#1C1C1C' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Add New Device for your child</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={[styles.text_footer, {marginTop: 35}]}>Parent Name</Text>
            <View style={styles.action}>
                <Feather 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter parent name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePNameChange(val)}
                    value={data.pname}
                />
               
            </View>
           {data.pname ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Required Field</Text>
            </Animatable.View>}
            <Text style={[styles.text_footer, {marginTop: 35}]}>Child Name</Text>
            <View style={styles.action}>
                <Feather 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter child name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleCNameChange(val)}
                    value={data.cname}
                />
               
            </View>
            {data.cname ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Required Field</Text>
            </Animatable.View>}
            { /*data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email is badly formatted</Text>
            </Animatable.View>
            */}
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Child age</Text>
            <View style={styles.action}>
                <Feather 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter child age"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={(val) => handleAgeChange(val)}
                    value={data.age}
                />
                
            </View>
            {data.age ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Required Field</Text>
            </Animatable.View>}

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Serial no</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter device serial number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={(val) => handleSNoChange(val)}
                    value={data.sno}
                />
                
            </View>
            {data.sno ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Required Field</Text>
            </Animatable.View>}
            { /*data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            */}
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Phone no</Text>
            <View style={styles.action}>
                <Feather 
                    name="clipboard"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    keyboardType="phone-pad"
                    placeholder="Enter User Mobile No"
                    onChangeText={(val) => handlePhoneNoChange(val)}
                    value={data.phoneNo}
                />
            
               
           </View>
           {data.phoneNo ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Required Field</Text>
            </Animatable.View>}
         

           
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => sendRequest()}
                >
                <LinearGradient
                    colors={['#424242', '#151515']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Add Device</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#424242',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#424242'
                    }]}>Back</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default AddDevicesScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#2E2E2E'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign:"center"
        
    },
    errorMsg: {
        color: '#610B0B',
        fontSize: 12,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    textInputArea:{
      textAlign: 'center',
      width:300,
      borderWidth: 1,
      borderColor: '#9E9E9E',
      borderRadius: 20 ,
      backgroundColor : "#FFFFFF",
      height: 150
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
