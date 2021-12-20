import cv2                               # opencv library
from datetime import datetime            # use for current sending time
import time                              # use for delay if needed
import requests                          # requests allows you to send HTTP/1.1 requests
import os                                # to join path and directory
import sys                               # to take the arguments on terminal
from random import randint               # generate random

# sys.argv[1] is the Input access token


def main():
    url = f'https://app.creatorsuite.ai/api/v1/{sys.argv[1]}/telemetry'         # Serve URL
    image_root = './../../images/'                                          # root directory of images
    # Generate random and post the images until completed
    for i in range(6):
        randomfiles = {1: "beckham.jpeg", 2: "female2.jpg", 3: "person2.jpg", 4: "person.jpg", 5: "female.jpg"}  # image files
        pick = randint(1, 5)                                                                                     # generate random
        path = os.path.join(image_root, randomfiles[pick])                                                       # join path to root directory
        read = cv2.imread(path)                                                                                  # read image
        cv2.imwrite("image.png", read)                                                                           # save image to file
        files_image = {'image': ('image.png', open('image.png', 'rb'), 'image/png')}                             # open save image
        requests.post(url, files=files_image)                                                                    # post image to URL
        print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "Sending image at random ...", pick)                 # print post time
        time.sleep(2)

    print("Send Image Completed")


if __name__ == '__main__':
    main()

#  curl -v -X POST https://cs.hyperlinx.ai/api/v1/$ACCESS_TOKEN/telemetry -F 'image=@beckham.jpeg'
