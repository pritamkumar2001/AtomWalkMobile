import { View, SafeAreaView} from 'react-native';
import {React, useState} from 'react';
import { colors } from '../../Styles/appStyle';
import  Loader  from '../../components/Loader';
import DetailCard from "../../components/DetailCard";
import CustomButton from '../../components/CustomButton';
import Header from '../../components/Header'; 


const TaskDetailScreen = ({route, navigation}) => {
    // console.log('PARAMS', route.params)
    const [loading, setLoading] = useState(false);
    const data = route.params.data
    const screen = route.params.screen
    
    const onBackPressed = () => {
        navigation.pop();
    }

    
    const handleUpadteTask = () => {
      if (screen == 'TaskDetail'){
        navigation.navigate('UpdateTask',  
                            {id: data.id, name: data.name, task_type: data.task_type, task_date: data.task_date, 
                             start_time: data.start_time, remarks: data.remarks, screen: screen, callMode: 'Update'});
      }
      else if (screen == 'CustTaskDetail' || screen == 'LeadTaskDetail' ){
        navigation.navigate('CustUpdateTask',  
                            {id: data.id, name: data.name, task_type: data.task_type, task_date: data.task_date, 
                             start_time: data.start_time, remarks: data.remarks, screen: screen, callMode: 'Update'});
      }
      else {
        console.log('NOT VALID Screen');
      }

    }

    const handleAssignUser = () => {
      // console.log('Screen name', screen, data);
      if (screen == 'TaskDetail'){
        navigation.navigate('UpdateTask',  
                            {id: data.id, name: data.name, task_type: data.task_type, task_date: data.task_date, 
                              curr_user: data.curr_user? data.curr_user.id:'', remarks: data.remarks, 
                              screen: screen, callMode: 'AssignUser'});
      }
      else if (screen == 'CustTaskDetail' || screen == 'LeadTaskDetail'){
        navigation.navigate('CustUpdateTask',  
                            {id: data.id, name: data.name, task_type: data.task_type, task_date: data.task_date, 
                             curr_user: data.curr_user? data.curr_user.id:'', remarks: data.remarks, 
                             screen: screen, callMode: 'AssignUser'});
      }
      else {
        console.log('NOT VALID Screen');
      }

    }

    const handleMarkComplete = () => {
      // console.log('handleMarkComplete', screen);
      if (screen == 'TaskDetail'){
        navigation.navigate('UpdateTask',  
                            {id: data.id, name: data.name, task_type: data.task_type, task_date: data.task_date, 
                             start_time: data.start_time, remarks: data.remarks, screen: screen, callMode: 'MarkCompleted'});
      }else if (screen == 'CustTaskDetail' || screen == 'LeadTaskDetail'){
        navigation.navigate('CustUpdateTask',  
                            {id: data.id, name: data.name, task_type: data.task_type, task_date: data.task_date, 
                             start_time: data.start_time, remarks: data.remarks, screen: screen, callMode: 'MarkCompleted'});
      }
      else {
        console.log('NOT VALID Screen');
      }

    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader visible={loading} /> 
      <Header 
            label='Task Details'
            image=''
            icon='arrow-with-circle-left'
            onPress={onBackPressed}
            subTitle={data.name}
            
      />

      <View style={{ marginHorizontal:10 }}>
        <DetailCard colour={colors.grey}
                    title={data.customer?'Customer : ' + data.customer.name:data.lead ? 'Lead :' + data.lead.name:data.name}
                    subTitle={data.start_time? 'Task :' + data.task_type_display + ' [ START : ' + data.start_time + ' ]' :'Task :' + data.task_type_display}
                    date={data.task_date}
                    dateTitle='Task Date'
                    imageUrl={data.curr_user? data.curr_user.image: data.owner.image }
                    imageLabel={data.curr_user? data.curr_user.user_name: data.owner.user_name }
                    subInfo={data.remarks}
                    status={data.task_status}
                    statusColour={(data.task_status == 'Completed')? colors.green:colors.secondary}
        />

      <CustomButton 
            onPress={handleUpadteTask} 
            text={'Update Task'} 
            bgColor={colors.secondary}
            icon='edit'
        /> 
      <CustomButton 
            onPress={handleMarkComplete} 
            text={'Mark Completed'} 
            bgColor={colors.green}
            icon='done-all'
        /> 

      <CustomButton 
            onPress={handleAssignUser} 
            text={'Assign To User'} 
            bgColor={colors.red}
            icon='assignment-ind'
        /> 
      </View> 
    </SafeAreaView>
  );
};

export default TaskDetailScreen