 How a client request gets served by Server

HTTP (Hypertext Transfer Protocol) is a communication protocol used to send data from one program to another over the internet. At one end of the data transfer is a server and at the other end is a client. The client is often browser-based.

The server binds to a host and port (it makes an exclusive connection to an IP address and a port number). Then the server listens for requests. The server can handle many requests at a single time, as follows:
-> Server listens
->Client connects
->Server accepts and receives request (and continues to listen)
->Server can continue to accept other requests
->Server writes response of request or several, possibly interleaved, requests
->Server finally ends (closes) the response(s).
