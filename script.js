
const urlInput = document.getElementById("urlInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultBox = document.getElementById("resultBox");

analyzeBtn.addEventListener("click", analyzeUrl);

function analyzeUrl() {
    const url = urlInput.value.trim().toLowerCase();

 
    resultBox.style.display = "block";
    resultBox.className = "";

   
    if (url === "") {
        showResult(
            "warning",
            "⚠️ Please enter a banking website URL."
        );
        return;
    }

    let riskScore = 0;
    let issues = [];

    if (url.length > 75) {
        riskScore++;
        issues.push("Unusually long URL");
    }

    if (url.includes("@")) {
        riskScore++;
        issues.push("Contains '@' symbol");
    }

    
    if (url.startsWith("http://")) {
        riskScore++;
        issues.push("Website is not using HTTPS");
    }

    const phishingKeywords = [
        "verify",
        "update",
        "confirm",
        "secure-login",
        "free"
    ];

    phishingKeywords.forEach(keyword => {
        if (url.includes(keyword)) {
            riskScore++;
            issues.push(`Phishing keyword detected: "${keyword}"`);
        }
    });

   
    if (riskScore === 0) {
        showResult(
            "safe",
            "🟢 This link looks safe for online banking."
        );
    } else if (riskScore <= 2) {
        showResult(
            "warning",
            "🟡 This link looks suspicious:<br>" + issues.join("<br>")
        );
    } else {
        showResult(
            "danger",
            "🔴 High-risk phishing link detected:<br>" + issues.join("<br>")
        );
    }
}

function showResult(type, message) {
    resultBox.classList.add(type);
    resultBox.innerHTML = message;
}
