import React, { useRef, useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import {
  Document,
  Page,
  View,
  Image,
  PDFDownloadLink,
  Text,
  StyleSheet, Font
} from "@react-pdf/renderer";

// Register font
Font.register({
  family: 'cairo',
  fonts: [
    {
      src: `fonts/Cairo-Regular.ttf`
    },
    {
      src: `fonts/Cairo-Bold.ttf`,
      fontWeight: 'bold'
    },
    {
      src: `fonts/Cairo-Light.ttf`,
      fontWeight: 'lighter'
    },
  ]
})

// Reference font
const styles = StyleSheet.create({
  page: {
    fontFamily: 'cairo',
    padding: 3,
    fontSize: 10,
    textAlign: 'right'
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  containerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid black'
  }
})

// Component to generate the barcode as a canvas
// const BarcodeGenerator = ({ barcodeValue }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       JsBarcode(canvasRef.current, barcodeValue, { format: "CODE128" });
//     }
//   }, [barcodeValue]);

//   return <canvas ref={canvasRef} style={{ display: "none" }} />;
// };

// Component to create PDF with the barcode
const BarcodePDF = ({ unprintedOrders }) => {
  return (
    <Document>
      {unprintedOrders && unprintedOrders.map((item) => {
        // Generate the barcode and set the data URL for PDF generation
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, item.barcodeID, { 
          format: "CODE128", 
          height: 50,
          displayValue: false 
        });
        // const barcodeDataURL = canvas.toDataURL("image/png");

        const {sender, receiver, product} = item;
        
        return (
          <Page key={item._id} style={styles.page} size={[215, 369]}>
            <View>
              <Image src={canvas.toDataURL("image/png")} />
            </View>
            <View style={{textAlign: 'center'}}>
              <Text>{item.barcodeID}</Text>
            </View>
            <View style={styles.containerRow}>
              <Text>Store: {sender.name}</Text>
              <Text>Price: {product.price}</Text>
            </View>
            <View style={styles.containerColumn} wrap={true}>
              <Text>To: {receiver.name}</Text>
              <Text>{receiver.phone1}</Text>
              <Text>{receiver.street}</Text>
              <Text>{receiver.state}, {receiver.city}, {receiver.area} </Text>
            </View>
            <View wrap={true}>
              <Text>{sender.name}</Text>
              <Text>{sender.phone1}</Text>
              <Text>{sender.street}</Text>
              <Text>{sender.state}, {sender.city}, {sender.area} </Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

const BillOfLading = ({ orders }) => {
  console.log("inside pdf bill");
  console.log(orders);
  // const [barcodeDataURL, setBarcodeDataURL] = useState(null);
  // const barcodeValue = orders && orders[1].barcodeID; // Example barcode value

  // // Generate the barcode and set the data URL for PDF generation
  // const handleGenerateBarcode = () => {
  //   const canvas = document.createElement("canvas");
  //   JsBarcode(canvas, barcodeValue, { format: "CODE128" });
  //   setBarcodeDataURL(canvas.toDataURL("image/png"));
  // };

  // useEffect(() => {
  //   handleGenerateBarcode();
  // }, [barcodeValue]);

  return (
    <div>
      <h1>Barcode PDF Generator</h1>
      {/* <BarcodeGenerator barcodeValue={barcodeValue} /> */}

      <PDFDownloadLink
        document={<BarcodePDF unprintedOrders={orders && orders} />}
        fileName="barcode.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF with Barcode"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default BillOfLading;
