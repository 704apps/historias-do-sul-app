import { createContext, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type GeneratedStoryProps = {
  title: string;
  story: string;
};

type PromptProps = {
  readingTime: string;
  protagonistNames: string;
  storyType: string;
  relativeNames: string;
  city: string;
  familyDeathDetails: string;
  themes: string;
  age: string;
  parentNames: string,
};

type GeneratorContextProps = {
  loading: boolean;
  generatedStory: string;
  generateStory: (promptProps: PromptProps) => Promise<void>;
};

const GeneratorContext = createContext<GeneratorContextProps>(
  {} as GeneratorContextProps
);

const GeneratorProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  // TODO - Fazer um GET para a API para pegar a chave
  const AI_API_KEY = "AIzaSyCwvq5rNhn5PI1p2p6UE1unLy2fyI51CPs";

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

    const prompt = `Crie uma história infantil para contar para crianças de "${age}", os protagonistas são "${protagonistNames}" e que tenha um direcionamento de aventura e com mensagem explicita de perseverança, amor e esperança, que aconteça em um cenário de "${storyType}", inclua como personagens "${relativeNames}" que são familiares das crianças na historia para envolve-la, use sempre como atores principais "${protagonistNames}", a aventura deve passar na cidade de "${city}", que atualmente na vida real esta sofrente com uma catástrofe ambiental, alagementos, quedas de pontes e destruição de tudo que era tão lindo antes, fazendo muitas vítimas fatais, muitas parentes e familiáres das crianças e outras centenas perderam suas casas e estão em abrigos, como igrejas, escolas e locais improvisados. Trate tudo com muito carinho e passe a mensagem de perseverança, que os pais destas crianças são fortes e vão reconstruir tudo , ainda melhor e mais bonito, que os pais tem muito orgulho das crianças, que eles estando ali perto dos pais são a energia e força que os pais precisam para reconstruir.
    Fale da humanidade, da beleza das pessoas em ajudar, que o Brasil esta todos torcendo para que o rio grande do sul retorne mais maravilhoso que era antes.Transforma o contexto em "${themes}" 
    Tempo de leitura: "${readingTime}" minutos
    Cidade: "${city}"
    Crianças protagosnistas: "${protagonistNames}"
    Idade das crianças protagonistas: "${age}"
    parentes: "${relativeNames}"
    Nome dos pais da criança: "${parentNames}"
    
    Palavras chaves a incluir na história: "${familyDeathDetails}"`;

    setLoading(true);

    try {
      navigation.navigate("Loading");
      console.log(prompt);
      const genAI = new GoogleGenerativeAI(AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();
      
      setGeneratedStory(text);

      return;
    } catch (error) {
      navigation.navigate("Home");
      console.error("Erro ao buscar dados da API:", error);
      throw error;
    } finally {
      setLoading(false);
      navigation.navigate("Story");
    }
  };

  return (
    <GeneratorContext.Provider
      value={{
        generatedStory,
        generateStory,
        loading,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  );
};

export { GeneratorContext, GeneratorProvider };