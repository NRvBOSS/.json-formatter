const fs = require('fs')
const { json } = require('stream/consumers')

fs.readFile('questions.txt', 'utf-8', (err, data) => {
    if (err){
        console.error('Erro reading file:', err)
        return
    }

    const lines = data.split('\n')
    if(lines.length === 0) {
        console.error('File is empty!')
    }


    const questionIdRegex = /(\d+): (.+)/
    const questions = []
    if (questionIdRegex.test(lines[0])){
        const questionId = lines[0].match(questionIdRegex)[1]
        const questionText = lines[0].match(questionIdRegex)[2]
        questions.push({ id: questionId, text: questionText})
    }

    
    const answerRegex = /([A-E]): (.+)/
    const answers = []
    if (answerRegex.test(lines[0])){
        const answerFirstSymbol = lines[0].match(answerRegex)[1]
        const answerText = lines[0].match(answerRegex)[2]
        answers.push({ firstSymbol: answerFirstSymbol, text: answerText})
    }

    const correctAnswerRegex = /Correct: ([A-E])/
    if (correctAnswerRegex.test(lines[0])){
        const correctAnswerRegex = lines[0].match(answerRegex)[1]
        answers.push({ correctAnswer: correctAnswerRegex })
    }


    jsonData = {
        questions:{
            questions,
        },
        answers: answerRegex,
        correct: correctAnswerRegex
    }

})