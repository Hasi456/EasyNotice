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

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidEmail:true
    });

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

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

    const handlePasswordChange = (val) => {

        
        if( (val.trim().length >= 8)) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

  /*  const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }*/
    
   /* const loginHandle = (userName, password) => {

      /*  const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );

        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
       
    }*/

    const userLogin=()=>{

        if(data.username=='' || data.password==''){
            Alert.alert('Wrong Input!', 'Email or Password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }else if(data.username==null || data.password==null){
            Alert.alert('Login Failed.', 'Make sure you entered credentials correctly.', [
                {text: 'Okay'}
            ]);
            return;
        }
        else{
            setData({
                isLoading:true
            })
            firebase.auth().signInWithEmailAndPassword(data.username,data.password).then((res)=>{
                console.log(res)
                console.log('User Logged in Successfully')
                Alert.alert('Login Success')
                setData({
                    displayName:'',
                    username:'',
                    password:'',
                    check_textInputChange: false,
                    secureTextEntry: true,
                    isValidUser: true,
                    isValidEmail:true,
                    isValidPassword: true,
                    isLoading:false
                })
                signIn(Users.filter(item=>{return true}));
            }).catch(error=>{
                navigation.navigate('SplashScreen')
                navigation.navigate('SignInScreen')
                alert(error.message)
            },
           //setTimeout(5000),
           //Alert.alert(error)
            
            )

        }

    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#000000' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Login To Continue!</Text>
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
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={(val) =>textInputChange(val)}
                    //onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
            { ((data.isValidEmail==true)||data.username==null ) ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email is badly formatted</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={((data.secureTextEntry ==true)||(data.password==null)) ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { ((data.isValidPassword==true)||data.password==null )? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity onPress={()=>navigation.navigate('ResetPasswordScreen')}>
                <Text style={{color: '#2E2E2E', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {userLogin()}}
                >
                <LinearGradient
                    colors={['#585858', '#000000']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Log In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#1C1C1C',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#585858'
                    }]}>Register as new User</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#1C1C1C'
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
