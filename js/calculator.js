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

    if (cmp < intrinsic * 0.80) {

        status.innerHTML = "🟢 BUY";

    }
    else if (cmp <= intrinsic) {

        status.innerHTML = "🟡 HOLD";

    }
    else {

        status.innerHTML = "🔴 AVOID";

    }

}