import './App.css';
import PdfReader from './PdfReader';

function App() {

  return (
    <div className="App">
      <p>PDF to Text Conversion Tool using google API</p>
      <p>This is Prototype for Reading PDF and Rendering on UI</p>
      <p>Upload any pdf and highlight it to get the meaning tooltip</p>
      <PdfReader />
    </div >
  );
}

export default App;
