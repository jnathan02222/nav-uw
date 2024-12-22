import os

os.system("cd C:\Coding_Projects\maps")

for file in os.listdir("C:\Coding_Projects\maps"):
    os.system(f"inkscape --export-plain-svg {file} --export-filename={file[:-4]}.svg")