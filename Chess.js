var turn = "white"
var dots = []
var selected = null
var checked = false
var white_pawn_default_id = ["21", "22", "23", "24", "25", "26", "27", "28"]
var black_pawn_default_id = ["71", "72", "73", "74", "75", "76", "77", "78"]


reset()
white("add")


function reset() {
    document.getElementById("11").classList.add("white-rook")
    document.getElementById("12").classList.add("white-knight")
    document.getElementById("13").classList.add("white-bishop")
    document.getElementById("14").classList.add("white-king")
    document.getElementById("15").classList.add("white-queen")
    document.getElementById("16").classList.add("white-bishop")
    document.getElementById("17").classList.add("white-knight")
    document.getElementById("18").classList.add("white-rook")

    for (let i = 0; i < 8; i++) {
        document.getElementById(white_pawn_default_id[i]).classList.add("white-pawn")
    }

    for (let i = 0; i < 8; i++) {
        document.getElementById(black_pawn_default_id[i]).classList.add("black-pawn")
    }

    document.getElementById("81").classList.add("black-rook")
    document.getElementById("82").classList.add("black-knight")
    document.getElementById("83").classList.add("black-bishop")
    document.getElementById("84").classList.add("black-queen")
    document.getElementById("85").classList.add("black-king")
    document.getElementById("86").classList.add("black-bishop")
    document.getElementById("87").classList.add("black-knight")
    document.getElementById("88").classList.add("black-rook")
}


function white(option) {
    var white_rooks = document.querySelectorAll(".white-rook")
    var white_knights = document.querySelectorAll(".white-knight")
    var white_bishops = document.querySelectorAll(".white-bishop")
    var white_queen = document.querySelector(".white-queen")
    var white_king = document.querySelector(".white-king")
    var white_pawns = document.querySelectorAll(".white-pawn")

    if (option === "add") {
        // add event listener
        for (let i = 0; i < white_rooks.length; i++) {
            white_rooks[i].addEventListener("click", white_rook_movement)
        }

        for (let i = 0; i < white_knights.length; i++) {
            white_knights[i].addEventListener("click", white_knight_movement)
        }

        for (let i = 0; i < white_bishops.length; i++) {
            white_bishops[i].addEventListener("click", white_bishop_movement)
        }

        if (white_queen) {
            white_queen.addEventListener("click", white_queen_movement)
        }

        white_king.addEventListener("click", white_king_movement)

        for (let i = 0; i < white_pawns.length; i++) {
            white_pawns[i].addEventListener("click", white_pawn_movement)
        }
    } else {
        // remove event listener and check for black king is checked or not
        var black_king = document.querySelector(".black-king")
        var black_king_id = Number(black_king.id)

        for (let i = 0; i < white_rooks.length; i++) {
            if (white_rooks[i].removeEventListener) {
                white_rooks[i].removeEventListener("click", white_rook_movement)
            }

            if (!checked) {
                // left-right-movement
                check_king_movement(Number(white_rooks[i].id), 1, black_king)
                // up-down-movement
                check_king_movement(Number(white_rooks[i].id), 10, black_king)
            }
        }
    
        for (let i = 0; i < white_knights.length; i++) {
            if (white_knights[i].removeEventListener) {
                white_knights[i].removeEventListener("click", white_knight_movement)
            }

            if (!checked) {
                var id = Number(white_knights[i].id)
                var knight_moves = [id-21, id-19, id-12, id-8, id+8, id+12, id+19, id+21]

                // check if any of these id has black-king
                for (let j = 0; j < 8; j++) {
                    if (black_king_id === knight_moves[j]) {
                        add_checked_dot_to_king(black_king)
                        break
                    }
                }
            }
        }
    
        for (let i = 0; i < white_bishops.length; i++) {
            if (white_bishops[i].removeEventListener) {
                white_bishops[i].removeEventListener("click", white_bishop_movement)
            }

            if (!checked) {
                // main-diagonal-movement
                check_king_movement(Number(white_bishops[i].id), 11, black_king)
                // cross-diagonal-movement
                check_king_movement(Number(white_bishops[i].id), 9, black_king)
            }
        }
    
        if (white_queen) {
            if (white_queen.removeEventListener) {
                white_queen.removeEventListener("click", white_queen_movement)
            }

            if (!checked) {
                // left-right-movement
                check_king_movement(Number(white_queen.id), 1, black_king)
                // up-down-movement
                check_king_movement(Number(white_queen.id), 10, black_king)
                // main-diagonal-movement
                check_king_movement(Number(white_queen.id), 11, black_king)
                // cross-diagonal-movement
                check_king_movement(Number(white_queen.id), 9, black_king)
            }
        }
    
        if (white_king.removeEventListener) {
            white_king.removeEventListener("click", white_king_movement)
        }
    
        for (let i = 0; i < white_pawns.length; i++) {
            if (white_pawns[i].removeEventListener) {
                white_pawns[i].removeEventListener("click", white_pawn_movement)
            }

            if (!checked) {
                var id = Number(white_pawns[i].id)

                // check for right forward
                dot = document.getElementById("" + String(id + 11))
                if (dot) {
                    if (dot.classList.length === 3) {
                        if (dot === black_king) {
                            add_checked_dot_to_king(black_king)
                        }
                    }
                }

                // check for left forward
                dot = document.getElementById("" + String(id + 9))
                if (dot) {
                    if (dot.classList.length === 3) {
                        if (dot === black_king) {
                            add_checked_dot_to_king(black_king)
                        }
                    }
                }
            }
        }
    }
}


