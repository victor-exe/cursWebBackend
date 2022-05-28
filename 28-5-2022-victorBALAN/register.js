$(document).ready(()=>{
    $("#registerbtn").click(()=>{
        let data = $("form").serializeArray();
        let d = {};
        for(let i = 0; i < data.length; i++){
            d[data[i].name] = data[i].value;
        }
        $.ajax({
            type: "POST",
            url: 'http://academia.go.ro:8071/signup',
            data: JSON.stringify(d),
            dataType: 'json',
            contentType: 'application/json',
            success: (res, err)=>{
                if(err)
                    throw(err);
                console.log(res);
            }
        })
    })
})