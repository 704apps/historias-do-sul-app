import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [storyType, setStoryType] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [city, setCity] = useState("");
  const [protagonistNames, setProtagonistNames] = useState("");
  const [parentNames, setParentNames] = useState("");
  const [relativeNames, setRelativeNames] = useState("");
  const [themes, setThemes] = useState("");
  const [familyDeathDetails, setFamilyDeathDetails] = useState("");
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);

  const storyTypeOptions = [
    { key: "1", value: "Fábula Encantada" },
    { key: "2", value: "Aventura no Espaço" },
    { key: "3", value: "História de Super-heróis" },
    { key: "4", value: "Conto de Fadas" },
    { key: "5", value: "História de Animais" },
  ];

  const readingTimeOptions = [
    { key: "5", value: "5" },
    { key: "10", value: "10" },
    { key: "20", value: "20" },
    { key: "30", value: "30" },
    { key: "40", value: "40" },
    { key: "50", value: "50" },
    { key: "60", value: "60" },
    { key: "90", value: "90" },
    { key: "120", value: "120" },
  ];

  const themesOptions = [
    { key: "1", value: "Amizade" },
    { key: "2", value: "Coragem" },
    { key: "3", value: "Família" },
    { key: "4", value: "Aventura" },
    { key: "5", value: "Superação" },
    { key: "6", value: "Magia" },
    { key: "7", value: "Natureza" },
  ];

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserId(parsedUser.id);
        }
      } catch (error) {
        console.error("Erro ao carregar ID do usuário:", error);
      }
    };

    loadUserId();
  }, []);
  //@ts-ignore
  const startChat = async (storyPrompt) => {
    try {
      const api_key = "AIzaSyB-b33_5KyPXKdK-wT_nCPBdf0YoIXJUXc"; 
      //@ts-ignore
      const client = new GoogleGenerativeAI.GenerativeLanguageServiceClient({
        apiKey: api_key,
      });

      const result = await client.generateMessage({
        model: "models/chat-bison-001",
        prompt: {
          messages: [
            {
              author: "user",
              content: storyPrompt,
            },
          ],
        },
      });

      const response = result[0]?.candidates[0]?.content || "Nenhuma resposta gerada";
      console.log(response);
      //@ts-ignore
      setMessages([...messages, response]);
    } catch (error) {
      console.error("Erro ao gerar história:", error);
    }
  };

  const submit = () => {
    if (
      !storyType ||
      !readingTime ||
      !city ||
      !protagonistNames ||
      !parentNames ||
      !relativeNames ||
      !themes ||
      !userId
    ) {
      return Alert.alert("Atenção", "Por favor, preencha todos os campos");
    }

    const storyPrompt = `Crie uma história infantil para contar para crianças de ${readingTime}, os protagonistas são: ${protagonistNames}, e que tenha um direcionamento de aventura e com mensagem explicita de perseverança, amor e esperança, que aconteça em um cenário de ${storyType}, inclua como personagens ${relativeNames} que são familiares das crianças na historia para envolve-la, use sempre como atores principais ${protagonistNames}, a aventura deve passar na cidade de ${city}, que atualmente na vida real esta sofrente com uma catástrofe ambiental, alagementos, quedas de pontes e destruição de tudo que era tão lindo antes, fazendo muitas vítimas fatais, muitas parentes e familiáres das crianças e outras centenas perderam suas casas e estão em abrigos, como igrejas, escolas e locais improvisados. Trate tudo com muito carinho e passe a mensagem de perseverança, que os pais destas crianças são fortes e vão reconstruir tudo , ainda melhor e mais bonito, que os pais tem muito orgulho das crianças, que eles estando ali perto dos pais são a energia e força que os pais precisam para reconstruir. Fale da humanidade, da beleza das pessoas em ajudar, que o Brasil esta todos torcendo para que o rio grande do sul retorne mais maravilhoso que era antes.`;

    startChat(storyPrompt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Tipo de história</Text>
        <View style={styles.selectContainer}>
          <SelectList
            setSelected={(value: string) => setStoryType(value)}
            data={storyTypeOptions}
            placeholder="Selecione o tipo de história"
            search={false}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
            inputStyles={styles.selectInput}
            dropdownTextStyles={styles.dropdownText}
          />
        </View>

        <Text style={styles.label}>Tempo de leitura (Min.)</Text>
        <View style={styles.selectContainer}>
          <SelectList
            setSelected={(value: string) => setReadingTime(value)}
            data={readingTimeOptions}
            placeholder="Selecione o tempo de leitura"
            search={false}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
            inputStyles={styles.selectInput}
            dropdownTextStyles={styles.dropdownText}
          />
        </View>

        <Text style={styles.label}>Digite o nome da sua Cidade</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholder="Digite o nome da sua Cidade"
            placeholderTextColor="#B0B0C3"
          />
        </View>

        <Text style={styles.label}>
          Digite o nome das Crianças protagonistas
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={protagonistNames}
            onChangeText={(text) => setProtagonistNames(text)}
            placeholder="Nome das Crianças protagonistas"
            placeholderTextColor="#B0B0C3"
          />
        </View>

        <Text style={styles.label}>Digite o nome dos Pais</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={parentNames}
            onChangeText={(text) => setParentNames(text)}
            placeholder="Nome dos Pais"
            placeholderTextColor="#B0B0C3"
          />
        </View>

        <Text style={styles.label}>
          Digite o nome dos Irmãos e parentes maiores
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={relativeNames}
            onChangeText={(text) => setRelativeNames(text)}
            placeholder="Nome dos Irmãos e parentes maiores"
            placeholderTextColor="#B0B0C3"
          />
        </View>

        <Text style={styles.label}>Temas para incluir</Text>
        <View style={styles.selectContainer}>
          <SelectList
            setSelected={(value: string) => setThemes(value)}
            data={themesOptions}
            placeholder="Selecione os temas"
            search={false}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
            inputStyles={styles.selectInput}
            dropdownTextStyles={styles.dropdownText}
          />
        </View>

        <Text style={styles.label}>
          Se houve morte na família e quiser incluir no contexto, use este
          campo.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={familyDeathDetails}
            onChangeText={(text) => setFamilyDeathDetails(text)}
            placeholder="Detalhes sobre morte na família"
            placeholderTextColor="#B0B0C3"
          />
        </View>

        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Gerar História</Text>
        </Pressable>

        <View style={styles.responseContainer}>
          {messages.map((message, index) => (
            <Text key={index} style={styles.responseText}>
              {message}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#B0B0C3",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  selectContainer: {
    marginBottom: 16,
  },
  selectBox: {
    borderColor: "#B0B0C3",
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderColor: "#B0B0C3",
  },
  selectInput: {
    color: "#000000",
  },
  dropdownText: {
    color: "#000000",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  responseContainer: {
    marginTop: 20,
  },
  responseText: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
  },
});

export default Create;