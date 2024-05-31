import { StyleSheet, Text, View } from "react-native";
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
interface CardStoriesProps {
  title: string;
  date: string;
  storyDescription: string;
}

const CardStories = ({ title, date, storyDescription }: CardStoriesProps) => {
  const dataObj = parseISO(date)
  const dateBR = format(dataObj, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <View style={styles.badge}>
        <Text style={styles.date}>História criada em {dateBR}</Text>
      </View>
      <Text style={styles.storyDescription}>{storyDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#097E79",
    paddingTop: 0,
    padding: 20,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    marginBottom: 10,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 25,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: "yellow",
  },

  date: {
    color: "black",
    borderRadius: 15,
    fontSize: 12,
    fontWeight: "400",
  },
  storyDescription: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default CardStories;
