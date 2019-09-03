# Import required modules
import argparse
from langdetect import detect

############ Add argument parser for command line arguments ############
parser = argparse.ArgumentParser(description="Detect input language")
parser.add_argument(
    "--input", type=str, required=True, help="Input string for analysis"
)
args = parser.parse_args()


def main():
    lang = detect(args.input)
    print("[INFO] Language detected: " + lang)


if __name__ == "__main__":
    main()
