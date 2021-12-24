import cv2                               # opencv library
import time                              # use for delay if needed
import requests                          # requests allows you to send HTTP/1.1 requests
import sys                               # to take the arguments
from datetime import datetime            # use for current sending time

# sys.argv[1] is the device token
# sys.argv[2] is the file path of the video

skip_frames = 50                         # number of frame to skip
new_width = 512                          # resize width value
new_height = 320                         # resize width value


def main():
    url = f'https://app.creatorsuite.ai/api/v1/{sys.argv[1]}/telemetry'
    cap = cv2.VideoCapture(sys.argv[2])  # use cv2.VideoCapture(0) for webcam footage
    count = 0                            # count for every frame
    count_sent = 0                       # count for every frame sent to the server
    # Get original size
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    print("Original video size: Width=", frame_width, "Height=", frame_height,
          "| New size: Width=", new_width, "Height=", new_height)
    # Read until video is completed
    while True:

        ret, frame_read = cap.read()
        if not ret:
            print("Error opening video stream or file")
            break

        if ret:
            frame_read = cv2.resize(frame_read, (new_width, new_height))                    # resize image
            cv2.imwrite("image.png", frame_read)                                            # write to image file before sending
            files = {'image': ('image.png', open('image.png', 'rb'), 'image/png')}          # open image file
            if count % skip_frames == 0:                                                    # logic to skip frame
                requests.post(url, files=files)                                             # post image to serve
                print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"), " Sending image...")    # print post time
                time.sleep(5)                                                               # comment if no need delay
                count_sent += 1
            count += 1
        else:
            break

    cap.release()
    print("Send Image Completed! --->>>", count_sent, "frames have been sent.")


if __name__ == '__main__':
    main()
