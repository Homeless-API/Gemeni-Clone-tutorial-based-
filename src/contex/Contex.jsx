import { createContext, useState } from "react";
import run from "../config/gemini";

export const Contex = createContext();

const ContexProvider = (props) => {

    const[input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompts, setpreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextword) => {

    }
    const onSent = async () => {
        setResultData('');
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);

        const responseText = await run(input);

        if (responseText.error) {
            setResultData(`<p class="error-message">${responseText.error}</p>`);
        } else {
            let responseArray = responseText.split("**");
            let newResponse = '';

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += '<b>' + responseArray[i] + '</b>';
                }
            }

            setResultData(newResponse);
        }

        setLoading(false);
        setInput('');
    }


    const contexValue = {
        previousPrompts,
        setpreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }


    return (
        <Contex.Provider value={contexValue}>
            {props.children}
        </Contex.Provider>
    )
}

export default ContexProvider;