import os

os.system("cd C:\Coding_Projects\maps")

for file in os.listdir("C:\Coding_Projects\maps"):
    if(".svg" in file):
        os.system(f"inkscape --export-type=png {file} --export-png-compression=0")