function black(option) {
    var black_rooks = document.querySelectorAll(".black-rook")
    var black_knights = document.querySelectorAll(".black-knight")
    var black_bishops = document.querySelectorAll(".black-bishop")
    var black_queen = document.querySelector(".black-queen")
    var black_king = document.querySelector(".black-king")
    var black_pawns = document.querySelectorAll(".black-pawn")

    if (option === "add") {
        // add event listener
        for (let i = 0; i < black_rooks.length; i++) {
            black_rooks[i].addEventListener("click", black_rook_movement)
        }

        for (let i = 0; i < black_knights.length; i++) {
            black_knights[i].addEventListener("click", black_knight_movement)
        }

        for (let i = 0; i < black_bishops.length; i++) {
            black_bishops[i].addEventListener("click", black_bishop_movement)
        }

        if (black_queen) {
            black_queen.addEventListener("click", black_queen_movement)
        }

        black_king.addEventListener("click", black_king_movement)

        for (let i = 0; i < black_pawns.length; i++) {
            black_pawns[i].addEventListener("click", black_pawn_movement)
        }
    } else {
        // remove event listener and check for white king is checked or not
        var white_king = document.querySelector(".white-king")
        var white_king_id = Number(white_king.id)

        for (let i = 0; i < black_rooks.length; i++) {
            if (black_rooks[i].removeEventListener) {
                black_rooks[i].removeEventListener("click", black_rook_movement)
            }

            if (!checked) {
                // left-right-movement
                check_king_movement(Number(black_rooks[i].id), 1, white_king)
                // up-down-movement
                check_king_movement(Number(black_rooks[i].id), 10, white_king)
            }
        }

        for (let i = 0; i < black_knights.length; i++) {
            if (black_knights[i].removeEventListener) {
                black_knights[i].removeEventListener("click", black_knight_movement)
            }

            if (!checked) {
                var id = Number(black_knights[i].id)
                knight_moves = [id-21, id-19, id-12, id-8, id+8, id+12, id+19, id+21]

                // check if any of these id has black-king
                for (let j = 0; j < 8; j++) {
                    if (white_king_id === knight_moves[j]) {
                        add_checked_dot_to_king(white_king)
                        break
                    }
                }
            }
        }

        for (let i = 0; i < black_bishops.length; i++) {
            if (black_bishops[i].removeEventListener) {
                black_bishops[i].removeEventListener("click", black_bishop_movement)
            }

            if (!checked) {
                // main-diagonal-movement
                check_king_movement(Number(black_bishops[i].id), 11, white_king)
                // cross-diagonal-movement
                check_king_movement(Number(black_bishops[i].id), 9, white_king)
            }
        }

        if (black_queen) {
            if (black_queen.removeEventListener) {
                black_queen.removeEventListener("click", black_queen_movement)
            }

            if (!checked) {
                // left-right-movement
                check_king_movement(Number(black_queen.id), 1, white_king)
                // up-down-movement
                check_king_movement(Number(black_queen.id), 10, white_king)
                // main-diagonal-movement
                check_king_movement(Number(black_queen.id), 11, white_king)
                // cross-diagonal-movement
                check_king_movement(Number(black_queen.id), 9, white_king)
            }
        }

        if (black_king.removeEventListener) {
            black_king.removeEventListener("click", black_king_movement)
        }

        for (let i = 0; i < black_pawns.length; i++) {
            if (black_pawns[i].removeEventListener) {
                black_pawns[i].removeEventListener("click", black_pawn_movement)
            }

            if (!checked) {
                var id = Number(black_pawns[i].id)

                // check for left forward move
                dot = document.getElementById("" + String(id - 11))
                if (dot) {
                    if (dot.classList.length === 3) {
                        if (dot === black_king) {
                            add_checked_dot_to_king(white_king)
                        }
                    }
                }

                // check for right forward move
                dot = document.getElementById("" + String(id - 9))
                if (dot) {
                    if (dot.classList.length === 3) {
                        if (dot === black_king) {
                            add_checked_dot_to_king(white_king)
                        }
                    }
                }
            }
        }
    }
}


