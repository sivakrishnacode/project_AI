import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { api_token } from "../key";

function GeneratingCode() {
  const [words, setWords] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: api_token,
  });

  const openai = new OpenAIApi(configuration);

  const generateCode = async () => {
    setCode("");
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: words,
      temperature: 0.3,
      max_tokens: 3500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    setCode(response.data.choices[0].text);
    setLoading(false);
  };

  return (
    <div className="col-md-12">
      <center>
        <textarea
          cols="30"
          rows="15"
          onChange={(e) => setWords(e.target.value)}
        ></textarea>
      </center>
      <center>
        <button className="btn btn-primary mt-3" onClick={generateCode}>
          Generate Code
        </button>
      </center>
      {loading ? (
        <>
          <center className="text-light mt-5 mb-5">
            <h3>Generating Code</h3>
          </center>
        </>
      ) : (
        <></>
      )}
      {code.length > 0 ? (
        <center>
          <textarea
            className="mt-5"
            cols="30"
            rows="15"
            value={code}
          ></textarea>
        </center>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GeneratingCode;
