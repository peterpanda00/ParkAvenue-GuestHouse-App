import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#665651'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#665651',
        backgroundColor: '#665651',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        color: 'white', // Change font color to white
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        color: 'white', // Change font color to white
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        color: 'white', // Change font color to white
    },
    amount: {
        width: '15%',
        color: 'white', // Change font color to white
    },
});

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.qty}>Qty</Text>
        <Text style={styles.rate}>Price</Text>
        <Text style={styles.amount}>Amount</Text>
    </View>
  );
  
  export default InvoiceTableHeader