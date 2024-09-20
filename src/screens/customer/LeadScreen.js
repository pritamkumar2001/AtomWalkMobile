import { View, FlatList, SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header'; 
import SmallCard from '../../components/SmallCard';
import SearchInput from '../../components/SearchInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import ToastMsg from '../../components/ToastMsg';
import  Loader  from '../../components/Loader';
import { getLeadDataList } from '../../services/productServices';
import { colors } from '../../Styles/appStyle';


const LeadScreen = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);
    const [filterCustomers, setFilterCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isStatusUpdated, setIsStatusUpdated] = useState(false);

    useEffect(() => {
        setLoading(true)
        getLeadDataList('')
        .then((res) => {
            setCustomers(res.data);
            setFilterCustomers(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
        });
    }, [isStatusUpdated]);

    const onBackPressed = () => {
        navigation.pop();
    }

    const handleTaskPressed = (item) => {
        navigation.navigate("AddCustomerTask", {customer_id: item.id, selected_type: 'L', },)
    }

    const handleInterestPressed = (item) => {

        // console.log('handleInterestPressed', item)
        navigation.navigate('ProductInterest',  {task_id: '', customer_id:'', lead_id: item.id, 
                                                 screen: 'ProductInterest', name: item.name, task_name: '',
                                                 call_mode: 'L'});
    }

    const handleStatusPressed = (item) => {
        // console.log('handleStatusPressed', item)
        setIsStatusUpdated(true)
        navigation.navigate('LeadStatus',  {data: item});
    
    }

    const serchFilter = (text) => {
        if (text.startsWith('S:')){
            const newData = customers.filter((item) => {
                const itemData = item.status_display.toUpperCase() ;
                const textData = text.substr(2).toUpperCase();
                return itemData.indexOf(textData) > -1;    
            });
            setFilterCustomers(newData);
        } 
        else if (text) {
            const newData = customers.filter((item) => {
                const itemData = item.company_name ? item.company_name.toUpperCase() + item.name.toUpperCase() + ' ' + item.mobile_number
                                : item.name.toUpperCase() + ' ' + item.mobile_number;
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;    
            });
            setFilterCustomers(newData);
        } else{
            setFilterCustomers(customers);
        }
    }

  return (
        <SafeAreaView style={{ flex: 1, marginBottom:0}}>
        <Loader visible={loading} />    
        <Header 
            label={'My Leads'  + ' (' + filterCustomers.length +')'}
            image=''
            icon='arrow-left'
            onPress={onBackPressed}
        />
        <SearchInput label='Search lead/company/mobile/S:status ...'
                     serachFilter={serchFilter}
        />                
        
        <View style={{ flex: 1 }}>
            <View style={{ zIndex: 0}}>
            <FlatList
                data={filterCustomers}
                renderItem={({ item }) => <SmallCard 
                                                data={item} 
                                                navigation={navigation} 
                                                colour={"#fff9cc"}
                                                title={item.company_name? item.company_name + ' [' + item.name + ']' : item.name}
                                                subTitle={item.mobile_number? 'M: ' + item.mobile_number : 'Email: ' + item.email_id}
                                                date={item.qualified_date? item.qualified_date: item.record_date}
                                                dateColour={item.qualified_date? colors.green: colors.black}
                                                dateTitle={ item.status_display}
                                                buttonTittle='Task list'
                                                buttonScreen='LeadTasks'
                                                iconName='add-task'
                                                text1='Task'
                                                iconName2='view-list'
                                                text2='Interest'
                                                iconScreen=''
                                                callMode='L'
                                                screen='LeadTasks'
                                                handleIcon={handleTaskPressed}
                                                handleIcon2={handleInterestPressed}
                                                handleInfo={handleStatusPressed}
                                                 />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </View>
        <CustomButton 
            onPress={() => navigation.navigate("AddNewLead", {'task':null})} 
            text={'New Lead'} 
            bgColor={"#4491FE"} />
    </SafeAreaView>  
      
    )
  
}

export default LeadScreen