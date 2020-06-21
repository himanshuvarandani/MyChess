var turn = "white"
var dots = []
var selected = null;

reset()
white()

function reset() {
    document.getElementById("11").classList.add("white-rook")
    document.getElementById("12").classList.add("white-knight")
    document.getElementById("13").classList.add("white-bishop")
    document.getElementById("14").classList.add("white-king")
    document.getElementById("15").classList.add("white-queen")
    document.getElementById("16").classList.add("white-bishop")
    document.getElementById("17").classList.add("white-knight")
    document.getElementById("18").classList.add("white-rook")

    document.getElementById("21").classList.add("white-pawn")
    document.getElementById("22").classList.add("white-pawn")
    document.getElementById("23").classList.add("white-pawn")
    document.getElementById("24").classList.add("white-pawn")
    document.getElementById("25").classList.add("white-pawn")
    document.getElementById("26").classList.add("white-pawn")
    document.getElementById("27").classList.add("white-pawn")
    document.getElementById("28").classList.add("white-pawn")

    document.getElementById("71").classList.add("black-pawn")
    document.getElementById("72").classList.add("black-pawn")
    document.getElementById("73").classList.add("black-pawn")
    document.getElementById("74").classList.add("black-pawn")
    document.getElementById("75").classList.add("black-pawn")
    document.getElementById("76").classList.add("black-pawn")
    document.getElementById("77").classList.add("black-pawn")
    document.getElementById("78").classList.add("black-pawn")
    
    document.getElementById("81").classList.add("black-rook")
    document.getElementById("82").classList.add("black-knight")
    document.getElementById("83").classList.add("black-bishop")
    document.getElementById("84").classList.add("black-queen")
    document.getElementById("85").classList.add("black-king")
    document.getElementById("86").classList.add("black-bishop")
    document.getElementById("87").classList.add("black-knight")
    document.getElementById("88").classList.add("black-rook")
}

function white() {
    var white_rooks = document.querySelectorAll(".white-rook")
    var white_knights = document.querySelectorAll(".white-knight")
    var white_bishops = document.querySelectorAll(".white-bishop")
    var white_queens = document.querySelectorAll(".white-queen")
    var white_kings = document.querySelectorAll(".white-king")
    var white_pawns = document.querySelectorAll(".white-pawn")

    var black_rooks = document.querySelectorAll(".black-rook")
    var black_knights = document.querySelectorAll(".black-knight")
    var black_bishops = document.querySelectorAll(".black-bishop")
    var black_queens = document.querySelectorAll(".black-queen")
    var black_kings = document.querySelectorAll(".black-king")
    var black_pawns = document.querySelectorAll(".black-pawn")

    for (let i = 0; i < white_rooks.length; i++) {
        white_rooks[i].addEventListener("click", white_rook_movement)
    }
    
    for (let i = 0; i < black_rooks.length; i++) {
        if (black_rooks[i].removeEventListener){
            console.log(0)
            black_rooks[i].removeEventListener("click", black_rook_movement)
        }
    }
}

function black() {
    var black_rooks = document.querySelectorAll(".black-rook")
    var black_knights = document.querySelectorAll(".black-knight")
    var black_bishops = document.querySelectorAll(".black-bishop")
    var black_queens = document.querySelectorAll(".black-queen")
    var black_kings = document.querySelectorAll(".black-king")
    var black_pawns = document.querySelectorAll(".black-pawn")

    var white_rooks = document.querySelectorAll(".white-rook")
    var white_knights = document.querySelectorAll(".white-knight")
    var white_bishops = document.querySelectorAll(".white-bishop")
    var white_queens = document.querySelectorAll(".white-queen")
    var white_kings = document.querySelectorAll(".white-king")
    var white_pawns = document.querySelectorAll(".white-pawn")

    for (let i = 0; i < black_rooks.length; i++) {
        black_rooks[i].addEventListener("click", black_rook_movement)
    }

    for (let i = 0; i < white_rooks.length; i++) {
        console.log(1)
        if (white_rooks[i].removeEventListener){
            white_rooks[i].removeEventListener("click", white_rook_movement)
        }
    }
}

function white_rook_movement() {
    if(turn==="white"){
        if(selected){
            remove_dots()

            if(selected===this){
                this.classList.remove("selected")
                selected = null
            }else{
                selected.classList.remove("selected")
                selected = this
                selected.classList.add("selected")
                var id = Number(this.id)
                up_down_movement(id)
                left_right_movement(id)
                add_event_to_dots()
            }
        }else{
            selected = this
            selected.classList.add("selected")
            var id = Number(this.id)
            up_down_movement(id)
            left_right_movement(id)
            add_event_to_dots()
        }
    }
}

function black_rook_movement() {
    if(turn==="black"){
        if(selected){
            remove_dots()

            if(selected===this){
                this.classList.remove("selected")
                selected = null
            }else{
                selected.classList.remove("selected")
                selected = this
                selected.classList.add("selected")
                var id = Number(this.id)
                up_down_movement(id)
                left_right_movement(id)
                add_event_to_dots()
            }
        }else{
            selected = this
            selected.classList.add("selected")
            var id = Number(this.id)
            up_down_movement(id)
            left_right_movement(id)
            add_event_to_dots()
        }
    }
}

function left_right_movement(id) {
    for(j=id+1;j<=id-id%10+8;j+=1){
        dot = document.getElementById(""+String(j))
        if(dot.classList.length<3){
            add_dot(dot)
        }else if(!(dot.classList[2][0]===turn[0])) {
            add_dot(dot)
            break
        }else{
            break
        }
    }
    for(j=id-1;j>=id-id%10+1;j-=1){
        dot = document.getElementById(""+String(j))
        if(dot.classList.length<3){
            add_dot(dot)
        }else if(!(dot.classList[2][0]===turn[0])) {
            add_dot(dot)
            break
        }else{
            break
        }
    }
}

function up_down_movement(id) {
    for(j=id+10;j<=88;j+=10){
        dot = document.getElementById(""+String(j))
        if(dot.classList.length<3){
            add_dot(dot)
        }else if(!(dot.classList[2][0]===turn[0])) {
            add_dot(dot)
            break
        }else{
            break
        }
    }
    for(j=id-10;j>=11;j-=10){
        dot = document.getElementById(""+String(j))
        if(dot.classList.length<3){
            add_dot(dot)
        }else if(!(dot.classList[2][0]===turn[0])) {
            add_dot(dot)
            break
        }else{
            break
        }
    }
}

function add_event_to_dots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", dot_event)
    }
}

function add_dot(dot) {
    var select = document.createElement("div")
    select.classList.add("dot")
    dot.appendChild(select)
    dots.push(dot)
}

function remove_dots() {
    for(i=0;i<dots.length;i++){
        dots[i].innerHTML = ""
        dots[i].removeEventListener("click", dot_event)
    }
    dots = []
}

function dot_event() {
    remove_dots()
    selected.classList.remove("selected")
    icon = selected.classList[2]
    selected.classList.remove(icon)
    this.classList.add(icon)
    if (turn==="black"){
        selected.removeEventListener("click", black_rook_movement)
        turn = "white"
        white()
    }else{
        selected.removeEventListener("click", white_rook_movement)
        turn = "black"
        black()
    }
    selected = null
}
