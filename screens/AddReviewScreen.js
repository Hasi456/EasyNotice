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

const AddReviewScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        name:'',
        title: '',
        description: '',
        
    });

    
    const handleNameChange = (val) => {
            setData({
                ...data,
                name: val,
            });
        }
    

    const handleTitleChange = (val) => {
       
            setData({
                ...data,
                title: val,
              });
      }

    const handleDescriptionChange = (val) => {
        
            setData({
                ...data,
                description: val,
            });
       
      
    }

   
        return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#1C1C1C' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Add Your Comments</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={[styles.text_footer, {marginTop: 35}]}>Name</Text>
            <View style={styles.action}>
                <Feather 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleNameChange(val)}
                />
               
            </View>
            { /*data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email is badly formatted</Text>
            </Animatable.View>
            */}

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Title</Text>
            <View style={styles.action}>
                <Feather 
                    name="feather"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your problem title"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleTitleChange(val)}
                />
                
            </View>
            { /*data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            */}
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Description</Text>
            <View style={styles.action}>
                <Feather 
                    name="clipboard"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter the description"
                    style={styles.textInputArea}
                    autoCapitalize="none"
                    numberOfLines={20}
                    multiline={true}
                    onChangeText={(val) => handleDescriptionChange(val)}
                />
            
               
           </View>
         

           
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => sendMessage()}
                >
                <LinearGradient
                    colors={['#6E6E6E', '#585858']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Send</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#6E6E6E'
                    }]}>Back</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#585858'
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
        fontSize: 30,
        
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
