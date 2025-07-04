import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 

const CartScreen = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState(route.params.cart || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => setShowCheckoutModal(true);

  const confirmCheckout = () => {
    setShowCheckoutModal(false);
    navigation.navigate('Home');
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCartItems(cartItems.filter(i => i.id !== selectedItem.id));
    setShowDeleteModal(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.name}>{item.title}</Text>
        <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>
        <Text style={styles.qty}>Qty: {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>🗑</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#000000', '#1a1a1a', '#0f0f0f']} style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>Cart is empty</Text>}
      />

      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <Text style={styles.total}>Total: ₹ {total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

    
      {showDeleteModal && selectedItem && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Remove Item</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete "{selectedItem.title}" from your cart?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={styles.deleteModalBtn}>
                <Text style={styles.confirmDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

     
      {showCheckoutModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>✅ Order Placed!</Text>
            <Text style={styles.modalMessage}>
              Thank you for your purchase. Your items will be on their way shortly.
            </Text>
            <TouchableOpacity onPress={confirmCheckout} style={styles.checkoutConfirmBtn}>
              <Text style={styles.confirmDeleteText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#000',
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  price: {
    color: '#00e676',
    fontWeight: '600',
  },
  qty: {
    fontSize: 13,
    color: '#aaa',
  },
  deleteBtn: {
    padding: 8,
  },
  deleteText: {
    fontSize: 20,
    color: '#ff5252',
  },
  empty: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#999',
  },
  checkoutContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#222',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  checkoutBtn: {
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteModalBtn: {
    flex: 1,
    backgroundColor: '#ff5252',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmDeleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkoutConfirmBtn: {
    backgroundColor: '#00e676',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
});

export default CartScreen;
