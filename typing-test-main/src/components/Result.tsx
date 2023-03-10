import { resetTest } from "helpers/resetTest";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Result.scss";
import React, { useState } from "react";
import axios from 'axios';
export default function Result() {
    const {
        word: { wordList, typedHistory, currWord },
        preferences: { timeLimit },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    const searchInput = React.useRef(null)
    result.forEach((r, idx) => {
        if (r) correctChars += wordList[idx].length;
    });
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');

    function handleTextChange(event: { target: { value: React.SetStateAction<string>; }; }) {
        setText(event.target.value);
    }

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    axios.post('server.php', { text })
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
    const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;
    return (
        <div className="result">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2} align="center">
                            <h1>{Math.round(wpm) + " wpm"}</h1>
                        </td>
                    </tr>
                    <tr>
                        <th>Ilość poprawnych słów: </th>
                        <td>{result.filter((x) => x).length}</td>
                    </tr>
                    <tr className="wrong">
                        <th>Ilość niepoprawnych słow: </th>
                        <td>{result.filter((x) => !x).length}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center">
                            <button onClick={() => resetTest()}>Restart</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
