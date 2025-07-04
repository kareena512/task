import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TextView from '../Components/TextView';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product, cart = [] } = route.params;

  const handleAddToCart = () => {
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    navigation.navigate('Cart', { cart: updatedCart });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <TextView
          text={product.title}
          fontSize={20}
          fontWeight="700"
          color="#fff"
          marginBottom={10}
        />

        <TextView
          text={`₹ ${product.price}`}
          fontSize={18}
          fontWeight="600"
          color="#00e676"
          marginBottom={15}
        />

        <TextView
          text={product.description}
          fontSize={14}
          color="#ccc"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <TextView
            text="Add to Cart"
            fontSize={16}
            fontWeight="600"
            color="#fff"
            alignSelf="center"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#111',
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#222',
  },
  button: {
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
});
