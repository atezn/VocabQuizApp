// 1. SQL INJECTION DEMO
async function runInjection() {
    const term = document.getElementById('search-term').value;
    const resultBox = document.getElementById('injection-result');

    resultBox.textContent = "Loading...";

    try {
        // Calls the "UnsafeSearch" endpoint we built in Phase 6
        const data = await ApiService.unsafeSearch(term);
        
        // Pretty print the JSON so it looks like a "Hacker Dump"
        resultBox.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        resultBox.textContent = "Error: " + error.message;
    }
}

// 2. 1NF VIOLATION DEMO
async function submitBadForm() {
    const name = document.getElementById('contact-name').value;
    const msg = document.getElementById('contact-msg').value;
    const info = document.getElementById('contact-info').value;
    const statusBox = document.getElementById('contact-status');

    try {
        // Calls the "Contact" endpoint
        await ApiService.sendContact(name, msg, info);
        
        statusBox.style.color = "green";
        statusBox.textContent = "✅ Success! Data stored in unnormalized format.";
        
        // Clear inputs
        document.getElementById('contact-name').value = "";
        document.getElementById('contact-msg').value = "";
        document.getElementById('contact-info').value = "";

    } catch (error) {
        statusBox.style.color = "red";
        statusBox.textContent = "❌ Failed: " + error.message;
    }
}