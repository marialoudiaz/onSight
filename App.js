import React, {useState} from 'react'
import { TextInput } from 'react-native-paper';
import {StyleSheet, SafeAreaView, Button, View, Text } from 'react-native'

// import AsyncStorage from '@react-native-async-storage/async-storage'; // equivalent du localStorage
import axios from "axios";
import { Icon } from '@rneui/themed';


export default function App(){

  // // Le film que j'input
  const [input, setInput]= useState('') // ou objet selon ce que j'amène de l'api
  console.log(input)

  // L'ensemble des films
  const [watchList, setWatchList]= useState([])
  console.log(watchList)

  // Fonction pour ajouter de nouveaux films (CREATE)
  const addToList =()=>{
    const temp = [...watchList]
    temp.push(input)
    setWatchList([...temp])
    setInput('')
  }

  // Fonction pour supprimer un film de la liste  (DELETE)
    const getDeleted =(idx)=>{
      const temp = [...watchList]
      temp.splice(idx,1)
      setWatchList([...temp])
    }

  // Fonction pour afficher les films (DISPLAY)
  const showFilm =()=>(
    watchList.map((film,i)=>{
      return <View key={i}>
        <Text style={styles.text} color="red"> {film} </Text>

        <Icon
        name='rowing' />
        <Button onPress={()=> getDeleted(i)} title="film watched" color="red" />
      </View>
    }
))

  return (
    <SafeAreaView>
      {/* File rendering all the movies added */}
      <View>
        <Text>Hello,</Text>
        <Text>you have films left</Text> 
         {/* recupérer nombre de films de la liste total (length of watchList) */}
      </View>

    {/* The input field */}
      <View>
        <TextInput onChangeText={(input)=> setInput(input)}  value={input}/>
      </View>

      <View style={styles.button}>
      
      <Button onPress={addToList} title="Add to watchlist" color='#841584'/>
      {console.log(watchList)} 
      </View>


      {/*Display all the movies */}
      {watchList.length >0 && showFilm()}
    </SafeAreaView>

    )
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    top:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1  
  },
  text:{
    fontSize:15,
    color:'black',
  },
  button:{
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1 , 
    color:'red'
  },
});















{/* <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AddFilm" component={AddFilm} />
      </Stack.Navigator>
      </NavigationContainer> */}

      // // Navigate to AddFilm
// const addFilm =()=>{
//   navigation.navigate("AddFilm")}
  
// }

{/* <AddFilm item={addToList} input={input}/> */}

      {/* // The movies added to watchList */}
      {/* {watchList && watchList.map((watchList, index)=>( 
        <Item id={index} item={watchList} deleted={getDeleted}/> 
      ))}  */}

      {/* Button to add a new movie */}
      {/* <Button title="+" onPress={addFilm} /> */}

      {/* BOTTOM NAVIGATION - List of movies / Add a movie */}