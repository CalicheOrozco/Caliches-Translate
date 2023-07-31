import './App.css'
import { HiSwitchHorizontal } from 'react-icons/hi';
import { RiFileCopyLine } from 'react-icons/ri';
import { FaVolumeUp } from 'react-icons/fa';
import { AUTO_LANGUAGES, VOICES_FOR_LANGUAGES } from './constants'
import { useStore } from './hooks/UseStore'
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

function App () {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 500)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }
  const handleClipboardFrom = () => {
    navigator.clipboard.writeText(fromText).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICES_FOR_LANGUAGES[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  const handleSpeakFrom = () => {
    const utterance = new SpeechSynthesisUtterance(fromText)
    utterance.lang = VOICES_FOR_LANGUAGES[fromLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  const commumStylesColumn = 'Column flex flex-col  rounded-md w-[40%] h-[80%]'
  const commumStylesButton = 'flex justify-end  rounded-md text-gray-400 p-2 gap-2 disabled:text-gray-300 disabled:cursor-not-allowed text-3xl'
  const communStylesIndividualButton = 'lg:hover:text-gray-500 disabled:hover:text-gray-400 disabled:cursor-not-allowed'
  return (
    <>
      <div className="App flex flex-col justify-center items-center h-screen bg-gray-900 gap-y-5">
        <h1 className='text-3xl font-bold text-white'>Caliche's Translate</h1>
        <div className='Row flex justify-around w-full'>
          <div className={`${commumStylesColumn} bg-white`}>
            <LanguageSelector 
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage} />
            <div className='bg-white rounded-md'>
            <TextArea 
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
              loading={loading}
            />
            <div className={`${commumStylesButton} bg-white`}>
            <button className={`${communStylesIndividualButton}`} disabled={result === ''} onClick={handleClipboardFrom}>
              <RiFileCopyLine />
            </button>
            <button className={`${communStylesIndividualButton}`} disabled={result === ''} onClick={handleSpeakFrom}>
              <FaVolumeUp />
            </button>
            </div>
            </div>
          </div>
          <div className='Column'>
            <button className='text-gray-500 cursor-pointer disabled:text-gray-600 disabled:cursor-not-allowed lg:hover:text-gray-400 text-2xl' disabled={fromLanguage === AUTO_LANGUAGES} onClick={interchangeLanguages} >
              <HiSwitchHorizontal  />  
            </button>
          </div>

          <div className={`${commumStylesColumn} bg-gray-200`}>
          <LanguageSelector 
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage} />
            
            <div className='bg-gray-200 rounded-md'>
            <TextArea 
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
            <div className={`${commumStylesButton} bg-gray-200`}>
            <button className={`${communStylesIndividualButton}`} disabled={result === ''} onClick={handleClipboard}>
              <RiFileCopyLine />
            </button>
            <button className={`${communStylesIndividualButton}`} disabled={result === ''} onClick={handleSpeak}>
              <FaVolumeUp />
            </button>
            </div>
            </div>

          </div>

        </div>
        
      </div>
    </>
  )
}

export default App
