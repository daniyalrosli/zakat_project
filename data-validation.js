/**
 * Data Validation Report for Zakat Project
 * Validates data consistency, integrity, and statistical accuracy
 */

const data = {
  datasetOverview: {
    totalRecipients: 51962,
    totalColumns: 113,
    years: [2022, 2023, 2024],
    averageIncome: 762.96,
    medianIncome: 700.00,
    averageExpenses: 941.63,
    medianExpenses: 800.00,
    averageDependents: 2.04,
    maxDependents: 15,
  },
  ageGroupDistribution: [
    { ageGroup: '0-18', count: 36 },
    { ageGroup: '19-35', count: 2269 },
    { ageGroup: '36-50', count: 14988 },
    { ageGroup: '51-65', count: 17676 },
    { ageGroup: '65+', count: 16993 },
  ],
  genderDistribution: [
    { gender: 'P', label: 'Perempuan (Female)', count: 27040, percentage: 52.0 },
    { gender: 'L', label: 'Lelaki (Male)', count: 24922, percentage: 48.0 },
  ],
  maritalStatusDistribution: [
    { status: 'KAHWIN', label: 'Married', count: 24910 },
    { status: 'JANDA', label: 'Widow', count: 16209 },
    { status: 'BALU', label: 'Widower', count: 4986 },
    { status: 'BUJANG', label: 'Single', count: 3325 },
    { status: 'DUDA', label: 'Divorced (Male)', count: 2293 },
    { status: 'BELUM PASTI', label: 'Unknown', count: 190 },
    { status: 'POLIGAMI', label: 'Polygamy', count: 49 },
  ],
  healthStatusDistribution: [
    { status: 'SIHAT(NORMAL)', label: 'Healthy', count: 29488, percentage: 57.0 },
    { status: 'SAKIT', label: 'Sick', count: 17328, percentage: 33.6 },
    { status: 'CACAT', label: 'Disabled', count: 2643, percentage: 5.1 },
    { status: 'MENINGGAL', label: 'Deceased', count: 1663, percentage: 3.2 },
    { status: 'SAKIT DAN CACAT', label: 'Sick & Disabled', count: 840, percentage: 1.6 },
  ],
  jobTypeDistribution: [
    { type: 'Tidak Bekerja', label: 'Unemployed', count: 30848, percentage: 59.6 },
    { type: 'Kerja Sendiri', label: 'Self-employed', count: 15481, percentage: 30.0 },
    { type: 'Swasta', label: 'Private Sector', count: 4098, percentage: 7.9 },
    { type: 'Peniaga', label: 'Trader', count: 1215, percentage: 2.4 },
    { type: 'Kerajaan', label: 'Government', count: 161, percentage: 0.3 },
    { type: 'Pesara', label: 'Retired', count: 159, percentage: 0.3 },
  ],
  districtDistribution: [
    { code: 'KM', name: 'Kuala Muda', count: 8184, percentage: 15.9 },
    { code: 'KS', name: 'Kota Setar', count: 7924, percentage: 15.4 },
    { code: 'BL', name: 'Baling', count: 7412, percentage: 14.4 },
    { code: 'KP', name: 'Kubang Pasu', count: 4817, percentage: 9.3 },
    { code: 'SK', name: 'Sik', count: 4490, percentage: 8.6 },
    { code: 'PD', name: 'Padang Terap', count: 4265, percentage: 8.2 },
    { code: 'KL', name: 'Kulim', count: 3999, percentage: 7.7 },
    { code: 'PT', name: 'Pokok Sena', count: 3003, percentage: 5.8 },
    { code: 'YN', name: 'Yan', count: 2547, percentage: 4.9 },
    { code: 'LW', name: 'Langkawi', count: 2380, percentage: 4.6 },
    { code: 'PS', name: 'Pendang', count: 1535, percentage: 3.0 },
    { code: 'BB', name: 'Bandar Baharu', count: 1406, percentage: 2.7 },
  ],
  yearlyBreakdown: [
    { year: 2022, recipients: 17320 },
    { year: 2023, recipients: 17654 },
    { year: 2024, recipients: 16988 },
  ],
  incomeStatistics: {
    pdtDiri: { mean: 299.63, max: 14000 },
    pdtASB: { mean: 2.37, max: 14642.32 },
    pdtBR1M: { mean: 70.56, max: 3400 },
    pdtDerma: { mean: 88.45, max: 5000 },
    pdtJKM: { mean: 65.34, max: 2500 },
    pdtKWAPM: { mean: 5.64, max: 1200 },
    pdtLain: { mean: 63.07, max: 11800 },
    totalIncome: { mean: 762.96, median: 700, min: 0, max: 14000 },
    totalExpenses: { mean: 941.63, median: 800, min: 0, max: 300000 },
  },
  assetOwnership: [
    { asset: 'TV', count: 45234, percentage: 87.1 },
    { asset: 'PETI_SEJUK', label: 'Refrigerator', count: 42156, percentage: 81.1 },
    { asset: 'MESIN_BASUH', label: 'Washing Machine', count: 38234, percentage: 73.6 },
    { asset: 'MOTORCYCLE', count: 28456, percentage: 54.8 },
    { asset: 'INTERNET', count: 21345, percentage: 41.1 },
    { asset: 'CAR', count: 12567, percentage: 24.2 },
    { asset: 'COMPUTER', count: 9876, percentage: 19.0 },
    { asset: 'AIRCOND', count: 5432, percentage: 10.5 },
  ],
  houseTypeDistribution: [
    { type: 'Batu', label: 'Brick', percentage: 45.2 },
    { type: 'Kayu', label: 'Wood', percentage: 32.8 },
    { type: 'Separuh Kayu', label: 'Semi-wood', percentage: 22.0 },
  ],
  summaryStats: {
    totalRecipients: 51962,
    totalDistricts: 12,
    averageAge: 58,
    femalePercentage: 52.0,
    malePercentage: 48.0,
    marriedPercentage: 47.9,
    unemployedPercentage: 59.6,
    healthyPercentage: 57.0,
    averageIncome: 762.96,
    averageExpenses: 941.63,
    incomeExpenseRatio: 0.81,
  },
};

