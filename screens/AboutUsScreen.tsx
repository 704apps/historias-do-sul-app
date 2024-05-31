import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AppInfo = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sobre o Aplicativo</Text>
      <Text style={styles.paragraph}>
        Este aplicativo foi desenvolvido pela equipe da 704Apps do Brasil, uma empresa cearense especializada no desenvolvimento de aplicativos para mobilidade urbana. Nosso objetivo é utilizar a tecnologia para levar esperança às crianças do sul do Brasil. Este projeto é totalmente sem fins lucrativos, financiado pelas horas doadas pelos nossos desenvolvedores e colaboradores de diversos setores, com as despesas de infraestrutura e consumo das chaves de IA Gemini custeadas pela 704Apps.
      </Text>
      <View style={styles.div}>
        <Text style={styles.subHeader}>Idealizador:</Text>
        <Text style={styles.listItem}>- Betho Costa</Text>
      </View>
      <View style={styles.div}>
        <Text style={styles.subHeader}>Time de desenvolvimento:</Text>
        <Text style={styles.listItem}>- Caique Gomes</Text>
        <Text style={styles.listItem}>- Hitalo Albuquerque</Text>
        <Text style={styles.listItem}>- Jefferson Domingos</Text>
        <Text style={styles.listItem}>- João Vitor Farias</Text>
        <Text style={styles.listItem}>- Johnson Rodrigues</Text>
        <Text style={styles.listItem}>- Loandre Campos</Text>
      </View>
      <View style={styles.div}>
        <Text style={styles.subHeader}>Colaboradores:</Text>
        <Text style={styles.listItem}>- Alice Laura</Text>
        <Text style={styles.listItem}>- Ana Veida</Text>
        <Text style={styles.listItem}>- Leidiany Souza</Text>
        <Text style={styles.listItem}>- Luan Roseo</Text>
        <Text style={styles.listItem}>- Manuel Junior</Text>
        <Text style={styles.listItem}>- Rafael Studart</Text>
        <Text style={styles.listItem}>- Rayane Feitoza</Text>
        <Text style={styles.listItem}>- Ricardo Rolim</Text>
        <Text style={styles.listItem}>- Vitor Miranda</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#097E79",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  div: {
    marginBottom: 20
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#f1f1f1',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: '#f1f1f1',
  },
});

export default AppInfo;