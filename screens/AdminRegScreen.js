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

const AdminRegScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        displayName:'',
        email: '',
        password: '',
        confirm_password: '',
       // check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isLoading:false,
        isValidEmail:true,
        isValidPassword:true,
        isValidConfirm_password:true
    });

    
    const textInputChange = (val) => {
        var re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( re.test(val)) {
            setData({
                ...data,
                email: val,
              // check_textInputChange: true
              isValidEmail:true,
              password:'123456'
            });
        } else {
            setData({
                email:val,
                isValidEmail:false
            })
            
        }
    }

   

    const registerUser=()=>{
        if((data.email=='' || data.password=='')||(data.email==null || data.password==null)){
            Alert.alert('Wrong Input!', 'Email field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        
        else{
            setData({
                isLoading:true
            })
            firebase.auth().createUserWithEmailAndPassword(data.email,data.password).then((res)=>{
                firebase.database().ref('/Admins').push({
                    email:data.email
                })
                console.log('User Registered successfully')
                Alert.alert('User Registered successfully')
                setData({
                    displayName:'',
                    email:'',
                    password:'12345',
                    confirm_password:'',
                    secureTextEntry: true,
                    isValidUser: true,
                    isValidPassword: true,
                    isLoading:false
                })
                navigation.navigate('AdminRegScreen')
            }).catch(error=>{
                navigation.navigate('SignUpScreen')
                navigation.navigate('AdminRegScreen')
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
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
         
            <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
            <View style={styles.action}>
                <Feather 
                    name="mail"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter a valid Email Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="email-address"
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

            {/* <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View> */}
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => registerUser()}
                >
                <LinearGradient
                    colors={['#585858', '#000000']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Register Admin mail</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#1C1C1C',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#585858'
                    }]}>Back to Home</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default AdminRegScreen;

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
        fontSize: 30
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
