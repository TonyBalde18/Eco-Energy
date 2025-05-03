// CONFIGURATION
const CHANNEL_ID = '2856532';
const API_KEY = 'CWT195LLSXNPTBR8';
const FIELD_NUM_1 = 1;
const FIELD_NUM_2 = 2;
const UPDATE_INTERVAL = 15000;

// Chart.js initialization
const ctx = document.getElementById('energyChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Sensor 1 (A)',
                data: [],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231,76,60,0.09)',
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#e74c3c',
                fill: true
            },
            {
                label: 'Sensor 2 (A)',
                data: [],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52,152,219,0.09)',
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#3498db',
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: '#2c3e50', font: { size: 15 } }
            }
        },
        scales: {
            x: { ticks: { color: '#2c3e50' } },
            y: { title: { display: true, text: 'Valor', color: '#2c3e50' }, ticks: { color: '#2c3e50' } }
        },
        animation: {
            duration: 1200,
            easing: 'easeOutElastic'
        }
    }
});

// Fetch Data from ThingSpeak
async function fetchData() {
    try {
        const response = await fetch(
            `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY}&results=8000`
        );
        const data = await response.json();
        const feeds = data.feeds;

        // Prepare data arrays
        const labels = feeds.map(feed => new Date(feed.created_at).toLocaleTimeString());
        const field1Data = feeds.map(feed => parseFloat(feed[`field${FIELD_NUM_1}`]));
        const field2Data = feeds.map(feed => parseFloat(feed[`field${FIELD_NUM_2}`]));

        // Update Chart (show only last 20 points)
        chart.data.labels = labels.slice(-20);
        chart.data.datasets[0].data = field1Data.slice(-20);
        chart.data.datasets[1].data = field2Data.slice(-20);
        chart.update();

        // Update Current Values
        const latestFeed = feeds[feeds.length - 1];
        const field1Value = latestFeed[`field${FIELD_NUM_1}`];
        const field2Value = latestFeed[`field${FIELD_NUM_2}`];
        document.getElementById('currentValue').innerHTML = `
    <b>Sensor 1:</b> ${field1Value} A ⚡<br>
    <b>Sensor 2:</b> ${field2Value} A 🔋
`;



        // Update Table (show last 10 readings)
        const tbody = document.querySelector('#readingsTable tbody');
        tbody.innerHTML = feeds.slice(-10).reverse().map(feed => `
    <tr>
        <td>${new Date(feed.created_at).toLocaleTimeString()}</td>
        <td>${feed[`field${FIELD_NUM_1}`] ?? '-'} A</td>
        <td>${feed[`field${FIELD_NUM_2}`] ?? '-'} A</td>
    </tr>
`).join('');



        // --- Daily Averages Calculation ---
        // Group data by date
        const dailyData = {};
        feeds.forEach(feed => {
            const date = feed.created_at.slice(0, 10); // YYYY-MM-DD
            if (!dailyData[date]) dailyData[date] = { field1: [], field2: [] };
            const v1 = parseFloat(feed[`field${FIELD_NUM_1}`]);
            const v2 = parseFloat(feed[`field${FIELD_NUM_2}`]);
            if (!isNaN(v1)) dailyData[date].field1.push(v1);
            if (!isNaN(v2)) dailyData[date].field2.push(v2);
        });

        // Calculate averages
        const dailyAverages = Object.entries(dailyData).map(([date, vals]) => ({
            date,
            avg1: vals.field1.length ? (vals.field1.reduce((a, b) => a + b, 0) / vals.field1.length).toFixed(2) : '-',
            avg2: vals.field2.length ? (vals.field2.reduce((a, b) => a + b, 0) / vals.field2.length).toFixed(2) : '-'
        })).sort((a, b) => b.date.localeCompare(a.date)); // Newest first

        // Show latest daily averages at the top
        if (dailyAverages.length) {
            document.getElementById('dailyAvgField1').textContent = dailyAverages[0].avg1;
            document.getElementById('dailyAvgField2').textContent = dailyAverages[0].avg2;
        } else {
            document.getElementById('dailyAvgField1').textContent = '-';
            document.getElementById('dailyAvgField2').textContent = '-';
        }

        // Show last 7 days in the table
        const dailyTbody = document.querySelector('#dailyAveragesTable tbody');
        dailyTbody.innerHTML = dailyAverages.slice(0, 7).map(avg => `
    <tr>
        <td>${avg.date}</td>
        <td>${avg.avg1}</td>
        <td>${avg.avg2}</td>
    </tr>
`).join('');

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Auto-refresh data
setInterval(fetchData, UPDATE_INTERVAL);
fetchData(); // Initial load
