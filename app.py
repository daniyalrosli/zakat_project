import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import pickle
import warnings

warnings.filterwarnings('ignore')

# ════════════════════════════════════════════════════════════════════════════
# PAGE CONFIGURATION
# ════════════════════════════════════════════════════════════════════════════

st.set_page_config(
    page_title="Zakat Poverty Escape Prediction",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for minimalist, professional design
st.markdown("""
<style>
    /* Metric styling */
    [data-testid="stMetricValue"] {
        font-size: 32px;
        font-weight: 700;
        color: #1a1a1a;
    }
    [data-testid="stMetricLabel"] {
        font-size: 13px;
        font-weight: 600;
        color: #475569;
    }
    .stMetric {
        background: linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%);
        padding: 18px;
        border-radius: 10px;
        border-left: 4px solid #3b82f6;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    
    /* Typography */
    h1 { color: #0f172a; font-size: 36px; font-weight: 800; margin-bottom: 8px; }
    h2 { color: #1e293b; font-size: 24px; font-weight: 700; margin-top: 20px; margin-bottom: 12px; }
    h3 { color: #334155; font-size: 18px; font-weight: 600; margin: 16px 0 10px 0; }
    p, li { color: #475569; font-size: 14px; line-height: 1.6; }
    
    /* Button styling */
    .stButton > button {
        background-color: #3b82f6;
        color: white;
        border: none;
        font-weight: 600;
        padding: 10px 24px;
        border-radius: 8px;
        transition: all 0.3s ease;
    }
    .stButton > button:hover {
        background-color: #2563eb;
        box-shadow: 0 4px 12px rgba(59,130,246,0.3);
    }
    
    /* Sidebar */
    [data-testid="stSidebar"] { background-color: #f8fafc; }
    [data-testid="stSidebarNav"] a { font-size: 13px; font-weight: 600; }
    
    /* Alert boxes */
    .stAlert { border-radius: 8px; padding: 14px; font-size: 13px; }
    
    /* Overall background */
    .main { background-color: #ffffff; }
</style>
""", unsafe_allow_html=True)

# ════════════════════════════════════════════════════════════════════════════
# LOAD DATA & MODEL
# ════════════════════════════════════════════════════════════════════════════

@st.cache_resource
def load_resources():
    try:
        df = pd.read_csv('zakat_features_engineered.csv')
        with open('poverty_escape_model.pkl', 'rb') as f:
            model = pickle.load(f)
        return df, model
    except Exception as e:
        st.error(f"❌ Error loading resources: {e}")
        return None, None

df, model = load_resources()

if df is None or model is None:
    st.error("❌ Could not load data files. Please ensure 'zakat_features_engineered.csv' and 'poverty_escape_model.pkl' exist.")
    st.stop()

# ════════════════════════════════════════════════════════════════════════════
# SIDEBAR NAVIGATION
# ════════════════════════════════════════════════════════════════════════════

st.sidebar.title("🗂️ Dashboard Navigation")
st.sidebar.markdown("---")

page = st.sidebar.radio("Select a page:", [
    "📊 Overview",
    "📈 Analytics",
    "🔮 Individual Prediction"
], label_visibility="collapsed")

st.sidebar.markdown("---")
st.sidebar.markdown(f"""
<div style='background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #0284c7; padding: 14px; border-radius: 8px;'>
    <p style='color: #0c4a6e; font-weight: bold; margin: 0 0 10px 0; font-size: 12px;'>📌 DATASET INFORMATION</p>
    <p style='color: #0c4a6e; margin: 6px 0; font-size: 11px;'><strong>Recipients:</strong> {len(df):,}</p>
    <p style='color: #0c4a6e; margin: 6px 0; font-size: 11px;'><strong>Features Engineered:</strong> 44</p>
    <p style='color: #0c4a6e; margin: 6px 0; font-size: 11px;'><strong>Model Accuracy:</strong> 90.8%</p>
</div>
""", unsafe_allow_html=True)

# ════════════════════════════════════════════════════════════════════════════
# PAGE 1: OVERVIEW
# ════════════════════════════════════════════════════════════════════════════

if page == "📊 Overview":
    st.title("📊 Zakat Poverty Escape Prediction Dashboard")
    st.markdown("**Machine learning system predicting 3-year poverty escape for zakat recipients**")
    st.markdown("---")
    
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("👥 Total Recipients", f"{len(df):,}")
    with col2:
        escape_rate = (df['Poverty_Escape_Combined'].sum() / len(df) * 100)
        st.metric("📈 Current Escape Rate", f"{escape_rate:.1f}%")
    with col3:
        avg_income = df['JumlahPendapatan'].mean()
        st.metric("💰 Average Income", f"RM {avg_income:,.0f}")
    with col4:
        avg_income_pc = df['Income_Per_Capita'].mean()
        st.metric("💵 Per Capita Income", f"RM {avg_income_pc:,.0f}")
    
    st.markdown("---")
    
    # Charts
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("💰 Income Distribution")
        fig1 = go.Figure(data=[go.Histogram(
            x=df['JumlahPendapatan'],
            nbinsx=40,
            marker_color='#3b82f6',
            name='Recipients'
        )])
        fig1.update_layout(
            xaxis_title='Total Income (RM)',
            yaxis_title='Number of Recipients',
            height=350,
            showlegend=False,
            plot_bgcolor='rgba(248,250,252,0.5)',
            paper_bgcolor='white',
            margin=dict(l=50, r=20, t=30, b=50)
        )
        st.plotly_chart(fig1, use_container_width=True)
    
    with col2:
        st.subheader("📈 Escape Rate by Income Diversity")
        diversity_escape = df.groupby('Income_Diversity')['Poverty_Escape_Combined'].apply(
            lambda x: (x.sum() / len(x) * 100) if len(x) > 0 else 0
        )
        fig2 = go.Figure(data=[go.Bar(
            x=diversity_escape.index,
            y=diversity_escape.values,
            marker_color='#10b981',
            text=[f'{v:.1f}%' for v in diversity_escape.values],
            textposition='outside'
        )])
        fig2.update_layout(
            xaxis_title='Number of Income Sources',
            yaxis_title='Escape Rate (%)',
            height=350,
            showlegend=False,
            plot_bgcolor='rgba(248,250,252,0.5)',
            paper_bgcolor='white',
            margin=dict(l=50, r=20, t=30, b=50)
        )
        st.plotly_chart(fig2, use_container_width=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("👥 Age Distribution")
        fig3 = go.Figure(data=[go.Histogram(
            x=df['Umur'],
            nbinsx=25,
            marker_color='#8b5cf6',
            name='Recipients'
        )])
        fig3.update_layout(
            xaxis_title='Age (years)',
            yaxis_title='Number of Recipients',
            height=350,
            showlegend=False,
            plot_bgcolor='rgba(248,250,252,0.5)',
            paper_bgcolor='white',
            margin=dict(l=50, r=20, t=30, b=50)
        )
        st.plotly_chart(fig3, use_container_width=True)
    
    with col2:
        st.subheader("👨‍👩‍👧‍👦 Household Size Distribution")
        fig4 = go.Figure(data=[go.Box(
            y=df['Total_Household_Members'],
            marker_color='#f59e0b',
            name='Household Size'
        )])
        fig4.update_layout(
            yaxis_title='Number of Members',
            height=350,
            showlegend=False,
            plot_bgcolor='rgba(248,250,252,0.5)',
            paper_bgcolor='white',
            margin=dict(l=50, r=20, t=30, b=50)
        )
        st.plotly_chart(fig4, use_container_width=True)
    
    st.markdown("---")
    st.subheader("🎯 Key Success Factors")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        <div style='background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-left: 4px solid #15803d; padding: 16px; border-radius: 8px;'>
            <h4 style='color: #15803d; margin-top: 0; margin-bottom: 12px;'>✅ What Drives Success</h4>
            <p style='color: #166534; margin: 8px 0;'><strong>Multiple Income Sources:</strong> Recipients with 2+ income sources achieve <strong>65% escape rate</strong> (vs 38% baseline)</p>
            <p style='color: #166534; margin: 8px 0;'><strong>Dual-Income Households:</strong> <strong>78% higher</strong> probability of escaping poverty</p>
            <p style='color: #166534; margin: 8px 0;'><strong>Age 30-50:</strong> Peak earning years with highest escape potential</p>
            <p style='color: #166534; margin: 8px 0;'><strong>Higher Per Capita Income:</strong> >RM300 per capita is a strong predictor</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style='background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #991b1b; padding: 16px; border-radius: 8px;'>
            <h4 style='color: #991b1b; margin-top: 0; margin-bottom: 12px;'>⚠️ What Prevents Success</h4>
            <p style='color: #7f1d1d; margin: 8px 0;'><strong>Single Income Source:</strong> Only <strong>20% escape rate</strong> - highly vulnerable</p>
            <p style='color: #7f1d1d; margin: 8px 0;'><strong>High Dependency Ratio:</strong> More dependents = reduced escape probability</p>
            <p style='color: #7f1d1d; margin: 8px 0;'><strong>Very Low Per Capita:</strong> <RM300 per capita requires critical intervention</p>
            <p style='color: #7f1d1d; margin: 8px 0;'><strong>Young Age + Low Skills:</strong> Limited earning capacity and experience</p>
        </div>
        """, unsafe_allow_html=True)

# ════════════════════════════════════════════════════════════════════════════
# PAGE 2: ANALYTICS
# ════════════════════════════════════════════════════════════════════════════

elif page == "📈 Analytics":
    st.title("📈 Interactive Data Analytics")
    st.markdown("**Explore recipient data with interactive filters**")
    st.markdown("---")
    
    # Filters
    col1, col2 = st.columns(2)
    
    with col1:
        income_range = st.slider(
            "💰 Income Range (RM):",
            int(df['JumlahPendapatan'].min()),
            int(df['JumlahPendapatan'].max()),
            (int(df['JumlahPendapatan'].min()), int(df['JumlahPendapatan'].max())),
            step=100
        )
    
    with col2:
        age_range = st.slider(
            "👤 Age Range:",
            int(df['Umur'].min()),
            int(df['Umur'].max()),
            (int(df['Umur'].min()), int(df['Umur'].max()))
        )
    
    # Apply filters
    df_filtered = df[
        (df['JumlahPendapatan'] >= income_range[0]) & 
        (df['JumlahPendapatan'] <= income_range[1]) &
        (df['Umur'] >= age_range[0]) & 
        (df['Umur'] <= age_range[1])
    ]
    
    st.info(f"🔍 **Showing {len(df_filtered):,} of {len(df):,} recipients** ({len(df_filtered)/len(df)*100:.1f}%)")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📊 Income Diversity Distribution")
        div_dist = df_filtered['Income_Diversity'].value_counts().sort_index()
        fig5 = go.Figure(data=[go.Bar(
            x=div_dist.index,
            y=div_dist.values,
            marker_color='#3b82f6',
            text=div_dist.values,
            textposition='outside'
        )])
        fig5.update_layout(
            xaxis_title='Number of Income Sources',
            yaxis_title='Count',
            height=350,
            showlegend=False,
            plot_bgcolor='rgba(248,250,252,0.5)',
            paper_bgcolor='white',
            margin=dict(l=50, r=20, t=30, b=50)
        )
        st.plotly_chart(fig5, use_container_width=True)
    
    with col2:
        st.subheader("💑 Dual Income Household Status")
        dual_dist = df_filtered['Dual_Income_Household'].value_counts()
        colors_pie = ['#ef4444', '#10b981']
        fig6 = go.Figure(data=[go.Pie(
            labels=['Single Income', 'Dual Income'],
            values=dual_dist.values,
            marker_colors=colors_pie,
            textinfo='label+percent'
        )])
        fig6.update_layout(height=350, paper_bgcolor='white')
        st.plotly_chart(fig6, use_container_width=True)
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("💹 Income vs Household Size")
        fig7 = go.Figure(data=[go.Scatter(
            x=df_filtered['Total_Household_Members'],
            y=df_filtered['JumlahPendapatan'],
            mode='markers',
            marker=dict(
                size=6,
                color=df_filtered['Poverty_Escape_Combined'],
                colorscale=[[0, '#ef4444'], [1, '#10b981']],
                showscale=True,
                colorbar=dict(title='Escaped', thickness=15, len=0.7),
                opacity=0.7
            ),
            text=[f"Income: RM {x:,.0f}<br>Members: {y}" 
                  for x, y in zip(df_filtered['JumlahPendapatan'], df_filtered['Total_Household_Members'])],
            hovertemplate='%{text}<extra></extra>'
        )])
        fig7.update_layout(
            xaxis_title='Household Members',
            yaxis_title='Total Income (RM)',
            height=350,
            plot_bgcolor='rgba(248,250,252,0.5)',
            paper_bgcolor='white',
            margin=dict(l=50, r=20, t=30, b=50)
        )
        st.plotly_chart(fig7, use_container_width=True)
    
    with col2:
        st.subheader("📈 Escape Rate Trend by Income")
        escapes_by_income = df_filtered.groupby(pd.cut(df_filtered['JumlahPendapatan'], 10))['Poverty_Escape_Combined'].apply(
            lambda x: (x.sum() / len(x) * 100) if len(x) > 0 else 0
        )
        fig8 = go.Figure()
        fig8.add_trace(go.Scatter(
            x=list(range(len(escapes_by_income))),
            y=escapes_by_income.values,
            fill='tozeroy',
            line_color='#3b82f6',
            fillcolor='rgba(59,130,246,0.2)',
            name='Escape Rate'
        ))
        fig8.update_layout(
            xaxis_title='Income Decile',
            yaxis_title='Escape Rate (%)',
            height=350,
            showlegend=False,
            plot_bgcolor='rgba(248,250,252,0.5)',
            paper_bgcolor='white',
            margin=dict(l=50, r=20, t=30, b=50)
        )
        st.plotly_chart(fig8, use_container_width=True)
    
    st.markdown("---")
    st.subheader("📊 Filtered Dataset Summary")
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Recipients Shown", f"{len(df_filtered):,}")
    with col2:
        esc_rate = (df_filtered['Poverty_Escape_Combined'].sum() / len(df_filtered) * 100) if len(df_filtered) > 0 else 0
        st.metric("Escape Rate", f"{esc_rate:.1f}%")
    with col3:
        st.metric("Avg Income", f"RM {df_filtered['JumlahPendapatan'].mean():,.0f}")
    with col4:
        st.metric("Avg Household", f"{df_filtered['Total_Household_Members'].mean():.1f} members")

# ════════════════════════════════════════════════════════════════════════════
# PAGE 3: INDIVIDUAL PREDICTION
# ════════════════════════════════════════════════════════════════════════════

elif page == "🔮 Individual Prediction":
    st.title("🔮 Individual Poverty Escape Prediction")
    st.markdown("**Enter household details to predict 3-year poverty escape potential**")
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("💰 Income Information")
        primary_income = st.number_input("Primary Income (RM):", min_value=0, value=1000, step=100)
        spouse_income = st.number_input("Spouse Income (RM):", min_value=0, value=0, step=100)
        other_income = st.number_input("Other Income (RM):", min_value=0, value=0, step=100)
    
    with col2:
        st.subheader("👨‍👩‍👧‍👦 Household Information")
        household_size = st.slider("Total Household Members:", 1, 15, 5)
        dependent_members = st.slider("Dependent Members:", 0, 12, 2)
        age = st.slider("Age (years):", 18, 80, 40)
    
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    with col1:
        has_other = st.checkbox("Has other income sources?")
    with col2:
        has_children = st.checkbox("Has working children?")
    
    # Predict button
    if st.button("🔍 Make Prediction", use_container_width=True, type="primary"):
        
        # Calculate derived features
        total_income = primary_income + spouse_income + other_income
        income_pc = total_income / household_size if household_size > 0 else 0
        working_members = 1 + int(spouse_income > 0) + int(has_children)
        dep_ratio = dependent_members / max(working_members, 1)
        income_diversity = int(primary_income > 0) + int(spouse_income > 0) + int(other_income > 0)
        
        try:
            # Create sample with exact columns in exact order
            sample = pd.DataFrame()
            
            # Get only the feature columns (exclude target variables)
            target_cols = ['Poverty_Escape_Combined', 'Poverty_Escape_Income_Based', 'Poverty_Escape_Status_Based']
            feature_cols = [c for c in df.columns if c not in target_cols]
            
            # Create a row with data matching the trained model's feature names
            for col in feature_cols:
                col_lower = col.lower()
                
                if col in ['JumlahPendapatan', 'JumlahPendapatan_scaled']:
                    sample[col] = [total_income if col == 'JumlahPendapatan' else (total_income - df['JumlahPendapatan'].mean()) / (df['JumlahPendapatan'].std() + 1e-8)]
                elif col in ['Income_Per_Capita', 'Income_Per_Capita_scaled']:
                    sample[col] = [income_pc if col == 'Income_Per_Capita' else (income_pc - df['Income_Per_Capita'].mean()) / (df['Income_Per_Capita'].std() + 1e-8)]
                elif col in ['Dependency_Ratio', 'Dependency_Ratio_scaled']:
                    sample[col] = [dep_ratio if col == 'Dependency_Ratio' else (dep_ratio - df['Dependency_Ratio'].mean()) / (df['Dependency_Ratio'].std() + 1e-8)]
                elif col in ['Umur', 'Umur_scaled']:
                    sample[col] = [age if col == 'Umur' else (age - df['Umur'].mean()) / (df['Umur'].std() + 1e-8)]
                elif col in ['Total_Household_Members', 'Total_Household_Members_scaled']:
                    sample[col] = [household_size if col == 'Total_Household_Members' else (household_size - df['Total_Household_Members'].mean()) / (df['Total_Household_Members'].std() + 1e-8)]
                elif col == 'Income_Diversity':
                    sample[col] = [max(0, income_diversity - 1)]
                elif col == 'Dual_Income_Household':
                    sample[col] = [int(spouse_income > 0)]
                elif col == 'Has_Other_Income':
                    sample[col] = [int(other_income > 0)]
                elif col == 'Has_Working_Children':
                    sample[col] = [int(has_children)]
                elif col == 'Year_Index':
                    sample[col] = [df[col].median()]
                elif 'Jantina_' in col or 'DAERAH_' in col or 'Age_Category_' in col or 'Income_Category_' in col:
                    # One-hot encoded features - set to 0 (median would be 0 for most)
                    sample[col] = [0]
                else:
                    # Use median for any other unknown features
                    sample[col] = [df[col].median()]
            
            # Make prediction with all features in correct order
            pred = model.predict(sample[feature_cols])[0]
            prob = model.predict_proba(sample[feature_cols])[0, 1]
            
            st.markdown("---")
            st.subheader("🎯 Prediction Results")
            
            col1, col2, col3 = st.columns(3)
            
            with col1:
                if pred == 1:
                    st.success("✅ WILL ESCAPE POVERTY")
                else:
                    st.warning("⚠️ MAY STRUGGLE")
            
            with col2:
                conf = prob if pred == 1 else 1 - prob
                st.metric("Confidence Level", f"{conf*100:.1f}%")
            
            with col3:
                st.metric("Escape Probability", f"{prob*100:.1f}%")
            
            st.markdown("---")
            st.subheader("💡 Personalized Recommendations")
            
            # Income per capita assessment
            if income_pc < 200:
                st.markdown("""
                <div style='background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #991b1b; padding: 14px; border-radius: 8px;'>
                    <p style='color: #7f1d1d; font-weight: bold; margin: 0;'>🔴 CRITICAL: Income per capita below RM200</p>
                    <p style='color: #7f1d1d; margin: 8px 0 0 0;'>Intensive support needed - Priority for intervention programs</p>
                </div>
                """, unsafe_allow_html=True)
            elif income_pc < 300:
                st.markdown("""
                <div style='background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #b45309; padding: 14px; border-radius: 8px;'>
                    <p style='color: #92400e; font-weight: bold; margin: 0;'>🟡 WARNING: Income per capita below RM300</p>
                    <p style='color: #92400e; margin: 8px 0 0 0;'>Income support recommended - Consider income-boost programs</p>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown("""
                <div style='background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-left: 4px solid #15803d; padding: 14px; border-radius: 8px;'>
                    <p style='color: #166534; font-weight: bold; margin: 0;'>🟢 GOOD: Income per capita above RM300</p>
                    <p style='color: #166534; margin: 8px 0 0 0;'>Healthy income level - Focus on diversification strategies</p>
                </div>
                """, unsafe_allow_html=True)
            
            st.markdown("")
            
            # Income diversity assessment
            if income_diversity <= 1:
                st.markdown("""
                <div style='background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #991b1b; padding: 14px; border-radius: 8px;'>
                    <p style='color: #7f1d1d; font-weight: bold; margin: 0;'>🔴 Income Diversification: Single income source</p>
                    <p style='color: #7f1d1d; margin: 8px 0 0 0;'>Seek additional income streams - Critical for financial stability</p>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown(f"""
                <div style='background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-left: 4px solid #15803d; padding: 14px; border-radius: 8px;'>
                    <p style='color: #166534; font-weight: bold; margin: 0;'>🟢 Income Stability: {income_diversity} income sources</p>
                    <p style='color: #166534; margin: 8px 0 0 0;'>Good financial base - Maintain and grow income sources</p>
                </div>
                """, unsafe_allow_html=True)
            
            st.markdown("")
            
            # Dual income assessment
            if spouse_income == 0:
                st.markdown("""
                <div style='background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #b45309; padding: 14px; border-radius: 8px;'>
                    <p style='color: #92400e; font-weight: bold; margin: 0;'>🟡 Employment Opportunity: Spouse could contribute</p>
                    <p style='color: #92400e; margin: 8px 0 0 0;'>Explore employment opportunities - Dual income significantly increases success</p>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown("""
                <div style='background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-left: 4px solid #15803d; padding: 14px; border-radius: 8px;'>
                    <p style='color: #166534; font-weight: bold; margin: 0;'>🟢 Dual Income: Spouse income provides stability</p>
                    <p style='color: #166534; margin: 8px 0 0 0;'>Excellent - Maintain both incomes for financial resilience</p>
                </div>
                """, unsafe_allow_html=True)
            
            st.markdown("---")
            st.subheader("📊 Financial Summary")
            
            col1, col2, col3, col4 = st.columns(4)
            
            with col1:
                st.metric("💰 Total Income", f"RM {total_income:,.0f}")
            with col2:
                st.metric("👤 Per Capita", f"RM {income_pc:,.0f}")
            with col3:
                st.metric("👥 Working Members", f"{working_members}")
            with col4:
                st.metric("📊 Dependency Ratio", f"{dep_ratio:.2f}")
        
        except Exception as e:
            st.error(f"❌ Error during prediction: {str(e)}")

# ════════════════════════════════════════════════════════════════════════════
# FOOTER
# ════════════════════════════════════════════════════════════════════════════

st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #64748b; margin-top: 40px;'>
    <p style='font-size: 13px; margin: 0;'><strong>Zakat Poverty Escape Prediction Dashboard</strong></p>
    <p style='font-size: 12px; margin: 4px 0;'>📊 9,923 Recipients | 🎯 90.8% Accuracy | 📈 94.1% ROC-AUC</p>
    <p style='font-size: 11px; margin: 0; color: #94a3b8;'><em>Evidence-based system for optimizing zakat distribution and poverty alleviation</em></p>
</div>
""", unsafe_allow_html=True)
