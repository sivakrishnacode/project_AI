import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { api_token } from "../key";

function Answer() {
  const [code, setCode] = useState("Enter your question Here...\n\n\nThe answer is");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const configuration = new Configuration({
    apiKey: api_token,
  });
  const openai = new OpenAIApi(configuration);

  const generateAnswer = async () => {
    setLoading(true);
    setAnswer("");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: code,
      temperature: 0,
      max_tokens: 3500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });
    setAnswer(response.data.choices[0].text);
    setLoading(false);
  };
  return (
    <div className="col-md-12">
      <center>
        <textarea
          cols="30"
          rows="15"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
      </center>
      <center>
        <button className="btn btn-primary mt-3" onClick={generateAnswer}>
          Answer
        </button>
      </center>
      {loading ? (
        <h3 className="text-light text-center mt-3">Finding Answer</h3>
      ) : (
        <></>
      )}
      {answer.length > 0 ? (
        <p className="text-light text-center mt-5" style={{ fontSize: "25px" }}>
          {answer}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Answer;
