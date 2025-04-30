const fs = require('fs')

fs.readFile('questions.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err)
        return
    }

    const lines = data.split('\n')
    const questions = []
    let currentQuestion = null

    const questionRegex = /^(\d+): (.+)/
    const answerRegex = /^([A-E])\. (.+)/
    const correctAnswerRegex = /^Correct: ([A-E])/

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        if (line === '') continue

        const questionMatch = line.match(questionRegex)
        const answerMatch = line.match(answerRegex)
        const correctMatch = line.match(correctAnswerRegex)

        if (questionMatch) {

            // Start new question
            if (currentQuestion) {
                questions.push(currentQuestion)
            }
            
            currentQuestion = {
                id: questionMatch[1],
                text: questionMatch[2],
                options: {},
                correct: null
            }
        } else if (answerMatch && currentQuestion) {
            const optionKey = answerMatch[1]
            const optionText = answerMatch[2]
            currentQuestion.options[optionKey] = optionText
        } else if (correctMatch && currentQuestion) {
            currentQuestion.correct = correctMatch[1]
        }
    }

    // Add last question
    if (currentQuestion) {
        questions.push(currentQuestion)
    }

    fs.writeFile('output.json', JSON.stringify(questions, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err)
            return
        }
        console.log('output.json created successfully.')
    })
})
