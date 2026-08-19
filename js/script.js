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