const validationResults = [];

console.log('\n📊 DATA VALIDATION FOR ZAKAT PROJECT');
console.log('='.repeat(80));

// ============ 1. AGE GROUP DISTRIBUTION VALIDATION ============
console.log('\n📊 VALIDATING AGE GROUP DISTRIBUTION...');
const ageGroupTotal = data.ageGroupDistribution.reduce((sum, group) => sum + group.count, 0);
const ageMatch = ageGroupTotal === data.datasetOverview.totalRecipients;
validationResults.push({
  category: 'Age Group Distribution',
  status: ageMatch ? 'PASS' : 'FAIL',
  actual: ageGroupTotal,
  expected: data.datasetOverview.totalRecipients,
});
console.log(ageMatch 
  ? `✓ Age groups sum correctly: ${ageGroupTotal.toLocaleString()}` 
  : `✗ MISMATCH: ${ageGroupTotal.toLocaleString()} vs ${data.datasetOverview.totalRecipients.toLocaleString()}`);

// ============ 2. GENDER DISTRIBUTION VALIDATION ============
console.log('\n👥 VALIDATING GENDER DISTRIBUTION...');
const genderTotal = data.genderDistribution.reduce((sum, g) => sum + g.count, 0);
const genderMatch = genderTotal === data.datasetOverview.totalRecipients;
validationResults.push({
  category: 'Gender Distribution',
  status: genderMatch ? 'PASS' : 'FAIL',
  actual: genderTotal,
  expected: data.datasetOverview.totalRecipients,
});
console.log(genderMatch 
  ? `✓ Gender count matches: ${genderTotal.toLocaleString()}` 
  : `✗ MISMATCH: ${genderTotal.toLocaleString()} vs ${data.datasetOverview.totalRecipients.toLocaleString()}`);

// Check percentages
const genderPercentageValid = data.genderDistribution.every((g) => {
  const calc = (g.count / genderTotal) * 100;
  return Math.abs(calc - g.percentage) < 0.1;
});
if (!genderPercentageValid) {
  console.log('⚠ Warning: Gender percentage discrepancies detected');
  data.genderDistribution.forEach((g) => {
    const calc = ((g.count / genderTotal) * 100).toFixed(2);
    console.log(`  ${g.label}: ${calc}% (stored: ${g.percentage}%)`);
  });
}

