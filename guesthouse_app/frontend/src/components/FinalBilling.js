import React from 'react';
import { Page, Document, Image, StyleSheet,Font } from '@react-pdf/renderer';
import InvoiceTitle from './FinalBillingComponents/InvoiceTitle'
import BillTo from './FinalBillingComponents/BillTo.js'
import InvoiceNo from './FinalBillingComponents/InvoiceNo'
import InvoiceItemsTable from './FinalBillingComponents/InvoiceItemsTable'
import logo from "../assets/logo.png"


// Define styles for PDF
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 100,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });

// Function to generate PDF receipt
const FinalBilling = ({invoice}) => {
  return (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={logo} />
            <InvoiceTitle title='Invoice'/>
            <InvoiceNo invoice={invoice}/>
            <BillTo invoice={invoice}/>
            <InvoiceItemsTable invoice={invoice} />

        </Page>
    </Document>
  );
};

export default FinalBilling;
