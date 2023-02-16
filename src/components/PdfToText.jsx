import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToText = () => {

  const [text, setText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1)

  const extractTextFromPDF = async (pdfUrl) => {
    console.log(pdfUrl)
    const loadingTask = await pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    setNumPages(pageNumber);

    let pdfText = "";
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => item.str)
        .join("\n");
      pdfText += pageText;
    }
    setText(pdfText);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file)
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      extractTextFromPDF(fileReader.result);
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>{text}</div>
      {pdfFile && (
        <Document file={pdfFile}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}

    </div>
  );
};

export default PdfToText;