// ============ 3. MARITAL STATUS DISTRIBUTION VALIDATION ============
console.log('\n💍 VALIDATING MARITAL STATUS DISTRIBUTION...');
const maritalTotal = data.maritalStatusDistribution.reduce((sum, m) => sum + m.count, 0);
const maritalMatch = maritalTotal === data.datasetOverview.totalRecipients;
validationResults.push({
  category: 'Marital Status Distribution',
  status: maritalMatch ? 'PASS' : 'FAIL',
  actual: maritalTotal,
  expected: data.datasetOverview.totalRecipients,
});
console.log(maritalMatch 
  ? `✓ Marital status count matches: ${maritalTotal.toLocaleString()}` 
  : `✗ MISMATCH: ${maritalTotal.toLocaleString()} vs ${data.datasetOverview.totalRecipients.toLocaleString()}`);

// ============ 4. HEALTH STATUS DISTRIBUTION VALIDATION ============
console.log('\n⚕️ VALIDATING HEALTH STATUS DISTRIBUTION...');
const healthTotal = data.healthStatusDistribution.reduce((sum, h) => sum + h.count, 0);
const healthMatch = healthTotal === data.datasetOverview.totalRecipients;
validationResults.push({
  category: 'Health Status Distribution',
  status: healthMatch ? 'PASS' : 'FAIL',
  actual: healthTotal,
  expected: data.datasetOverview.totalRecipients,
});
console.log(healthMatch 
  ? `✓ Health status count matches: ${healthTotal.toLocaleString()}` 
  : `✗ MISMATCH: ${healthTotal.toLocaleString()} vs ${data.datasetOverview.totalRecipients.toLocaleString()}`);

// ============ 5. JOB TYPE DISTRIBUTION VALIDATION ============
console.log('\n💼 VALIDATING JOB TYPE DISTRIBUTION...');
const jobTotal = data.jobTypeDistribution.reduce((sum, j) => sum + j.count, 0);
const jobMatch = jobTotal === data.datasetOverview.totalRecipients;
validationResults.push({
  category: 'Job Type Distribution',
  status: jobMatch ? 'PASS' : 'FAIL',
  actual: jobTotal,
  expected: data.datasetOverview.totalRecipients,
});
console.log(jobMatch 
  ? `✓ Job type count matches: ${jobTotal.toLocaleString()}` 
  : `✗ MISMATCH: ${jobTotal.toLocaleString()} vs ${data.datasetOverview.totalRecipients.toLocaleString()}`);

// ============ 6. DISTRICT DISTRIBUTION VALIDATION ============
console.log('\n🗺️ VALIDATING DISTRICT DISTRIBUTION...');
const districtTotal = data.districtDistribution.reduce((sum, d) => sum + d.count, 0);
const districtMatch = districtTotal === data.datasetOverview.totalRecipients;
validationResults.push({
  category: 'District Distribution',
  status: districtMatch ? 'PASS' : 'FAIL',
  actual: districtTotal,
  expected: data.datasetOverview.totalRecipients,
});
console.log(districtMatch 
  ? `✓ District count matches (${data.districtDistribution.length} districts): ${districtTotal.toLocaleString()}` 
  : `✗ MISMATCH: ${districtTotal.toLocaleString()} vs ${data.datasetOverview.totalRecipients.toLocaleString()}`);

// ============ 7. YEARLY BREAKDOWN VALIDATION ============
console.log('\n📅 VALIDATING YEARLY BREAKDOWN...');
const yearlyTotal = data.yearlyBreakdown.reduce((sum, y) => sum + y.recipients, 0);
const yearlyMatch = yearlyTotal === data.datasetOverview.totalRecipients;
validationResults.push({
  category: 'Yearly Breakdown',
  status: yearlyMatch ? 'PASS' : 'FAIL',
  actual: yearlyTotal,
  expected: data.datasetOverview.totalRecipients,
});
console.log(yearlyMatch 
  ? `✓ Yearly breakdown totals correctly: ${yearlyTotal.toLocaleString()}` 
  : `✗ MISMATCH: ${yearlyTotal.toLocaleString()} vs ${data.datasetOverview.totalRecipients.toLocaleString()}`);

data.yearlyBreakdown.forEach((y) => {
  const percentage = ((y.recipients / yearlyTotal) * 100).toFixed(2);
  console.log(`  ${y.year}: ${y.recipients.toLocaleString()} (${percentage}%)`);
});

