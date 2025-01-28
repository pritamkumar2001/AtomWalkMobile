import { View, FlatList, SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header'; 
import CardItem from '../../components/CardItem';
import SearchInput from '../../components/SearchInput';
import ToastMsg from '../../components/ToastMsg';
import { colors } from '../../Styles/appStyle';
import  Loader  from '../../components/Loader';
import { getCustomerDetailList } from '../../services/productServices';


const CustomerScreen = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);
    const [filterCustomers, setFilterCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(filterCustomers,"loopdata")
    useEffect(() => {
        setLoading(true)
        getCustomerDetailList()
        .then((res) => {
            setCustomers(res.data);
            setFilterCustomers(res.data);
            setLoading(false);
        })
        .catch((error) => {
            // console.log('error', error);
            setLoading(false);
        });
    }, []);

    const onBackPressed = () => {
        navigation.pop();
    }

    const handleTaskPressed = (item) => {
        navigation.navigate("AddCustomerTask", {customer_id: item.id, selected_type: 'C', },)
    }

    const handleViewOrders = (item) => {
        navigation.navigate("OrderList", {cust_id: item.data.id, cust_name: item.data.name, },)
    }


    const serchFilter = (text) => { 
        if (text) {
            const newData = customers.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase()
                                : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;    
            });
            setFilterCustomers(newData);
        } else{
            setFilterCustomers(customers);
        }
    }

  return (
        <SafeAreaView style={{ flex: 1, marginBottom:20}}>
        <Loader visible={loading} />    
        <Header 
            label={'My Customers'  + ' (' + filterCustomers.length +')'}
            image=''
            icon='arrow-left'
            onPress={onBackPressed}
        />
        <SearchInput label='Search Company Name ...'
                     serachFilter={serchFilter}
        />                
        
        <View style={{ flex: 1 }}>
            <View style={{ zIndex: 0}}>
            <FlatList
                data={filterCustomers}
                renderItem={({ item }) => <CardItem data={item} 
                                              navigation={navigation} 
                                              screen='CustomerTasks'
                                              isAmtApplicable={true}
                                              handleIconPress={handleTaskPressed}
                                              handleDisplayPress={ handleViewOrders }
                                              icon='add-task'
                                              buttonTittle='Task list'
                                              pilength={item.no_of_task}/>}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
            </View>
            <View style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: -1,}}>
                <View style={{ height: 236, backgroundColor: '#fffff' }} />
                <View style={{ flex: 1, backgroundColor: '#fffff' }} />
            </View>
      
        </View>
    </SafeAreaView>  
      
    )
  
}

export default CustomerScreen