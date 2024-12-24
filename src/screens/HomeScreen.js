import { View, Text, StyleSheet, ImageBackground ,Image, SafeAreaView, ScrollView, StatusBar, useWindowDimensions,TouchableOpacity } from 'react-native'
import React, {useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { colors } from '../Styles/appStyle'
import Logo from '../../assets/background.jpg'
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Logos from '../../assets/images/Atom_walk_logo.jpg';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import PinPopup from '../components/PinPopup';
const AppContainer =  styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;
const Headers = styled.View`
  background-color:#4285f4;
  padding: 20px;
  padding-top: 60px;
  padding-bottom: 105px;
  align-items: center;
`;
const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 3px solid white;
  margin-bottom: 10px;
`;
const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
const WelcomeText = styled.Text`
  color: white;
  font-size: 16px;
  margin-top: 5px;
`;
const TbaView=styled.View`
display: flex;
align-items: center;
justify-content: center;
`;
const ListContainers = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
})`
  padding-left: 20px;
  padding-right:20px;
  padding-top:20px;
`;
const ListContainer = styled.View`
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const ListItem = styled(TouchableOpacity)`
  background-color: ${(props) => props.backgroundColor || '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 47%;  
  margin-bottom: 10px;
  elevation: 3;
`;
const ListText = styled.Text`
  font-size: 16px;
  color: #454545;
  font-weight: 500;
  margin-top: 10px;
  text-align: center;
`;
const ListItem2 = styled(TouchableOpacity)`
  padding: 20px;
  margin: 2px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 47%;  // Two items per row with spacing
  /* margin-bottom: 35px; */
  elevation: 3;
  background-color: ${(props) => props.backgroundColor || '#ffffff'};
`;
const BackGround = styled.View`
width: 60px;
background-color: #4285f4;
height: 60px;
border-radius:60px;
display: flex;
align-items: center;
justify-content: center;
/* border-radius: 50%; */
`;
  const HomeScreen = ({ navigation }) => {
  const {companyInfo,ismanagers} = useContext(AuthContext);
  const onSelect = () => {
    navigation.navigate('ChangePassword')
  }
  // console.log(ismanagers,"hdbedbe")
  return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#4285f4" />
      <AppContainer>
       <Headers  source={Logo}>
       <ProfileImage 
      source={
      companyInfo && typeof companyInfo?.image === 'string' 
      ? { uri: companyInfo.image }
      : Logos 
          }
/>
        <Title>{companyInfo?companyInfo.name:''}</Title>
        <WelcomeText>Welcome to Atomwalk Office</WelcomeText>
      </Headers>
      <TbaView>
      </TbaView>
      <ListContainers>
      <ListContainer>
        <ListItem  backgroundColor="#e1e5fc"  onPress={() => navigation.navigate('CustomerScreen')}>
          <BackGround>
          <Icon name="people-outline" size={30} color="#fff" />
          </BackGround><ListText>My Customers</ListText>
        </ListItem>
        <ListItem backgroundColor="#e1e5fc" onPress={() => navigation.navigate('OrderList', {cust_id:'', cust_name:''})}>
        <BackGround>
          <Icon name="file-tray-full-outline" size={30} color="#fff" />
          </BackGround>
          <ListText>Invoice Status</ListText>
        </ListItem>
        <ListItem backgroundColor="#e1e5fc" onPress={() => navigation.navigate('LeadScreen')}>
        <BackGround>
        <FontAwesome6 name="people-group" size={25} color="#fff" />
        </BackGround>
          <ListText>My Leads</ListText>
        </ListItem>
        <ListItem backgroundColor="#e1e5fc" onPress={() => navigation.navigate("AddNewLead", {'task':null,'scan':true})}>
        <BackGround>
        <AntDesign name="scan1" size={24} color="#fff" />
        </BackGround>
        <ListText>Scan Lead</ListText>
        </ListItem>
       {ismanagers&&<ListItem backgroundColor="#e1e5fc" onPress={() => navigation.navigate("Status")}>
        <BackGround>
        <Entypo name="bar-graph" size={24} color="#fff" />
        </BackGround>
        <ListText>Product Interest</ListText>
        </ListItem>}
        <ListItem backgroundColor="#e1e5fc" onPress={() => navigation.navigate('Company')}>
        <BackGround>
          <Icon name="business-outline" size={30} color="#fff" />
          </BackGround>
          <ListText>Company Info</ListText>
        </ListItem>
      </ListContainer>
      </ListContainers>
    </AppContainer>
    <PinPopup navigation={onSelect}></PinPopup>
      </>
  )
}
export default HomeScreen;