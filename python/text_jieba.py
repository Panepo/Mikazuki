# Import required modules
import argparse
import jieba

############ Add argument parser for command line arguments ############
parser = argparse.ArgumentParser(description="Segmentate input chinese language")
parser.add_argument(
    "--input", type=str, required=True, help="Input string for segmentation"
)
args = parser.parse_args()


def main():
    seg_list = jieba.cut(args.input)
    print("[INFO] Segmentation results: " + "/".join(seg_list))


if __name__ == "__main__":
    main()
