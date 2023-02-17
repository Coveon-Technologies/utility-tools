import './App.css';
import PdfToText from './components/PdfToText'

function App() {

  return (
    <div className="App">
      <p>PDF to Text Conversion Tool</p>
      <p>This is Prototype for Reading PDF and Rendering on UI</p>
      <p>Upload any pdf and highlight it to get the meaning tooltip</p>
      <PdfToText />
    </div >
  );
}

export default App;
