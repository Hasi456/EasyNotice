import React from 'react'
import {Text, Button, View} from 'react-native'

const ReviewScreen=({navigation})=>{

    return(
        <View>
        <Text>User Reviews is displayed here</Text>
        <Button
        title="Add Review"
        onPress={()=>navigation.navigate("AddReviewScreen")}
        /> 
    </View>
    )
}
export default ReviewScreen;