import React from "react";
import { View, Text, Image} from "react-native";

import { SIZES, SHADOWS} from "../constant_s";
import { SubInfo, CardTitle } from "./SubInfo";
import { colors } from "../Styles/appStyle";

const DetailCard = ({colour, title, subTitle, date, dateTitle, imageUrl, imageLabel, status, statusColour, 
                     subInfo}) => {
    
    const cardColour = colour ? colour: colors.primary
    
    return (
        <View
        style={{
          backgroundColor: cardColour,
          borderRadius: SIZES.font,
          marginBottom: SIZES.extraLarge,
          margin: 0,
          ...SHADOWS.dark,
        }}
      >
        <View style={{width: "100%", height:100,}}>
            { imageLabel && (
            <>    
            <Image
              source={{ uri: imageUrl }}
              resizeMode="stretch"
              style={{
                width: "20%",
                height: "70%",
                borderRadius: SIZES.font,
                marginTop:10,
                marginLeft:12,
                borderTopRightRadius: SIZES.font,
              }}
            />
            <Text
                style={{
                    marginTop:5,
                    marginLeft:12,
                    fontWeight:'bold',
                    fontSize:12,
                    color: colors.black,
                  }} >{imageLabel}</Text>
            </>
            )}
         
        </View>    
        {date && (<SubInfo task_date={date}
                            dateTitle={dateTitle}/>)}    
        
        <View style={{ width: "100%", padding: SIZES.font }}>
          
          <CardTitle
            title={title}
            subTitle={subTitle}
            titleSize={SIZES.extraLarge}
            subTitleSize={SIZES.large}
          />

          { subInfo && (
            <Text style={{paddingVertical:10, fontSize:15,}}>{subInfo}</Text>
          )}

          { status && (
            <Text style={{padding:15, fontSize:20, marginTop:10, alignSelf:'center', 
                          color: colors.white, borderRadius:10}}>STATUS - {status}</Text>
          )}
        </View>
      </View>
    );
};

export default DetailCard