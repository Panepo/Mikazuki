# Import required modules
import argparse
import jieba.posseg as pseg
from opencc import OpenCC
from nltk.metrics.distance import jaro_winkler_similarity

############ Add argument parser for command line arguments ############
parser = argparse.ArgumentParser(description="Keyword checker")
parser.add_argument(
    "--input", "-i", type=str, required=True, help="Input string for searching"
)
args = parser.parse_args()

s2t = OpenCC('s2t')
t2s = OpenCC('t2s')

keywords = ["weather"]
threshold = 0.8

def main():
    input_s = t2s.convert(args.input)
    words = pseg.cut(input_s)

    word_list = []
    for word, flag in words:
        if word is not ' ':
            word_dict = { 'word': s2t.convert(word), 'tag': flag }
            word_list.append(word_dict)


    result = False
    for word in word_list:
        for keyword in keywords:
            if word['tag'] in 'eng':
                distance = jaro_winkler_similarity(word['word'],keyword)
                if distance > threshold:
                    result = True
            else:
                if word['word'] in keyword:
                    result = True

    if result is True:
        print("Match")
    else:
        print("Not match")


if __name__ == "__main__":
    main()
