FROM node

WORKDIR /app

COPY . /app

ENV PORT=5000

ENV MONGO=mongodb+srv://Evoluscan:IxHpbkrmazvmkvf8@cluster0.4al0yej.mongodb.net/?retryWrites=true&w=majority

ENV TOKEN_ACCESS==D/n8SKC9W7INNhAwG-LlCVI1=n4lRlvugv=-04A=eQoZAhOfomTW/LsKEMd/tPYChyazcMUkSt-e/yw35ydItV0yQHZymxPF-FjFi7bRcvozYql8IslVIM-!pq3k3W51R-IDPt6pTbM=/aGv3BO-xljlBWG-3=OYbPcFsDZArBagl68RPDX=YbiK9v6sJo=lBz4NCnPoaFPf8M-g4DM/==3fwgS!XjBsGf58EMBlF!5Si6MShBbRTWf-L8=bSVP

ENV TOKEN_ACCESS_SECRET==D/n8SKC9W7INNhAwG-LlCVI1=n4lRlvugv=-04A=eQoZAhOfomTW/LsKEMd/tPYChyazcMUkSt-e/yw35ydItV0yQHZymxPF-FjFi7bRcvozYql8IslVIM-!pq3k3W51R-IDPt6pTbM=/aGv3BO-xljlBWG-3=OYbPcFsDZArBagl68RPDX=YbiK9v6sJo=lBz4NCnPoaFPf8M-g4DM/==3fwgS!XjBsGf58EMBlF!5Si6MShBbRTWf-L8=bSVP

ENV ACCESS_KEY_ID=AKIAZPPTH4IZGEGSWVAP

ENV SECRET_ACCESS_KEY=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

ENV S3_BUCKET=evoluscan-logo-bucket

ENV S3_REGION=eu-west-2

RUN npm install

RUN npm install pm2 -g

EXPOSE $PORT

CMD ["pm2-runtime", "start", "ecosystem.config.js"]