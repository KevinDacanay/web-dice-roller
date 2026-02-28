// Configuration: Update this URL to your deployed Azure App Service URL
const API_BASE_URL = "http://localhost:3000"; 

// Initialize: Wake up server and perform initial roll
function initialize() {
    wakeUpServer();
    rollDice();
}

// Asynchronously wake up the server
async function wakeUpServer() {
    try {
        console.log("Waking up server...");
        await fetch(`${API_BASE_URL}/api/wakeup`);
        console.log("Server is awake.");
    } catch (error) {
        console.warn("Server wake-up check failed (might be offline or CORS error):", error);
    }
}

// Random Number Generator via API
async function rollDice(sides = 20) {
    const resultsDiv = document.getElementById('dice-results');
    resultsDiv.innerHTML = `<div class="dice-result dice-rolling">...</div>`;

    try {
        const response = await fetch(`${API_BASE_URL}/api/roll?sides=${sides}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        resultsDiv.innerHTML = `<div class="dice-result dice-rolling">${data.result}</div>`;
    } catch (error) {
        console.error("Error rolling dice:", error);
        resultsDiv.innerHTML = `<div class="dice-result error">Err</div>`;
    }
}

// Demonstrate CORS Failure
async function demonstrateCorsFailure() {
    try {
        await fetch(`${API_BASE_URL}/api/cors-fail`);
        alert("Unexpected: Request succeeded (CORS did not fail).");
    } catch (error) {
        alert("Success: CORS Failure demonstrated! Check console for 'Access-Control-Allow-Origin' error.");
        console.log("CORS Failure captured:", error);
    }
}
