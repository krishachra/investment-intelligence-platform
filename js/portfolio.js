
const holdingsBody = document.getElementById("holdings-body");
const addInvestmentBtn = document.getElementById("add-investment-btn");
const formSection = document.getElementById("investment-form-section");
const investmentForm = document.getElementById("investment-form");
const cancelInvestmentBtn = document.getElementById("cancel-investment-btn");

// Sample holdings. All summary values will be calculated from these.
const holdings = [
    {
        stockName: "Reliance Industries",
        quantity: 10,
        buyPrice: 1250,
        currentPrice: 1350
    },
    {
        stockName: "HDFC Bank",
        quantity: 5,
        buyPrice: 1600,
        currentPrice: 1720
    },
    {
        stockName: "Infosys",
        quantity: 8,
        buyPrice: 1500,
        currentPrice: 1420
    }
];

const formatINR = (amount) =>
    "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

// Calculate and update the four summary cards.
function updateSummary() {
    let totalInvested = 0;
    let currentValue = 0;

    holdings.forEach((holding) => {
        totalInvested += holding.quantity * holding.buyPrice;
        currentValue += holding.quantity * holding.currentPrice;
    });

    const totalProfit = currentValue - totalInvested;
    const totalReturn = totalInvested > 0
        ? (totalProfit / totalInvested) * 100
        : 0;

    document.getElementById("total-invested").textContent =
        formatINR(totalInvested);

    document.getElementById("current-value").textContent =
        formatINR(currentValue);

    const profitElement = document.getElementById("total-profit");
    profitElement.textContent =
        (totalProfit > 0 ? "+" : totalProfit < 0 ? "-" : "") +
        formatINR(Math.abs(totalProfit));

    profitElement.classList.toggle("positive", totalProfit > 0);
    profitElement.classList.toggle("negative", totalProfit < 0);

    const returnElement = document.getElementById("total-return");
    returnElement.textContent =
        `${totalReturn > 0 ? "+" : ""}${totalReturn.toFixed(2)}%`;

    returnElement.classList.toggle("positive", totalReturn > 0);
    returnElement.classList.toggle("negative", totalReturn < 0);
}

// Render the holdings table from the array.
function renderHoldings() {
    holdingsBody.replaceChildren();

    holdings.forEach((holding) => {
        const invested = holding.quantity * holding.buyPrice;
        const value = holding.quantity * holding.currentPrice;
        const profitLoss = value - invested;

        const row = document.createElement("tr");

        const values = [
            holding.stockName,
            holding.quantity.toLocaleString("en-IN"),
            formatINR(holding.buyPrice),
            formatINR(holding.currentPrice),
            formatINR(value)
        ];

        values.forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const profitCell = document.createElement("td");
        profitCell.textContent =
            (profitLoss > 0 ? "+" : profitLoss < 0 ? "-" : "") +
            formatINR(Math.abs(profitLoss));

        profitCell.classList.toggle("positive", profitLoss > 0);
        profitCell.classList.toggle("negative", profitLoss < 0);

        row.appendChild(profitCell);
        holdingsBody.appendChild(row);
    });

    updateSummary();
}

// Open the form.
addInvestmentBtn.addEventListener("click", () => {
    formSection.hidden = false;
    investmentForm.reset();
    document.getElementById("stock-name").focus();
});

// Close the form.
cancelInvestmentBtn.addEventListener("click", () => {
    formSection.hidden = true;
    investmentForm.reset();
});

// Add a new holding.
investmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const stockName = document.getElementById("stock-name").value.trim();
    const quantity = Number(document.getElementById("quantity").value);
    const buyPrice = Number(document.getElementById("buy-price").value);
    const currentPrice = Number(
        document.getElementById("current-price").value
    );

    if (
        !stockName ||
        !Number.isInteger(quantity) ||
        quantity <= 0 ||
        !Number.isFinite(buyPrice) ||
        buyPrice <= 0 ||
        !Number.isFinite(currentPrice) ||
        currentPrice < 0
    ) {
        alert("Please enter valid investment details.");
        return;
    }

    holdings.push({
        stockName,
        quantity,
        buyPrice,
        currentPrice
    });

    renderHoldings();

    investmentForm.reset();
    formSection.hidden = true;
});

// Initial page setup.
renderHoldings();
