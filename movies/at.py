import os
from bs4 import BeautifulSoup

# Get the current directory where this script is located
current_directory = os.path.dirname(os.path.abspath(__file__))

# Directory where your HTML files are stored (same as the script's directory)
html_directory = current_directory

# Function to extract and format data from an HTML file
def process_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        html_code = file.read()

    # Parse the HTML using Beautiful Soup
    soup = BeautifulSoup(html_code, 'html.parser')

    # Find the <div> with class "content"
    content_div = soup.find('div', class_='content')

    if content_div:
        # Find the <h1> tag within the "content" section and extract the link name
        link_name = content_div.find('h1').text.strip()

        # Find the <source> tag and extract the link address
        link_address = soup.find('source')['src']

        # Format the data as an HTML <li> element with an <a> link
        formatted_output = f'<li><a href="{link_address}">{link_name}</a></li>'
        return formatted_output

    return None

# Process all HTML files in the directory
for filename in os.listdir(html_directory):
    if filename.endswith('.html'):
        file_path = os.path.join(html_directory, filename)
        formatted_data = process_html_file(file_path)
        if formatted_data:
            print(formatted_data)
