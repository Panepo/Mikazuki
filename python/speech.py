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
    "--lang", type=str, default="en-US", help="Select the audio language"
)
args = parser.parse_args()


def main():
    # start speech recognizer
    recognizer = sr.Recognizer()

    # open input audio file
    with sr.AudioFile(args.input) as source:
        audio = recognizer.record(source)

    try:
        # for testing purposes, we're just using the default API key
        # to use another API key, use `r.recognize_google(audio, key="GOOGLE_SPEECH_RECOGNITION_API_KEY")`
        # instead of `r.recognize_google(audio)`
        print("[INFO] Google Speech Recognition thinks you said: ")
        # save program start time
        start_time = time.time()
        print(recognizer.recognize_google(audio, language=args.lang))
        # Calculate processing time
        label = "Process time: %.2f ms" % ((time.time() - start_time) * 1000)
        print("[INFO] " + label)
    except sr.UnknownValueError:
        print("[ERROR] Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print(
            "[ERROR] Could not request results from Google Speech Recognition service; {0}".format(
                e
            )
        )

    # recognize speech using Sphinx
    try:
        print("[INFO] Sphinx thinks you said:")
        # save program start time
        start_time = time.time()
        print(recognizer.recognize_sphinx(audio))
        # Calculate processing time
        label = "Process time: %.2f ms" % ((time.time() - start_time) * 1000)
        print("[INFO] " + label)
    except sr.UnknownValueError:
        print("Sphinx could not understand audio")
    except sr.RequestError as e:
        print("Sphinx error; {0}".format(e))

    '''
    # recognize speech using Microsoft Azure Speech
    AZURE_SPEECH_KEY = ""  # Microsoft Speech API keys 32-character lowercase hexadecimal strings
    try:
        print("Microsoft Azure Speech thinks you said: ")
        # save program start time
        start_time = time.time()
        print(recognizer.recognize_bing(audio, key=AZURE_SPEECH_KEY))
        # Calculate processing time
        label = "Process time: %.2f ms" % ((time.time() - start_time) * 1000)
        print("[INFO] " + label)
    except sr.UnknownValueError:
        print("Microsoft Azure Speech could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Microsoft Azure Speech service; {0}".format(e))
    '''

    '''
    # recognize speech using Wit.ai
    WIT_AI_KEY = ""  # Wit.ai keys are 32-character uppercase alphanumeric strings
    try:
        print("Wit.ai thinks you said:")
        # save program start time
        start_time = time.time()
        print(recognizer.recognize_wit(audio, key=WIT_AI_KEY))
        # Calculate processing time
        label = "Process time: %.2f ms" % ((time.time() - start_time) * 1000)
        print("[INFO] " + label)
    except sr.UnknownValueError:
        print("Wit.ai could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Wit.ai service; {0}".format(e))
    '''


if __name__ == "__main__":
    main()
