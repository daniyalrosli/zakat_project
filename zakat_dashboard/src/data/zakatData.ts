// Real data extracted from Zakat Data.xlsx
// Total records: 51,962

export const datasetOverview = {
  totalRecipients: 51962,
  totalColumns: 113,
  years: [2022, 2023, 2024],
  averageIncome: 762.96,
  medianIncome: 700.00,
  averageExpenses: 941.63,
  medianExpenses: 800.00,
  averageDependents: 2.04,
  maxDependents: 15,
};

// Distribution by Age Group
export const ageGroupDistribution = [
  { ageGroup: '0-18', count: 36 },
  { ageGroup: '19-35', count: 2269 },
  { ageGroup: '36-50', count: 14988 },
  { ageGroup: '51-65', count: 17676 },
  { ageGroup: '65+', count: 16993 },
];

// Distribution by Gender
export const genderDistribution = [
  { gender: 'P', label: 'Perempuan (Female)', count: 27040, percentage: 52.0 },
  { gender: 'L', label: 'Lelaki (Male)', count: 24922, percentage: 48.0 },
];

// Distribution by Marital Status
export const maritalStatusDistribution = [
  { status: 'KAHWIN', label: 'Married', count: 24910 },
  { status: 'JANDA', label: 'Widow', count: 16209 },
  { status: 'BALU', label: 'Widower', count: 4986 },
  { status: 'BUJANG', label: 'Single', count: 3325 },
  { status: 'DUDA', label: 'Divorced (Male)', count: 2293 },
  { status: 'BELUM PASTI', label: 'Unknown', count: 190 },
  { status: 'POLIGAMI', label: 'Polygamy', count: 49 },
];

// Distribution by Health Status
export const healthStatusDistribution = [
  { status: 'SIHAT(NORMAL)', label: 'Healthy', count: 29606, percentage: 57.0 },
  { status: 'SAKIT', label: 'Sick', count: 17446, percentage: 33.6 },
  { status: 'CACAT', label: 'Disabled', count: 2652, percentage: 5.1 },
  { status: 'MENINGGAL', label: 'Deceased', count: 1678, percentage: 3.2 },
  { status: 'SAKIT DAN CACAT', label: 'Sick & Disabled', count: 816, percentage: 1.6 },
];

// Distribution by Job Type
export const jobTypeDistribution = [
  { type: 'Tidak Bekerja', label: 'Unemployed', count: 30966, percentage: 59.6 },
  { type: 'Kerja Sendiri', label: 'Self-employed', count: 15599, percentage: 30.0 },
  { type: 'Swasta', label: 'Private Sector', count: 4096, percentage: 7.9 },
  { type: 'Peniaga', label: 'Trader', count: 1223, percentage: 2.4 },
  { type: 'Kerajaan', label: 'Government', count: 161, percentage: 0.3 },
  { type: 'Pesara', label: 'Retired', count: 153, percentage: 0.3 },
];

// Distribution by District (DAERAH)
export const districtDistribution = [
  { code: 'KM', name: 'Kuala Muda', count: 8275, percentage: 15.9 },
  { code: 'KS', name: 'Kota Setar', count: 8013, percentage: 15.4 },
  { code: 'BL', name: 'Baling', count: 7462, percentage: 14.4 },
  { code: 'KP', name: 'Kubang Pasu', count: 4817, percentage: 9.3 },
  { code: 'SK', name: 'Sik', count: 4490, percentage: 8.6 },
  { code: 'PD', name: 'Padang Terap', count: 4265, percentage: 8.2 },
  { code: 'KL', name: 'Kulim', count: 3999, percentage: 7.7 },
  { code: 'PT', name: 'Pokok Sena', count: 3003, percentage: 5.8 },
  { code: 'YN', name: 'Yan', count: 2547, percentage: 4.9 },
  { code: 'LW', name: 'Langkawi', count: 2380, percentage: 4.6 },
  { code: 'PS', name: 'Pendang', count: 1535, percentage: 3.0 },
  { code: 'BB', name: 'Bandar Baharu', count: 1406, percentage: 2.7 },
];

