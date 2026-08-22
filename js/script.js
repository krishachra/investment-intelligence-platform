const portfolio = {
    totalInvested: 162000,
    currentValue: 184520,
    totalProfit: 22520,
    totalReturn: 13.9
};
document.getElementById("total-invested").textContent =
    `₹${portfolio.totalInvested.toLocaleString("en-IN")}`;

document.getElementById("current-value").textContent =
    `₹${portfolio.currentValue.toLocaleString("en-IN")}`;

document.getElementById("total-profit").textContent =
    `₹${portfolio.totalProfit.toLocaleString("en-IN")}`;

document.getElementById("total-return").textContent =
    `${portfolio.totalReturn}%`;
    
const ctx = document.getElementById("portfolioChart");

const portfolioData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],

    datasets: [{
        label: "Portfolio Value",
        data: [
            145000,
            151000,
            148000,
            158000,
            165000,
            172000,
            179000,
            184520
        ],

        borderWidth: 2,
        tension: 0.3,
        fill: true
    }]
};

new Chart(ctx, {
    type: "line",

    data: portfolioData,

    options: {
        responsive: true,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});