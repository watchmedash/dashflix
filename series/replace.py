import os
import re

# Get the current working directory where the script is located
directory = os.getcwd()

# Define the search and replace strings
search_string = "../images/logo.png"
replace_string = "../images/logo.webp"

# Loop through the files in the directory
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        file_path = os.path.join(directory, filename)

        # Read the contents of the HTML file
        with open(file_path, "r") as file:
            file_contents = file.read()

        # Perform the replacement using regular expressions
        updated_contents = re.sub(search_string, replace_string, file_contents)

        # Write the updated contents back to the file
        with open(file_path, "w") as file:
            file.write(updated_contents)

        print(f"Updated: {filename}")

print("Replacement complete.")
