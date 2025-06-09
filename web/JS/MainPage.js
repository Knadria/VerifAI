async function detectText() {
  const input = document.getElementById("AI-Checker").value.trim();
  const resultContainer = document.getElementById("resultContainer");
  const scorePercent = document.getElementById("scorePercent");
  const charCount = document.getElementById("charCount");
  const resultHeading = resultContainer.querySelector("h2");

  const wordCount = input === "" ? 0 : input.split(/\s+/).length;
  const charLength = input.length;

  if (input.length === 0) {
    scorePercent.textContent = `0%`;
    charCount.innerHTML = `0 Characters<br>0 Words`;
    resultHeading.textContent = "Please enter some text to detect.";
    resultContainer.style.display = "block";
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: input })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const score = Math.round(data.score * 100); // Convert 0.0–1.0 to percentage

    // Update score and counts
    scorePercent.textContent = `${score}%`;
    charCount.innerHTML = `${charLength} Characters<br>${wordCount} Words`;

    // Update heading based on thresholds
    if (score > 75) {
      resultHeading.textContent = "Your Text is Most Likely AI/GPT generated";
    } else if (score > 50) {
      resultHeading.textContent = "Your Text is Probably AI/GPT generated";
    } else if (score > 25) {
      resultHeading.textContent = "Your Text is Least Likely AI/GPT generated";
    } else {
      resultHeading.textContent = "Your Text is Not AI/GPT generated";
    }

    resultContainer.style.display = "block";
  } catch (error) {
    console.error('Error during detection:', error);
    alert('Error analyzing the text. Please try again.');
  }
}
