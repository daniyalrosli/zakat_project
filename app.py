import streamlit as st
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

import matplotlib.pyplot as plt
import plotly.express as px
import plotly.graph_objects as go

# Set page config
st.set_page_config(
    page_title="Zakat Impact Analysis - Kedah",
    page_icon="🕌",
    layout="wide"
)

# Title and introduction
st.title("Zakat Impact Analysis Dashboard - Kedah")
st.markdown("Forecasting poverty levels and evaluating the impact of zakat distribution using machine learning approaches")

# Sidebar for navigation
st.sidebar.title("Navigation")
page = st.sidebar.radio("Select a page:", ["Overview", "Poverty Forecasting", "Zakat Impact", "Distribution Analytics", "Settings"])
