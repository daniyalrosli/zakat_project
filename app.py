import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Set page config
st.set_page_config(page_title='Poverty Analysis Dashboard', layout='wide')

# Model performance metrics (placeholder values - replace with actual model results)
r2 = 0.75  # Example R-squared value
mse = 125.4  # Example Mean Squared Error value
feature_importance = pd.DataFrame({
    'feature': ['Income', 'Household Size', 'Education', 'Age', 'Location'],
    'importance': [0.45, 0.25, 0.15, 0.10, 0.05]
})

# Load data
df = pd.read_excel('/Users/daniyalrosli/zakat_project/main data.xlsx')  # Replace with your actual data file path

# Define constants
POVERTY_LINE = 2208  # Replace with your actual poverty line value
poverty_percentage = (df['JumlahPendapatan'] < POVERTY_LINE).mean() * 100

# Calculate district statistics
district_stats = df.groupby('DAERAH').size().reset_index(name='count')

# Create mock poverty_escape_probability for demonstration (replace with actual model predictions)
np.random.seed(42)  # For reproducible results
df['poverty_escape_probability'] = np.random.uniform(0, 1, len(df))

# Main title
st.title('Poverty Analysis Dashboard')

# Sidebar
st.sidebar.header('Navigation')
page = st.sidebar.radio('Select a page:', 
    ['Overview', 'Income Analysis', 'Demographic Analysis', 'Poverty Prediction'])

if page == 'Overview':
    # Overview metrics
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Total Records", len(df))
    with col2:
        st.metric("Below Poverty Line", f"{poverty_percentage:.1f}%")
    with col3:
        st.metric("Poverty Line (RM)", POVERTY_LINE)

    # Income vs Poverty Line Distribution
    st.subheader('Income Distribution vs Poverty Line')
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.histplot(data=df, x='JumlahPendapatan', bins=50)
    plt.axvline(POVERTY_LINE, color='red', linestyle='--', label='Poverty Line')
    plt.legend()
    st.pyplot(fig)

    # District Analysis
    st.subheader('Applications by District')
    fig, ax = plt.subplots(figsize=(12, 6))
    district_stats['count'].plot(kind='bar')
    plt.xticks(rotation=45)
    st.pyplot(fig)

elif page == 'Income Analysis':
    st.header('Income Analysis')

    # Income Sources
    st.subheader('Average Income by Source')
    income_cols = ['pdtDiri', 'pdtASB', 'pdtBR1M', 'pdtDerma', 'pdtJKM', 'pdtPasangan']
    avg_income = df[income_cols].mean().sort_values(ascending=False)
    
    fig, ax = plt.subplots(figsize=(10, 6))
    avg_income.plot(kind='bar')
    plt.xticks(rotation=45)
    plt.title('Average Income by Source')
    st.pyplot(fig)

    # Income vs Expenses
    st.subheader('Income vs Expenses Analysis')
    col1, col2 = st.columns(2)
    
    with col1:
        fig, ax = plt.subplots(figsize=(8, 6))
        plt.scatter(df['JumlahPendapatan'], df['jumlahBelanja'])
        plt.xlabel('Total Income')
        plt.ylabel('Total Expenses')
        st.pyplot(fig)
    
    with col2:
        expense_ratio = (df['jumlahBelanja'] > df['JumlahPendapatan']).mean() * 100
        st.metric("Households with Expenses > Income", f"{expense_ratio:.1f}%")

elif page == 'Demographic Analysis':
    st.header('Demographic Analysis')

    col1, col2 = st.columns(2)
    
    with col1:
        # Age Distribution
        st.subheader('Age Distribution')
        fig, ax = plt.subplots(figsize=(8, 6))
        sns.histplot(data=df, x='Umur', bins=30)
        st.pyplot(fig)
    
    with col2:
        # Gender Distribution
        st.subheader('Gender Distribution')
        fig, ax = plt.subplots(figsize=(8, 6))
        df['Jantina'].value_counts().plot(kind='pie', autopct='%1.1f%%')
        st.pyplot(fig)

    # Household Size Analysis
    st.subheader('Household Size Analysis')
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.boxplot(x='KiraanHK', y='JumlahPendapatan', data=df)
    plt.title('Income Distribution by Household Size')
    st.pyplot(fig)

else:  # Poverty Prediction
    st.header('Poverty Prediction Model')

    # Feature Importance
    st.subheader('Most Important Factors in Predicting Poverty')
    fig, ax = plt.subplots(figsize=(10, 6))
    feature_importance.plot(x='feature', y='importance', kind='bar', ax=ax)
    plt.xticks(rotation=45)
    st.pyplot(fig)

    # Model Performance
    st.subheader('Model Performance')
    col1, col2 = st.columns(2)
    with col1:
        st.metric("R-squared Score", f"{r2:.3f}")
    with col2:
        st.metric("Mean Squared Error", f"{mse:.2f}")

    # Prediction Demo
    st.subheader('Poverty Escape Probability Distribution')
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.histplot(data=df, x='poverty_escape_probability', bins=30)
    plt.axvline(0.5, color='red', linestyle='--')
    st.pyplot(fig)

# Footer
st.markdown("---")
st.markdown("Dashboard created for poverty analysis in Malaysia")