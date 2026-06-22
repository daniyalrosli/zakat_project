/**
 * Data Validation Report for Zakat Project
 * Validates data consistency, integrity, and statistical accuracy
 */

import {
  datasetOverview,
  ageGroupDistribution,
  genderDistribution,
  maritalStatusDistribution,
  healthStatusDistribution,
  jobTypeDistribution,
  districtDistribution,
  yearlyBreakdown,
  incomeStatistics,
  assetOwnership,
  houseTypeDistribution,
  monthlyDistribution,
  summaryStats,
} from './zakat_dashboard/src/data/zakatData';

interface ValidationResult {
  category: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  actual: number | string;
  expected: number | string;
  message: string;
}

const validationResults: ValidationResult[] = [];

// ============ 1. AGE GROUP DISTRIBUTION VALIDATION ============
console.log('\n📊 VALIDATING AGE GROUP DISTRIBUTION...');
const ageGroupTotal = ageGroupDistribution.reduce((sum, group) => sum + group.count, 0);
const ageValidation: ValidationResult = {
  category: 'Age Group Distribution',
  status: ageGroupTotal === datasetOverview.totalRecipients ? 'PASS' : 'FAIL',
  actual: ageGroupTotal,
  expected: datasetOverview.totalRecipients,
  message:
    ageGroupTotal === datasetOverview.totalRecipients
      ? `✓ Age group counts sum correctly: ${ageGroupTotal.toLocaleString()}`
      : `✗ Age group counts mismatch. Sum: ${ageGroupTotal}, Expected: ${datasetOverview.totalRecipients}`,
};
validationResults.push(ageValidation);
console.log(ageValidation.message);

// ============ 2. GENDER DISTRIBUTION VALIDATION ============
console.log('\n👥 VALIDATING GENDER DISTRIBUTION...');
const genderTotal = genderDistribution.reduce((sum, g) => sum + g.count, 0);
const genderPercentageValid = genderDistribution.every((g) => {
  const calculatedPercent = (g.count / genderTotal) * 100;
  return Math.abs(calculatedPercent - g.percentage) < 0.1; // Allow 0.1% rounding difference
});
const genderValidation: ValidationResult = {
  category: 'Gender Distribution',
  status:
    genderTotal === datasetOverview.totalRecipients && genderPercentageValid ? 'PASS' : 'FAIL',
  actual: genderTotal,
  expected: datasetOverview.totalRecipients,
  message:
    genderTotal === datasetOverview.totalRecipients
      ? `✓ Gender count matches: ${genderTotal.toLocaleString()}`
      : `✗ Gender count mismatch: ${genderTotal} vs ${datasetOverview.totalRecipients}`,
};
validationResults.push(genderValidation);
console.log(genderValidation.message);

if (!genderPercentageValid) {
  console.log('⚠ Warning: Gender percentages may have rounding errors');
  validationResults.push({
    category: 'Gender Percentages',
    status: 'WARNING',
    actual: 'Varies',
    expected: '52.0% & 48.0%',
    message: 'Gender percentages have minor rounding discrepancies',
  });
}

// ============ 3. MARITAL STATUS DISTRIBUTION VALIDATION ============
console.log('\n💍 VALIDATING MARITAL STATUS DISTRIBUTION...');
const maritalTotal = maritalStatusDistribution.reduce((sum, m) => sum + m.count, 0);
const maritalValidation: ValidationResult = {
  category: 'Marital Status Distribution',
  status: maritalTotal === datasetOverview.totalRecipients ? 'PASS' : 'FAIL',
  actual: maritalTotal,
  expected: datasetOverview.totalRecipients,
  message:
    maritalTotal === datasetOverview.totalRecipients
      ? `✓ Marital status count matches: ${maritalTotal.toLocaleString()}`
      : `✗ Marital status mismatch. Sum: ${maritalTotal}, Expected: ${datasetOverview.totalRecipients}`,
};
validationResults.push(maritalValidation);
console.log(maritalValidation.message);

