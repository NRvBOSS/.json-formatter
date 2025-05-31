const fs = require("fs");

fs.readFile("questions.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const lines = data.split("\n");
  const questions = [];
  let currentQuestion = null;

  const questionRegex = /^(\d+): (.+)/;
  const answerRegex = /^([A-E])\. (.+)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "") continue;

    const questionMatch = line.match(questionRegex);
    const answerMatch = line.match(answerRegex);

    if (questionMatch) {
      // Yeni sual başlayır
      if (currentQuestion) {
        questions.push(currentQuestion);
      }

      currentQuestion = {
        id: questionMatch[1],
        text: questionMatch[2],
        options: {},
        correct: null, // Əvvəlcə null qoyuruq, sonra A cavabını doğru hesab edəcəyik
      };
    } else if (answerMatch && currentQuestion) {
      const optionKey = answerMatch[1];
      const optionText = answerMatch[2];
      currentQuestion.options[optionKey] = optionText;

      // Əgər bu A cavabıdırsa, onu doğru cavab olaraq qeyd et
      if (optionKey === "A") {
        currentQuestion.correct = optionText;
      }
    }
  }

  // Son sualı da əlavə et
  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  fs.writeFile("output.json", JSON.stringify(questions, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("output.json uğurla yaradıldı.");
  });
});