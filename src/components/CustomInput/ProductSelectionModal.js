import React, { useState } from "react";
import { View, Text, Modal, Image, TouchableOpacity, FlatList, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductSelectionModal = ({ visible, onClose, products }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const toggleSelection = (product) => {
        setSelectedProducts((prev) => {
            if (prev.includes(product.image)) {
                return prev.filter((item) => item !== product.image);
            } else {
                return [...prev, product.image];
            }
        });
    };

    const shareViaWhatsApp = () => {
        if (selectedProducts.length > 0) {
            const selectedItems = products.filter((product) => selectedProducts.includes(product.image));
            
            const message = selectedItems
                .map((product) => `${product.product_name}: ${product.image}`)
                .join("\n");
    
            const url = `https://wa.me/?text=${encodeURIComponent("Check out these products:\n" + message)}`;
            Linking.openURL(url);
        }
    };
    

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: "90%", maxHeight: "80%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Products</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => toggleSelection(item)} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10, borderRadius: 5 }} />
                                <Text>{item.product_name}</Text>
                                {selectedProducts.includes(item.image) && <Ionicons name="checkmark-circle" size={24} color="green" style={{ marginLeft: "auto" }} />}
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity onPress={shareViaWhatsApp} style={{ marginTop: 20, alignSelf: "center" }}>
                        <Ionicons name="share-social" size={30} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ProductSelectionModal;