import { useState } from "react";
import france from "../assets/images/france.png";
import spain from "../assets/images/spain.png";
import japan from "../assets/images/Japan.png";
import Header from "./Header";

const languages = [
  { id: 1, name: "French", value: "French", flag: france },
  { id: 2, name: "Spanish", value: "Spanish", flag: spain },
  { id: 3, name: "Japanese", value: "Japanese", flag: japan },
];

export default function TranslateForm({
  onTranslate,
  error,
  clearError,
  isLoading, }) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("French");

  const handleTextChange = (e) => {
    setText(e.target.value);
    clearError();
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTranslate(text, language);
  };

  return (
    <div>
      <div className="w-full max-w-sm mx-auto bg-white shadow-2xl overflow-hidden border border-gray-100">
        <Header />
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-center text-[#035A9D] font-bold text-lg">
             Text to translate 👇
            </label>
            <textarea
              placeholder="How are you?"
              value={text}
              onChange={handleTextChange}
              rows={4}
              dir="auto"
              className="w-full bg-[#f4f6fb]  text-gray-800 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#035A9D] transition shadow-sm"
            />

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-center text-[#035A9D] font-bold text-lg">
             Select language 👇
            </p>
            <div className="space-y-2">
              {languages.map((lang) => (
                <label
                  key={lang.id}
                  className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-[#f6f9ff] transition"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="language"
                      value={lang.value}
                      checked={language === lang.value}
                      onChange={handleLanguageChange}
                    />
                    <span className="font-medium text-gray-700">
                      {lang.name}
                    </span>
                  </div>

                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="w-6 h-6 rounded-full object-cover shadow-sm"
                  />
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#035A9D] hover:bg-[#024a82] transition text-white font-bold text-lg py-3 rounded-xl shadow-md disabled:opacity-50"
          >
            {isLoading ? "Translating..." : "Translate"}
          </button>
        </form>
      </div>
    </div>
  );
}