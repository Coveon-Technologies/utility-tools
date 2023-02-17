import React, { useState, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import './tooltip.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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


  const handleTooltip = (event) => {
    const selection = window.getSelection();
    const selectedWord = selection.toString().trim();
    console.log(selectedWord)

    if (selectedWord !== '') {
      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0 && data[0].meanings[0]) {
            const def = data[0].meanings[0].definitions[0].definition;
            console.log(data[0])
            setDefinition(def);
            const tooltip = document.querySelector('.tooltip');
            tooltip.style.display = 'block';
            tooltip.style.top = `${event.pageY}px`;
            tooltip.style.left = `${event.pageX}px`;
            console.log(`Tooltip position: top=${tooltip.style.top}, left=${tooltip.style.left}`);
          }
        })
        .catch(error => console.log(error));
    } else {
      setDefinition('');
      const tooltip = document.querySelector('.tooltip');
      tooltip.style.display = 'none';
    }
  };


  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <div className="pdf-text" onMouseUp={handleTooltip} dangerouslySetInnerHTML={{ __html: pdfText.replace(/(consideration)/gi, '<span>$1</span>') }}></div>
      <div className="tooltip">{definition}</div>

    </div>
  );
};

export default PdfToText;
