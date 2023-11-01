import { useState } from "react"

import Button from '../../components/button'
import TextArea from '../../components/textArea'
import Input from '../../components/input'
import { toastSuccess, toastError } from '../../components/toast'

import { removeStopwords } from 'stopword'

const Index = () => {
    const [documentInput, setDocumentInput] = useState('')
    const [documentOutput, setDocumentOutput] = useState('')
    const [numSentencesInSummary, setNumSentencesInSummary] = useState(2)

    const punctuation = /[!"#$%&'()*+,-./:<=>?@[\\\]^_`{|}~\n]/g

    // Step 1: Preprocessing and Tokenization
    function preprocessText(text) {
        const sentences = text.split('.').filter(sentence => sentence.trim() !== '')
        return sentences
    }

    function tokenizeSentence(sentence) {
        return sentence.toLowerCase().replace(punctuation, '').trim().match(/\w+|[.,!?'\n']/g) || []
    }

    // Step 2: Create word frequency table and remove stopwords
    function calculateWordFrequencies(sentences) {
        const wordFrequencies = {}

        sentences.forEach(sentence => {
            const words = removeStopwords(tokenizeSentence(sentence))
            words.forEach(word => {
                wordFrequencies[word] = (wordFrequencies[word] || 0) + 1
            })
        })

        return wordFrequencies
    }

    // Step 3: Calculate sentence scores
    function scoreSentences(sentences, wordFrequencies) {
        return sentences.map(sentence => {
            const words = tokenizeSentence(sentence)
            const score = words.reduce((accum, word) => accum + (wordFrequencies[word] || 0), 0)
            sentence = sentence.replace(/[\n]/g, '').trim()
            return { sentence, score }
        })
    }

    // Step 4: Generate summary
    function generateSummary(text, numSentences) {
        const sentences = preprocessText(text)
        const wordFrequencies = calculateWordFrequencies(sentences)
        const sentenceScores = scoreSentences(sentences, wordFrequencies)

        sentenceScores.sort((a, b) => b.score - a.score)
        const summarySentences = sentenceScores.slice(0, numSentences).map(item => item.sentence)

        return summarySentences.join('. ') + '.'
    }

    const handleSummary = () => {
        if (!documentInput.length) return toastError('Document is required!')
        if (numSentencesInSummary > documentInput.split('.').length - 1) return toastError('Invalid summary sentence number!')

        const newDocument = generateSummary(documentInput, numSentencesInSummary)
        setDocumentOutput(newDocument)
        toastSuccess('Summary document success!')
    }

    return (
        <div className='flex flex-col gap-4'>
            <p className='py-2 text-xl font-medium text-center shadow-md'>Summary Document NLP - 231</p>
            <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='flex-1 w-full'>
                    <TextArea
                        value={documentInput}
                        onChange={e => setDocumentInput(e.target.value)}
                        rows="26"
                        placeholder="Write your text here..."
                    />
                </div>
                <div>
                    <Button
                        title='Summary >>'
                        onClick={handleSummary}
                    />
                </div>
                <div className='flex-1 w-full'>
                    <TextArea
                        value={documentOutput}
                        onChange={() => { }}
                        rows="26"
                        disabled
                    />
                </div>
            </div>
            <div className="flex items-center gap-10 font-medium">
                <p>{documentInput.length} Characters</p>
                <div className='flex items-center gap-4'>
                    <Input
                        type="number"
                        value={numSentencesInSummary}
                        onChange={e => setNumSentencesInSummary(e.target.value)}
                    />
                    <p> / {documentInput.split('.').length - 1} Sentences</p>
                </div>
            </div>
        </div>
    )
}

export default Index