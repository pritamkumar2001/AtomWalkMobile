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
const AppContainer =  styled.View`
  flex: 1;
  background-color: #f5f5f5;

`;

const Headers = styled(ImageBackground)`
  background-color: #0e4fe8;
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

const ListContainer = styled.View`
  padding: 20px;
  margin-top: 5%;
`;

const ListItem = styled(TouchableOpacity)`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  elevation: 3;
`;

const ListText = styled.Text`
  margin-left: 15px;
  font-size: 16px;
  color: #333;
`;

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
  
      <>
        <StatusBar barStyle="light-content" backgroundColor="#0e4fe8" />
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
        <NotificationIcon name="notifications-outline" />
        <WelcomeText>Welcome to Atomwalk Office</WelcomeText>
      </Headers>
      <TbaView>
      <TabContainer>
        <TabItem onPress={() => navigation.navigate('Task')}>
          <Icon name="checkbox-outline" size={30} color="#0e4fe8" />
          <TabText>Task</TabText>
        </TabItem>
        <TabItem onPress={() => navigation.navigate('Todo')}>
          <Icon name="bulb-outline" size={30} color="#0e4fe8" />
          <TabText>To Do</TabText>
        </TabItem>
        <TabItem onPress={() => navigation.navigate('Profile')}>
          <Icon name="person-outline" size={30} color="#0e4fe8" />
          <TabText>Profile</TabText>
        </TabItem>
      </TabContainer>
      </TbaView>
      <ListContainer>
        <ListItem  onPress={() => navigation.navigate('CustomerScreen')}>
          <Icon name="people-outline" size={30} color="#0e4fe8" />
          <ListText>My Customers</ListText>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('LeadScreen')}>
          <Icon name="trending-up-outline" size={30} color="#0e4fe8" />
          <ListText>My Leads</ListText>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('OrderList', {cust_id:'', cust_name:''})}>
          <Icon name="file-tray-full-outline" size={30} color="#0e4fe8" />
          <ListText>Invoice Status</ListText>
        </ListItem>
        <ListItem onPress={() => navigation.navigate('Company')}>
          <Icon name="business-outline" size={30} color="#0e4fe8" />
          <ListText>Company Info</ListText>
        </ListItem>
      </ListContainer>
    </AppContainer>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    // borderRightColor:"#000",
    // borderWidth: 1, // Border width of 2 pixels
    // borderColor: '#000', // Border color blac
    // borderStyle: 'solid', // Solid border style
    // border
  },
}) 

export default HomeScreen