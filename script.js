let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.getElementById('voiceSelect');
let textInput = document.getElementById('textInput');

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ''; // Clear existing options
    voices.forEach((voice, i) => {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
    speech.voice = voices[0]; 
};

function validateInput(text) {
    const regex = /[A-Za-z]+/;
    return regex.test(text);
}


document.getElementById('speechForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let text = textInput.value.trim();

    if (!validateInput(text)) {
        alert("Please enter valid text with at least one alphabetic character.");
        return;
    }

    speech.text = text;
    speech.voice = voices[voiceSelect.value];
    
    window.speechSynthesis.speak(speech);
});
