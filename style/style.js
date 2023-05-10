// const { color } = require("@rneui/themed/dist/config")

 const container= {
  flex:1
  }

  text={
    fontSize:15,
    backgroundColor: 'gray',
    color:'black',
  }

  input={
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1  
  }

  searchContainer={
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 25,
    paddingRight: 25
  }

  searchbox={
    fontSize: 15,
    padding:20,
    width:'100%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginLeft: 5,
    marginRight: 10,
  }
  dropShadow= {
    shadowColor: '#171717',
    shadowOffset: {width: -0.5, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  innerShadow={
    shadowColor: '#171717',
    shadowRadius:20
  }

  addButton={
  borderRadius: 80,
  backgroundColor: 'white',
  height: 40,
  width: 40,
  right: 60
  }

  resultsContainer={
    flex: 2,
  }
  results={
    backgroundColor: '#FFF',
  }
  
  result={
    width:'80%',      
  }

  button={
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1 ,
    borderRadius: 20,
    backgroundColor: 'white'
  }

  image={
    minWidth: 60, 
    minHeight: 60, 
    marginBottom:10,
  }

  alert={
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  }

module.exports={
  container, 
  input, 
  text, 
  button, 
  image,
  alert, 
  searchbox, 
  results, 
  result,
  searchContainer,
  resultsContainer,
  addButton,
  innerShadow,
  dropShadow
  }