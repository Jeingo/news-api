let socket = io()

socket.on('message', function (data) {
    alert(data)
})
