# Deployment

The project is hosted at [Digital Ocean](https://www.digitalocean.com/) using [NGINX](https://www.nginx.com/).

## Digital Ocean

I found out a few years ago about [Github Student Developer Pack](https://education.github.com/pack) so I had already registered there before starting this course. So setting up my account and receiving my \$50 credit through Github was no issue.

I have some experience with [Amazon Web Services](https://aws.amazon.com/) (AWS) since earlier because I studied the course Introduktion till Cloud Computing at [Blekinge Tekniska Högskola](https://www.bth.se/) a while back.

With the instructions at [jsramverk.se](https://jsramverk.se/) I had no problems setting up a droplet and getting started.

## Frontend

Hosting the frontend was not very challenging when following the instructions at [jsramverk.se](https://jsramverk.se/). 

## Backend

When it came to hosting the backend I initially had some issues getting started with [pm2](https://pm2.keymetrics.io/). I was eventually able to run the backend using `pm2`. Later on I found instructions elsewhere about how to run the backend through [systemd](https://systemd.io/). I found `systemd` more appropriate to use compared to `pm2` so that it what I am using now. 

Some of the benefits with using `systemd` instead of `pm2` are that you don't have to install another dependency, `systemd` comes installed with the droplet. You also do not have to have an open terminal when running the backend as you would have to with `pm2`, `systemd` runs in the background.

## Other comments

I cannot say what has been the single most interesting thing to learn. I have learned a lot of useful things during this course. I had for example never used `NGINX`, `pm2` or `systemd` before and these applications will certainly be useful to know in the future.

I spent a long time rewriting my tests for part4 for example and in the end it was `pm2` that saved me when I had trouble getting the tests to pass using [travis](https://travis-ci.com/). 