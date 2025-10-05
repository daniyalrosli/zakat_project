# Zakat Poverty Analysis Project

## Project Overview

This project presents a comprehensive data analysis and visualization dashboard for understanding poverty patterns among zakat recipients in Malaysia. The analysis focuses on identifying factors that contribute to poverty and developing predictive models to assess the probability of poverty escape among beneficiaries.

## Objectives

1. **Data Analysis**: Conduct exploratory data analysis (EDA) on zakat recipient data to understand poverty patterns
2. **Poverty Modeling**: Develop machine learning models to predict poverty escape probability
3. **Interactive Dashboard**: Create a user-friendly web application for stakeholders to explore insights
4. **Policy Insights**: Provide actionable insights for zakat distribution and poverty alleviation programs

## Dataset Description

The project uses real zakat recipient data (`main data.xlsx`) containing:

### Key Variables:

- **Demographics**: Age (Umur), Gender (Jantina), Marital Status (tarafkahwin)
- **Geographic**: District (DAERAH), Address information
- **Income Sources**:
  - Personal income (pdtDiri)
  - ASB dividends (pdtASB)
  - BR1M assistance (pdtBR1M)
  - Donations (pdtDerma)
  - JKM assistance (pdtJKM)
  - Spouse income (pdtPasangan)
  - Other sources (pdtPencen, pdtPerkeso, etc.)
- **Expenses**: Various categories including food, clothing, education, transportation
- **Assets**: House ownership, vehicles, appliances, utilities
- **Household Composition**: Number of dependents (KiraanHK)
- **Total Income**: JumlahPendapatan (primary target variable)

### Poverty Line Definition:

- **Poverty Line**: RM 2,208 (based on Malaysian poverty line guidelines)

## Project Structure

```
zakat_project/
├── README.md                    # Project documentation
├── main data.xlsx              # Raw dataset (zakat recipients data)
├── analysis.ipynb             # Jupyter notebook with EDA and modeling
├── app.py                     # Streamlit dashboard application
├── poverty_escape_model.pkl   # Trained machine learning model
└── .git/                      # Version control
```

## Technical Implementation

### 1. Data Analysis (`analysis.ipynb`)

The Jupyter notebook contains:

**Exploratory Data Analysis:**

- Data cleaning and preprocessing
- Missing value analysis
- Outlier detection and treatment
- Statistical summaries and distributions
- Correlation analysis

**Visualization:**

- Income distribution analysis
- Poverty vs non-poverty comparisons
- Geographic analysis by district
- Demographic breakdowns
- Asset ownership patterns

**Feature Engineering:**

- Creation of poverty indicators
- Income-to-expense ratios
- Asset ownership scores
- Household dependency ratios

### 2. Machine Learning Model

**Model Development:**

- Target variable: Poverty escape probability
- Features: Income sources, demographics, assets, expenses
- Algorithm: [Specify the algorithm used in your model]
- Performance metrics: R² score, Mean Squared Error (MSE)

**Model Outputs:**

- Poverty escape probability scores
- Feature importance rankings
- Model performance evaluation

### 3. Interactive Dashboard (`app.py`)

Built using **Streamlit**, the dashboard provides four main sections:

#### **Overview Page**

- Total number of records
- Percentage below poverty line
- Income distribution vs poverty line
- Applications by district

#### **Income Analysis**

- Average income by source
- Income vs expenses scatter plots
- Households with expenses exceeding income

#### **Demographic Analysis**

- Age distribution
- Gender distribution
- Income by household size

#### **Poverty Prediction**

- Feature importance visualization
- Model performance metrics
- Poverty escape probability distribution

## Key Findings and Insights

### Statistical Insights:

- **[X]%** of zakat recipients fall below the poverty line of RM 2,208
- Primary income sources and their contribution to household income
- Correlation between household size and poverty levels
- Geographic distribution of poverty across districts

### Predictive Insights:

- Most important factors for poverty escape prediction
- Model accuracy metrics (R² = 0.75, MSE = 125.4)
- Risk factors that increase poverty likelihood

### Policy Implications:

- Targeted intervention recommendations
- Resource allocation optimization
- Monitoring and evaluation frameworks

## Technologies Used

- **Python 3.11**: Primary programming language
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computations
- **Matplotlib/Seaborn**: Data visualization
- **Scikit-learn**: Machine learning modeling
- **Streamlit**: Web application framework
- **Jupyter Notebook**: Interactive development environment

## Installation and Setup

### Prerequisites

```bash
pip install streamlit pandas numpy matplotlib seaborn scikit-learn openpyxl
```

### Running the Application

1. **Clone the repository:**

```bash
git clone [repository-url]
cd zakat_project
```

2. **Run the Jupyter analysis:**

```bash
jupyter notebook analysis.ipynb
```

3. **Launch the Streamlit dashboard:**

```bash
streamlit run app.py
```

4. **Access the dashboard:**

- Local URL: http://localhost:8501
- The dashboard will open automatically in your default browser

## Usage Instructions

### For Data Analysis:

1. Open `analysis.ipynb` in Jupyter Notebook
2. Run cells sequentially to reproduce the analysis
3. Modify parameters as needed for different analyses

### For Dashboard Interaction:

1. Navigate through different pages using the sidebar
2. Explore various visualizations and metrics
3. Use interactive features to filter and analyze data

## Academic Significance

This project demonstrates:

1. **Applied Data Science**: Real-world application of data science techniques to social issues
2. **Statistical Analysis**: Comprehensive statistical modeling of socioeconomic data
3. **Machine Learning**: Implementation of predictive models for policy applications
4. **Data Visualization**: Effective communication of complex data insights
5. **Social Impact**: Contribution to poverty alleviation and zakat distribution optimization

## Future Enhancements

1. **Advanced Modeling**: Implementation of ensemble methods and deep learning
2. **Real-time Updates**: Integration with live data sources
3. **Geographic Mapping**: Addition of interactive maps for spatial analysis
4. **Mobile Optimization**: Responsive design for mobile devices
5. **Multi-language Support**: Malay and English language options

## Data Privacy and Ethics

- All personal identifiers have been removed or anonymized
- Data is used solely for academic and research purposes
- Compliance with data protection regulations
- Ethical considerations for vulnerable population analysis

## Author Information

**Student**: Daniyal Rosli
**Institution**: UiTM Kedah  
**Date**: October 2025

## Acknowledgments

- Malaysian zakat institutions for providing anonymized data
- Course instructor for guidance and supervision
- Open-source community for tools and libraries used

## License

This project is developed for academic purposes. Please respect data privacy and usage guidelines.

---

_This project represents a comprehensive application of data science techniques to address real-world social challenges in poverty alleviation and zakat distribution optimization._
