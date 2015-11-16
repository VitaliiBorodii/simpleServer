var Peer = require('peerjs');
var peer = new Peer('someid', {host: location.hostname, path: 'web-rtc', port: location.port});
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
navigator.getUserMedia({video: true, audio: true},
    function (stream) {
        var call = peer.call('someid', stream);
        call.on('stream', function (remoteStream) {
            // Show stream in some <video> element.
            debugger
        });
    }, function (err) {
        console.log('Failed to get local stream', err);
    });