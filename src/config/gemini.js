import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;


const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-preview-03-25",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [],
    responseMimeType: "text/plain",
};

// Example run function (adjust according to actual structure)
async function run(prompt) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;  // Accessing the API key from the environment variable

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,  // Using the API key in the Authorization header
            },
            body: JSON.stringify({
                prompt: prompt,
            }),
        });

        const data = await response.json();

        // Handle 429 status code
        if (response.status === 429) {
            return { error: "Quota limit exceeded. Please wait a while or upgrade your plan." };
        }

        // Return the response from the API
        return data.result || "No result found";  // Adjust according to your API response structure
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return { error: "An error occurred while processing your request." };
    }
}




export default run;
