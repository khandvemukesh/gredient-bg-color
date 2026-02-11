import { useState, useEffect } from 'react'
import { CopyCheck, CopyIcon } from 'lucide-react'

function App() {
  const [num, setNum] = useState(18)
  const [type, setType] = useState("linear")
  const [gradients, setGradients] = useState([])
  const [copiedIndex, setCopiedIndex] = useState(null);

  const hexCodeGenerator = () => {
    const rgb = 255 * 255 * 255
    const random = Math.random() * rgb
    const int = Math.floor(random)
    const hexCode = int.toString(16)
    const colorCode = hexCode.padStart(6, "0")
    return `#${colorCode}`
  }
  const generateGradient = () => {
    const colors = []
    for (let i = 0; i < num; i++) {
      const color1 = hexCodeGenerator()
      const color2 = hexCodeGenerator()
      const degree = Math.floor(Math.random() * 360)
      const degreeString = `${degree}deg`
      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background:'linear-gradient(${degreeString}, ${color1}, ${color2})'`
        })
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background:'radial-gradient(circle, ${color1}, ${color2})'`
        })
      }

    }
    setGradients(colors)
  }
  const onCopy = (css, index) => {
    navigator.clipboard.writeText(css)
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  }
  useEffect(() => {
    generateGradient()
  }, [num, type])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16">
      <div className="w-9/12 mx-auto px-6 border border-gray-200 rounded-3xl shadow-lg bg-white/80 backdrop-blur-md py-8 p-2">

        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl mb-14 p-10 
bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
shadow-xl">

          {/* Soft Glow Background */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            {/* Title Section */}
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Gradient Color Generator
              </h1>
              <p className="text-white/80 mt-2 text-sm">
                Generate beautiful CSS gradients instantly.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 backdrop-blur-md  p-4">

              <input
                type="number"
                min="1"
                className="bg-white/80 text-gray-800 placeholder-gray-500 
        rounded-lg w-[100px] px-3 py-2 outline-none 
        focus:ring-2 focus:ring-white transition"
                placeholder="12"
                value={num}
                onChange={(e) => setNum(e.target.value)}
              />

              <select
                onChange={(e) => setType(e.target.value)}
                className="bg-white/80 text-gray-800 rounded-lg 
        px-3 py-2 outline-none focus:ring-2 focus:ring-white transition"
                value={type}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>

              <button
                onClick={generateGradient}
                className="bg-white text-purple-600 font-semibold 
        px-5 py-2 rounded-lg shadow-md 
        hover:scale-105 active:scale-95 
        transition duration-300"
              >
                Generate
              </button>

            </div>
          </div>
        </div>


        {/* Gradient Grid */}
        {gradients.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Click "Generate" to create gradients
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {gradients.map((item, index) => (
              <div
                key={index}
                className="relative h-[80px] rounded-xl shadow-md overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-105"
                style={{ background: item.gradient }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">

                  <button
                    onClick={() => onCopy(item.css, index)}
                    className="bg-white text-black text-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-md transition-all duration-300 active:scale-95"
                  >
                    {copiedIndex === index ? (
                      <CopyCheck className="text-black-600 animate-bounce" />
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
        )}
      </div>
    </div>

  )
}

export default App;
