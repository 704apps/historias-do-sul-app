import axios from "axios";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { API_URL } from "@env";

const ContactUs = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (name === "" || message === "") {
      Alert.alert("Erro", "É necessário preencher todos os campos.");
      return;
    }
    try {
      const form = {
        name: name,
        phone: phone,
        message: message,
      };
     await axios.post(
        `${API_URL}/register`,
        form
      );
      setName("");
      setPhone("");
      setMessage("");
      Alert.alert(
        "Mensagem enviada com sucesso",
        "Sua opiniao é muito importante para nós. Agradecemos por nos ajudar a melhorar o aplicativo."
      );
    } catch (error) {
      Alert.alert("Ocorreu um erro.", "Tente novamente.");
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
      <TextInputMask
        type={"cel-phone"}
        options={{
          maskType: "BRL",
          withDDD: true,
          dddMask: "(99) ",
        }}
        style={styles.input}
        placeholder="Celular"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
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
        disabled={!name || !message}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Enviar</Text>
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
