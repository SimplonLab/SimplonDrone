#!/bin/sh
cd /tmp
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
sudo apt-get -y install gedit

sudo sed -i 's/gb/fr/g' /etc/default/keyboard

cd /home/pi/Desktop
git clone https://github.com/SimplonLab/SimplonDrone.git
node -e 'console.log("Node installed");'
