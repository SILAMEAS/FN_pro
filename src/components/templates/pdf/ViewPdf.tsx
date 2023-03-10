import React, {useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5';
import {Box} from 'native-base';

interface Props {
  uri?: string;
  width?: string | number;
  height?: string | number;
}

const ViewPdf = ({uri, width, height}: Props) => {
  const pdfUrl =
    uri ?? 'http://samples.leanpub.com/thereactnativebook-sample.pdf';
  const source = {
    uri: pdfUrl,
    cache: true,
  };
  const [numPages, setNumPages] = useState<number | null>(null);
  // const pageNumber = 1;

  function onDocumentLoadSuccess(pdf: any): void {
    setNumPages(pdf.numPages);
  }
  if (Platform.OS === 'web') {
    return (
      <Box
        alignItems={'center'}
        // style={{margin: 25}}
        width={width}
        height={height}
      >
        <Document
          file={uri ?? 'files/Web_Service_Signature_Certigna_v2.0.pdf'}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {/* <Page pageNumber={pageNumber} /> */}
          {Array.from(new Array(numPages), (_, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
        <p>{numPages}</p>
      </Box>
    );
  }

  const Pdf = require('react-native-pdf').default;
  return (
    <Box width={width} height={height}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages: any) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page: any) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error: any) => {
          console.log(error);
        }}
        onPressLink={(uri: any) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </Box>
  );
};

export default ViewPdf;

const styles = StyleSheet.create({
  textLayer: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
});
