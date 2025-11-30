# Zakat Poverty Escape Prediction Dashboard

A Next.js dashboard for predicting and analyzing poverty escape outcomes for zakat recipients in Kedah, Malaysia. This project uses machine learning (SVM - RBF Kernel) to forecast which recipients can escape poverty within 3 years.

![Next.js](https://img.shields.io/badge/Next.js-16.0.4-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

## 📊 Project Overview

This dashboard analyzes **51,962 zakat recipients** from Kedah, Malaysia (2022-2024) to predict poverty escape likelihood using machine learning models. The SVM (RBF Kernel) model achieves **94.73% accuracy** in predicting which recipients can escape poverty.

### Key Features

- **🔮 Poverty Escape Predictor**: Interactive tool to predict individual recipient outcomes based on income, expenses, dependents, employment, and assets
- **📈 3-Year Forecast**: Scenario-based projections for poverty escape rates with adjustable parameters
- **📊 Real-time Statistics**: Dashboard displaying key metrics from the actual dataset
- **🤖 ML Model Integration**: SVM model with 94.73% accuracy, 98.96% ROC-AUC

### Model Performance (SVM - RBF Kernel)

| Metric    | Score  |
| --------- | ------ |
| Accuracy  | 94.73% |
| Precision | 94.31% |
| Recall    | 93.29% |
| F1-Score  | 93.80% |
| ROC-AUC   | 98.96% |

### Key Predictive Features

1. **Total Income (JumlahPendapatan)** - 15.2% importance
2. **Income-Expense Ratio** - 13.9% importance
3. **Total Expenses (jumlahBelanja)** - 11.8% importance
4. **Total Dependents** - 10.4% importance
5. **Job Type (jenisPekerjaan)** - 8.7% importance
6. **Age (Umur)** - 7.6% importance

### Poverty Escape Criteria

Recipients are predicted to escape poverty if they meet:

- Income-to-Expense Ratio > 0.8
- Income > 80% of Expenses
- Total Dependents ≤ 4

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/daniyalrosli/zakat_project.git

# Navigate to the dashboard directory
cd zakat_project/zakat_dashboard

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
zakat_dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage with key stats
│   │   ├── about/            # About the project
│   │   ├── forecast/         # SVM-based poverty escape predictor
│   │   ├── overview/         # Dataset overview
│   │   ├── report/           # ML analytics report
│   │   └── statistics/       # Detailed statistics
│   ├── components/
│   │   └── navbar.tsx        # Navigation component
│   └── data/
│       └── zakatData.ts      # Real data from Excel dataset
├── public/                   # Static assets
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.4
- **UI**: React 19.2.0, Tailwind CSS v4
- **Icons**: Lucide React
- **ML Model**: Scikit-learn SVM (RBF Kernel)
- **Data**: 51,962 zakat recipients with 113 features

## 📊 Dataset

The dataset contains information about zakat recipients including:

- **Demographics**: Age, gender, marital status, education
- **Financial**: Income, expenses, assets, debts
- **Household**: Number of dependents, household size
- **Employment**: Job type, employment status
- **Location**: District distribution across Kedah

## 🌐 Deployment

This project is configured for deployment on **Netlify** with static export.

```bash
# Build for production
npm run build

# The output will be in the 'out' directory
```

## 📄 License

This project is for research and educational purposes.

## 👨‍💻 Author

**Daniyal Rosli**

---

_Built with ❤️ for improving zakat distribution and poverty alleviation in Malaysia_
