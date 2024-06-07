import os
from bs4 import BeautifulSoup

def remove_script_tag(file_path, script_src):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')

    # Find all script tags with the specified src attribute
    script_tags = soup.find_all('script', src=script_src)

    # Remove each found script tag
    for script_tag in script_tags:
        script_tag.extract()

    # Update the file with the modified content
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

def process_html_files(directory_path, script_src):
    for filename in os.listdir(directory_path):
        if filename.endswith(".html"):
            file_path = os.path.join(directory_path, filename)
            remove_script_tag(file_path, script_src)
            print(f"Script tag removed from {filename}")

# Get the current working directory
current_directory = os.getcwd()

# Specify the script source that needs to be removed
script_src_to_remove = "https://alwingulla.com/88/tag.min.js"

# Use the current directory as the base path
process_html_files(current_directory, script_src_to_remove)
