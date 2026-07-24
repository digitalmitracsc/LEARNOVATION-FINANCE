// ======================================
// LEARNOVATION FINANCE
// DCF Calculator
// Version 1.0
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

    if (
        isNaN(fcf) ||
        isNaN(growth) ||
        isNaN(discount) ||
        isNaN(terminal) ||
        isNaN(shares)
    ) {

        alert("Please fill all fields.");

        return;

    }

    let totalValue = 0;
    let currentFCF = fcf;

    for (let year = 1; year <= 10; year++) {

        currentFCF = currentFCF * (1 + growth);

        totalValue += currentFCF / Math.pow((1 + discount), year);

    }

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

    document.getElementById("intrinsicValue").innerHTML =
        "₹" + intrinsic.toFixed(2);

    const status =
        document.getElementById("valuationStatus");

    if (intrinsic > 0) {

        status.innerHTML =
            "Estimated Intrinsic Value per Share";

    }

}