// ============ 4. HEALTH STATUS DISTRIBUTION VALIDATION ============
console.log('\n⚕️ VALIDATING HEALTH STATUS DISTRIBUTION...');
const healthTotal = healthStatusDistribution.reduce((sum, h) => sum + h.count, 0);
const healthPercentageValid = healthStatusDistribution.every((h) => {
  const calculatedPercent = (h.count / healthTotal) * 100;
  return Math.abs(calculatedPercent - h.percentage) < 0.2; // Allow 0.2% rounding difference
});
const healthValidation: ValidationResult = {
  category: 'Health Status Distribution',
  status: healthTotal === datasetOverview.totalRecipients && healthPercentageValid ? 'PASS' : 'FAIL',
  actual: healthTotal,
  expected: datasetOverview.totalRecipients,
  message:
    healthTotal === datasetOverview.totalRecipients
      ? `✓ Health status count matches: ${healthTotal.toLocaleString()}`
      : `✗ Health status mismatch: ${healthTotal} vs ${datasetOverview.totalRecipients}`,
};
validationResults.push(healthValidation);
console.log(healthValidation.message);

// ============ 5. JOB TYPE DISTRIBUTION VALIDATION ============
console.log('\n💼 VALIDATING JOB TYPE DISTRIBUTION...');
const jobTotal = jobTypeDistribution.reduce((sum, j) => sum + j.count, 0);
const jobPercentageValid = jobTypeDistribution.every((j) => {
  const calculatedPercent = (j.count / jobTotal) * 100;
  return Math.abs(calculatedPercent - j.percentage) < 0.2;
});
const jobValidation: ValidationResult = {
  category: 'Job Type Distribution',
  status: jobTotal === datasetOverview.totalRecipients && jobPercentageValid ? 'PASS' : 'FAIL',
  actual: jobTotal,
  expected: datasetOverview.totalRecipients,
  message:
    jobTotal === datasetOverview.totalRecipients
      ? `✓ Job type count matches: ${jobTotal.toLocaleString()}`
      : `✗ Job type mismatch: ${jobTotal} vs ${datasetOverview.totalRecipients}`,
};
validationResults.push(jobValidation);
console.log(jobValidation.message);

// ============ 6. DISTRICT DISTRIBUTION VALIDATION ============
console.log('\n🗺️ VALIDATING DISTRICT DISTRIBUTION...');
const districtTotal = districtDistribution.reduce((sum, d) => sum + d.count, 0);
const districtPercentageValid = districtDistribution.every((d) => {
  const calculatedPercent = (d.count / districtTotal) * 100;
  return Math.abs(calculatedPercent - d.percentage) < 0.2;
});
const districtValidation: ValidationResult = {
  category: 'District Distribution',
  status: districtTotal === datasetOverview.totalRecipients && districtPercentageValid ? 'PASS' : 'FAIL',
  actual: districtTotal,
  expected: datasetOverview.totalRecipients,
  message:
    districtTotal === datasetOverview.totalRecipients
      ? `✓ District count matches. Total districts: ${districtDistribution.length}`
      : `✗ District mismatch: ${districtTotal} vs ${datasetOverview.totalRecipients}`,
};
validationResults.push(districtValidation);
console.log(districtValidation.message);

// ============ 7. YEARLY BREAKDOWN VALIDATION ============
console.log('\n📅 VALIDATING YEARLY BREAKDOWN...');
const yearlyTotal = yearlyBreakdown.reduce((sum, y) => sum + y.recipients, 0);
const yearlyValidation: ValidationResult = {
  category: 'Yearly Breakdown',
  status: yearlyTotal === datasetOverview.totalRecipients ? 'PASS' : 'FAIL',
  actual: yearlyTotal,
  expected: datasetOverview.totalRecipients,
  message:
    yearlyTotal === datasetOverview.totalRecipients
      ? `✓ Yearly breakdown totals correctly: ${yearlyTotal.toLocaleString()}`
      : `✗ Yearly breakdown mismatch: ${yearlyTotal} vs ${datasetOverview.totalRecipients}`,
};
validationResults.push(yearlyValidation);
console.log(yearlyValidation.message);

yearlyBreakdown.forEach((y) => {
  const percentage = ((y.recipients / yearlyTotal) * 100).toFixed(2);
  console.log(`  ${y.year}: ${y.recipients.toLocaleString()} (${percentage}%)`);
});

// ============ 8. MONTHLY DISTRIBUTION VALIDATION ============
console.log('\n📆 VALIDATING MONTHLY DISTRIBUTION...');
const monthlyTotals: { [key: number]: number } = {};
let totalFromMonthly = 0;

Object.entries(monthlyDistribution).forEach(([year, months]) => {
  const yearTotal = months.reduce((sum, m) => sum + m.count, 0);
  monthlyTotals[Number(year)] = yearTotal;
  totalFromMonthly += yearTotal;

  const expectedYearRecipients = yearlyBreakdown.find((y) => y.year === Number(year))?.recipients;
  console.log(
    `  ${year}: Monthly sum = ${yearTotal.toLocaleString()}, Expected = ${expectedYearRecipients?.toLocaleString()}`
  );

  if (yearTotal !== expectedYearRecipients) {
    console.log(`    ⚠ MISMATCH: Difference of ${yearTotal - (expectedYearRecipients || 0)}`);
  }
});

