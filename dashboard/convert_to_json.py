import pandas as pd
import os

# Get the absolute path of the script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the Excel file
excel_path = os.path.join(script_dir, '..', 'Zakat_Data_Feature_Engineered.xlsx')

# Load the engineered dataset
df = pd.read_excel(excel_path)

# Construct the output path for the JSON file
json_path = os.path.join(script_dir, 'src', 'data', 'zakat_data.json')

# Create the output directory if it doesn't exist
os.makedirs(os.path.dirname(json_path), exist_ok=True)

# Convert to JSON
df.to_json(json_path, orient='records')

print(f"Successfully converted {excel_path} to {json_path}")
