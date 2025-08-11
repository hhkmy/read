from googletrans import Translator

def translate_myanmar_to_english(text: str) -> str:
    translator = Translator()
    result = translator.translate(text, src='my', dest='en')
    return result.text

text = "10 things to prepare for a refreshing and productive day."
english_text = translate_myanmar_to_english(text)
formatted_text = english_text.lower().replace(" ", "-")
print(formatted_text)