// ============ 8. ASSET OWNERSHIP VALIDATION ============
console.log('\n🏠 VALIDATING ASSET OWNERSHIP...');
let assetIssues = false;
data.assetOwnership.forEach((a) => {
  if (a.count > data.datasetOverview.totalRecipients) {
    console.log(`  ✗ ${a.asset}: Count ${a.count.toLocaleString()} exceeds total recipients!`);
    assetIssues = true;
  }
  const calc = ((a.count / data.datasetOverview.totalRecipients) * 100).toFixed(1);
  if (Math.abs(parseFloat(calc) - a.percentage) > 0.2) {
    console.log(`  ⚠ ${a.asset}: Percentage mismatch. Calc: ${calc}%, Stored: ${a.percentage}%`);
  }
});
if (!assetIssues) {
  console.log(`✓ Asset counts are valid (max: ${Math.max(...data.assetOwnership.map(a => a.count)).toLocaleString()})`);
}

// ============ 9. HOUSE TYPE DISTRIBUTION VALIDATION ============
console.log('\n🏘️ VALIDATING HOUSE TYPE DISTRIBUTION...');
const housePercentageSum = data.houseTypeDistribution.reduce((sum, h) => sum + h.percentage, 0);
const houseValid = Math.abs(housePercentageSum - 100) < 0.1;
validationResults.push({
  category: 'House Type Distribution',
  status: houseValid ? 'PASS' : 'WARNING',
  actual: housePercentageSum,
  expected: 100,
});
console.log(houseValid 
  ? `✓ House type percentages sum to 100%: ${housePercentageSum.toFixed(2)}%` 
  : `⚠ House type percentages sum to ${housePercentageSum.toFixed(2)}% (expected 100%)`);

// ============ 10. INCOME/EXPENSE STATISTICS VALIDATION ============
console.log('\n💰 VALIDATING INCOME/EXPENSE STATISTICS...');
const incomeExpenseRatio = data.incomeStatistics.totalIncome.mean / data.incomeStatistics.totalExpenses.mean;
const expectedRatio = data.summaryStats.incomeExpenseRatio;
validationResults.push({
  category: 'Income/Expense Ratio',
  status: Math.abs(incomeExpenseRatio - expectedRatio) < 0.05 ? 'PASS' : 'WARNING',
  actual: incomeExpenseRatio.toFixed(3),
  expected: expectedRatio,
});
console.log(`Income-to-Expense Ratio: ${incomeExpenseRatio.toFixed(3)} (Expected: ~${expectedRatio})`);
console.log(`  Average Income: RM ${data.incomeStatistics.totalIncome.mean.toFixed(2)}`);
console.log(`  Average Expenses: RM ${data.incomeStatistics.totalExpenses.mean.toFixed(2)}`);

if (data.incomeStatistics.totalExpenses.max > 100000) {
  console.log(`  ⚠ WARNING: Maximum expense is very high: RM ${data.incomeStatistics.totalExpenses.max.toLocaleString()} (possible data entry error or outlier)`);
}

// ============ 11. SUMMARY STATS VALIDATION ============
console.log('\n📈 VALIDATING SUMMARY STATISTICS...');
const summaryMatch = data.summaryStats.totalRecipients === data.datasetOverview.totalRecipients;
validationResults.push({
  category: 'Summary Statistics',
  status: summaryMatch ? 'PASS' : 'FAIL',
  actual: data.summaryStats.totalRecipients,
  expected: data.datasetOverview.totalRecipients,
});
console.log(summaryMatch 
  ? `✓ Summary stats match dataset: ${data.summaryStats.totalRecipients.toLocaleString()}` 
  : `✗ Summary stats mismatch`);

// ============ GENERATE FINAL REPORT ============
console.log('\n' + '='.repeat(80));
console.log('📋 VALIDATION SUMMARY REPORT');
console.log('='.repeat(80) + '\n');

const passed = validationResults.filter((r) => r.status === 'PASS').length;
const failed = validationResults.filter((r) => r.status === 'FAIL').length;
const warnings = validationResults.filter((r) => r.status === 'WARNING').length;

console.log(`Total Checks: ${validationResults.length}`);
console.log(`✓ PASSED: ${passed}`);
console.log(`✗ FAILED: ${failed}`);
console.log(`⚠ WARNINGS: ${warnings}`);

