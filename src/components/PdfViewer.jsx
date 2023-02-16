import React from "react";
import { Document, Page } from "react-pdf";

function PDFViewer(props) {
  const { url } = props;
  return (
    <div>
      <Document file={url}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default PDFViewer;