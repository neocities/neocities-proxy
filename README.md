# neocities-proxy

A start on a caching proxy server for Neocities, based on node-spdy and random other fancy things. Certs in repo are self-signed for example.org, NICE TRY DADE MURPHY.

We were starting to push Nginx beyond it's capabilities, so this is starting to make more sense as an option. It's not done yet.

`npm install`
`sudo node ./src/index.js`

## TODO:

* Cache files locally, serve locally when fresh
* Expire local cache when file updates using Redis pubsub or something
* Contextual SSL certs based on requested domain
* Dynamically load SSL certs from server, provide via proxy based on domain (http://stackoverflow.com/questions/19039132/node-js-multiple-ssl-certificates)
* Server/Request domain separation http://nodejs.org/api/domain.html
* Graceful restart?
* DDoS resistance (tempblock traffic after x requests, something like that)
* Sending access logs to main server (again, pubsub+messagepack or something)