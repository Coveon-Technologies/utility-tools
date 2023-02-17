import React, { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import './tooltip.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const matchingText = [
  {
    "keywords": ['Influencer', 'agreement' ],
    "meaning" : 'This is a test for paragraph'
  },
  {
    "keywords": ['disclosure', 'compensation' ],
    "meaning" : 'compensation or compensation Test'
  }
]

const PdfToText = () => {
  const [pdfText, setPdfText] = useState('');
  const [definition, setDefinition] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const typedArray = new Uint8Array(event.target.result);
      const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        text += pageText + ' ';
      }
      setPdfText(text);
      setDefinition('Fake');
    };

    reader.readAsArrayBuffer(file);
  };

  const highlightText = (text) => {
    // Split the text into an array of words
    const words = text.split(' ');
    // Loop through the words and check each one against the matchingText array
    const highlightedWords = words.map((word) => {
      const matchingKeywords = matchingText.filter((item) => item.keywords.includes(word));
      if (matchingKeywords.length > 0) {
        // Return the word wrapped in a <u> tag if it matches any keyword
        return `<u>${word}</u>`;
      }
      // Otherwise return the word as-is
      return word;
    });
    // Join the words back together with spaces
    return highlightedWords.join(' ');
  };

  const highlightedText = highlightText(pdfText);

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <p className="pdf-text" dangerouslySetInnerHTML={{ __html: highlightedText }}></p>
    </div>
  );
};

export default PdfToText;