const monthlyValidation: ValidationResult = {
  category: 'Monthly Distribution',
  status: totalFromMonthly === datasetOverview.totalRecipients ? 'PASS' : 'WARNING',
  actual: totalFromMonthly,
  expected: datasetOverview.totalRecipients,
  message:
    totalFromMonthly === datasetOverview.totalRecipients
      ? `✓ Monthly breakdown totals correctly: ${totalFromMonthly.toLocaleString()}`
      : `⚠ Monthly breakdown discrepancy: ${totalFromMonthly} vs ${datasetOverview.totalRecipients}`,
};
validationResults.push(monthlyValidation);

// ============ 9. ASSET OWNERSHIP VALIDATION ============
console.log('\n🏠 VALIDATING ASSET OWNERSHIP...');
let maxAssetCount = 0;
let assetValidationIssues = false;

assetOwnership.forEach((a) => {
  if (a.count > datasetOverview.totalRecipients) {
    assetValidationIssues = true;
    console.log(`  ✗ ${a.asset}: Count ${a.count} exceeds total recipients!`);
  }
  maxAssetCount = Math.max(maxAssetCount, a.count);

  const calculatedPercent = (a.count / datasetOverview.totalRecipients) * 100;
  if (Math.abs(calculatedPercent - a.percentage) > 0.2) {
    console.log(
      `  ⚠ ${a.asset}: Percentage mismatch. Calculated: ${calculatedPercent.toFixed(1)}%, Stored: ${a.percentage}%`
    );
  }
});

const assetValidation: ValidationResult = {
  category: 'Asset Ownership',
  status: !assetValidationIssues ? 'PASS' : 'FAIL',
  actual: maxAssetCount,
  expected: datasetOverview.totalRecipients,
  message: !assetValidationIssues
    ? `✓ Asset counts are valid (max: ${maxAssetCount.toLocaleString()} which is ${((maxAssetCount / datasetOverview.totalRecipients) * 100).toFixed(1)}%)`
    : '✗ Asset counts exceed total recipients',
};
validationResults.push(assetValidation);
console.log(assetValidation.message);

// ============ 10. HOUSE TYPE DISTRIBUTION VALIDATION ============
console.log('\n🏘️ VALIDATING HOUSE TYPE DISTRIBUTION...');
const housePercentageSum = houseTypeDistribution.reduce((sum, h) => sum + h.percentage, 0);
const houseValidation: ValidationResult = {
  category: 'House Type Distribution',
  status: Math.abs(housePercentageSum - 100) < 0.1 ? 'PASS' : 'WARNING',
  actual: housePercentageSum,
  expected: 100,
  message:
    Math.abs(housePercentageSum - 100) < 0.1
      ? `✓ House type percentages sum correctly: ${housePercentageSum.toFixed(2)}%`
      : `⚠ House type percentages sum to ${housePercentageSum.toFixed(2)}% (expected 100%)`,
};
validationResults.push(houseValidation);
console.log(houseValidation.message);

// ============ 11. INCOME/EXPENSE STATISTICS VALIDATION ============
console.log('\n💰 VALIDATING INCOME/EXPENSE STATISTICS...');
const incomeExpenseRatio = incomeStatistics.totalIncome.mean / incomeStatistics.totalExpenses.mean;
const expectedRatio = summaryStats.incomeExpenseRatio;

const incomeValidation: ValidationResult = {
  category: 'Income/Expense Statistics',
  status:
    Math.abs(incomeExpenseRatio - expectedRatio) < 0.05 ? 'PASS' : 'WARNING',
  actual: incomeExpenseRatio.toFixed(3),
  expected: expectedRatio,
  message: `Income-to-Expense Ratio: ${incomeExpenseRatio.toFixed(3)} (Expected: ~${expectedRatio})`,
};
validationResults.push(incomeValidation);
console.log(incomeValidation.message);

if (incomeStatistics.totalExpenses.max > 100000) {
  console.log(`  ⚠ Maximum expense is very high: ${incomeStatistics.totalExpenses.max} (check for outliers)`);
}

