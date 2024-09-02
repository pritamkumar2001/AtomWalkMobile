import { View, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import { colors } from '../Styles/appStyle';
import DetailCard from "../components/DetailCard";
import Header from '../components/Header'; 
import { AuthContext } from '../context/AuthContext';


const CompanyInfoScreen = ({ navigation }) => {
    const {companyInfo} = useContext(AuthContext);
    
    const onBackPressed = () => {
        navigation.pop();
    }
    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header label='Company Details'
              image={companyInfo?companyInfo.image:''}
              onPress={onBackPressed}
              icon='arrow-with-circle-left'
            
        />
      
      <View style={{ marginHorizontal:10 }}>
        <DetailCard colour={colors.white}
                    title={companyInfo.name}
                    subTitle={'Web page : ' + companyInfo.web_page }
                    date=''
                    dateTitle='Task Date'
                    imageUrl={companyInfo.image}
                    imageLabel={'DB Name : ' + companyInfo.db_name}
                    subInfo={companyInfo.gstn_number? 'GSTN : ' +  companyInfo.gstn_number: 'GSTN : ' + 'NA'}
                    status=''
                    statusColour={colors.green}
        />

       
      </View> 
    </SafeAreaView>
  );
};

export default CompanyInfoScreen