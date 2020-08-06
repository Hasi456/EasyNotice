import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import Users from '../model/users';
import firebase from'@react-native-firebase/app';
import auth from '@react-native-firebase/auth';




const ResetPasswordScreen=({navigation})=>{
    
const { colors } = useTheme();




const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidEmail:true
});

const textInputChange = (val) => {
    var re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if( re.test(val)) {
        setData({
            ...data,
            username: val,
            check_textInputChange: true,
            isValidEmail: true
        });
    } else {
        setData({
            ...data,
            username: val,
            check_textInputChange: false,
            isValidEmail: false
        });
    }
}

const ResetEmail=()=>{



    if(data.username==''){
        Alert.alert('Wrong Input!', 'Email field cannot be empty.', [
            {text: 'Okay'}
        ]);
        return;
    }else if(data.username==null){
        Alert.alert('Sending Failed.', 'Make sure you entered email correctly.', [
            {text: 'Okay'}
        ]);
        return;
    }else{  
    firebase.auth().sendPasswordResetEmail(data.username).then(()=>{
    Alert.alert('Reset Email Sent.','Please check your Email')
    }).catch(error=>{console.log(error),
    alert(error.message)
    });
}
}

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#151515' barStyle="light-content"/>
          <View style={styles.header}>
              <Text style={styles.text_header}>Reset Password</Text>
          </View>
          <Animatable.View 
              animation="fadeInUpBig"
              style={[styles.footer, {
                  backgroundColor: colors.background
              }]}
          >
              <Text style={[styles.text_footer, {
                  color: colors.text
              }]}>Email</Text>
              <View style={styles.action}>
                  <Feather 
                      name="mail"
                      color={colors.text}
                      size={20}
                  />
                  <TextInput 
                      placeholder="Please Enter your Account Email"
                      placeholderTextColor="#666666"
                      style={[styles.textInput, {
                          color: colors.text
                      }]}
                      autoCapitalize="none"
                      onChangeText={(val) => textInputChange(val)}
                      
                  />
                  {data.check_textInputChange ? 
                  <Animatable.View
                      animation="bounceIn"
                  >
                      <Feather 
                          name="check-circle"
                          color="green"
                          size={20}
                      />
                  </Animatable.View>
                  : null}
              </View>
              { data.isValidEmail ? null : 
              <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Email is badly formatted</Text>
              </Animatable.View>
              }
              
  
             
              <View style={styles.button}>
                  <TouchableOpacity
                      style={styles.signIn}
                      onPress={() => {ResetEmail()}}
                  >
                  <LinearGradient
                      colors={['#585858', '#000000']}
                      style={styles.signIn}
                  >
                      <Text style={[styles.textSign, {
                          color:'#fff'
                      }]}>Send Reset Email</Text>
                  </LinearGradient>
                  </TouchableOpacity>
                  
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignInScreen')}
                    style={[styles.signIn, {
                        borderColor: '#151515',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#585858'
                    }]}>Back to Login</Text>
                </TouchableOpacity>
  
              </View>
          </Animatable.View>
        </View>
      );
  };

  export default ResetPasswordScreen;
  
  const styles = StyleSheet.create({
      container: {
        flex: 1, 
        backgroundColor: '#2E2E2E'
      },
      header: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 50
      },
      footer: {
          flex: 3,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30
      },
      text_header: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 30
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
      actionError: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#FF0000',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : -12,
          paddingLeft: 10,
          color: '#05375a',
      },
      errorMsg: {
          color: '#FF0000',
          fontSize: 14,
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
      }
    });
  