import { useEffect, useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const buttons = [
    ["C", "←", "/", "*"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", , "."],
    ["0", "="],
  ];

  const handleClick = (value: string) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch (error) {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else if (value === "←") {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === "Enter" || key === "=") {
      handleClick("=");
    } else if (key === "Backspace") {
      handleClick("←");
    } else if (key === "Escape" || key.toLowerCase() === "c") {
      handleClick("C");
    } else if (/[0-9]/.test(key)) {
      handleClick(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleClick(key);
    } else if (key === ".") {
      handleClick(".");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gray-100">
      <h1 className="text-4xl mb-4 font-bold">
        <span className="text-red-500">A</span>
        <span className="text-orange-500">l</span>
        <span className="text-yellow-300">l</span>
        <span className="text-green-500">i</span>
        <span className="text-blue-500">s</span>
        <span className="text-violet-500">o</span>
        <span className="text-red-500">n</span>{" "}
        <span className="text-orange-500">B</span>
        <span className="text-yellow-300">u</span>
        <span className="text-green-500">r</span>
        <span className="text-blue-500">g</span>
        <span className="text-violet-500">e</span>
        <span className="text-red-500">r</span>
        <span className="text-orange-500">s</span> Calculator
      </h1>
      <div className="w-64 p-4 border-2 border-black rounded-lg bg-white">
        <div className="h-12 mb-4 p-2 text-right text-2xl text-white bg-gray-800 rounded">
          {input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map(
            (button, index) =>
              button && (
                <button
                  key={index}
                  onClick={() => handleClick(button)}
                  className={`p-4 ${
                    button === "="
                      ? "col-span-2 bg-green-500 text-white"
                      : button === "0"
                      ? "col-span-2 bg-gray-200"
                      : button.match(/[C←/*\-+=]/)
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  } rounded`}
                >
                  {button}
                </button>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
