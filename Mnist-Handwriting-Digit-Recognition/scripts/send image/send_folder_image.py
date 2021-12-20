# Import Module
import os
import time

import requests

# Folder Path
path = $IMAGE_FOLDER #replace $IMAGE_FOLDER with the directory of the image folder

# Change the directory
os.chdir(path)

url = 'https://$URL_DOMAIN/api/v1/$ACCESS_TOKEN/telemetry' #replace $ACCESS_TOKEN with input access token && $URL_DOMAIN with url domain

# iterate through all image files
for imagefile in os.listdir():
    # Check whether file is in which format
    if imagefile.endswith(".jpg"):
        print(imagefile)
        files = {'image': (imagefile,open(imagefile,'rb'), 'image/jpg')}
        requests.post(url, files=files)
        print("Send " + imagefile + " success")
    elif imagefile.endswith(".png"):
        print(imagefile)
        files = {'image': (imagefile,open(imagefile,'rb'), 'image/png')}
        requests.post(url, files=files)
        print("Send " + imagefile + " success")
    time.sleep(3)

print("Send Completed")
