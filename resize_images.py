import os
from PIL import Image

def resize_image(input_path, output_path, width):
    """Resize an image to the specified width, keeping aspect ratio."""
    with Image.open(input_path) as img:
        w_percent = width / float(img.size[0])
        height = int(float(img.size[1]) * w_percent)
        resized_img = img.resize((width, height), Image.LANCZOS)
        resized_img.save(output_path)
        print(f"Saved resized image to {output_path}")

def resize_images_in_folder(input_folder, output_folder, width, exts=('.jpg', '.jpeg', '.png', '.webp')):
    """Resize all images in a folder to the specified width, keeping aspect ratio."""
    os.makedirs(output_folder, exist_ok=True)
    for filename in os.listdir(input_folder):
        if filename.lower().endswith(exts):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)
            resize_image(input_path, output_path, width)

if __name__ == "__main__":
    # Example usage:
    # python resize_images.py input_folder output_folder 400
    import sys
    if len(sys.argv) != 4:
        print("Usage: python resize_images.py <input_folder> <output_folder> <width>")
        sys.exit(1)
    input_folder = sys.argv[1]
    output_folder = sys.argv[2]
    width = int(sys.argv[3])
    resize_images_in_folder(input_folder, output_folder, width)