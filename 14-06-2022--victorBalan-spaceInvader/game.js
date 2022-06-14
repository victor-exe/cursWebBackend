$(()=>{
    let map = $(".gameMap");
    let mapSize = map[0].getBoundingClientRect();
    let playerSize = $(".player")[0].getBoundingClientRect();

    let allies = [];
    let enemies = [];
    let bullets = [];
    let player = {
        x: mapSize.width/2 - playerSize.width/2,
        y: mapSize.height - playerSize.height,
        dx: 0,
        dy: 0,
        viteza: 1,
        obiect: $(".player")
    }

    function newElement(x, y, type){
        return{
            x: x,
            y: y,
            dx: 0,
            dy: 0,
            obiect: $(`<div class="${type}" </div>`)
        }
    }

    $(window).keydown((e)=>{
        e.preventDefault();
        if(e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft'){
            player.dx -= player.viteza;
        }
        else if(e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight'){
            player.dx += player.viteza;
        }
        else if(e.key == ' '){
            addBullet();
        }

    })

    $(window).keyup((e)=>{
        e.preventDefault();
        if(e.key == 'a' || e.key == 'A' || e.key == 'ArrowLeft'){
            player.dx = 0;
        }
        else if(e.key == 'd' || e.key == 'D' || e.key == 'ArrowRight'){
            player.dx = 0;
        }
    })

    function randInt(a, b){
        return a+Math.floor(Math.random()*(b-a));
    }

    function addEnemy(){
        let en = newElement(randInt(0, mapSize.width - 60), 
                                    0,
                                    "enemy"
                            )

        en.dy = randInt(1, 3);
        $(".gameMap").append(en.obiect);
        updateElement(en);
        enemies.push(en);
        return en;
    }

    function addBullet(){
        let en = newElement(
            player.x+playerSize.width/2,
            player.y-playerSize.height,
            "bullet"
        )
        en.dy = -3;
        $(".gameMap").append(en.obiect);
        bullets.push(en);
    }

    function updateElement(el){
        el.x += el.dx;
        el.y += el.dy;
        el.obiect.css({'--x': el.x+"px", '--y': el.y+"px"})
    }

    function removeElement(el){
        el.obiect.remove();
    }

    function intersect(el1, el2){
        let c1_x = el1.offset().left + el1.width()/2;
        let c1_y = el1.offset().top + el1.height()/2;
        let c2_x = el2.offset().left + el2.width()/2;
        let c2_y = el2.offset().top + el2.height()/2;
        let d2 = (c1_x - c2_x) * (c1_y - c2_y)    +   (c1_y - c2_y) * (c1_y - c2_y);
        let R = (el1.width() + el2.width()) / 2;
        if(d2 < R*R)
            return true;
        else
            return false;
    }

    let dificultate = 100;
    let tick = 0;

    function update(){
        updateElement(player);
        for(let i = 0; i < enemies.length; i++)
            updateElement(enemies[i]);
        for(let i = 0; i < bullets.length; i++)
            updateElement(bullets[i]);

        for(let i = 0; i < enemies.length; i++)
            for(let j = 0; j < bullets.length; j++)
                if(intersect(enemies[i].obiect, bullets[j].obiect)){
                    removeElement(enemies[i]);
                    removeElement(bullets[j]);
                    enemies.splice(i, 1);
                    bullets.splice(j, 1);
                }
                
        if(tick % (500-dificultate) == 0){
            addEnemy();
            dificultate+=10;
        }
        if(dificultate == 400){
            alert("you won!");
        }
        tick++;
    }

    setInterval(update, 5);
})
