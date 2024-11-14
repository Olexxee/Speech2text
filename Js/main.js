const resultElement = document.getElementById("result");
let recognition;

function startConverting() {
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    setupRecognition(recognition);
    recognition.start();
  } else {
    resultElement.innerHTML =
      "Your browser does not support speech recognition.";
  }
}

function setupRecognition(recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = function (event) {
    const { finalTranscript, interTranscript } = processResult(event.results);

    // Use processResult to get the formatted HTML string

    resultElement.innerHTML = finalTranscript + "<br>" + interTranscript;
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
    resultElement.innerHTML = `Error: ${event.error}`;
  };

  recognition.onend = function () {
    console.log("Speech recognition ended.");
  };
}

function processResult(results) {
  let finalTranscript = "";
  let interTranscript = "";

  for (let i = 0; i < results.length; i++) {
    const transcript = results[i][0].transcript;

    if (results[i].isFinal) {
      finalTranscript += transcript + " ";
    } else {
      interTranscript += transcript;
    }
  }

  // Return formatted HTML as a string
  return { finalTranscript, interTranscript };
}

function stopConverting() {
  if (recognition) {
    recognition.stop();
    console.log("Speech recognition stopped.");
  }
}
