import pandas as pd                      # pandas library to read CSV file
import numpy as np                       # numpy library to handle array data
from random import randint               # generate random
import requests                          # requests allows you to send HTTP/1.1 requests
import time                              # use for delay if needed
import sys                               # to take the arguments on terminal
from datetime import datetime            # use for current sending time

# sys.argv[1] is the Input access token


def main():
    url = f'https://app.creatorsuite.ai/api/v1/{sys.argv[1]}/telemetry'             # Serve Url
    irisdata = pd.read_csv("./../../data/Iris.csv", header=0, index_col='Id')   # read data from source directory
    # Generate random and post the data until completed
    for i in range(10):
        v = randint(0, irisdata.shape[0] - 1)                                                                       # generate random
        sepallen, sepalwid, petallen, petalwid = irisdata.iloc[v][0], irisdata.iloc[v][1], irisdata.iloc[v][2], \
                                                 irisdata.iloc[v][3]                                                # assigned input features
        inputdata = np.array([[sepallen, sepalwid, petallen, petalwid]])                                            # put data into array
        # print(inputdata.tolist())
        print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "Sending random data of", irisdata.iloc[v][4])          # print post time
        requests.post(url, files={'input': (None, str(inputdata.tolist()))})                                        # post image to URL
        time.sleep(0.5)                                                                                             # delay time

    print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "Completed")


if __name__ == '__main__':
    main()

#  curl -v -X POST https://cs.hyperlinx.ai/api/v1/$ACCESS_TOKEN/telemetry -F input=[[5.1,3.5,1.4,0.2]]
