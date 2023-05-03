# Run the file on boot;
#
# nano /etc/crontab
# @reboot root /path/to/script.sh
#

from picamera import PiCamera
from time import sleep
import time
import os

# Purpose of this program is to keep clicking photos,
# till storage is full or the pi is unplugged.
camera = PiCamera()
FILE_PATH='/home/pi/Images'

# create dir first time
if not os.path.exists(FILE_PATH):
    os.makedirs(FILE_PATH)

# initalize camera
camera.start_preview()
sleep(5)

# infinite loop to click pictures
while True:
    #file_name = int(round(time.time()))
    file_name = "test"
    camera.resolution = (80, 80)
    camera.capture(FILE_PATH + '/' + str(file_name) + '.jpg')
    # click a picture every 5 seconds.
    sleep(5)
camera.stop_preview()
