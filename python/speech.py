# Import required modules
import argparse
import time
import speech_recognition as sr

############ Add argument parser for command line arguments ############
parser = argparse.ArgumentParser(description="Speech recognition demo")
parser.add_argument(
    "--input", type=str, required=True, help="Input audio file for analysis"
)
parser.add_argument(
    "--api", type=str, default='Google', help="The api used for speech recognize"
)
args = parser.parse_args()

def recognize(file, api='Google'):
    # start speech recognizer
    recognizer = sr.Recognizer()

    with file as source:
        audio = recognizer.record(source)

        if (api == 'Google'):
            return recognizer.recognize_google(audio)
        #elif (api == 'Bing'):
        #    return recognizer.recognize_bing(audio)
        elif (api == 'Google Cloud'):
            return recognizer.recognize_google_cloud(audio)
        #elif (api == 'Houndify'):
        #    return recognizer.recognize_houndify(audio)
        #elif (api == 'IBM'):
        #    return recognizer.recognize_ibm(audio)
        elif (api == 'CMU'):
            return recognizer.recognize_sphinx(audio)
        #elif (api == 'Wit'):
        #    return recognizer.recognize_wit(audio)
        else:
            print("[ERROR] please input correct api name")
            return ''

def main():
    # save program start time
    start_time = time.time()

    # open input audio file
    audio = sr.AudioFile(args.input)
    text = recognize(audio, args.api)
    print("[INFO] The speech recognize result is:")
    print(text)

    # Calculate processing time
    label = "Process time: %.2f ms" % ((time.time() - start_time) * 1000)
    print("[INFO] " + label)


if __name__ == "__main__":
    main()
