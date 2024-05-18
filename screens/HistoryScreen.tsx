import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

interface RouteParams {
  title: string;
  content: string;
}

const HistoryScreen = () => {
  const route = useRoute();

  const { title, content } = route.params as RouteParams;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  title: {
  },
  content: {
  },
});

export default HistoryScreen;