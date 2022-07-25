# provides a list of related synonyms for a word

# import nltk
from wordfreq import word_frequency
from nltk.corpus import wordnet
from profanityfilter import ProfanityFilter

pf = ProfanityFilter()
from difflib import SequenceMatcher

# nltk.download('wordnet')
# nltk.download('omw-1.4')

fwrite = open("words.js", 'a')
fread = open("wordlist.txt", 'r')
fwrite.write("export const WORDS = [")
lines = fread.readlines()

for j in range(0, len(lines)):
    word = lines[j]
    synonyms = []
    ls = []
    for syn in wordnet.synsets(word.strip()):
        for i in syn.lemmas():
            synonym = i.name()
            # profanity filter
            if '_' not in synonym and '-' not in synonym and word.lower().strip() not in synonym.lower().strip() and pf.is_clean(synonym):
                # string similarity
                if SequenceMatcher(None, word, synonym).ratio() <= 0.70:
                    # word commonality
                    synonyms.append((word_frequency(synonym, 'en'), synonym))
    if len(set(synonyms)) >= 5:
        ls.append(word.strip().lower())
        for i in sorted(list(set(synonyms)))[::-1][0:5]:
            ls.append(i[1].lower())
        fwrite.write(str(ls))
        if j == len(lines) - 1:
            fwrite.write(']')
        else:
            fwrite.write(',')
    if j == len(lines) - 1:
        fwrite.write('[]]')
