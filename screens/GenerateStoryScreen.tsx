import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY = "AIzaSyDfhbwBqdhDlUGV7lCOb4jDd1uFV_Z2C6A"
const genAI = new GoogleGenerativeAI(API_KEY);

const GenerateStoryScreen = () => {
  const [uploading, setUploading] = useState(false);
  const [storyType, setStoryType] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [city, setCity] = useState("");
  const [protagonistNames, setProtagonistNames] = useState("");
  const [parentNames, setParentNames] = useState("");
  const [relativeNames, setRelativeNames] = useState("");
  const [themes, setThemes] = useState("");
  const [familyDeathDetails, setFamilyDeathDetails] = useState("");
  const [generatedStory, setGeneratedStory] = useState(""); 
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (
      !storyType ||
      !readingTime ||
      !city ||
      !protagonistNames ||
      !parentNames ||
      !relativeNames ||
      !themes
    ) {
      return Alert.alert("Atenção", "Por favor, preencha todos os campos");
    }

    setUploading(true);
    try {
      Alert.alert("Aguarde", "Sua história está sendo criada");

      const prompt = `Crie uma história infantil para contar para crianças de ${readingTime} minutos, os protagonistas são: ${protagonistNames}, e que tenha um direcionamento de aventura e com mensagem explicita de perseverança, amor e esperança, que aconteça em um cenário de ${storyTypeValues}, inclua como personagens ${relativeNames} que são familiares das crianças na historia para envolve-la, use sempre como atores principais ${protagonistNames}, a aventura deve passar na cidade de ${city}, que atualmente na vida real esta sofrente com uma catástrofe ambiental, alagamentos, quedas de pontes e destruição de tudo que era tão lindo antes, fazendo muitas vítimas fatais, muitos parentes e familiares das crianças e outras centenas perderam suas casas e estão em abrigos, como igrejas, escolas e locais improvisados. Trate tudo com muito carinho e passe a mensagem de perseverança, que os pais destas crianças são fortes e vão reconstruir tudo, ainda melhor e mais bonito, que os pais tem muito orgulho das crianças, que eles estando ali perto dos pais são a energia e força que os pais precisam para reconstruir. Fale da humanidade, da beleza das pessoas em ajudar, que o Brasil esta todos torcendo para que o Rio Grande do Sul retorne mais maravilhoso do que era antes. ${familyDeathDetails ? `Inclua no contexto também ${familyDeathDetails}. ` : ""}`;
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setGeneratedStory(text); 
    } catch (error) {
      Alert.alert("Error", "Aconteceu um erro ao criar a história");
    } finally {
      setStoryType("");
      setReadingTime("");
      setCity("");
      setProtagonistNames("");
      setParentNames("");
      setRelativeNames("");
      setThemes("");
      setFamilyDeathDetails("");
      setUploading(false);
    }
  };

  const storyTypeOptions = [
    { key: "1", value: "Fábula Encantada" },
    { key: "2", value: "Aventura no Espaço" },
    { key: "3", value: "História de Super-heróis" },
    { key: "4", value: "Conto de Fadas" },
    { key: "5", value: "História de Animais" },
  ];

  const storyTypeValues = storyTypeOptions.map((storyType) => storyType.value);

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

        <Text style={styles.note}>
          Cuidado ao usar este campo, não deve ser usado sem acompanhamento do
          responsável
        </Text>
        <Text style={styles.note}>
          Estas histórias são geradas pela IA Gemini Google e como toda IA pode
          conter desvios de objetivos, por isso deve ser lida e validada antes
          de usar.
        </Text>

        <Pressable
          style={[styles.button, uploading && styles.buttonDisabled]}
          onPress={submit}
          disabled={uploading}
        >
         {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Gerar História</Text>
          )}
        </Pressable>
        {generatedStory && (
        <View >
          <Text>{generatedStory}</Text>
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#097E79",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#ddd",
    marginTop: 16,
  },
  selectContainer: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#13403e",
    backgroundColor: "#13403e",
    marginTop: 8,
  },
  selectBox: {
    borderRadius: 14,
    backgroundColor: "#13403e",
    borderColor: "#13403e",
    height: 50,
  },
  dropdown: {
    backgroundColor: "#13403e",
    borderColor: "#13403e",
    marginTop: 0,
    paddingTop: 0,
  },
  selectInput: {
    color: "#E0E0E0",
    fontWeight: "bold",
    fontSize: 18,
    height: 50,
  },
  dropdownText: {
    color: "#E0E0E0",
    fontSize: 16,
    padding: 10,
  },
  inputContainer: {
    backgroundColor: "#13403e",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#13403e",
    marginTop: 8,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    color: "#E0E0E0",
    fontWeight: "bold",
    fontSize: 18,
  },
  note: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#009E95",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: "#007E75",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default GenerateStoryScreen;
