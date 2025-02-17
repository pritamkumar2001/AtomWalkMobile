import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CATALOGUE_DATA = [
  {
    category: "Mercedes",
    cars: [
      {
        id: "1",
        name: "Mercedes C220d AT",
        price: "₹2,795,000.00",
        image: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Safari/11265/1697533880503/front-left-side-47.jpg?impolicy=resize&imwidth=420",    
      },
      {
        id: "2",
        name: "Mercedes GLE 250d",
        price: "₹2,950,000.00",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOsQgOKrn_Qf4OMVjI0dU75e_hZlgEiUnKg&s",
      },
      {
        id: "3",
        name: "Mercedes A180 AT",
        price: "₹1,550,000.00",
        image: "https://static.toiimg.com/photo/80387978.cms",
      },
    ],
  },
  {
    category: "Audi",
    cars: [
      {
        id: "4",
        name: "Audi A4 premium plus",
        price: "₹1,550,000.00",
        image: "https://example.com/audi_a4.jpg",
      },
    ],
  },
];

const CatalogueScreen = () => {
  const renderCarItem = ({ item }) => (
    <View style={styles.carItem}>
      <Image source={{ uri: item.image }} style={styles.carImage} />
      <View style={styles.carDetails}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/M5-2025/11821/1719462197562/front-left-side-47.jpg?impolicy=resize&imwidth=480" }}
          style={styles.headerImage}
        />
        <Text style={styles.title}>Abhishek Olety</Text>
        <Text style={styles.subtitle}>Olety Carz Pvt Ltd (Used Automobile Showroom)</Text>
      </View>

      {/* Catalogue List */}
      {CATALOGUE_DATA.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={category.cars}
            keyExtractor={(item) => item.id}
            renderItem={renderCarItem}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f3f3f3",
  },
  headerImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  categoryContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllButton: {
    backgroundColor: "#DFFFD6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  seeAllText: {
    color: "#006400",
    fontWeight: "bold",
  },
  carItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  carImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  carDetails: {
    flex: 1,
    marginLeft: 10,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  carPrice: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#F3F3F3",
    padding: 8,
    borderRadius: 5,
  },
});

export default CatalogueScreen;