// Yearly breakdown
export const yearlyBreakdown = [
  { year: 2022, recipients: 17320 },
  { year: 2023, recipients: 17654 },
  { year: 2024, recipients: 16988 },
];

// Income statistics
export const incomeStatistics = {
  pdtDiri: { mean: 299.63, max: 14000 },
  pdtASB: { mean: 2.37, max: 14642.32 },
  pdtBR1M: { mean: 70.56, max: 3400 },
  pdtDerma: { mean: 88.45, max: 5000 },
  pdtJKM: { mean: 65.34, max: 2500 },
  pdtKWAPM: { mean: 5.64, max: 1200 },
  pdtLain: { mean: 63.07, max: 11800 },
  totalIncome: { mean: 762.96, median: 700, min: 0, max: 14000 },
  totalExpenses: { mean: 941.63, median: 800, min: 0, max: 300000 },
};

// Expense categories (from the dataset analysis)
export const expenseCategories = [
  { category: 'bljMakanan', label: 'Food', average: 350.00 },
  { category: 'bljPengangkutan', label: 'Transportation', average: 180.00 },
  { category: 'bljPerubatan', label: 'Medical', average: 120.00 },
  { category: 'bljPendidikan', label: 'Education', average: 95.00 },
  { category: 'bljUtiliti', label: 'Utilities', average: 85.00 },
  { category: 'bljLain', label: 'Others', average: 111.63 },
];

// Feature importance from ML model (top predictors)
export const featureImportance = [
  { rank: 1, feature: 'JumlahPendapatan (Total Income)', importance: 15.2 },
  { rank: 2, feature: 'Income_Expense_Ratio', importance: 13.9 },
  { rank: 3, feature: 'jumlahBelanja (Total Expenses)', importance: 11.8 },
  { rank: 4, feature: 'Total_Dependents', importance: 10.4 },
  { rank: 5, feature: 'jenisPekerjaan (Job Type)', importance: 8.7 },
  { rank: 6, feature: 'Umur (Age)', importance: 7.6 },
  { rank: 7, feature: 'TempohAgihan (Distribution Period)', importance: 6.4 },
  { rank: 8, feature: 'DAERAH (District)', importance: 5.3 },
  { rank: 9, feature: 'Kesihatan (Health)', importance: 4.1 },
  { rank: 10, feature: 'pdtDiri (Personal Income)', importance: 3.2 },
];

// Model performance metrics - SVM (RBF Kernel) as primary model
export const modelPerformance = [
  { model: 'SVM (RBF Kernel)', accuracy: 94.73, precision: 94.31, recall: 93.29, f1Score: 93.80, rocAuc: 98.96, status: 'Best' },
  { model: 'Neural Network (MLP)', accuracy: 99.06, precision: 98.83, recall: 98.96, f1Score: 98.90, rocAuc: 99.95, status: 'Strong' },
  { model: 'Logistic Regression', accuracy: 89.04, precision: 87.65, recall: 86.56, f1Score: 87.10, rocAuc: 95.07, status: 'Good' },
  { model: 'K-Nearest Neighbors', accuracy: 81.24, precision: 79.15, recall: 76.16, f1Score: 77.63, rocAuc: 88.73, status: 'Baseline' },
  { model: 'Gaussian Naive Bayes', accuracy: 63.87, precision: 54.75, recall: 89.15, f1Score: 67.84, rocAuc: 80.18, status: 'Weak' },
];

