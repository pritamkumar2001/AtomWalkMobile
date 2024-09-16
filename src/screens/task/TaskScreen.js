import { View, SafeAreaView, FlatList, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getUserTasks } from '../../services/productServices';
import CardItem from '../../components/CardItem';
import CustomButton from '../../components/CustomButton';
import { COLORS } from "../../constant_s";
import Header from '../../components/Header'; 
import { colors } from '../../Styles/appStyle';
import  Loader  from '../../components/Loader';
import SearchInput from '../../components/SearchInput';
import { ButtonGroup } from '@rneui/themed';


const TaskScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(route.name);
  useEffect(() => {
    getTask(selectedIndex)
  }, [route.params?.refresh]);

  const onTaskAddPressed = () => {
    navigation.navigate("AddTask", {'task':''});
  }

  const getTask = (value) => {
    let task_type =route.name=="MTaskSreen"?"MANAGER_ALL":'ALL';
    if (value == 0){
      task_type = route.name=="MTaskSreen"?'MANAGER_M0':'D0';
    }else if (value == 1){
      task_type = route.name=="MTaskSreen"?'MANAGER_M3':'D3';
    }else if (value == 2){
      task_type = route.name=="MTaskSreen"?'MANAGER_PAST':'PAST'
    }

    setLoading(true);
    getUserTasks(task_type, '', '').then((res) => {
      setData(res.data);
      setFilterData(res.data);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false)
    });
  }

  const handleIconPress = (data) => {
    navigation.navigate('UpdateTask',  
                          {id: data.id, name: data.name, task_type: data.task_type, task_date: data.task_date, 
                            curr_user: data.curr_user? data.curr_user.id:'', remarks: data.remarks, 
                            screen: 'TaskDetail', callMode: 'AssignUser'});
    
  }

  const handleIconName1Press = (data) => {
    navigation.navigate('TaskDetail', {data: data, screen: 'TaskDetail', isFetch: route.params?.isFetch });
  }
  
  const serchFilter = (text) => { 
    if (text) {
        const newData = data.filter((item) => {
            const itemData = item.name ? item.name.toUpperCase()
                            : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;    
        });
        setFilterData(newData);
    } else{
        setFilterData(data);
    }
}

  // console.log(data)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader visible={loading} /> 
      <Header 
            label={route.name=="MTaskSreen"?'User Tasks':'My Tasks'  + ' (' + filterData.length +')'}
            image=''
            icon='squared-plus'
            onPress={onTaskAddPressed}
      />     
      <ButtonGroup
        buttons={['TODAY', 'NEXT 3', 'PAST', 'ALL']}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
          getTask(value);
        }}
        buttonStyle={{
          backgroundColor: colors.white,
          borderColor: '#454545',
          borderWidth: 1,
          borderRadius: 25,
        }}
        containerStyle={{
          marginBottom: 10,
          marginHorizontal: 10,
          backgroundColor: 'transparent',
          borderWidth: 0,           
          borderColor: 'transparent',
          gap:1 
        }}
        selectedButtonStyle={{backgroundColor: '#4491FE'}}
        buttonContainerStyle={{borderColor: 'transparent', borderWidth: 0,}}
      />
      <SearchInput label='Search ...'
                     serachFilter={serchFilter}
      />
    <View style={{ flex: 1}}>
      <View style={{ zIndex: 0 }}>
        <FlatList
        style={{backgroundColor:'#f2f2f2'}}
          data={filterData}
          renderItem={({ item }) => <CardItem data={item} 
                                              navigation={navigation} 
                                              colour={colors.blue}
                                              icon='assignment-ind'
                                              handleIconPress={handleIconPress}
                                              handleDisplayPress={()=>{}}
                                              buttonTittle='Product Interest'
                                              screen='TaskInterest'
                                              iconName1='preview' 
                                              handleIconName1Press={handleIconName1Press}
                                              />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        { filterData.length > 0 && (    
          <View style={{ height: 260, backgroundColor: "#f2f2f2" }} />
          
          )}
        { filterData.length == 0 && (   
          <> 
          <View style={{ height: '100%', backgroundColor: 'transparent', alignItems:'center', display:"flex",justifyContent:'center'}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop:15, color:colors.red}}> No records found ! </Text>
          </View>
          </>
          )}
      
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }} />
      </View>
         
    </View>
    <CustomButton 
            onPress={() => navigation.navigate("AddTask", {'task':''})} 
            text={'Add Task'} 
            bgColor={'#4491FE'} />  
  </SafeAreaView>
  );
    
}

export default TaskScreen