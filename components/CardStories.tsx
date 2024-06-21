import { StyleSheet, Text, View } from "react-native";
import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";
interface CardStoriesProps {
  date: string;
  storyDescription: string;
}

const CardStories = ({ date, storyDescription }: CardStoriesProps) => {
  const dataObj = parseISO(date);
  const dateBR = format(dataObj, "dd/MM/yyyy - HH:mm:ss", { locale: ptBR });

  const createTitle = (title: string) => {
    return title.substring(0, 55);
  };
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Text style={styles.storyDescription}>
        {createTitle(storyDescription)}...
      </Text>
      <View style={styles.badge}>
        <Text style={styles.date}>{dateBR}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#006db2",
    padding: 20,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    marginBottom: 10,
  },

  badge: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
    backgroundColor: "#7bb4e3",
  },

  date: {
    color: "black",
    borderRadius: 15,
    fontSize: 12,
    fontWeight: "400",
  },
  storyDescription: {
    fontSize: 23,
    color: "white",
    height: 60,
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
