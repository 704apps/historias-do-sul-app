import axios from "axios";
import { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

const ContactUs = () => {

  const clearForm = () => {
    setMessage("");
    setName("");
  }

  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { user } = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const form = {
        name: name,
        phone: user?.phone || '',
        message: message
       }
       
      await axios.post(`${API_URL}/contact`, form);
      
      Alert.alert("Mensagem enviada com sucesso!", "Sua opiniao é muito importante para nós. Agradecemos por nos ajudar a melhorar o aplicativo.");
      setLoading(false);
      clearForm()
    } catch (error) {      
      setLoading(false);
      Alert.alert("Ocorreu um erro.", "Tente novamente.");
      clearForm();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Queremos ouvir você! Preencha o formulário abaixo e nos conte o que está
        achando do nosso aplicativo.
      </Text>
      <TextInput
        style={[styles.input, styles.marginTop]}
        placeholder="Seu nome"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Mensagem"
        placeholderTextColor="#aaa"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={10}
      />
      <Pressable
        style={[styles.button, (!name || !message) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!name || !message}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Enviar</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#097E79",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
    paddingTop: 24,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
  },
  marginTop: {
    marginTop: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#FFE01D",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});

export default ContactUs;