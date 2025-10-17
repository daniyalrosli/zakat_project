# Zakat Poverty Escape Prediction

## Project Overview

Machine learning system to predict whether zakat recipients can escape poverty within 3 years, using data from 9,923 Malaysian zakat recipients across multiple districts.

## Key Results

- **Model Accuracy**: 90.8% (Gradient Boosting Classifier)
- **Perfect Recall**: 100% - identifies all poverty escapes
- **ROC-AUC**: 94.1% - excellent discrimination
- **Current Escape Rate**: 38.2% baseline
- **Prediction Target**: 3-year poverty escape probability

## Dataset & Features

**Data**: 9,923 recipients | 44 engineered features | 2022-2024 timeframe

**Key Predictors**:

- Income diversity (strongest predictor)
- Total household income & per capita income
- Age and household composition
- Dual-income household status
- Geographic location (district)

**Target**: Combined poverty escape criteria (income improvement + status change)

## Files

```
├── analysis.ipynb                 # ML pipeline: EDA → Feature Engineering → Model Training
├── app.py                        # Streamlit dashboard (6 interactive pages)
├── main data.xlsx               # Raw zakat recipient data
├── zakat_features_engineered.csv # Processed dataset (44 features)
├── poverty_escape_model.pkl     # Trained Gradient Boosting model
└── README.md                    # This file
```

## Model Performance

**Algorithm**: Gradient Boosting Classifier

- **Training Accuracy**: 90.8%
- **Precision**: 80.6%
- **Recall**: 100% (no missed escapes)
- **Cross-validation**: 5-fold CV with hyperparameter tuning

**Feature Importance**:

1. Total Income (35%)
2. Income Per Capita (25%)
3. Age (15%)
4. Income Diversity (12%)
5. Household Size (8%)

## Dashboard Features

Interactive Streamlit app with 6 pages:

- **Overview**: Key metrics and trends
- **Data Analytics**: Interactive exploration with filters
- **Model Performance**: Feature importance and predictions
- **Individual Assessment**: Real-time poverty escape prediction
- **Scenario Analysis**: Policy intervention modeling
- **Strategic Insights**: Evidence-based recommendations

## Key Findings

**Success Factors**:

- Recipients with 2+ income sources: 65% escape rate
- Dual-income households: 78% higher success rate
- Age 30-50: highest escape potential
- Average successful household income: RM 947

**Intervention Impact**:

- Income diversification programs: +35% escape rate
- Skills training initiatives: +20% escape rate
- Potential to help 1,400+ additional recipients escape poverty

## Quick Start

```bash
# Install dependencies
pip install streamlit pandas numpy scikit-learn plotly

# Run analysis notebook
jupyter notebook analysis.ipynb

# Launch dashboard
streamlit run app.py
```

Dashboard: http://localhost:8501

## Technology Stack

- **Python 3.11** | **Pandas** | **Scikit-learn** | **Streamlit** | **Plotly**

---

**Daniyal Rosli** | UiTM Kedah | October 2025

_Machine learning system achieving 90.8% accuracy in predicting poverty escape for evidence-based zakat distribution._
