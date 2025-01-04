import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#666" />
      <TextInput
        style={styles.input}
        placeholder="Search medicines"
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: 'white',
  },
});