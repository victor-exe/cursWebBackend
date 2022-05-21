$(document).ready(()=>{
    var socket = io.connect("http://academia.go.ro:8071/chat");

    var myUser = {};

    let generateAvatar = (name) =>{
        return `https://avatars.dicebear.com/api/big-ears-neutral/${name}.svg`;
    }

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

    $("#joinbut").click(()=>{
        let name = $("#iname").val();
        myUser = {
            user: name,
            avatar: generateAvatar(name)
        }
        socket.emit("join", myUser);
        $(".joinWindow").removeClass("active");
    })

    $("#iname").change((e)=>{
        let name = $("#iname").val();
        $(".content .avatar").attr("src", generateAvatar(name))
    })

    $("input").on("keyup", (e)=>{
        $(e.target).change();
    })

    let Mesaj = (from, message, eu = "") => {
        return $(`
            <div class="message ${eu} ${from.user}">
            <img src="${from.avatar}">
                <h5>${from.user}</h5>
                <p>${message}</p>
            </div>
        `)
    }

    socket.on("message", (data)=>{
        let newMsg = Mesaj(data.from, data.message)
        $(".chatarea").append(newMsg)
    })

    $("#sbutton").click(()=>{
        let text = $("#tinput").val();
        socket.emit("message", text);
        let mymsg = Mesaj(myUser, text, "me");
        $(".chatarea").append(mymsg);
        $("#tinput").val("");

        $(".chatarea").animate({
            scrollTop: 10000,
        })
    })

    $("#tinput").on("keyup", (e)=>{
        console.log(e.key);
        if(e.key == "Enter")
            $("#sbutton").click();
    })
})