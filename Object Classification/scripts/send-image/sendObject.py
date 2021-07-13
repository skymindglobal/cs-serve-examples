import cv2
import time
import requests
import os
from random import randint
from datetime import datetime


def main():
    url = 'http://$URL_DOMAIN/api/v1/$ACCESS_TOKEN/telemetry' # replace $ACCESS_TOKEN with input access token && $URL_DOMAIN with url domain
    object_root = './../../images/'

    for i in range(6):
        randomfiles = {1: "gokart.jpg", 2: "stingray.jpg", 3: "maze.jpg", 4: "rv.jpg", 5: "random.jpg"}
        pick = randint(1, 5)
        path = os.path.join(object_root, randomfiles[pick])
        read = cv2.imread(path)
        cv2.imwrite("object.png", read)
        files = {'image': ('object.png', open('object.png', 'rb'), 'image/png')}
        requests.post(url, files=files)
        print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "Sending image at random ...", pick)
        time.sleep(3)

    print("Send Image Completed")


if __name__ == '__main__':
    main()

#  curl -v -X POST http://$URL_DOMAIN/api/v1/$ACCESS_TOKEN/telemetry -F 'image=@stingray.jpg'