function white_rook_movement() {
    if (turn === "white") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            // left-right-movement
            check_movement(id, 1)
            // up-down-movement
            check_movement(id, 10)

            add_event_to_dots()
        }
    }
}


function black_rook_movement() {
    if (turn === "black") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            // left-right-movement
            check_movement(id, 1)
            // up-down-movement
            check_movement(id, 10)

            add_event_to_dots()
        }
    }
}


function white_bishop_movement() {
    if (turn === "white") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            // main-diagonal-movement
            check_movement(id, 11)
            // cross-diagonal-movement
            check_movement(id, 9)

            add_event_to_dots()
        }
    }
}


function black_bishop_movement() {
    if (turn === "black") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            // main-diagonal-movement
            check_movement(id, 11)
            // cross-diagonal-movement
            check_movement(id, 9)

            add_event_to_dots()
        }
    }
}


function white_queen_movement() {
    if (turn === "white") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            // left-right-movement
            check_movement(id, 1)
            // up-down-movement
            check_movement(id, 10)
            // main-diagonal-movement
            check_movement(id, 11)
            // cross-diagonal-movement
            check_movement(id, 9)

            add_event_to_dots()
        }
    }
}


function black_queen_movement() {
    if (turn === "black") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            // left-right-movement
            check_movement(id, 1)
            // up-down-movement
            check_movement(id, 10)
            // main-diagonal-movement
            check_movement(id, 11)
            // cross-diagonal-movement
            check_movement(id, 9)

            add_event_to_dots()
        }
    }
}


function white_pawn_movement() {
    if (turn === "white") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }
        
        if ( flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            // checks if white pawn is at the startng or not
            for (var j = 0; j < 8; j++) {
                if (white_pawn_default_id[j] === String(id)) {
                    break
                }
            }

            // if pawn is at default id then check for 2 forward moves otherwise check for only 1 forward move
            if (white_pawn_default_id[j] === String(id)) {
                for (j = 10; j <= 20; j += 10) {
                    dot = document.getElementById("" + String(id + j))
                    if (dot.classList.length < 3) {
                        add_dot(dot)
                    }
                }
            } else {
                dot = document.getElementById("" + String(id + 10))
                if (dot.classList.length < 3) {
                    add_dot(dot)
                }
            }

            // check for right forward move
            dot = document.getElementById("" + String(id + 11))
            if (dot) {
                if (dot.classList.length === 3) {
                    if (!(dot.classList[2][0] === turn[0])) {
                        add_dot(dot)
                    }
                }
            }

            // check for left forward move
            dot = document.getElementById("" + String(id + 9))
            if (dot) {
                if (dot.classList.length === 3) {
                    if (!(dot.classList[2][0] === turn[0])) {
                        add_dot(dot)
                    }
                }
            }

            add_event_to_dots()
        }
    }
}


function black_pawn_movement() {
    if (turn === "black") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            // checks if black pawn is at the startng or not
            for (var j = 0; j < 8; j++) {
                if (black_pawn_default_id[j] === String(id)) {
                    break
                }
            }

            // if pawn is at default id then check for 2 forward moves otherwise check for only 1 forward move
            if (black_pawn_default_id[j] === String(id)) {
                for (j = 10; j <= 20; j += 10) {
                    dot = document.getElementById("" + String(id - j))
                    if (dot.classList.length < 3) {
                        add_dot(dot)
                    }
                }
            } else {
                dot = document.getElementById("" + String(id - 10))
                if (dot.classList.length < 3) {
                    add_dot(dot)
                }
            }

            // check for left forward move
            if (id % 10 > 1) {
                dot = document.getElementById("" + String(id - 11))
                if (dot.classList.length === 3) {
                    if (!(dot.classList[2][0] === turn[0])) {
                        add_dot(dot)
                    }
                }
            }

            // check for right forward move
            if (id % 10 < 8) {
                dot = document.getElementById("" + String(id - 9))
                if (dot.classList.length === 3) {
                    if (!(dot.classList[2][0] === turn[0])) {
                        add_dot(dot)
                    }
                }
            }

            add_event_to_dots()
        }
    }
}


function white_knight_movement() {
    if (turn === "white") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            knight_movement(id)

            add_event_to_dots()
        }
    }
}


function black_knight_movement() {
    if (turn === "black") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }
        
        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            knight_movement(id)

            add_event_to_dots()
        }
    }
}


function white_king_movement() {
    if (turn === "white") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            king_movement(id)

            add_event_to_dots()
        }
    }
}


function black_king_movement() {
    if (turn === "black") {
        var flag = 1

        if (selected) {
            remove_dots()
            selected.classList.remove("selected")

            if (selected === this) {
                selected = null
                flag = 0
            }
        }

        if (flag === 1) {
            selected = this
            selected.classList.add("selected")

            var id = Number(this.id)

            king_movement(id)

            add_event_to_dots()
        }
    }
}


