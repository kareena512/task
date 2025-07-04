import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

export default function Form({ route }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route?.params?.image) {
      setImage(route.params.image);
    }
  }, [route]);

  const validateForm = () => {
    if (!firstName.trim()) return Alert.alert("Validation Error", "First name is required.");
    if (!lastName.trim()) return Alert.alert("Validation Error", "Last name is required.");
    if (!email.trim()) return Alert.alert("Validation Error", "Email is required.");
    if (!/\S+@\S+\.\S+/.test(email)) return Alert.alert("Validation Error", "Invalid email format.");
    if (!phone.trim()) return Alert.alert("Validation Error", "Phone number is required.");
    if (!/^\d{10}$/.test(phone)) return Alert.alert("Validation Error", "Phone must be 10 digits.");
    if (!image) return Alert.alert("Validation Error", "Image is missing.");
    submitData();
  };

//   const submitData = async () => {
//     console.log(firstName,lastName,email,phone,image,"Skksnncsksnkcnlnlsncl")
//     try {
//       setLoading(true);
//       const formData = new FormData();

//       formData.append("first_name", firstName);
//       formData.append("last_name", lastName);
//       formData.append("email", email);
//       formData.append("phone", phone);
//       formData.append("user_image", {
//         uri: image,
//         type: "image/jpeg",
//         name: "user.jpg",
//       });
// console.log(formData,"sknskcnscknsknck")
//       const response = await fetch("http://dev3.xicomtechnologies.com/xttest/savedata.php", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       console.log("Response:", result);

//       if (result.status === "success") {
//         Alert.alert("Success", "User saved successfully!");
//       } else {
//         Alert.alert("Error", result.message || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Failed to submit data.");
//     } finally {
//       setLoading(false);
//     }
//   };


const submitData = async () => {
  try {
    const formData = new FormData();

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);

    formData.append("user_image", {
      uri: image,          
      type: "image/jpeg",  
      name: "user.jpg",    
    });

    const response = await fetch('http://dev3.xicomtechnologies.com/xttest/savedata.php', {
      method: "POST",
      body: formData,
     
    });


    console.log(response,"sjdjfdnfknkf")
    const text = await response.text();

    try {
      const result = JSON.parse(text);
      console.log("Response:", result);

      if (result.status === 'success') {
        Alert.alert("Success", "User saved successfully!");
      } else {
        Alert.alert("Error", result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Invalid JSON from server:", text);
      Alert.alert("Error", "Server returned invalid response.");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to submit data.");
  }
};

  const renderField = (label, value, setValue, placeholder = "") => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {image && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
          </View>
        )}

        <View style={styles.form}>
          {renderField("First Name", firstName, setFirstName)}
          {renderField("Last Name", lastName, setLastName)}
          {renderField("Email", email, setEmail)}
          {renderField("Phone", phone, setPhone)}

          <TouchableOpacity style={styles.button} onPress={validateForm} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  imageWrapper: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
