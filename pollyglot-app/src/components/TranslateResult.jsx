import Header from "./Header";

export default function TranslateResult({
  onStartOver,
  originalText,
  translatedText,
}) {
  const boxStyle =
    "w-full min-h-24 bg-[#f4f6fb]  text-gray-800 font-medium border border-gray-200 rounded-xl p-3";
  return (
    <div className=" flex items-center justify-center p-4">
      <div  className="w-full max-w-sm mx-auto bg-white shadow-2xl overflow-hidden border border-gray-100">
        <Header />
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-center font-bold text-[#035A9D] mb-2">
             Original text 👇
            </h2>
            <p dir="auto" className={boxStyle}>{originalText}</p>
          </div>
          <div>
            <h3 className="text-center font-bold text-[#035A9D] mb-2">
             Your translation 👇
            </h3>
            <div className="bg-[#f1f4f9] p-3 rounded-xl border border-gray-200 min-h-24">
              <p className="text-gray-800 font-medium">
                {translatedText}
              </p>
            </div>
          </div>

          <button
            onClick={onStartOver}
            className="w-full mt-4 bg-[#035A9D] text-white py-3 rounded-xl font-bold hover:bg-[#024a82] transition"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}