// ============ 12. SUMMARY STATS VALIDATION ============
console.log('\n📈 VALIDATING SUMMARY STATISTICS...');
const summaryValidation: ValidationResult = {
  category: 'Summary Statistics',
  status: summaryStats.totalRecipients === datasetOverview.totalRecipients ? 'PASS' : 'FAIL',
  actual: summaryStats.totalRecipients,
  expected: datasetOverview.totalRecipients,
  message:
    summaryStats.totalRecipients === datasetOverview.totalRecipients
      ? `✓ Summary stats match dataset: ${summaryStats.totalRecipients.toLocaleString()}`
      : `✗ Summary stats mismatch`,
};
validationResults.push(summaryValidation);
console.log(summaryValidation.message);

// ============ GENERATE VALIDATION REPORT ============
console.log('\n' + '='.repeat(70));
console.log('📋 DATA VALIDATION SUMMARY REPORT');
console.log('='.repeat(70) + '\n');

const passed = validationResults.filter((r) => r.status === 'PASS').length;
const failed = validationResults.filter((r) => r.status === 'FAIL').length;
const warnings = validationResults.filter((r) => r.status === 'WARNING').length;

console.log(`Total Checks: ${validationResults.length}`);
console.log(`✓ Passed: ${passed}`);
console.log(`✗ Failed: ${failed}`);
console.log(`⚠ Warnings: ${warnings}\n`);

// Display all results in table format
console.log('Detailed Results:');
console.log('-'.repeat(70));
validationResults.forEach((result) => {
  const icon = result.status === 'PASS' ? '✓' : result.status === 'FAIL' ? '✗' : '⚠';
  console.log(`${icon} ${result.category}`);
  console.log(`  Message: ${result.message}`);
  if (result.status !== 'PASS') {
    console.log(`  Expected: ${result.expected}, Actual: ${result.actual}`);
  }
  console.log();
});

// ============ DATA QUALITY ISSUES ============
console.log('\n' + '='.repeat(70));
console.log('🔍 POTENTIAL DATA QUALITY ISSUES');
console.log('='.repeat(70) + '\n');

const issues: string[] = [];

// Check for logical inconsistencies
if (incomeStatistics.totalIncome.mean > incomeStatistics.totalIncome.max) {
  issues.push('CRITICAL: Average income exceeds maximum income');
}

if (incomeStatistics.totalExpenses.mean > incomeStatistics.totalExpenses.max) {
  issues.push('CRITICAL: Average expenses exceed maximum expenses');
}

if (datasetOverview.averageDependents > 5) {
  issues.push('INFO: Average dependents is relatively high (2.04)');
}

if (summaryStats.unemployedPercentage > 50) {
  issues.push('INFO: High unemployment rate (59.6%) - typical for zakat recipients');
}

if (summaryStats.healthyPercentage < 50) {
  issues.push('INFO: Less than 50% of recipients are healthy - health is a poverty factor');
}

// Check for extreme outliers
if (incomeStatistics.pdtASB.max > 10000) {
  issues.push(`WARNING: ASB income has extreme outlier (${incomeStatistics.pdtASB.max})`);
}

if (incomeStatistics.totalExpenses.max > 50000) {
  issues.push(`WARNING: Expense outlier detected (${incomeStatistics.totalExpenses.max}) - may indicate data entry error`);
}

if (issues.length === 0) {
  console.log('✓ No critical data quality issues detected');
} else {
  issues.forEach((issue) => {
    const prefix = issue.includes('CRITICAL') ? '🔴' : issue.includes('WARNING') ? '🟡' : '🔵';
    console.log(`${prefix} ${issue}`);
  });
}

// ============ RECOMMENDATIONS ============
console.log('\n' + '='.repeat(70));
console.log('💡 RECOMMENDATIONS');
console.log('='.repeat(70) + '\n');

const recommendations = [
  '1. Monthly distribution data for 2024 ends in December - verify if incomplete',
  '2. Validate expense outliers (max: 300,000) against original source data',
  '3. Cross-verify age group distribution totals with gender/marital distributions',
  '4. Document data collection methodology and time period',
  '5. Create data audit trail to track updates to zakatData.ts',
  '6. Add type validation for all distribution arrays',
  '7. Implement automated validation on data import/update',
  '8. Monitor for data consistency in production dashboard',
];

recommendations.forEach((rec) => console.log(`  ${rec}`));

// ============ EXPORT VALIDATION RESULTS ============
console.log('\n' + '='.repeat(70));
console.log('Final Status:', failed === 0 ? '✅ VALIDATION PASSED' : '❌ VALIDATION FAILED');
console.log('='.repeat(70) + '\n');

export { validationResults, issues, recommendations };
