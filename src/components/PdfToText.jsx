import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";

const PdfToText = () => {
  const [text, setText] = useState("");

  const extractTextFromPDF = async (pdfUrl) => {
    console.log(pdfUrl)
    const loadingTask = await pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

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
    </div>
  );
};

export default PdfToText;
