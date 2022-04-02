$(document).ready(()=>{

    let selectElev = (elev, el) => {
        $(`.mainContent .head img`).attr("src", elev.foto_src);
        $(`.mainContent .head .nume`).text(elev.numeComplet);
        $(`#listaElevi li`).removeClass("selected");
        el.addClass("selected");

        $(`.mainContent .note`).empty();
        for(let mat of elev.materii){
            let media = 0;
            let note = elev.note[mat];
            
            for(let i = 0; i < note.length; i++)
                media += note[i];
                media /= note.length;
                media = media.toFixed(2);
                
                
        let nou = $(`
        <div class = "materie"> 
        <b>${mat} :</b> 
        </div>
        
        <span class = "nota">    
        ${note.join(", ")} 
        </span>
        
        <span class = "media"> <b>media:</b> ${media} </span>
        </div>
        `);
        $(`.mainContent .note`).append(nou);
        if(media < 5){
           nou.addClass("picat");
        }
    }

}
    
    $("#inputClasa").change((e)=>{   //functie de callback (nu se opreste codul in functie)
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