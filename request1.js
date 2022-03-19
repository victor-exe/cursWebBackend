$(document).ready(() => {
    let renderNote = (materii) => {
        let listaNote = $('<ul class="listaNote" />')
        
        let mat = materii.map(m => {
            let s = m.materie + ": ";
            for (let i = 0; i < m.note.length; i++)
                s += m.note[i] + " ";
            return $(`<li>${s}</li>`)
        })
        listaNote.append(mat);
        return listaNote;
    };

    $.get("http://academia.go.ro:8063/random_elev", (res) => {
        console.log(res);

        $("#elev1 .nume").text(res.full_name);
        $("#elevi .poza").attr("src", res.foto_src); //schimbam orice atribut
        $("#elev1").append(renderNote);
    });

    $.get("http://academia.go.ro:8063/random_elev", (res) => {
        console.log(res);

        let card = $(`<div class="card" />`);
        let poza = $(`<img class="poza" src=${res.foto_src}>`);
        let nume = $(`<h2 class="nume"> ${res.full_name} </h2>`);
        card.append(poza);
        card.append(nume);
        let elevi = $("#elevi");
        elevi.append(card);

    });
})