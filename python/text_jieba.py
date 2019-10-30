# Import required modules
import argparse
import jieba.posseg as pseg
from opencc import OpenCC

############ Add argument parser for command line arguments ############
parser = argparse.ArgumentParser(description="Segmentate input chinese language")
parser.add_argument(
    "--input", "-i", type=str, required=True, help="Input string for segmentation"
)
args = parser.parse_args()

s2t = OpenCC('s2t')
t2s = OpenCC('t2s')

def main():
    input_s = t2s.convert(args.input)
    words_s = pseg.cut(input_s)
    for word, flag in words_s:
        print('%s %s' % (s2t.convert(word), flag))


if __name__ == "__main__":
    main()
