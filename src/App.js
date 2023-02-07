
import './App.css';
import { useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

function App() {
  const [object, setObject] = useState({
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  })
  const [input, setInput] = useState(null);
  const [result, setResult] = useState(null);

  // const configuration = new Configuration({
  //   apiKey: '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',
  // });
  // const openai = new OpenAIApi(configuration);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String({ 'insert your api key here'})
    },
    body: JSON.stringify({
      "model": "text-davinci-003",
      'prompt': input,
      'temperature': 0.1,
      'max_tokens': 256,
      'top_p': 1,
      'frequency_penalty': 0,
      'presence_penalty': 0.5,
      'stop': ["\"\"\""],
    })
  };

  const select = async () => {
    fetch('https://api.openai.com/v1/completions', requestOptions)
      .then(response => response.json())
      .then(data => {
        setResult(data.choices[0].text)
      }).catch(err => {
        console.log("Ran out of tokens for today! Try tomorrow!");
      });
  }

  return (
    <div className="App">
      <textarea placeholder="Hi! How can i help?" className="input" onChange={(e) => setInput(e.target.value)}></textarea>
      <button className="button" onClick={select}>Enter</button>
      {result ? <div className="typewriter">{result}</div> : null}
    </div>
  );
}

export default App;

