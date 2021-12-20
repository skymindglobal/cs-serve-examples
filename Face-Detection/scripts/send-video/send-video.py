import cv2
import requests
import time
import sys

# Create a VideoCapture object and read from input file
# If the input is the camera, pass 0 instead of the video file name
# sys.argv[1] is the device token
# sys.argv[2] is the file path of the video

cap = cv2.VideoCapture(sys.argv[2])

# Uncomment to send webcam video
# cap = cv2.VideoCapture(0)

start_frame_number = 0
successive_frames_to_skip = 10

cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame_number)

# Check if camera opened successfully
if not cap.isOpened():
    print("Error opening video stream or file")

count = 0
# Read until video is completed
while cap.isOpened():
    # Capture frame-by-frame
    ret, frame = cap.read()
    if ret:
        count += 1
        if count % successive_frames_to_skip != 0:
            continue

        frame = cv2.resize(frame, (480, 320))
        t1 = time.time()
        cv2.imwrite("image.png", frame)
        t2 = time.time()
        print(f"Time: {t2 - t1}s")
        url = f'https://app.creatorsuite.ai/api/v1/{sys.argv[1]}/telemetry'
        files = {'image': ('image.png', open('image.png', 'rb'), 'image/png')}
        requests.post(url, files=files)
        print(f"Time: {time.time() - t2}s")
    else:
        break

# When everything done, release the video capture object
cap.release()

# Closes all the frames
cv2.destroyAllWindows()
