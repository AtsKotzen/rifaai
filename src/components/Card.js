// Card.js
import React from 'react';
import { View, Image, StyleSheet } from 'react';

const Card = ({ image }) => (
 <View style={styles.card}>
    <Image source={image} style={styles.cardImage} />
 </View>
);

const styles = StyleSheet.create({
 card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
 },
 cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
 },
});

export default Card;
