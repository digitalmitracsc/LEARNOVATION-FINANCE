// ======================================
// LEARNOVATION FINANCE
// Professional DCF Calculator
// Version 2.0
// ======================================
// ======================================
// Indian Currency Formatter
// ======================================

function formatCurrency(value){

    return "₹" + Number(value).toLocaleString("en-IN",{

        minimumFractionDigits:2,

        maximumFractionDigits:2

    });

}
// ======================================
// DCF Chart
// ======================================

let dcfChart = null;
// ======================================
// Reusable DCF Calculator
// ======================================

function calculateScenarioValue(
    fcf,
    growth,
    discount,
    terminal,
    shares
){

    let totalValue = 0;
    let currentFCF = fcf;

    for(let year = 1; year <= 10; year++){

        currentFCF = currentFCF * (1 + growth);

        totalValue +=
            currentFCF /
            Math.pow(1 + discount, year);

    }

    const terminalValue =
        (currentFCF * (1 + terminal)) /
        (discount - terminal);

    const discountedTerminal =
        terminalValue /
        Math.pow(1 + discount, 10);

    const enterpriseValue =
        totalValue + discountedTerminal;

    return enterpriseValue / shares;

}
const calculateBtn = document.getElementById("calculateBtn");

if (calculateBtn) {
    calculateBtn.addEventListener("click", calculateDCF);
}

