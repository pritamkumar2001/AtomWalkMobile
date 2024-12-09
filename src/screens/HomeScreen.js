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
  /* height: 40%; */
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

const NotificationIcon = styled(Icon)`
  position: absolute;
  top: 60px;
  right: 20px;
  color: yellow;
  font-size: 25px;
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
`
const TabContainer = styled.View`
  background-color: white;
  margin-top: -25px;
  border-radius: 30px;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 5;
  width: 95%;
`;

const TabItem = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  border-right: 1px solid black;
`;

const TabText = styled.Text`
  color: #0e4fe8;
  margin-top: 5px;

`;
const ListContainers = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
})`
  padding: 20px;
  /* margin-top: 2%; */
`;
const ListContainer = styled.View`
  margin-bottom: 30px;
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
  width: 47%;  // Two items per row with spacing
  /* margin-bottom: 30px; */
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
  const {companyInfo, dbName, userToken} = useContext(AuthContext);
  const [slectedItem, setSelectedItem] = useState(null)
  const {height} = useWindowDimensions();
  const onSelect = () => {
    navigation.navigate('ChangePassword')
  }
  return (
  
      <>
        <StatusBar barStyle="light-content" backgroundColor="#4285f4" />
      <AppContainer>
       <Headers  source={Logo}>
       <ProfileImage 
      source={
      companyInfo && typeof companyInfo?.image === 'string' 
      ? { uri: companyInfo.image }  // Remote image URL
      : Logos  // Local image asset
          }
/>
        <Title>{companyInfo?companyInfo.name:''}</Title>
        {/* <NotificationIcon name="notifications-outline" /> */}
        <WelcomeText>Welcome to Atomwalk Office</WelcomeText>
      </Headers>
      <TbaView>
      {/* <TabContainer>
        <TabItem  onPress={() => navigation.navigate('My Task')}>
          <Icon name="list-outline" size={30} color="#0e4fe8" />
          <TabText>My Task</TabText>
        </TabItem>
        <TabItem onPress={() => navigation.navigate('Todo')}>
          <Icon name="bulb-outline" size={30} color="#0e4fe8" />
          <TabText>To Do</TabText>
        </TabItem>
        <TabItem onPress={() => navigation.navigate('User Task')}>
          <Icon name="create-outline" size={30} color="#0e4fe8" />
          <TabText>User Task</TabText>
        </TabItem>
      </TabContainer> */}
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
        <ListItem2 backgroundColor="#e1e5fc" onPress={() => navigation.navigate('Company')}>
        <BackGround>
          <Icon name="business-outline" size={30} color="#fff" />
          </BackGround>
          <ListText>Company Info</ListText>
        </ListItem2>
      </ListContainer>
      </ListContainers>
    </AppContainer>
    <PinPopup navigation={onSelect}></PinPopup>
      </>
  )
}



export default HomeScreen