import React, { useState } from 'react';
import axios from 'axios';

const GOOGLE_CLOUD_VISION_API_KEY = 'your-api-key';

const PdfViewer = () => {
  const [text, setText] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const base64FileContent = await convertFileToBase64(file);

    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/files:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
        {
          requests: [
            {
              inputConfig: {
                content: base64FileContent,
                mimeType: 'application/pdf'
              },
              features: [{ type: 'DOCUMENT_TEXT_DETECTION' }]
            }
          ]
        }
      );
      const text = response.data.responses[0].fullTextAnnotation.text;
      setText(text);
    } catch (error) {
      console.error(error);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {text && (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            fontSize: '12px',
            lineHeight: '1.2'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
