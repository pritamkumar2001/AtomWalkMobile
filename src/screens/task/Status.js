import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import Header from "../../components/Header";
import { getTaskInterest } from "../../services/productServices";

const Status = ({ navigation }) => {
  const [leads, setLeads] = useState([]);
  useEffect(() => {
    getTaskInterest()
      .then((res) => {
        const validLeads = res.data.filter((lead) => lead.lead_id); // Filter only leads with lead_id
        setLeads(validLeads);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);
  // Safe function to ensure numeric values
const safeNumber = (value) => (isNaN(value) || value == null ? 0 : Number(value));
// Aggregate category data
const categoryCount = leads.reduce((acc, lead) => {
  const categoryName = lead.category?.name;
  if (categoryName) {
    acc[categoryName] = safeNumber(acc[categoryName]) + 1;
  }
  return acc;
}, {});
// Get Top 5 Categories
const sortedCategories = Object.entries(categoryCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);
  const categoryLabels = sortedCategories.map(([name]) =>
    name.length > 7 ? `${name.toUpperCase().slice(0, 6)}...` : name.toUpperCase()
  );
  
const categoryValues = sortedCategories.map(([_, count]) => safeNumber(count));
const totalCategoryCount = categoryValues.reduce((sum, count) => sum + count, 0);
// Prepare data for Pie Chart (with percentage and validation)
const pieData = sortedCategories.map(([name, count], index) => ({
  
  name: `${name.length > 15 ?`${name.toUpperCase().slice(0, 15)}...`:name.toUpperCase()}(${((count / totalCategoryCount) * 100).toFixed(1)}%)`,
  population: safeNumber(count),
  color: ["#f39c12", "#3498db", "#e74c3c", "#2ecc71", "#9b59b6"][index % 5],
  legendFontColor: "#000",
  legendFontSize: 9,
}));

 // Aggregate data based on variation_value
 const variationCount = leads.reduce((acc, lead) => {
  const variation = lead.variation_value || "Unknown"; // Default to "Unknown" if no value
  acc[variation] = (acc[variation] || 0) + 1; // Count occurrences
  return acc;
}, {});

// Prepare data for the Pie Chart
const totalVariations = Object.values(variationCount).reduce((sum, count) => sum + count, 0);
const productPieData = Object.entries(variationCount).map(([variation, count], index) => ({
  name: `${variation.length > 15 ?`${variation.toUpperCase().slice(0, 15)}...`:variation.toUpperCase()} (${((count / totalVariations) * 100).toFixed(1)}%)`, // Show percentage
  population: count,
  color: ["#f39c12", "#3498db", "#e74c3c", "#2ecc71", "#9b59b6"][index % 5], // Rotate colors
  legendFontColor: "#000",
  legendFontSize: 9,
}));
  const onBackPressed = () => {
    navigation.pop();
  };
  return (
    <>
      <Header
        label="Lead Product Interest"
        image=""
        onPress={onBackPressed}
        icon="arrow-with-circle-left"
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Bar Chart */}
        <Text style={styles.chartTitle}>Category-wise Product Interest (Bar Chart)</Text>
        <BarChart
          data={{
            labels: categoryLabels,
            datasets: [{ data: categoryValues }],
          }}
          width={Dimensions.get("window").width - 40} // Full width minus some padding
          height={220}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
        {/* Pie Chart */}
        <Text style={styles.chartTitle}>Category-wise Product Interest (Pie Chart)</Text>
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width - 40} // Full width minus some padding
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          // paddingLeft={"15"}
          absolute // Show values as absolute numbers
        />
        <Text style={styles.chartTitle}>Top Product Interest (Pie Chart)</Text>
        <PieChart
          data={productPieData}
          width={Dimensions.get("window").width - 40} // Full width minus some padding
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          // paddingLeft={"15"}
          absolute // Show values as absolute numbers
        />
        {/* Lead List */}
        <Text style={styles.listTitle}>Lead Product Interest Data</Text>
        <FlatList
          data={leads}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.leadName}>{item.id ? `Lead ID: ${item.id}` : "No ID"}</Text>
              <Text style={styles.leadCategory}>
                {item.category?.name || "No Category"}
              </Text>
            </View>
          )}
        />
      </ScrollView>
    </>
  );
};
export default Status;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingLeft: 20,
      paddingRight: 10,
     
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    chartTitle: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10,
    },
    chart: {
      marginBottom: 20,
    },
    listTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    listItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    leadName: {
      fontSize: 16,
    },
    leadCar: {
      fontSize: 16,
      fontWeight: "bold",
    },
  });