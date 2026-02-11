import { useState, useEffect } from "react";
import { CopyCheck, CopyIcon } from "lucide-react";

function App() {
  const [num, setNum] = useState(100);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // 🎨 Better HSL Generator
  const generateHSL = (baseHue = null) => {
    const hue = baseHue !== null ? baseHue : Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 25) + 65; // 65–90%
    const lightness = Math.floor(Math.random() * 15) + 45; // 45–60%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const generateGradient = () => {
    const colors = [];

    for (let i = 0; i < num; i++) {
      const baseHue = Math.floor(Math.random() * 360);

      const color1 = generateHSL(baseHue);
      const color2 = generateHSL((baseHue + 40) % 360);
      const color3 = generateHSL((baseHue + 80) % 360);
      const color4 = generateHSL((baseHue + 120) % 360);

      const degree = Math.floor(Math.random() * 360);

      let gradientValue = "";
      let cssValue = "";

      switch (type) {
        case "linear":
          gradientValue = `linear-gradient(${degree}deg, ${color1}, ${color2})`;
          break;

        case "radial":
          gradientValue = `radial-gradient(circle at center, ${color1}, ${color2})`;
          break;

        case "conic":
          gradientValue = `conic-gradient(from ${degree}deg, ${color1}, ${color2}, ${color3})`;
          break;

        case "multi":
          gradientValue = `linear-gradient(${degree}deg, ${color1}, ${color2}, ${color3}, ${color4})`;
          break;

        case "repeating":
          gradientValue = `repeating-linear-gradient(
            ${degree}deg,
            ${color1} 0px,
            ${color1} 20px,
            ${color2} 20px,
            ${color2} 40px
          )`;
          break;

        default:
          gradientValue = `linear-gradient(${degree}deg, ${color1}, ${color2})`;
      }

      cssValue = `background: ${gradientValue};`;

      colors.push({
        gradient: gradientValue,
        css: cssValue,
      });
    }

    setGradients(colors);
  };

  const onCopy = (css, index) => {
    navigator.clipboard.writeText(css);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="w-9/12 mx-auto px-6 border border-gray-200 rounded-3xl shadow-lg bg-white/80 backdrop-blur-md py-8">

        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl mb-14 p-10 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl">

          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Gradient Color Generator
              </h1>
              <p className="text-white/80 mt-2 text-sm">
                Beautiful HSL-based gradient combinations.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 backdrop-blur-md p-4">

              <input
                type="number"
                min="1"
                className="bg-white text-gray-800 rounded-lg w-[100px] px-3 py-2 outline-none focus:ring-2 focus:ring-white"
                value={num}
                onChange={(e) => setNum(Number(e.target.value))}
              />

              <select
                onChange={(e) => setType(e.target.value)}
                className="bg-white text-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-white"
                value={type}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
                <option value="conic">Conic</option>
                <option value="multi">Multi Color</option>
                <option value="repeating">Repeating</option>
              </select>

              <button
                onClick={generateGradient}
                className="bg-white text-purple-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:scale-105 active:scale-95 transition duration-300"
              >
                Generate
              </button>

            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="relative h-[100px] rounded-xl shadow-md overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{ background: item.gradient }}
            >
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">

                <button
                  onClick={() => onCopy(item.css, index)}
                  className="bg-white text-black text-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-md active:scale-95"
                >
                  {copiedIndex === index ? (
                    <CopyCheck className="animate-bounce" />
                  ) : (
                    <CopyIcon />
                  )}
                  <span>
                    {copiedIndex === index ? "Copied!" : "Copy"}
                  </span>
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
