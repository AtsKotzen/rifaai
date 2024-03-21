// Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react';

const Header = ({ title }) => (
 <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
 </View>
);

const styles = StyleSheet.create({
 header: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
 },
 headerText: {
    fontSize: 20,
    fontWeight: 'bold',
 },
});

export default Header;
