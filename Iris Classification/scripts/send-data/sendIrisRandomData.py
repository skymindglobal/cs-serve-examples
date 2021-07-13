import pandas as pd
import numpy as np
from random import randint
import requests
import time
from datetime import datetime


def main():
    url = 'http://board.konsole.ai/api/v1/$ACCESS_TOKEN/telemetry'  # replace $ACCESS_TOKEN with input access token
    irisdata = pd.read_csv("./../../data/Iris.csv", header=0, index_col='Id')

    for i in range(10):
        v = randint(0, irisdata.shape[0] - 1)
        sepallen, sepalwid, petallen, petalwid = irisdata.iloc[v][0], irisdata.iloc[v][1], irisdata.iloc[v][2], \
                                                 irisdata.iloc[v][3]
        inputdata = np.array([[sepallen, sepalwid, petallen, petalwid]])
        # print(inputdata.tolist())
        print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "Sending random data of", irisdata.iloc[v][4])
        requests.post(url, files={'input': (None, str(inputdata.tolist()))})  # '[[5.1,3.5,1.4,0.2]]'
        time.sleep(0.5)

    print(datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "Completed")


if __name__ == '__main__':
    main()

#  curl -v -X POST http://board.konsole.ai/api/v1/$ACCESS_TOKEN/telemetry -F input=[[5.1,3.5,1.4,0.2]]
