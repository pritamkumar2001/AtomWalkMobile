import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header'; 
import Loader from '../components/Loader';
import { colors } from '../Styles/appStyle'
import { getProfileInfo } from '../services/authServices';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    const {logout, userToken} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState([])
    const [isManager, setIsManager] = useState(false)
    // console.log(userToken)

    useEffect(() => {
      setLoading(true)
      getProfileInfo()
      .then((res) => {
          // console.log(res.data)
          setProfile(res.data);
          setIsManager(res.data.user_group.is_manager);
          setLoading(false);
      })
      .catch((error) => {
          // console.log('error', error);
          setLoading(false);
          setIsManager(false);
      });
    }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <Loader visible={loading} /> 
      <Header 
            label='My Profile'
            image=''
            icon=''
            color={colors.blue}
            onPress={()=>{}}
      /> 
      <ScrollView contentContainerStyle={{paddingTop: 10, paddingHorizontal: 10}}>
      <View style={{backgroundColor: colors.yellow, alignItems: 'center', padding: 10, margin:10, height:150, borderRadius:6}}>
          <Image 
          source={{uri: profile.image }}
          style={{height:100, maxHeight: 150, maxWidth: 100, width:'50%', borderRadius:50}} 
          resizeMode="contain"/>
          <Text style={{color: colors.black, fontSize: 16, fontWeight: 'bold', paddingTop: 5}}>{profile.user_name}</Text>  
      </View>    
      <View>
      <View style={{flexDirection: 'row', paddingHorizontal:10}}>  
      <Text style={{color: colors.black, fontSize: 24, fontWeight: 'bold', flex: 1, paddingVertical: 0, alignSelf:'flex-start'}}>Is Manager : 
      </Text>
      {isManager ? <MaterialIcons name='check-box' size={40} color={colors.secondary}  />: 
                   <MaterialIcons name='cancel' size={40} color={colors.red} />}
      </View> 
      {userToken? 
        (<>
         <CustomButton 
            onPress={() => navigation.navigate("ChangePassword")} 
            text={'Change Passwod'}
            fgColor={colors.primary}
            type={'LINK_ONLY'}  />
         <CustomButton 
            onPress={() => {logout()}} 
            text={'Sign Out'} 
            bgColor={'red'} />
        </>):
        (<CustomButton 
            text='Sign In' 
            onPress={() => navigation.navigate("Login")} />)  
      }
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen