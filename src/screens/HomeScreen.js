import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar, useWindowDimensions} from 'react-native'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { colors } from '../Styles/appStyle'
import Logo from '../../assets/images/Atom_walk_logo.jpg';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];


const HomeScreen = ({ navigation }) => {
  const {companyInfo, dbName, userToken} = useContext(AuthContext);
  const [slectedItem, setSelectedItem] = useState(null)
  const {height} = useWindowDimensions();
  const onSelect = (item) => {
    setSelectedItem(item)
  }
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView contentContainerStyle={{paddingTop: 0, paddingHorizontal: 0}}>
      <StatusBar barStyle="light-content" />
      <>
        <Header label={companyInfo?companyInfo.name:''}
              image={companyInfo?companyInfo.image:''}
              long={true}
        />
      
        <View style={{backgroundColor: colors.white, alignItems: 'center', padding: 0, margin:10, height:200, borderRadius:6}}>
          <Image 
          source={Logo} 
          style={{height: height* 0.3, maxHeight: 150, maxWidth: 200, width:'70%', }} 
          resizeMode="contain"/>
          <Text style={{color: colors.black, fontSize: 16, fontWeight: 'bold', paddingTop: 5}}>Wellcome to Atomwalk Office</Text>  
        </View>

        <View style={styles.container}>
          
          <CustomButton 
          text='My Customers'
          type='LARGE'
          icon='contact-phone' 
          onPress={() => navigation.navigate('CustomerScreen')} />

          <CustomButton 
          text='My Leads'
          type='LARGE' 
          icon='account-box'
          onPress={() => navigation.navigate('LeadScreen')} />
   

          <CustomButton 
          text='Invoice Status'
          type='LARGE' 
          icon='payments'
          onPress={() => navigation.navigate('OrderList', {cust_id:'', cust_name:''})} />
          
          <CustomButton 
          text='Company Info'
          type='LARGE' 
          icon='home-work'
          onPress={() => navigation.navigate('Company')} />
          
        </View>
      </>
    </ScrollView>          
    </SafeAreaView>
      
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    padding: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
}) 

export default HomeScreen