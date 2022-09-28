import React,{useState, useEffect} from 'react'
import { Text , StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import { firebase } from '../config'

const Dashboard = () => {
  const [name, setName] = useState([]);

  // change the password
  const changePassword = () => {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
    .then(() => {
      alert('Password reset email sent!')
    })
    .catch(error => {
      alert(error)
    })
  }

  useEffect(() => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) =>{
      if(snapshot.exists){
          setName(snapshot.data())
      }
      else {
        console.log('does not exist')
      }
  })
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      
        <Text style={{fontSize:20, fontWeight:'bold'}}>
          Hello, {name.firstName}
        </Text>
        <TouchableOpacity
            onPress={()=>{
              changePassword()
          }}
            style={styles.button}
        >
          <Text style={{fontWeight:'bold', fontSize:22}}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
              firebase.auth().signOut();
          }}
            style={styles.button}
        >
          <Text style={{fontWeight:'bold', fontSize:22}}>Sign Out</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex:1,  
    alignItems:'center',
    marginTop:100,
  },
  button: {
    marginTop:50,
    height:70,
    width:250,
    backgroundColor:'#026efd',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
  }
});