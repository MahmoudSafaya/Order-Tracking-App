import React, { useRef, useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import { Document, Page, Image, PDFDownloadLink, Text } from "@react-pdf/renderer";

// Component to generate the barcode as a canvas
const BarcodeGenerator = ({ barcodeValue }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, barcodeValue, { format: "CODE128" });
    }
  }, [barcodeValue]);

  return <canvas ref={canvasRef} style={{ display: "none" }} />;
};

// Component to create PDF with the barcode
const BarcodePDF = ({ barcodeDataURL }) => (
  <Document>
    <Page>
      <Image src={barcodeDataURL} />
      <Text>Hello World</Text>
    </Page>
  </Document>
);

const App = () => {
  const [barcodeDataURL, setBarcodeDataURL] = useState(null);
  const barcodeValue = "123456789"; // Example barcode value

  // Generate the barcode and set the data URL for PDF generation
  const handleGenerateBarcode = () => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, barcodeValue, { format: "CODE128" });
    setBarcodeDataURL(canvas.toDataURL("image/png"));
  };

  useEffect(() => {
    handleGenerateBarcode();
  }, [barcodeValue]);

  return (
    <div>
      <h1>Barcode PDF Generator</h1>
      <BarcodeGenerator barcodeValue={barcodeValue} />
      {barcodeDataURL && (
        <PDFDownloadLink document={<BarcodePDF barcodeDataURL={barcodeDataURL} />} fileName="barcode.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Generating PDF..." : "Download PDF with Barcode"
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default App;