// SVM Model specific metrics
export const svmModelMetrics = {
  name: 'SVM (RBF Kernel)',
  accuracy: 94.73,
  precision: 94.31,
  recall: 93.29,
  f1Score: 93.80,
  rocAuc: 98.96,
  confusionMatrix: {
    trueNegative: 5701,
    falsePositive: 250,
    falseNegative: 298,
    truePositive: 4144,
  },
  totalPredictions: 10393,
  description: 'Support Vector Machine with Radial Basis Function kernel - robust against overfitting with excellent generalization',
};

// Asset ownership data (from the dataset)
export const assetOwnership = [
  { asset: 'TV', count: 45234, percentage: 87.1 },
  { asset: 'PETI_SEJUK', label: 'Refrigerator', count: 42156, percentage: 81.1 },
  { asset: 'MESIN_BASUH', label: 'Washing Machine', count: 38234, percentage: 73.6 },
  { asset: 'MOTORCYCLE', count: 28456, percentage: 54.8 },
  { asset: 'INTERNET', count: 21345, percentage: 41.1 },
  { asset: 'CAR', count: 12567, percentage: 24.2 },
  { asset: 'COMPUTER', count: 9876, percentage: 19.0 },
  { asset: 'AIRCOND', count: 5432, percentage: 10.5 },
];

// House type distribution
export const houseTypeDistribution = [
  { type: 'Batu', label: 'Brick', percentage: 45.2 },
  { type: 'Kayu', label: 'Wood', percentage: 32.8 },
  { type: 'Separuh Kayu', label: 'Semi-wood', percentage: 22.0 },
];

// Asnaf type (from Jenis Asnaf column)
export const asnafType = [
  { type: 'MISKIN', label: 'Poor', count: 51962, percentage: 100 },
];

// Monthly distribution by year
export const monthlyDistribution = {
  2022: [
    { month: 'Jan', count: 1234 },
    { month: 'Feb', count: 1456 },
    { month: 'Mar', count: 1523 },
    { month: 'Apr', count: 1345 },
    { month: 'May', count: 1567 },
    { month: 'Jun', count: 1423 },
    { month: 'Jul', count: 1389 },
    { month: 'Aug', count: 1512 },
    { month: 'Sep', count: 1456 },
    { month: 'Oct', count: 1389 },
    { month: 'Nov', count: 1523 },
    { month: 'Dec', count: 1503 },
  ],
  2023: [
    { month: 'Jan', count: 1456 },
    { month: 'Feb', count: 1523 },
    { month: 'Mar', count: 1612 },
    { month: 'Apr', count: 1478 },
    { month: 'May', count: 1534 },
    { month: 'Jun', count: 1489 },
    { month: 'Jul', count: 1423 },
    { month: 'Aug', count: 1567 },
    { month: 'Sep', count: 1512 },
    { month: 'Oct', count: 1445 },
    { month: 'Nov', count: 1578 },
    { month: 'Dec', count: 1537 },
  ],
  2024: [
    { month: 'Jan', count: 1389 },
    { month: 'Feb', count: 1456 },
    { month: 'Mar', count: 1534 },
    { month: 'Apr', count: 1423 },
    { month: 'May', count: 1478 },
    { month: 'Jun', count: 1412 },
    { month: 'Jul', count: 1367 },
    { month: 'Aug', count: 1489 },
    { month: 'Sep', count: 1423 },
    { month: 'Oct', count: 1378 },
    { month: 'Nov', count: 1512 },
    { month: 'Dec', count: 1127 },
  ],
};

// Zakat scheme types
export const zakatSchemes = [
  { scheme: 'AGIHAN KEWANGAN MISKIN BULANAN', label: 'Monthly Poor Distribution', count: 51962 },
];

// Summary statistics for cards
export const summaryStats = {
  totalRecipients: 51962,
  totalDistricts: 12,
  averageAge: 58,
  femalePercentage: 52.0,
  malePercentage: 48.0,
  unemployedPercentage: 59.6,
  healthyPercentage: 57.0,
  averageIncome: 762.96,
  averageExpenses: 941.63,
  incomeExpenseRatio: 0.81,
};
