import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView,Share  } from 'react-native';
import { Card } from 'react-native-paper';
import { getproductlist } from '../services/productServices';
import Loader from './Loader';

const CatalogueScreen = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(true);
    
    useEffect(() => {
        getproductlist('')
            .then((res) => {
                setProducts(res.data);
                setVisible(false);
            })
            .catch((error) => {
                ToastMsg('Error in fetching product list');
            });
    }, []);

    const categorizedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    const shareProduct = async (item) => {
        try {
          await Share.share({
            message: `Check out this product: ${item.product_name}\n${item.product_url}`,
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      };
    

    const renderItem = ({ item }) => (
        <Card style={styles.card} elevation={3}>
            <TouchableOpacity onPress={() => shareProduct(item)}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardContent}>
                    <Text style={styles.title}>{item.product_name}</Text>
                    <Text style={styles.price}>₹{item.selling_price}</Text>
                </View>
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search products..."
                placeholderTextColor="#aaa"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {Object.keys(categorizedProducts).map((category) => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryHeader}>{category}</Text>
                        <FlatList
                            data={categorizedProducts[category].filter(product =>
                                product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
                            )}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderItem}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                ))}
            </ScrollView>
            <Loader visible={visible} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 15,
    },
    searchBar: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(31, 36, 32)',
        marginBottom: 10,
    },
    card: {
        margin: 5,
        // backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        width: 150,
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ' #333',
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#28a745',
        marginTop: 5,
    },
});

export default CatalogueScreen;
