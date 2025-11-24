
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Load the dataset into memory
const dataPath = path.join(__dirname, '../src/data/zakat_data.json');
let zakatData = [];
try {
  zakatData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (error) {
  console.error("Failed to load or parse zakat_data.json:", error);
}

// Helper function to filter data
const getFilteredData = (filters) => {
  return zakatData.filter(item => {
    const incomeCondition = !filters.incomeLevel || filters.incomeLevel === 'All' || item.Income_Level === filters.incomeLevel;
    const locationCondition = !filters.location || filters.location === 'All' || item.DAERAH === filters.location;
    const yearCondition = !filters.year || filters.year === 'All' || item.TAHUN === parseInt(filters.year);
    return incomeCondition && locationCondition && yearCondition;
  });
};

// API to get filter options
app.get('/api/filters', (req, res) => {
    const incomeLevels = ['All', ...Array.from(new Set(zakatData.map(item => item.Income_Level).filter(Boolean)))];
    const locations = ['All', ...Array.from(new Set(zakatData.map(item => item.DAERAH).filter(Boolean)))];
    const years = ['All', ...Array.from(new Set(zakatData.map(item => item.TAHUN).filter(Boolean))).sort((a, b) => b - a)];
    res.json({ incomeLevels, locations, years });
});


// API for KPIs
app.get('/api/kpis', (req, res) => {
  const filteredData = getFilteredData(req.query);
  
  if (filteredData.length === 0) {
    return res.json({
      totalRecipients: 0,
      povertyEscapeRate: '0%',
      averageIncome: 'MYR 0',
      newRecipients: 0,
    });
  }

  const totalRecipients = filteredData.length;
  const escaped = filteredData.filter(d => d.Can_Escape_Poverty === 1).length;
  const povertyEscapeRate = totalRecipients > 0 ? ((escaped / totalRecipients) * 100).toFixed(1) + '%' : '0%';
  const averageIncome = 'MYR ' + (filteredData.reduce((acc, item) => acc + item.JumlahPendapatan, 0) / totalRecipients).toFixed(2);
  const currentYear = new Date().getFullYear();
  const newRecipients = filteredData.filter(d => d.TAHUN === currentYear).length;

  res.json({ totalRecipients, povertyEscapeRate, averageIncome, newRecipients });
});

// API for Charts
app.get('/api/charts', (req, res) => {
    const filteredData = getFilteredData(req.query);

    const incomeByDaerah = filteredData.reduce((acc, item) => {
        if (!acc[item.DAERAH]) {
          acc[item.DAERAH] = { totalIncome: 0, count: 0 };
        }
        acc[item.DAERAH].totalIncome += item.JumlahPendapatan;
        acc[item.DAERAH].count += 1;
        return acc;
      }, {});
  
    const barChartData = Object.keys(incomeByDaerah).map(daerah => ({
    name: daerah,
    'Average Income': (incomeByDaerah[daerah].totalIncome / incomeByDaerah[daerah].count).toFixed(2),
    }));

    const riskLevels = filteredData.reduce((acc, item) => {
        const risk = item.Poverty_Risk_Level || 'Unknown';
        if (!acc[risk]) {
          acc[risk] = 0;
        }
        acc[risk] += 1;
        return acc;
      }, {});
  
    const pieChartData = Object.keys(riskLevels).map(name => ({
        name,
        value: riskLevels[name],
    }));

    res.json({ barChartData, pieChartData });
});

// API for Map
app.get('/api/map', (req, res) => {
    const { daerah } = req.query;
    let filteredData = zakatData;
    if (daerah && daerah !== 'All') {
        filteredData = zakatData.filter(item => item.DAERAH === daerah);
    }

    // Return a sample of the data to avoid sending too much to the client
    const sampleData = filteredData.slice(0, 500).map(item => ({
        NoKP: item.NoKP,
        Nama: item.Nama,
        DAERAH: item.DAERAH,
        JumlahPendapatan: item.JumlahPendapatan,
    }));
    res.json(sampleData);
});

// API for Reporting (with pagination)
app.get('/api/reporting', (req, res) => {
    const { page = 0, size = 10, globalFilter = '' } = req.query;
    
    let filteredData = zakatData;

    if (globalFilter) {
        filteredData = zakatData.filter(item =>
            Object.values(item).some(val => 
                String(val).toLowerCase().includes(globalFilter.toLowerCase())
            )
        );
    }

    const start = parseInt(page) * parseInt(size);
    const end = start + parseInt(size);
    const paginatedData = filteredData.slice(start, end);

    res.json({
        data: paginatedData,
        rowCount: filteredData.length,
    });
});


// API for Forecast
app.get('/api/forecast', (req, res) => {
    const yearlyData = zakatData.reduce((acc, item) => {
        const year = item.TAHUN;
        if (!acc[year]) {
          acc[year] = { totalRecipients: 0, escaped: 0 };
        }
        acc[year].totalRecipients += 1;
        if (item.Can_Escape_Poverty === 1) {
          acc[year].escaped += 1;
        }
        return acc;
      }, {});
  
    const chartData = Object.keys(yearlyData).map(year => ({
        year: parseInt(year),
        'Actual Escape Rate': (yearlyData[year].escaped / yearlyData[year].totalRecipients) * 100,
    }));

    if (chartData.length > 0) {
        const lastYearData = chartData[chartData.length - 1];
        chartData.push({
          year: lastYearData.year + 1,
          'Forecasted Escape Rate': lastYearData['Actual Escape Rate'] * 1.05, // Assume 5% growth
        });
    }
  
    res.json(chartData.sort((a, b) => a.year - b.year));
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
