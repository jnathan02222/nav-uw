from PIL import Image 
import os 


for file in os.listdir("C:\Coding_Projects\maps"):
    if(".png" in file):
        img = Image.open(f"C:\Coding_Projects\maps\{file}")
        pixels = img.load()
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = pixels[x, y]
                if not a == 0:
                    pixels[x, y] = (r, g, b, 255)
        img.save(f"_{file[:-4]}.png")
        