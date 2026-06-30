import './App.css'
import { useState } from "react";
import TranslateForm from './components/TranslateForm';
import TranslateResult from './components/TranslateResult';

export default function App() {
  const [showPage, setShowPage] = useState(true);
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslateText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async (text, language) => {
    if (!text.trim()) {
      setError("Please enter some text to translate");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_POLYGLOT_WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language })
      });

      if (!response.ok) {
        throw new Error("Please try a moment later");
      }
      const result = await response.json();
      setOriginalText(text);
      setTranslateText(result.translation);
      setShowPage(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleStartOver = () => {
    setShowPage(true);
    setOriginalText("");
    setTranslateText("");
    setError("");
  }
  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-blue-300/30'>
      {showPage ?
        <TranslateForm
          onTranslate={handleTranslate}
          error={error}
          clearError={() => setError("")}
          isLoading={isLoading}
        />
        : <TranslateResult
          originalText={originalText}
          translatedText={translatedText}
          onStartOver={handleStartOver}
        />
      }
    </div>
  );
}