console.log('\n' + 'Detailed Results:');
console.log('-'.repeat(80));
validationResults.forEach((result, i) => {
  const icon = result.status === 'PASS' ? '✓' : result.status === 'FAIL' ? '✗' : '⚠';
  console.log(`${icon} [${i + 1}] ${result.category}`);
  if (result.status !== 'PASS') {
    console.log(`    Expected: ${result.expected.toLocaleString()}, Actual: ${result.actual.toLocaleString()}`);
  }
});

// ============ DATA QUALITY ISSUES ============
console.log('\n' + '='.repeat(80));
console.log('🔍 POTENTIAL DATA QUALITY ISSUES');
console.log('='.repeat(80) + '\n');

const issues = [];

// Check for logical inconsistencies
if (data.incomeStatistics.totalIncome.mean > data.incomeStatistics.totalIncome.max) {
  issues.push('🔴 CRITICAL: Average income exceeds maximum income');
}

if (data.incomeStatistics.totalExpenses.mean > data.incomeStatistics.totalExpenses.max) {
  issues.push('🔴 CRITICAL: Average expenses exceed maximum expenses');
}

if (data.summaryStats.unemployedPercentage > 50) {
  issues.push('🔵 INFO: High unemployment rate (59.6%) - typical for zakat recipients');
}

if (data.summaryStats.healthyPercentage < 50) {
  issues.push('🔵 INFO: Less than 50% healthy (43%) - health is a poverty factor');
}

if (data.incomeStatistics.totalExpenses.max > 50000) {
  issues.push(`🟡 WARNING: Extreme expense outlier detected (RM ${data.incomeStatistics.totalExpenses.max.toLocaleString()}) - may indicate data entry error`);
}

if (issues.length === 0) {
  console.log('✓ No critical data quality issues detected');
} else {
  issues.forEach((issue) => console.log(issue));
}

// ============ KEY STATISTICS ============
console.log('\n' + '='.repeat(80));
console.log('📊 KEY DATASET STATISTICS');
console.log('='.repeat(80) + '\n');

console.log('Demographics:');
console.log(`  • Total Recipients: ${data.summaryStats.totalRecipients.toLocaleString()}`);
console.log(`  • Districts: ${data.summaryStats.totalDistricts}`);
console.log(`  • Female: ${data.summaryStats.femalePercentage}% | Male: ${data.summaryStats.malePercentage}%`);
console.log(`  • Average Age: ${data.summaryStats.averageAge} years`);

console.log('\nEmployment:');
console.log(`  • Unemployed: ${data.summaryStats.unemployedPercentage}%`);
console.log(`  • Self-employed: 30.0%`);
console.log(`  • Private Sector: 7.9%`);

console.log('\nHealth Status:');
console.log(`  • Healthy: ${data.summaryStats.healthyPercentage}%`);
console.log(`  • Sick: 33.6%`);
console.log(`  • Disabled: 5.1%`);

console.log('\nFinancial:');
console.log(`  • Average Income: RM ${data.summaryStats.averageIncome.toFixed(2)}`);
console.log(`  • Average Expenses: RM ${data.summaryStats.averageExpenses.toFixed(2)}`);
console.log(`  • Income-to-Expense Ratio: ${data.summaryStats.incomeExpenseRatio.toFixed(2)}`);

console.log('\nAsset Ownership (Top 3):');
data.assetOwnership.slice(0, 3).forEach((a, i) => {
  const label = a.label || a.asset;
  console.log(`  ${i + 1}. ${label}: ${a.percentage}%`);
});

// ============ RECOMMENDATIONS ============
console.log('\n' + '='.repeat(80));
console.log('💡 RECOMMENDATIONS FOR DATA QUALITY');
console.log('='.repeat(80) + '\n');

const recommendations = [
  '1. Verify extreme expense outliers (max: RM 300,000) against original source',
  '2. Validate income distribution data completeness and accuracy',
  '3. Cross-verify demographic distributions sum to total recipients',
  '4. Document data collection dates and methodology',
  '5. Implement automated data validation on import',
  '6. Create audit trail for data updates',
  '7. Regular reconciliation of aggregate statistics',
  '8. Monitor for data entry errors and inconsistencies',
];

recommendations.forEach((rec) => console.log(`  ${rec}`));

// ============ FINAL STATUS ============
console.log('\n' + '='.repeat(80));
console.log(`Final Status: ${failed === 0 ? '✅ VALIDATION PASSED' : '❌ VALIDATION FAILED'}`);
console.log('='.repeat(80) + '\n');
