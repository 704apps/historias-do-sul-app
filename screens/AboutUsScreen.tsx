import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AppInfo = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Sobre o Aplicativo</Text>
      <Text style={styles.paragraph}>
        Este aplicativo foi desenvolvido pela equipe da 704Apps do Brasil, uma empresa cearense especializada no desenvolvimento de aplicativos para mobilidade urbana. Nosso objetivo é utilizar a tecnologia para levar esperança às crianças do sul do Brasil. Este projeto é totalmente sem fins lucrativos, financiado pelas horas doadas pelos nossos desenvolvedores e colaboradores de diversos setores, com as despesas de infraestrutura e consumo das chaves de IA Gemini custeadas pela 704Apps.
      </Text>
      <Text style={styles.subHeader}>Colaboradores diretamente envolvidos:</Text>
      <Text style={styles.listItem}>- Johnson Rodrigues</Text>
      <Text style={styles.listItem}>- João Vitor Farias</Text>
      <Text style={styles.listItem}>- Hitalo Albuquerque</Text>
      <Text style={styles.listItem}>- Jefferson Domingos</Text>
      <Text style={styles.listItem}>- Caique Gomes</Text>
      <Text style={styles.listItem}>- Loandre Campos</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#666',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: '#666',
  },
});

export default AppInfo;