$(document).ready(() => {
    $.get("http://academia.go.ro:8063/getClasa/5A", (data) => {
        console.log(data);

        let elevi = data.elevi;
        for (let e of elevi) {
            for (let mat of e.materii) {
                let media = 0;
                for (let nota of mat.note)
                    media += nota;
                media /= mat.note.length;
                mat.media = media;
            }
        }
        let lista = $(`<ul></ul>`);
        for (let e of elevi) {
            let mediaMate = e.materii.find(m => m.materie == "matematica").media;
            let element = $(`<li>${e.full_name}: ${mediaMate}</li>`);
            lista.append(element);
        }
        $(`body`).append(lista);
    });
})