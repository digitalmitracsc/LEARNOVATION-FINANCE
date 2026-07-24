// ======================================
// LEARNOVATION FINANCE
// Professional DCF Calculator
// Version 2.0
// ======================================

const calculateBtn = document.getElementById("calculateBtn");

if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateDCF);
}

function calculateDCF() {

    const fcf = parseFloat(document.getElementById("fcf").value);
    const growth = parseFloat(document.getElementById("growth").value) / 100;
    const discount = parseFloat(document.getElementById("discount").value) / 100;
    const terminal = parseFloat(document.getElementById("terminal").value) / 100;
    const shares = parseFloat(document.getElementById("shares").value);
    const cmp = parseFloat(document.getElementById("cmp").value);

    if (
        isNaN(fcf) ||
        isNaN(growth) ||
        isNaN(discount) ||
        isNaN(terminal) ||
        isNaN(shares) ||
        isNaN(cmp)
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Validation
    if (discount <= terminal) {
        alert("Discount Rate should be greater than Terminal Growth Rate.");
        return;
    }

    let totalValue = 0;
    let currentFCF = fcf;

    // 10 Year Projection
    for (let year = 1; year <= 10; year++) {

        currentFCF = currentFCF * (1 + growth);

        totalValue += currentFCF / Math.pow((1 + discount), year);

    }

    // Terminal Value
    const terminalValue =
        (currentFCF * (1 + terminal)) /
        (discount - terminal);

    const discountedTerminal =
        terminalValue /
        Math.pow((1 + discount), 10);

    const enterpriseValue =
        totalValue + discountedTerminal;

    const intrinsic =
        enterpriseValue / shares;

    // Margin of Safety
    const mos =
        ((intrinsic - cmp) / intrinsic) * 100;
    // Upside Potential
    const upside =
        ((intrinsic - cmp) / cmp) * 100;
    // Result
    document.getElementById("intrinsicValue").innerHTML =
        "₹" + intrinsic.toFixed(2);

    document.getElementById("currentPrice").innerHTML =
        "₹" + cmp.toFixed(2);

    document.getElementById("marginSafety").innerHTML =
        mos.toFixed(2) + "%";
    document.getElementById("upsidePotential").innerHTML =
    upside.toFixed(2) + "%";
    
    const status =
        document.getElementById("valuationStatus");

    status.className = "";

if (cmp < intrinsic * 0.80) {

    status.innerHTML = "🟢 BUY";
    status.classList.add("buy");

}
else if (cmp <= intrinsic) {

    status.innerHTML = "🟡 HOLD";
    status.classList.add("hold");

}
else {

    status.innerHTML = "🔴 AVOID";
    status.classList.add("avoid");

}

}
// Analysis Summary

let summary = "";

if (cmp < intrinsic * 0.80) {

    summary =
        "The stock is trading significantly below its estimated intrinsic value. Based on the assumptions entered, it appears undervalued and may offer a good long-term investment opportunity.";

}
else if (cmp <= intrinsic) {

    summary =
        "The stock is trading close to its intrinsic value. It appears fairly valued, so holding or accumulating gradually may be appropriate.";

}
else {

    summary =
        "The stock is trading above its estimated intrinsic value. Based on these assumptions, it appears overvalued and investors should be cautious.";

}

document.getElementById("analysisSummary").innerHTML = summary;

// ======================================
// Reset Calculator
// ======================================

const resetBtn = document.getElementById("resetBtn");

if (resetBtn) {

    resetBtn.addEventListener("click", resetCalculator);

}

function resetCalculator() {

    document.getElementById("fcf").value = "";
    document.getElementById("growth").value = "";
    document.getElementById("discount").value = "";
    document.getElementById("terminal").value = "";
    document.getElementById("shares").value = "";
    document.getElementById("cmp").value = "";

    document.getElementById("intrinsicValue").innerHTML = "₹0.00";
    document.getElementById("currentPrice").innerHTML = "₹0.00";
    document.getElementById("upsidePotential").innerHTML = "0%";
    document.getElementById("marginSafety").innerHTML = "0%";
    document.getElementById("valuationStatus").innerHTML = "WAIT";

    document.getElementById("analysisSummary").innerHTML =
        "Fill the values and click Calculate.";

}