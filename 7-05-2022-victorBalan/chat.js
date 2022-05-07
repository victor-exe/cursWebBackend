$(document).ready(()=>{
    var socket = io.connect("http://academia.go.ro:8071/chat");
    socket.on("message", (data)=>{
        console.log(data);
        var newmes = $(`
        <div class="msg">
            <img src="https://avatars.dicebear.com/api/big-ears-neutral/fng.svg" alt="">
            <div class="message">
                <h5 class="from">${data.from.name}</h5>
                <p>${data.message}</p>
            </div>
        </div>
        `)
    })
})