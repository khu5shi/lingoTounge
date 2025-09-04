import { useState } from "react"
import Starbg from "../components/Starbg.jsx";
import axios from "axios"
import { Loader } from 'lucide-react';

const Home = () => {
    const [lang, setlang] = useState("");
    const [char, setchar] = useState("");
    const [result,setresult]=useState("");
    const [loading,setloading]=useState(false)
    const handleText = async ()=> {
        setloading(true)
    try {
        const options = {
            method: 'POST',
            url: 'https://google-translator9.p.rapidapi.com/v2',
            headers: {
                'x-rapidapi-key': '1a52c28d7fmsh3fdd2b089274e63p177181jsn91a49262dc7f',
                'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                q: `${char}`,
                source: 'en',
                target: `${lang}`,
                format: 'text'
            }
        };

        const response=await axios.request(options)
        setloading(false)
        console.log(response?.data?.data?.translations?.[Number(0)]?.translatedText)
        setresult(response?.data?.data?.translations?.[Number(0)]?.translatedText)
    } catch (error) {
        setloading(false)
        console.log(error?.data)

    }
}

const charcount = (f) => {
    setchar(f.target.value);

};
const langchange = (e) => {
    setlang(e.target.value);
};

return (
    <>
        <Starbg />
        <div className="relative z-10">
            <div className=" 
                        min-h-screen 
                        overflow-y-auto
                        p-3 md:p-6
                        flex 
                        flex-col 
                        items-center 
                        pb-20
                        ">
                <h1 className="bg-gradient-to-r
                           from-pink-500 via-red-500 to-yellow-500 
                           bg-clip-text 
                           text-transparent 
                           font-extrabold 
                           text-3xl md:text-5xl 
                           py-3 md:py-5
                           mb-4 md:mb-6
                           text-center">
                    LingoTongue!!
                </h1>
                {/* translator section  */}
                <div className="bg-blue-950/60
                            rounded-2xl md:rounded-4xl 
                            flex
                            flex-col
                            justify-center
                            gap-4 md:gap-6
                            w-full md:w-9/10
                            min-h-96 md:h-110
                            p-4 md:p-0">

                    {/* soucre in engilsh */}
                    <div className="flex
                                    flex-col md:flex-row
                                    justify-center md:justify-evenly
                                    w-full
                                    h-auto md:h-2/3
                                    gap-4 md:gap-0
                                    ">
                        <div className="bg-gradient-to-r from-blue-800/50 to-emerald-600/50 
                                    backdrop-blur-lg
                                    rounded-2xl md:rounded-4xl
                                    w-full md:w-2/5
                                    shadow-md 
                                    p-4 md:p-0
                                    ">
                            <div className="flex
                                        justify-between
                                        items-center">
                                <h2 className="text-green-200
                                        text-base md:text-lg
                                        font-semibold
                                        mb-2
                                        mx-2 md:mx-10
                                        my-4 md:my-7">US English</h2>
                                <div className="bg-gradient-to-r from-blue-800/50 to-emerald-600/50 
                                        w-16 md:w-20
                                        h-6 md:h-8
                                        my-4 md:my-7
                                        mx-2 md:mx-10
                                        text-center
                                        mb-2
                                        text-white border
                                        border-white/30 
                                        rounded-full
                                        bg-white/10  
                                        shadow-inner
                                        hover:bg-white/20 
                                        transition
                                        flex
                                        items-center
                                        justify-center
                                        text-sm md:text-base
                                        ">
                                    Source
                                </div>
                            </div>
                            <textarea
                                value={char}
                                onChange={charcount}
                                placeholder="Enter your text to translate...."
                                className="w-1/2 md:min-w-4/5
                                              h-32 md:h-3/5
                                              rounded-xl md:rounded-2xl
                                              placeholder:text-gray-400
                                              p-2 md:pl-2.5 md:pt-2.5
                                              text-white
                                              bg-black/30
                                              mx-0 md:mx-10
                                              outline-none
                                              border
                                              border-transparent
                                             focus:outline-none
                                             resize-none
                                             shadow-[0_0_15px_#38bdf8]
                                              " />
                            <p className="text-gray-400
                                          mx-0 md:mx-10
                                          font-semibold
                                          text-2xs
                                          md:text-base
                                                  ">
                                {char.length} Character {char.length !== 1}
                            </p>
                        </div>
                        {/* translated text */}
                        <div className="bg-gradient-to-r from-emerald-600/50 to-blue-800/50
                                    backdrop-blur-lg
                                    rounded-2xl md:rounded-4xl
                                    w-full md:w-2/5
                                    shadow-md 
                                    p-4 md:p-0
                                    ">
                            <div className="flex
                                        justify-between
                                        items-center">
                                <h2 className="text-green-200
                                        text-base md:text-lg
                                        font-semibold
                                        mb-2
                                        mx-2 md:mx-10
                                        my-4 md:my-7">{lang || "Select"}</h2>
                                <div className="bg-gradient-to-r from-blue-800/50 to-emerald-600/50 
                                        w-16 md:w-20
                                        h-6 md:h-8
                                        my-4 md:my-7
                                        mx-2 md:mx-10
                                        text-center
                                        mb-2
                                        text-white border
                                        border-white/30 
                                        rounded-full
                                        bg-white/10  
                                        shadow-inner
                                        hover:bg-white/20 
                                        transition
                                        flex
                                        items-center
                                        justify-center
                                        text-sm md:text-base">Target</div>
                            </div>

                            <textarea
                                placeholder="Translation will apear here...."
                                className="w-1/2 md:min-w-4/5
                                              h-32 md:h-3/5
                                              rounded-xl md:rounded-2xl
                                              placeholder:text-gray-400
                                              p-2 md:pl-2.5 md:pt-2.5
                                              text-white
                                              bg-black/30
                                              mx-0 md:mx-10
                                              outline-none
                                              border
                                              border-transparent
                                             focus:outline-none
                                             resize-none
                                             shadow-[0_0_15px_#38bdf8]
                                             " readOnly 
                                             value={result} />

                            <p className="text-gray-400
                                          mx-0 md:mx-10
                                          font-semibold
                                          text-sm md:text-base
                                                  ">
                                {char.length} Character {char.length !== 1}
                            </p>

                        </div>
                    </div>
                    {/* Drop down */}

                    <div className=" flex
                                 flex-col
                                 items-center
                                 gap-2 md:gap-0
                                    ">
                        <label htmlFor="drop-down"
                            className="text-green-200
                                     text-sm md:text-base
                                     ">
                            Translate to
                        </label>
                        <select id="languages"
                            onChange={langchange}
                            value={lang}
                            className="bg-gradient-to-r from-blue-800/50 via-emerald-600/50 to-blue-800/50
                                    backdrop-blur-lg
                                    rounded-lg
                                    w-48 md:min-w-2/5
                                    shadow-md
                                    text-green-200
                                    outline-none
                                    cursor-pointer
                                    p-2 md:p-1
                                    text-sm md:text-base
                                    "
                        >
                            <option className="bg-black" value="">Select</option>
                            <option className="bg-black" value="hi">Hindi</option>
                            <option className="bg-black" value="zh">Chinese</option>
                            <option className="bg-black" value="es">Spanish</option>
                            <option className="bg-black" value="fr">French</option>
                            <option className="bg-black" value="de">German</option>
                            <option className="bg-black" value="ru">Russian</option>
                            <option className="bg-black" value="it">Italian</option>
                            <option className="bg-black" value="ko">Korean</option>
                        </select>
                        <button className="bg-gradient-to-r from-blue-800/50 to-emerald-600/50 
                                        w-24 md:w-20
                                        h-10 md:h-8
                                        mt-3 md:mt-2
                                        
                                        text-center
                                        mb-2
                                        text-white border
                                        border-white/30 
                                        rounded-full
                                        bg-white/10  
                                        shadow-inner
                                        hover:bg-white/20 
                                        transition
                                        cursor-pointer 
                                        flex
                                        items-center
                                        justify-center
                                        text-sm md:text-base" onClick={handleText}>
                                            {
                                                loading?(<Loader className="animate-spin w-4 h-4 md:w-5 md:h-5"/>) : "Translate"
                                            }</button>
                    </div>
                </div>

                {/* footer */}
                <footer className=" w-full md:min-w-screen
                           bg-gradient-to-r from-blue-900/30 to-purple-600/30
                           text-white 
                           h-auto md:h-24
                           p-3 md:p-5
                           m-3 md:m-6
                           rounded-t-xl 
                           shadow-inner">
                    <div className="max-w-6xl
                  mx-auto 
                  px-2 md:px-4 
                  flex 
                  flex-col 
                  items-center 
                  gap-2 md:gap-0">
                        <p className="mb-2 
                  md:mb-0
                  text-sm md:text-base
                  text-center">&copy; {new Date().getFullYear()} LingoTongue. All rights reserved.</p>
                        <div className="flex 
                    space-x-4
                    text-sm md:text-base">
                            <a href="#" className="hover:underline">Privacy</a>
                            <a href="#" className="hover:underline">Terms</a>
                            <a href="#" className="hover:underline">Contact</a>
                        </div>
                    </div>
                </footer>

            </div>

        </div>

    </>

)
}

export default Home