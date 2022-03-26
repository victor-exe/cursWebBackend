$(document).ready(()=>{

    let selectElev = (elev, el) => {
        $(`.mainContent .head img`).attr("src", elev.foto_src);
        $(`.mainContent .head .nume`).text(elev.numeComplet);
        $(`#listaElevi li`).removeClass("selected");
        el.addClass("selected");
    }

    $("#inputClasa").change((e)=>{
        let numeClasa = $("#inputClasa").val();
        $.get(`http://academia.go.ro:8071/catalog/getClasa/${numeClasa}`, (res, err)=>{
            $("#listaElevi").empty();
            if(res.elevi){
                let elevi = res.elevi;
                for(let i = 0; i < elevi.length; i++){
                    let nume = elevi[i].numeComplet;
                    let el = $(`<li class = "elev"> ${nume} </li>`)
                    $("#listaElevi").append(el);
                    el.click(()=>{
                        selectElev(elevi[i], el);
                    })
                }
            }

            else{
                $("#listaElevi").append("Clasa nu exista.");
            }
        });
    })
})