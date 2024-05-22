import { StyleSheet, Text, View } from "react-native";

interface CardStoriesProps {
  title: string;
  date: string;
  storyDescription: string;
}

const CardStories = ({ title, date, storyDescription }: CardStoriesProps) => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.badge}>
        <Text style={styles.date}>Criada em {date}</Text>
      </View>
      <Text style={styles.storyDescription}>{storyDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
    backgroundColor: "gray",
  },

  date: {
    color: "white",
    borderRadius: 15,
    fontSize: 12,
    fontWeight: "400",
  },
  storyDescription: {
    fontSize: 16,
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
