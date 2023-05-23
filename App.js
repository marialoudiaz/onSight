import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react'
import {useFonts} from 'expo-font';
import SearchComponent from './Views/Search';
import WatchListComponent from './Views/WatchList';

const App = () => {
  const [watchListData, setWatchListData] = useState([]);
  //state inside App.js pass via props from App.js to WatchList.js
  // update from Search.js
  // will be updated in props in WatchList.js as well

  const [fontsLoaded] = useFonts({
    'FT88-Regular': require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/FT88-Regular.ttf'),
    'FT88-Serif': require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/FT88-Serif.ttf'),
    'Montserrat-Regular' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Medium' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-SemiBold.ttf')
  })
//////////////////// NAVIGATION /////////////////////////
// defining routes with components to be rendered
const SearchRoute =()=> <SearchComponent fontsLoaded={fontsLoaded} watchListData={watchListData} setWatchListData={setWatchListData} />
const WatchListRoute =()=> <WatchListComponent fontsLoaded={fontsLoaded} watchListData={watchListData} setWatchListData={setWatchListData}/>
// state with active route and labels/icons for routes
const [state, setState]=useState({
  index:0,
  routes:[
    {key:'loupe', title:'search', focusedIcon:'magnify-plus', unfocusedIcon: 'magnify-plus-outline'},
    {key:'coeur', title:'watchlist', focusedIcon:'cards-heart', unfocusedIcon: 'cards-heart-outline'}
  ]
})
// update route index
handleIndexChange = (index)=> setState({...state, index});
//linking keys from state to routes
const renderScene = BottomNavigation.SceneMap({
  loupe: SearchRoute,
  coeur: WatchListRoute,
});
useEffect(() => {
  // Set initial index to 0 for SearchRoute
  handleIndexChange(0);
}, []);

return (
    <SafeAreaProvider>
      <BottomNavigation navigationState={state} onIndexChange={handleIndexChange} renderScene={renderScene}/>
    </SafeAreaProvider>
    )
}
export default App