function calculateDCF() {const resultBox = document.querySelector(".result-box");

if(resultBox){

    resultBox.classList.remove("show");

}

    const fcf = parseFloat(document.getElementById("fcf").value);
    const growth = parseFloat(document.getElementById("growth").value) / 100;
    const discount = parseFloat(document.getElementById("discount").value) / 100;
    const terminal = parseFloat(document.getElementById("terminal").value) / 100;
    const shares = parseFloat(document.getElementById("shares").value);
    const cmp = parseFloat(document.getElementById("cmp").value);
    
    const cash = parseFloat(document.getElementById("cash").value) || 0;
const debt = parseFloat(document.getElementById("debt").value) || 0;

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

     // ======================================
// Input Validation
// ======================================

if (fcf <= 0) {

    alert("Free Cash Flow must be greater than 0.");
    return;

}

if (growth < 0 || growth > 0.30) {

    alert("Growth Rate should be between 0% and 30%.");
    return;

}

if (discount <= 0 || discount > 0.30) {

    alert("Discount Rate should be between 1% and 30%.");
    return;

}

if (terminal < 0 || terminal > 0.08) {

    alert("Terminal Growth should be between 0% and 8%.");
    return;

}

if (shares <= 0) {

    alert("Shares Outstanding must be greater than 0.");
    return;

}

if (cmp <= 0) {

    alert("Current Market Price must be greater than 0.");
    return;

}
    // Validation
    if (discount <= terminal) {
        alert("Discount Rate should be greater than Terminal Growth Rate.");
        return;
    }

    let totalValue = 0;
    let currentFCF = fcf;
    let projectionHTML = "";
    let chartLabels = [];
    let chartValues = [];
const projectionTable = document.getElementById("projectionTable");

projectionTable.innerHTML = "";
const ctx = document.getElementById("dcfChart");

if (ctx) {

    if (dcfChart) {

        dcfChart.destroy();

    }

    dcfChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: chartLabels,

            datasets: [{

                label: "Projected Free Cash Flow",

                data: chartValues,

                borderColor: "#22C55E",

                backgroundColor: "rgba(34,197,94,0.15)",

                borderWidth: 3,

                fill: true,

                tension: 0.35

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: true

                }

            }

        }

    });

}
    // 10 Year Projection
    for (let year = 1; year <= 10; year++) {

    currentFCF = currentFCF * (1 + growth);

    const presentValue =
        currentFCF / Math.pow((1 + discount), year);

    totalValue += presentValue;

    projectionHTML += `
        <tr>
            <td>${year}</td>
            <td>₹${currentFCF.toFixed(2)}</td>
            <td>₹${presentValue.toFixed(2)}</td>
        </tr>
    `;
    chartLabels.push("Year " + year);
chartValues.push(currentFCF.toFixed(2));

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

    const equityValue = enterpriseValue + cash - debt;

    const intrinsic = equityValue / shares;
    console.log("Enterprise Value:", enterpriseValue);
    console.log("Equity Value:", equityValue);
        document.getElementById("terminalValueDisplay").innerHTML =
    formatCurrency(discountedTerminal);

    // Margin of Safety
    const mos =
        ((intrinsic - cmp) / intrinsic) * 100;
    // Upside Potential
    const upside =
        ((intrinsic - cmp) / cmp) * 100;
    // Result
    document.getElementById("intrinsicValue").innerHTML =
    formatCurrency(intrinsic);

document.getElementById("currentPrice").innerHTML =
    formatCurrency(cmp);
    document.getElementById("enterpriseValue").innerHTML =
    "₹" + enterpriseValue.toLocaleString("en-IN", {
        maximumFractionDigits: 2
    }) + " Cr";

document.getElementById("equityValue").innerHTML =
    "₹" + equityValue.toLocaleString("en-IN", {
        maximumFractionDigits: 2
    }) + " Cr";

    document.getElementById("marginSafety").innerHTML =
        mos.toFixed(2) + "%";
    document.getElementById("upsidePotential").innerHTML =
    upside.toFixed(2) + "%";
    
    const status =
        document.getElementById("valuationStatus");
        generateSensitivityMatrix(
    growth * 100,
    discount * 100,
    intrinsic,
    cmp
);
const meterFill = document.getElementById("meterFill");
const meterText = document.getElementById("meterText");
    status.className = "";

status.className = "";

if (cmp < intrinsic * 0.80) {

    status.innerHTML = "🟢 BUY";
    status.classList.add("buy");

    meterFill.style.width = "85%";
    meterFill.style.background = "#22C55E";
    meterText.innerHTML = "Undervalued - Good Buying Opportunity";

}
else if (cmp <= intrinsic) {

    status.innerHTML = "🟡 HOLD";
    status.classList.add("hold");

    meterFill.style.width = "55%";
    meterFill.style.background = "#FACC15";
    meterText.innerHTML = "Fairly Valued";

}
else {

    status.innerHTML = "🔴 AVOID";
    status.classList.add("avoid");

    meterFill.style.width = "25%";
    meterFill.style.background = "#EF4444";
    meterText.innerHTML = "Overvalued";

}
updateGauge(mos);
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
document.getElementById("assumptionFCF").innerHTML = formatCurrency(fcf);
document.getElementById("assumptionGrowth").innerHTML = (growth * 100).toFixed(1) + "%";
document.getElementById("assumptionDiscount").innerHTML = (discount * 100).toFixed(1) + "%";
document.getElementById("assumptionTerminal").innerHTML = (terminal * 100).toFixed(1) + "%";
document.getElementById("assumptionShares").innerHTML = shares.toLocaleString("en-IN");
document.getElementById("projectionTable").innerHTML = projectionHTML;
// ======================================
// Scenario Analysis
// ======================================

const bearGrowth = Math.max(growth - 0.02, 0);
const bearDiscount = discount + 0.02;

const bullGrowth = growth + 0.02;
const bullDiscount = Math.max(discount - 0.02, terminal + 0.01);

const bearValue = calculateScenarioValue(
    fcf,
    bearGrowth,
    bearDiscount,
    terminal,
    shares
);

const baseValue = intrinsic;

const bullValue = calculateScenarioValue(
    fcf,
    bullGrowth,
    bullDiscount,
    terminal,
    shares
);

document.getElementById("bearGrowth").innerHTML =
    (bearGrowth * 100).toFixed(1) + "%";

document.getElementById("bearDiscount").innerHTML =
    (bearDiscount * 100).toFixed(1) + "%";

document.getElementById("bearValue").innerHTML =
    formatCurrency(bearValue);

document.getElementById("baseGrowth").innerHTML =
    (growth * 100).toFixed(1) + "%";

document.getElementById("baseDiscount").innerHTML =
    (discount * 100).toFixed(1) + "%";

document.getElementById("baseValue").innerHTML =
    formatCurrency(baseValue);

document.getElementById("bullGrowth").innerHTML =
    (bullGrowth * 100).toFixed(1) + "%";

document.getElementById("bullDiscount").innerHTML =
    (bullDiscount * 100).toFixed(1) + "%";

document.getElementById("bullValue").innerHTML =
    formatCurrency(bullValue);
// ======================================
// Report Header
// ======================================

const companyName =
    document.getElementById("companyName").value.trim();

const stockSymbol =
    document.getElementById("stockSymbol").value.trim();

document.getElementById("reportCompany").innerHTML =
    companyName || "DCF Valuation Report";

document.getElementById("reportSymbol").innerHTML =
    stockSymbol || "Stock Symbol";

if(resultBox){

    setTimeout(()=>{

        resultBox.classList.add("show");

    },150);

}

}

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
    const status = document.getElementById("valuationStatus");

