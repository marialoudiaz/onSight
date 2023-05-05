import React, {useState} from 'react'
import {StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native'


export default function App(props){
  const [search, setSearch] = useState('')

  return (
    <SafeAreaView>
      <View>
        <Text>Add</Text>
        <Text>a new film</Text> 
      </View>

    {/*SEARCHBAR -- linked to api */}
      {/* THE SEARCHBAR */}
      <View style= {styles.container}>
        {/* <TextInput 
            style={styles.input}
            onChangeText={(props.input)=> setSearch(props.input)}
            />
         */}
      {/* The list being displayed from search */}
      <View style={styles.text}>{props.input}</View>
      </View>
      {/* add a button "add to watchlist" */}

      <View>
      </View>


    </SafeAreaView>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
      height: 40, //40px height to our input
    width:100, //100px width
    borderColor: 'black', //color of our border
    borderWidth: 1, //width of our border
    borderRadius: 50,
  },
  text:{
      fontSize:35,
      color:'red'
    }
});