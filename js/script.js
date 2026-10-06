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

const chartData = {
    "1M": {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        data: [179000, 181500, 183200, 184520]
    },

    "6M": {
        labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        data: [148000, 158000, 165000, 172000, 179000, 184520]
    },

    "1Y": {
        labels: [
            "Sep", "Oct", "Nov", "Dec",
            "Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug"
        ],
        data: [
            132000,
            138000,
            141000,
            145000,
            145000,
            151000,
            148000,
            158000,
            165000,
            172000,
            179000,
            184520
        ]
    },

    "ALL": {
        labels: [
            "2024",
            "2025",
            "Jan 2026",
            "Mar 2026",
            "May 2026",
            "Aug 2026"
        ],
        data: [
            100000,
            120000,
            145000,
            158000,
            172000,
            184520
        ]
    }
};

const portfolioChart = new Chart(ctx, {
    type: "line",

    data: {
        labels: chartData["1M"].labels,

        datasets: [{
            label: "Portfolio Value",

            data: chartData["1M"].data,

            borderWidth: 2,

            tension: 0.3,

            fill: true
        }]
    },

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

const filterButtons = document.querySelectorAll(".time-filter button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const period = button.dataset.period;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        portfolioChart.data.labels = chartData[period].labels;
        portfolioChart.data.datasets[0].data = chartData[period].data;

        portfolioChart.update();
    });

});