status.innerHTML = "WAIT";

status.className = "";

    document.getElementById("analysisSummary").innerHTML =
        "Fill the values and click Calculate.";
document.getElementById("meterFill").style.width = "0%";
document.getElementById("meterFill").style.background = "#22C55E";

document.getElementById("meterText").innerHTML =
    "Waiting for calculation...";
}

// ======================================
// PDF Export
// ======================================

const pdfBtn = document.getElementById("pdfBtn");

if (pdfBtn) {

    pdfBtn.addEventListener("click", downloadPDF);

}

function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("LEARNOVATION FINANCE", 20, y);

    y += 12;

    doc.setFontSize(14);
    doc.text("DCF Valuation Report", 20, y);

    y += 15;

    doc.setFontSize(11);

    doc.text(
        "Company : " +
        document.getElementById("reportCompany").innerText,
        20,
        y
    );

    y += 8;

    doc.text(
        "Symbol : " +
        document.getElementById("reportSymbol").innerText,
        20,
        y
    );

    y += 12;

    doc.text(
        "Intrinsic Value : " +
        document.getElementById("intrinsicValue").innerText,
        20,
        y
    );

    y += 8;

    doc.text(
        "Current Price : " +
        document.getElementById("currentPrice").innerText,
        20,
        y
    );

    y += 8;

    doc.text(
        "Margin of Safety : " +
        document.getElementById("marginSafety").innerText,
        20,
        y
    );

    y += 8;

    doc.text(
        "Recommendation : " +
        document.getElementById("valuationStatus").innerText,
        20,
        y
    );

    y += 15;

    doc.text("Analysis Summary", 20, y);

    y += 8;

    doc.setFontSize(10);

    doc.text(
        document.getElementById("analysisSummary").innerText,
        20,
        y,
        {
            maxWidth:170
        }
    );

    doc.save("DCF_Report.pdf");

}
// ======================================
// Intrinsic Value Gauge
// ======================================

function updateGauge(marginSafety){

    const fill = document.getElementById("gaugeFill");
    const status = document.getElementById("gaugeStatus");

    if(!fill || !status) return;

    let angle = -90;

    if(marginSafety >= 30){

        angle = 0;
        status.innerText = "BUY";

    }else if(marginSafety >= 10){

        angle = -45;
        status.innerText = "HOLD";

    }else{

        angle = -90;
        status.innerText = "AVOID";

    }

    fill.style.transform = `rotate(${angle}deg)`;

}

// ======================================
// Sensitivity Matrix
// ======================================

function generateSensitivityMatrix(
    baseGrowth,
    baseDiscount,
    baseValue,
    cmp
){

    const head =
        document.getElementById("sensitivityHead");

    const body =
        document.getElementById("sensitivityBody");

    if(!head || !body) return;

    head.innerHTML = "";
    body.innerHTML = "";
    const discountRates = [
    baseDiscount - 2,
    baseDiscount - 1,
    baseDiscount,
    baseDiscount + 1,
    baseDiscount + 2
];

const growthRates = [
    baseGrowth - 2,
    baseGrowth - 1,
    baseGrowth,
    baseGrowth + 1,
    baseGrowth + 2
];

let header = "<tr><th>Growth \\ Discount</th>";

discountRates.forEach(rate => {

    header += `<th>${rate.toFixed(1)}%</th>`;

});

header += "</tr>";

head.innerHTML = header;
growthRates.forEach(growth => {

    let row = `<tr><th>${growth.toFixed(1)}%</th>`;

    discountRates.forEach(discount => {

        let value =
            baseValue *
            (1 + (growth - baseGrowth) * 0.08) *
            (1 - (discount - baseDiscount) * 0.06);

        let cellClass = "";

if (value > cmp * 1.15) {

    cellClass = "heat-buy";

}
else if (value >= cmp * 0.90) {

    cellClass = "heat-hold";

}
else {

    cellClass = "heat-avoid";

}

row += `
<td class="${cellClass}">
    ${formatCurrency(value)}
</td>
`;

    });

    row += "</tr>";

    body.innerHTML += row;

});
}