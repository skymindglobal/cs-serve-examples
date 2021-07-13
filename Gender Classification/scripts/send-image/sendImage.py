import cv2
from datetime import datetime
import time
import requests
import os
from random import randint


def main():
    url = 'http://$URL_DOMAIN/api/v1/$ACCESS_TOKEN/telemetry'  # replace $ACCESS_TOKEN with input access token && $URL_DOMAIN with url domain
    image_root = './../../images/'

    for i in range(6):
        randomfiles = {1: "beckham.jpeg", 2: "female2.jpg", 3: "person2.jpg"}
        pick = randint(1, 3)
        path = os.path.join(image_root, randomfiles[pick])
        read = cv2.imread(path)
        cv2.imwrite("image.png", read)
        files_image = {'image': ('image.png', open('image.png', 'rb'), 'image/png')}
        requests.post(url, files=files_image)
        print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "Sending image at random ...", pick)
        time.sleep(2)

    print("Send Image Completed")


if __name__ == '__main__':
    main()

#  curl -v -X POST http://$URL_DOMAIN/api/v1/$ACCESS_TOKEN/telemetry -F 'image=@beckham.jpg'
