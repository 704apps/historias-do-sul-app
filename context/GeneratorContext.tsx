import { createContext, useContext, useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { Alert } from "react-native";
import { AuthContext } from "./AuthContext";
import axios from "axios";

type PromptProps = {
  readingTime: string;
  protagonistNames: string;
  storyType: string;
  relativeNames: string;
  city: string;
  familyDeathDetails: string;
  themes: string;
  age: string;
  parentNames: string;
};

type GeneratorContextProps = {
  generatedStory: string;
  generateStory: (promptProps: PromptProps) => Promise<void>;
};

const GeneratorContext = createContext<GeneratorContextProps>(
  {} as GeneratorContextProps
);

const GeneratorProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [generatedStory, setGeneratedStory] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const AI_API_KEY = process.env.EXPO_PUBLIC_API_KEY;
  // @ts-ignore
  const genAI = new GoogleGenerativeAI(AI_API_KEY);

  useEffect(() => {
    if (!generatedStory) return

    const postStory = {
      content: generatedStory,
      userId: user?.id,
    };
    axios.post(
      `${API_URL}/generate-story`,
      postStory
    );
  }, [generatedStory])

  const generateStory = async (promptProps: PromptProps) => {
    const {
      readingTime,
      protagonistNames,
      storyType,
      relativeNames,
      city,
      familyDeathDetails,
      themes,
      age,
      parentNames,
    } = promptProps;

    const prompt = `Crie uma história infantil para contar para crianças de ${age} anos de idade, os protagonistas são ${protagonistNames} e que tenha um direcionamento de aventura e com mensagem explicita de perseverança, amor e esperança, que aconteça em um cenário de ${storyType}, inclua como personagens ${relativeNames} que são familiares das crianças na historia para envolve-la, use sempre como atores principais ${protagonistNames}, a aventura deve passar na cidade de ${city}, que atualmente na vida real esta sofrendo com uma catástrofe ambiental, alagamentos, quedas de pontes e destruição de tudo que era tão lindo antes, fazendo muitas vítimas fatais, muitos parentes e familiáres das crianças e outras centenas perderam suas casas e estão em abrigos, como igrejas, escolas e locais improvisados. Trate tudo com muito carinho e passe a mensagem de perseverança, que os pais destas crianças são fortes e vão reconstruir tudo, ainda melhor e mais bonito, que os pais tem muito orgulho das crianças, que eles estando ali perto dos pais e são a energia e força que os pais precisam para reconstruir.
    Fale da humanidade, da beleza das pessoas em ajudar, que todo o Brasil esta torcendo para que o rio grande do sul retorne mais maravilhoso do que era antes.
    Transforma o contexto em ${themes}.
    Tempo de leitura mínimo: ${readingTime} minutos
    Cidade: ${city}
    Crianças protagosnistas: ${protagonistNames}
    Idade das crianças protagonistas: ${age}
    parentes: ${relativeNames}
    Nome dos pais da criança: ${parentNames}
    
    Palavras chaves a incluir na história: ${familyDeathDetails}
    `;

    navigation.navigate("Loading");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setGeneratedStory(text);
      navigation.navigate("Story");
      return;
    } catch (error) {
      navigation.navigate("Home");
      Alert.alert("Erro", "Aconteceu um erro ao criar a história");
    }
  };


  return (
    <GeneratorContext.Provider
      value={{
        generatedStory,
        generateStory,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
};

export { GeneratorContext, GeneratorProvider };
