# Swervy
A node / phone based solution to bluetooth steering for Zwift

For me on an up to date Raspbian
npm install
sudo node server.js

On an up to date Android phone Chromium based or Firefox, open https://ip.address.of.pi:9999/
(it needs to be https to access the acceleromoter, you will have to get past the big warning
about the SSL cert being self signed)

Mount the phone on the handlebars.

Start zwift and connect to the steering control.

Ride!

Things:
Mount the phone pointing along the direction of the handlebars.
Disable auto-rotate on the phone.
Disable screen going to sleep (I'll get round to the wake lock API maybe)


Thanks to @marcoveeneman (https://github.com/marcoveeneman) for getting me started
with the code in https://github.com/WouterJD/FortiusANT/pull/207