function knight_movement(id) {
    var knight_moves = [id-21, id-19, id-12, id-8, id+8, id+12, id+19, id+21]

    // if any of these id don't have opposite icon then add dot
    for (let j = 0; j < 8; j++) {
        dot = document.getElementById("" + String(knight_moves[j]))

        if (dot) {
            if (dot.classList.length < 3) {
                add_dot(dot)
            } else if (!(dot.classList[2][0] === turn[0])) {
                add_dot(dot)
            }
        }
    }
}


function king_movement(id) {
    var king_moves = [id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11]

    // if any of these id don't have opposite icon then add dot
    for (let j = 0; j < 8; j++) {
        dot = document.getElementById("" + String(king_moves[j]))

        if (dot) {
            if (dot.classList.length < 3) {
                add_dot(dot)
            } else if (!(dot.classList[2][0] === turn[0])) {
                add_dot(dot)
            }
        }
    }
}


function check_movement(id, k) {
    // check for downward id's w.r.t. board
    for (j = id + k; j <= 88; j += k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // if this id don't have any icon then add dot and 
            // if it has opposite icon then add dot and break
            // and break otherwise
            if (dot.classList.length < 3) {
                add_dot(dot)
            } else if (!(dot.classList[2][0] === turn[0])) {
                add_dot(dot)
                break
            } else {
                break
            }
        } else {
            break
        }
    }

    //check for upward id's w.r.t. board
    for (j = id - k; j >= 11; j -= k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // if this id don't have any icon then add dot and 
            // if it has opposite icon then add dot and break
            // and break otherwise
            if (dot.classList.length < 3) {
                add_dot(dot)
            } else if (!(dot.classList[2][0] === turn[0])) {
                add_dot(dot)
                break
            } else {
                break
            }
        } else {
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
    // adding a child div with dot class
    var select = document.createElement("div")

    select.classList.add("dot")
    dot.appendChild(select)
    dots.push(dot)
}


function remove_dots() {
    for (i = 0; i < dots.length; i++) {
        // remove child div
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
    
    if (this.classList.length=== 3) {
        this.classList.remove(this.classList[2])
    }
    this.classList.add(icon)

    if (turn === "black") {
        // remove event listener from slected id
        if (icon === "black-rook") {
            selected.removeEventListener("click", black_rook_movement)
        } else if (icon === "black-knight") {
            selected.removeEventListener("click", black_knight_movement)
        } else if (icon === "black-bishop") {
            selected.removeEventListener("click", black_bishop_movement)
        } else if (icon === "black-queen") {
            selected.removeEventListener("click", black_queen_movement)
        } else if (icon === "black-king") {
            selected.removeEventListener("click", black_king_movement)
        } else if (icon === "black-pawn") {
            selected.removeEventListener("click", black_pawn_movement)
        }

        // remove event listener and check for black king is checked or not
        black("remove")
        // change turn to white
        turn = "white"
        // add event listener to white icons
        white("add")
    } else {
        // remove event listener from slected id
        if (icon === "white-rook") {
            selected.removeEventListener("click", white_rook_movement)
        } else if (icon === "white-knight") {
            selected.removeEventListener("click", white_knight_movement)
        } else if (icon === "white-bishop") {
            selected.removeEventListener("click", white_bishop_movement)
        } else if (icon === "white-queen") {
            selected.removeEventListener("click", white_queen_movement)
        } else if (icon === "white-king") {
            selected.removeEventListener("click", white_king_movement)
        } else if (icon === "white-pawn") {
            selected.removeEventListener("click", white_pawn_movement)
        }

        // remove event listener and check for white king is checked or not
        white("remove")
        // change turn to black
        turn = "black"
        // add event listener to black icons
        black("add")
    }

    // if king is checked then check for check mate
    if (checked) {
        check_mate()
    }

    selected = null
}


function check_king_movement(id, k, king) {
    // check for downward id's w.r.t. board
    for (j = id + k; j <= 88; j += k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // if this id have any icon then
            // check if it has opposite king then add dot and break
            if (!(dot.classList.length < 3)) {
                if (dot === king) {
                    add_checked_dot_to_king(king)
                }
                break
            }
        } else {
            break
        }
    }

    //check for upward id's w.r.t. board
    for (j = id - k; j >= 11; j -= k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // if this id have any icon then
            // check if it has opposite king then add dot and break
            if (!(dot.classList.length < 3)) {
                if (dot === king) {
                    add_checked_dot_to_king(king)
                }
                break
            }
        } else {
            break
        }
    }
}


function add_checked_dot_to_king(king) {
    // adding a child div with checked class
    check_dot = document.createElement("div")
    check_dot.classList.add("checked")
    king.appendChild(check_dot)
    checked = true
}


function check_mate() {
    
}
