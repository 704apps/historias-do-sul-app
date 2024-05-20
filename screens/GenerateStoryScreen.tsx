import React, { useContext, useState } from "react";
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
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { GeneratorContext } from "../context/GeneratorContext";

// const API_KEY = "AIzaSyDfhbwBqdhDlUGV7lCOb4jDd1uFV_Z2C6A";
// const genAI = new GoogleGenerativeAI(API_KEY);

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
  // const [generatedStory, setGeneratedStory] = useState("");
  // const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const {generatedStory, generateStory} = useContext(GeneratorContext)

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
      const promptProps = {
        storyType,
        readingTime,
        city,
        protagonistNames,
        parentNames,
        relativeNames,
        themes,
        familyDeathDetails,
        age: '10'
      }
      
      generateStory(promptProps);

      // setGeneratedStory(text); 
      // const postStory = {
      //   content: text,
      //   userId: user?.id
      // }
      // await axios.post("https://api.historias-do-sul.zap704.com.br/generate-story", postStory)
    } catch (error) {
      Alert.alert("Error", "Aconteceu um erro ao criar a história");
    } finally {
      setUploading(false);
    }
  };

  const storyTypeOptions = [
    {value: "Fábula Encantada" },
    {value: "Aventura no Espaço" },
    {value: "História de Super-heróis" },
    {value: "Conto de Fadas" },
    {value: "História de Animais" },
  ];

  const readingTimeOptions = [
    {value: "5" },
    {value: "10" },
    {value: "20" },
    {value: "30" },
    {value: "40" },
    {value: "50" },
    {value: "60" },
    {value: "90" },
    {value: "120" },
  ];

  const themesOptions = [
    { value: "Amizade" },
    { value: "Coragem" },
    { value: "Família" },
    { value: "Aventura" },
    { value: "Superação" },
    { value: "Magia" },
    { value: "Natureza" },
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
            search={true}
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
          {uploading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Gerar História</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  selectContainer: {
    marginBottom: 16,
  },
  selectBox: {
    borderColor: "#DDD",
    backgroundColor: "#FFF",
  },
  dropdown: {
    backgroundColor: "#FFF",
  },
  selectInput: {
    color: "#333",
  },
  dropdownText: {
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  generatedStoryContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  generatedStory: {
    fontSize: 16,
    color: "#333",
  },
});

export default GenerateStoryScreen;