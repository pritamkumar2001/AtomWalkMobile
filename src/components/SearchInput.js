import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../Styles/appStyle';
import Feather from 'react-native-vector-icons/Feather';

const SearchInput = ({ label, serachFilter,data }) => {
  const [serachText, setSearchText] = useState('');
useEffect(() => {setSearchText(data)}, [data]);
  const handleOnChange = (text) => {
    serachFilter(text);
    setSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');
    serachFilter(''); // Clear the search filte
  };

  return (
    <View style={style.inputContainer}>
      <Feather
        name="search"
        size={25}
        color={colors.grey}
        style={{ marginRight: 10 }}
      />
      <TextInput
        style={{ flex: 1 }} // Use flex for input width
        placeholder={label}
        value={serachText}
        onChangeText={(text) => handleOnChange(text)}
      />
      {serachText&&serachText.length > 0 && ( // Show clear button only if there's text
        <TouchableOpacity onPress={clearSearch}>
          <Feather name="x-circle" size={30} color={colors.grey} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.navyblue,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
});

export default SearchInput;
