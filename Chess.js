var turn = "white"
var dots = []
var selected = null
var checked = false
var white_pawn_default_id = ["21", "22", "23", "24", "25", "26", "27", "28"]
var black_pawn_default_id = ["71", "72", "73", "74", "75", "76", "77", "78"]
var check_list = []
var number_of_checks = 0
var possible_id = []
var movement_possibility = true


reset()
white("add")


function reset() {
    document.getElementById("11").classList.add("white-rook")
    document.getElementById("12").classList.add("white-knight")
    document.getElementById("13").classList.add("white-bishop")
    document.getElementById("14").classList.add("white-queen")
    document.getElementById("15").classList.add("white-king")
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

            if (number_of_checks  < 2) {
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

            if (number_of_checks  < 2) {
                var id = Number(white_knights[i].id)
                var knight_moves = [id-21, id-19, id-12, id-8, id+8, id+12, id+19, id+21]

                // check if any of these id has black-king
                for (let j = 0; j < 8; j++) {
                    if (black_king_id === knight_moves[j]) {
                        number_of_checks += 1
                        if (!checked) {
                            add_checked_dot_to_king(black_king)
                            check_list.push(id)
                        }
                        break
                    }
                }
            }
        }
    
        for (let i = 0; i < white_bishops.length; i++) {
            if (white_bishops[i].removeEventListener) {
                white_bishops[i].removeEventListener("click", white_bishop_movement)
            }

            if (number_of_checks  < 2) {
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

            if (number_of_checks  < 2) {
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

            if (number_of_checks  < 2) {
                var id = Number(white_pawns[i].id)

                // check for right forward
                dot = document.getElementById("" + String(id + 11))
                if (dot) {
                    if (dot.classList.length === 3) {
                        if (dot === black_king) {
                            number_of_checks += 1
                            if (!checked) {
                                add_checked_dot_to_king(black_king)
                                check_list.push(id)
                            }
                        }
                    }
                }

                // check for left forward
                dot = document.getElementById("" + String(id + 9))
                if (dot) {
                    if (dot.classList.length === 3) {
                        if (dot === black_king) {
                            number_of_checks += 1
                            if (!checked) {
                                add_checked_dot_to_king(black_king)
                                check_list.push(id)
                            }
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

            if (number_of_checks  < 2) {
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

            if (number_of_checks  < 2) {
                var id = Number(black_knights[i].id)
                knight_moves = [id-21, id-19, id-12, id-8, id+8, id+12, id+19, id+21]

                // check if any of these id has black-king
                for (let j = 0; j < 8; j++) {
                    if (white_king_id === knight_moves[j]) {
                        number_of_checks += 1
                        if (!checked) {
                            add_checked_dot_to_king(white_king)
                            check_list.push(id)
                        }
                        break
                    }
                }
            }
        }

        for (let i = 0; i < black_bishops.length; i++) {
            if (black_bishops[i].removeEventListener) {
                black_bishops[i].removeEventListener("click", black_bishop_movement)
            }

            if (number_of_checks  < 2) {
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

            if (number_of_checks  < 2) {
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

            if (number_of_checks  < 2) {
                var id = Number(black_pawns[i].id)

                // check for left forward move
                dot = document.getElementById("" + String(id - 11))
                if (dot) {
                    if (dot.classList.length === 3) {
                        if (dot === white_king) {
                            number_of_checks += 1
                            if (!checked) {
                                add_checked_dot_to_king(white_king)
                                check_list.push(id)
                            }
                        }
                    }
                }

                // check for right forward move
                dot = document.getElementById("" + String(id - 9))
                if (dot) {
                    if (dot.classList.length === 3) {
                        if (dot === white_king) {
                            number_of_checks += 1
                            if (!checked) {
                                add_checked_dot_to_king(white_king)
                                check_list.push(id)
                            }
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

            rook_movement(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

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

            rook_movement(id)
            
            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

            add_event_to_dots()
        }
    }
}


function rook_movement(id) {
    // check if it is removed then king have checked or not
    // for main-diagonal-movement
    movement_possible_or_not(id, 11)
    // for cross-diagonal-movement
    movement_possible_or_not(id, 9)

    if (movement_possibility) {
        // for left-right-movement
        movement_possible_or_not(id, 1)
        var left_right = movement_possibility
        movement_possibility = true
        // for up-down-movement
        movement_possible_or_not(id, 10)
        var up_down = movement_possibility
        
        if (!left_right) {
            check_movement(id, 1)
        } else if (!up_down){
            check_movement(id, 10)
        } else {
            check_movement(id, 1)
            check_movement(id, 10)
        }
    }
    movement_possibility = true
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

            bishop_movement(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

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

            bishop_movement(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

            add_event_to_dots()
        }
    }
}


function bishop_movement(id) {
    // check if it is removed then king have checked or not
    // for left-right-movement
    movement_possible_or_not(id, 1)
    // for up-down-movement
    movement_possible_or_not(id, 10)

    if (movement_possibility) {
        // for main-digonal-movement
        movement_possible_or_not(id, 11)
        var main_diagonal = movement_possibility
        movement_possibility = true
        // for cross-diaonal-movement
        movement_possible_or_not(id, 9)
        var cross_diagonal = movement_possibility
        
        if (!main_diagonal) {
            check_movement(id, 11)
        } else if (!cross_diagonal){
            check_movement(id, 9)
        } else {
            check_movement(id, 11)
            check_movement(id, 9)
        }
    }
    movement_possibility = true
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

            queen_movement(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

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

            queen_movement(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

            add_event_to_dots()
        }
    }
}


function queen_movement(id) {
    // check if it is removed then king have checked or not
    // for left-right-movement
    movement_possible_or_not(id, 1)
    var left_right = movement_possibility
    movement_possibility = true
    // for up-down-movement
    movement_possible_or_not(id, 10)
    var up_down = movement_possibility
    movement_possibility = true
    // for main-digonal-movement
    movement_possible_or_not(id, 11)
    var main_diagonal = movement_possibility
    movement_possibility = true
    // for cross-diaonal-movement
    movement_possible_or_not(id, 9)
    var cross_diagonal = movement_possibility
    movement_possibility = true
    
    if (!left_right) {
        check_movement(id, 1)
    } else if (!up_down){
        check_movement(id, 10)
    } else if (!main_diagonal) {
        check_movement(id, 11)
    } else if (!cross_diagonal){
        check_movement(id, 9)
    } else {
        check_movement(id, 1)
        check_movement(id, 10)
        check_movement(id, 11)
        check_movement(id, 9)
    }
    movement_possibility = true
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

            white_pawn_movement_check(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

            add_event_to_dots()
        }
    }
}


function white_pawn_movement_check(id) {
    // check if it is removed then king have checked or not
    // for left-right-movement
    movement_possible_or_not(id, 1)
    var left_right = movement_possibility
    movement_possibility = true
    // for up-down-movement
    movement_possible_or_not(id, 10)
    var up_down = movement_possibility
    movement_possibility = true
    // for main-digonal-movement
    movement_possible_or_not(id, 11)
    var main_diagonal = movement_possibility
    movement_possibility = true
    // for cross-diaonal-movement
    movement_possible_or_not(id, 9)
    var cross_diagonal = movement_possibility
    movement_possibility = true

    if (left_right) {
        if (!up_down) {
            pawn_white_forward_move(id)
        } else if (!main_diagonal) {
            // check for right forward move
            pawn_diagonal_move(id, 11)
        } else if (!cross_diagonal) {
            // check for left forward move
            pawn_diagonal_move(id, 9)
        } else {
            pawn_white_forward_move(id)
            pawn_diagonal_move(id, 11)
            pawn_diagonal_move(id, 9)
        }
    }
}


function pawn_white_forward_move(id) {
    // checks if white pawn is at the startng or not
    for (var j = 0; j < 8; j++) {
        if (white_pawn_default_id[j] === String(id)) {
            break
        }
    }

    // if pawn is at default id then check for 2 forward moves otherwise check for only 1 forward move
    if (white_pawn_default_id[j] === String(id)) {
        pawn_default_forward_move(id, 1)
    } else {
        pawn_forward_move(id, 1)
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

            black_pawn_movement_check(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

            add_event_to_dots()
        }
    }
}


function black_pawn_movement_check(id) {
    // check if it is removed then king have checked or not
    // for left-right-movement
    movement_possible_or_not(id, 1)
    var left_right = movement_possibility
    movement_possibility = true
    // for up-down-movement
    movement_possible_or_not(id, 10)
    var up_down = movement_possibility
    movement_possibility = true
    // for main-digonal-movement
    movement_possible_or_not(id, 11)
    var main_diagonal = movement_possibility
    movement_possibility = true
    // for cross-diaonal-movement
    movement_possible_or_not(id, 9)
    var cross_diagonal = movement_possibility
    movement_possibility = true

    if (left_right) {
        if (!up_down) {
            pawn_black_forward_move(id)
        } else if (!main_diagonal) {
            // check for right forward move
            pawn_diagonal_move(id, -11)
        } else if (!cross_diagonal) {
            // check for left forward move
            pawn_diagonal_move(id, -9)
        } else {
            pawn_black_forward_move(id)
            pawn_diagonal_move(id, -11)
            pawn_diagonal_move(id, -9)
        }
    }
}


function pawn_black_forward_move(id) {
    // checks if black pawn is at the startng or not
    for (var j = 0; j < 8; j++) {
        if (black_pawn_default_id[j] === String(id)) {
            break
        }
    }

    // if pawn is at default id then check for 2 forward moves otherwise check for only 1 forward move
    if (black_pawn_default_id[j] === String(id)) {
        pawn_default_forward_move(id, -1)
    } else {
        pawn_forward_move(id, -1)
    }
}


function pawn_default_forward_move(id, k) {
    for (j = 10; j <= 20; j += 10) {
        dot = document.getElementById("" + String(id + j*k))
        if (dot.classList.length < 3) {
            if (checked) {
                for (let i = 0; i < check_list.length; i++) {
                    if (dot.id === String(check_list[i])) {
                        possible_id.push(dot.id)
                        break
                    }
                }
            } else {
                add_dot(dot)
            }
        } else {
            break
        }
    }
}


function pawn_forward_move(id, k) {
    dot = document.getElementById("" + String(id + 10*k))
    if (dot.classList.length < 3) {
        if (checked) {
            for (let i = 0; i < check_list.length; i++) {
                if (dot.id === String(check_list[i])) {
                    possible_id.push(dot.id)
                    break
                }
            }
        } else {
            add_dot(dot)
        }
    }
}


function pawn_diagonal_move(id, k) {
    dot = document.getElementById("" + String(id + k))
    if (dot) {
        if (dot.classList.length === 3) {
            if (!(dot.classList[2][0] === turn[0])) {
                if (checked) {
                    for (let i = 0; i < check_list.length; i++) {
                        if (dot.id === String(check_list[i])) {
                            possible_id.push(dot.id)
                            break
                        }
                    }
                } else {
                    add_dot(dot)
                }
            }
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

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

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

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

            add_event_to_dots()
        }
    }
}


function knight_movement(id) {
    // check if it is removed then king have checked or not
    // for left-right-movement
    movement_possible_or_not(id, 1)
    var left_right = movement_possibility
    movement_possibility = true
    // for up-down-movement
    movement_possible_or_not(id, 10)
    var up_down = movement_possibility
    movement_possibility = true
    // for main-digonal-movement
    movement_possible_or_not(id, 11)
    var main_diagonal = movement_possibility
    movement_possibility = true
    // for cross-diaonal-movement
    movement_possible_or_not(id, 9)
    var cross_diagonal = movement_possibility
    movement_possibility = true
    
    if (left_right && up_down && main_diagonal && cross_diagonal) {
        var knight_moves = [id-21, id-19, id-12, id-8, id+8, id+12, id+19, id+21]

        // if any of these id don't have opposite scout then add dot
        for (let j = 0; j < 8; j++) {
            dot = document.getElementById("" + String(knight_moves[j]))

            if (dot) {
                if (dot.classList.length < 3) {
                    if (checked) {
                        for (let i = 0; i < check_list.length; i++) {
                            if (dot.id === String(check_list[i])) {
                                possible_id.push(dot.id)
                                break
                            }
                        }
                    } else {
                        add_dot(dot)
                    }
                } else if (!(dot.classList[2][0] === turn[0])) {
                    if (checked) {
                        for (let i = 0; i < check_list.length; i++) {
                            if (dot.id === String(check_list[i])) {
                                possible_id.push(dot.id)
                                break
                            }
                        }
                    } else {
                        add_dot(dot)
                    }
                }
            }
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

            white_king_movement_check(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

            add_event_to_dots()
        }
    }
}


function white_king_movement_check(id) {
    var black_rooks = document.querySelectorAll(".black-rook")
    var black_knights = document.querySelectorAll(".black-knight")
    var black_bishops = document.querySelectorAll(".black-bishop")
    var black_queen = document.querySelector(".black-queen")
    var black_king = document.querySelector(".black-king")
    var black_pawns = document.querySelectorAll(".black-pawn")

    var king_moves = [id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11]

    for (let j = 0; j < 8; j++) {
        var place = document.getElementById("" + String(king_moves[j]))
        
        if (place) {
            if (place.classList.length >= 3) {
                if (place.classList[2][0] === turn[0]) {
                    continue
                }
            }
        } else {
            continue
        }

        var place_id = place.id
        var check = false

        for (let i = 0; i < black_rooks.length; i++) {
            if (!check) {
                // left-right-movement
                check = king_movement(Number(black_rooks[i].id), place_id, 1, check)
                // up-down-movement
                check = king_movement(Number(black_rooks[i].id), place_id, 10, check)
            } else {
                break
            }
        }

        for (let i = 0; i < black_knights.length; i++) {
            if (!check) {
                var id1 = Number(black_knights[i].id)
                knight_moves = [id1-21, id1-19, id1-12, id1-8, id1+8, id1+12, id1+19, id1+21]

                // check if any of these id has black-king
                for (let j = 0; j < 8; j++) {
                    if (place_id === String(knight_moves[j])) {
                        check = true
                        break
                    }
                }
            } else {
                break
            }
        }

        for (let i = 0; i < black_bishops.length; i++) {
            if (!check) {
                // main-diagonal-movement
                check = king_movement(Number(black_bishops[i].id), place_id, 11, check)
                // cross-diagonal-movement
                check = king_movement(Number(black_bishops[i].id), place_id, 9, check)
            } else {
                break
            }
        }

        if (black_queen) {
            if (!check) {
                // left-right-movement
                check = king_movement(Number(black_queen.id), place_id, 1, check)
                // up-down-movement
                check = king_movement(Number(black_queen.id), place_id, 10, check)
                // main-diagonal-movement
                check = king_movement(Number(black_queen.id), place_id, 11, check)
                // cross-diagonal-movement
                check = king_movement(Number(black_queen.id), place_id, 9, check)
            }
        }

        if (!check) {
            var id1 = black_king.id
            var black_king_moves = [id1-11, id1-10, id1-9, id1-1, id1+1, id1+9, id1+10, id1+11]

            for (let k = 0; k < 8; k++) {
                if (place_id === String(black_king_moves[k])) {
                    check = true
                    break
                }
            }
        }

        for (let i = 0; i < black_pawns.length; i++) {
            if (!check) {
                var id1 = Number(black_pawns[i].id)

                // check for left forward move
                dot = document.getElementById("" + String(id1 - 11))
                if (dot) {
                    if (dot.id === place_id) {
                        check = true
                    }
                }

                // check for right forward move
                dot = document.getElementById("" + String(id1 - 9))
                if (dot) {
                    if (dot.id === place_id) {
                        check = true
                    }
                }
            } else {
                break
            }
        }

        if (!check) {
            if (place.classList.length < 3) {
                if (checked) {
                    possible_id.push(place.id)
                } else {
                    add_dot(place)
                }
            } else if (!(place.classList[2][0] === turn[0])) {
                if (checked) {
                    possible_id.push(place.id)
                } else {
                    add_dot(place)
                }
            }
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

            black_king_movement_check(id)

            if (possible_id.length) {
                for (let i = 0; i < possible_id.length; i++) {
                    dot = document.getElementById(possible_id[i])
                    add_dot(dot)
                }
                possible_id = []
            }

            add_event_to_dots()
        }
    }
}


function black_king_movement_check(id) {
    var white_rooks = document.querySelectorAll(".white-rook")
    var white_knights = document.querySelectorAll(".white-knight")
    var white_bishops = document.querySelectorAll(".white-bishop")
    var white_queen = document.querySelector(".white-queen")
    var white_king = document.querySelector(".white-king")
    var white_pawns = document.querySelectorAll(".white-pawn")

    var king_moves = [id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11]

    for (let j = 0; j < 8; j++) {
        var place = document.getElementById("" + String(king_moves[j]))
        
        if (place) {
            if (place.classList.length >= 3) {
                if (place.classList[2][0] === turn[0]) {
                    continue
                }
            }
        } else {
            continue
        }

        var place_id = place.id
        var check = false

        for (let i = 0; i < white_rooks.length; i++) {
            if (!check) {
                // left-right-movement
                check = king_movement(Number(white_rooks[i].id), place_id, 1, check)
                // up-down-movement
                check = king_movement(Number(white_rooks[i].id), place_id, 10, check)
            } else {
                break
            }
        }

        for (let i = 0; i < white_knights.length; i++) {
            if (!check) {
                var id1 = Number(white_knights[i].id)
                knight_moves = [id1-21, id1-19, id1-12, id1-8, id1+8, id1+12, id1+19, id1+21]

                // check if any of these id has black-king
                for (let j = 0; j < 8; j++) {
                    if (place_id === String(knight_moves[j])) {
                        check = true
                        break
                    }
                }
            } else {
                break
            }
        }

        for (let i = 0; i < white_bishops.length; i++) {
            if (!check) {
                // main-diagonal-movement
                check = king_movement(Number(white_bishops[i].id), place_id, 11, check)
                // cross-diagonal-movement
                check = king_movement(Number(white_bishops[i].id), place_id, 9, check)
            } else {
                break
            }
        }

        if (white_queen) {
            if (!check) {
                // left-right-movement
                check = king_movement(Number(white_queen.id), place_id, 1, check)
                // up-down-movement
                check = king_movement(Number(white_queen.id), place_id, 10, check)
                // main-diagonal-movement
                check = king_movement(Number(white_queen.id), place_id, 11, check)
                // cross-diagonal-movement
                check = king_movement(Number(white_queen.id), place_id, 9, check)
            }
        }

        if (!check) {
            var id1 = Number(white_king.id)
            var white_king_moves = [id1-11, id1-10, id1-9, id1-1, id1+1, id1+9, id1+10, id1+11]

            for (let k = 0; k < 8; k++) {
                if (place_id === String(white_king_moves[k])) {
                    check = true
                    break
                }
            }
        }

        for (let i = 0; i < white_pawns.length; i++) {
            if (!check) {
                var id1 = Number(white_pawns[i].id)

                // check for left forward move
                dot = document.getElementById("" + String(id1 + 11))
                if (dot) {
                    if (dot.id === place_id) {
                        check = true
                    }
                }

                // check for right forward move
                dot = document.getElementById("" + String(id1 + 9))
                if (dot) {
                    if (dot.id === place_id) {
                        check = true
                    }
                }
            } else {
                break
            }
        }

        if (!check) {
            if (place.classList.length < 3) {
                if (checked) {
                    possible_id.push(place.id)
                } else {
                    add_dot(place)
                }
            } else if (!(place.classList[2][0] === turn[0])) {
                if (checked) {
                    possible_id.push(place.id)
                } else {
                    add_dot(place)
                }
            }
        }
    }
}


function king_movement(id, place_id, k, check) {
    // check for downward id's w.r.t. board
    for (let j = id + k; j <= 88; j += k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // check if it is that place then return true
            if (dot.id === place_id) {
                check = true
                return check
            }
            
            // if this id have any scout then break
            if (!(dot.classList.length < 3)) {
                if (!(dot.classList[2] === turn+"-king")) {
                    break
                }
            }
        } else {
            break
        }
    }

    // check for upward id's w.r.t. board
    for (let j = id - k; j >= 11; j -= k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // check if it is that place then return true
            if (dot.id === place_id) {
                check = true
                return check
            }
            
            // if this id have any scout then break
            if (!(dot.classList.length < 3)) {
                if (!(dot.classList[2] === turn+"-king")) {
                    break
                }
            }
        } else {
            break
        }
    }

    return check
}


function check_movement(id, k) {
    // check for downward id's w.r.t. board
    for (j = id + k; j <= 88; j += k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // if this id don't have any scout then add dot and 
            // if it has opposite scout then add dot and break
            // and break otherwise
            if (dot.classList.length < 3) {
                if (checked) {
                    for (let i = 0; i < check_list.length; i++) {
                        if (dot.id === String(check_list[i])) {
                            possible_id.push(dot.id)
                            break
                        }
                    }
                } else {
                    add_dot(dot)
                }
            } else if (!(dot.classList[2][0] === turn[0])) {
                if (checked) {
                    for (let i = 0; i < check_list.length; i++) {
                        if (dot.id === String(check_list[i])) {
                            possible_id.push(dot.id)
                            break
                        }
                    }
                } else {
                    add_dot(dot)
                }
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
            // if this id don't have any scout then add dot and 
            // if it has opposite scout then add dot and break
            // and break otherwise
            if (dot.classList.length < 3) {
                if (checked) {
                    for (let i = 0; i < check_list.length; i++) {
                        if (dot.id === String(check_list[i])) {
                            possible_id.push(dot.id)
                            break
                        }
                    }
                } else {
                    add_dot(dot)
                }
            } else if (!(dot.classList[2][0] === turn[0])) {
                if (checked) {
                    for (let i = 0; i < check_list.length; i++) {
                        if (dot.id === String(check_list[i])) {
                            possible_id.push(dot.id)
                            break
                        }
                    }
                } else {
                    add_dot(dot)
                }
                break
            } else {
                break
            }
        } else {
            break
        }
    }
}


function movement_possible_or_not(id, k) {
    var opposite_scout = false
    var same_king = false

    // check for downward id's w.r.t. board
    for (j = id + k; j <= 88; j += k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // if this id don't have any scout then add dot and 
            // if it has opposite scout then add dot and break
            // and break otherwise
            if (!(dot.classList.length < 3)) {
                if (dot.classList[2][0] === turn[0]) {
                    if (dot.classList[2] === turn+"-king") {
                        same_king = true
                    }
                } else {
                    if (k === 10 || k === 1) {
                        if (dot.classList[2].substring(6) === "rook" || dot.classList[2].substring(6) === "queen") {
                            opposite_scout = true
                        }
                    } else if (k === 11 || k === 9) {
                        if (dot.classList[2].substring(6) === "bishop" || dot.classList[2].substring(6) === "queen") {
                            opposite_scout = true
                        }
                    }
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
            // if this id don't have any scout then add dot and 
            // if it has opposite scout then add dot and break
            // and break otherwise
            if (!(dot.classList.length < 3)) {
                if (dot.classList[2][0] === turn[0]) {
                    if (dot.classList[2] === turn+"-king") {
                        if (opposite_scout) {
                            movement_possibility = false
                        }
                    }
                } else {
                    if (same_king) {
                        if (k === 10 || k === 1) {
                            if (dot.classList[2].substring(6) === "rook" || dot.classList[2].substring(6) === "queen") {
                                movement_possibility = false
                            }
                        } else if (k === 11 || k === 9) {
                            if (dot.classList[2].substring(6) === "bishop" || dot.classList[2].substring(6) === "queen") {
                                movement_possibility = false
                            }
                        }
                    }
                }
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

    // if king is checked then remove check dot from king
    if (checked) {
        if (turn === "black") {
            var black_king = document.querySelector(".black-king")
    
            black_king.innerHTML = ""
        } else {
            var white_king = document.querySelector(".white-king")
    
            white_king.innerHTML = ""
        }
        checked = false
        check_list = []
        number_of_checks = 0
    }

    selected.classList.remove("selected")
    scout = selected.classList[2]
    selected.classList.remove(scout)
    
    if (this.classList.length=== 3) {
        this.classList.remove(this.classList[2])
    }
    this.classList.add(scout)

    if (turn === "black") {
        // remove event listener from slected id
        if (scout === "black-rook") {
            selected.removeEventListener("click", black_rook_movement)
        } else if (scout === "black-knight") {
            selected.removeEventListener("click", black_knight_movement)
        } else if (scout === "black-bishop") {
            selected.removeEventListener("click", black_bishop_movement)
        } else if (scout === "black-queen") {
            selected.removeEventListener("click", black_queen_movement)
        } else if (scout === "black-king") {
            selected.removeEventListener("click", black_king_movement)
        } else if (scout === "black-pawn") {
            selected.removeEventListener("click", black_pawn_movement)
        }

        // remove event listener and check for black king is checked or not
        black("remove")
        // change turn to white
        turn = "white"

        if (checked) {
            white_check_mate()
        }

        // add event listener to white scouts
        white("add")
    } else {
        // remove event listener from slected id
        if (scout === "white-rook") {
            selected.removeEventListener("click", white_rook_movement)
        } else if (scout === "white-knight") {
            selected.removeEventListener("click", white_knight_movement)
        } else if (scout === "white-bishop") {
            selected.removeEventListener("click", white_bishop_movement)
        } else if (scout === "white-queen") {
            selected.removeEventListener("click", white_queen_movement)
        } else if (scout === "white-king") {
            selected.removeEventListener("click", white_king_movement)
        } else if (scout === "white-pawn") {
            selected.removeEventListener("click", white_pawn_movement)
        }

        // remove event listener and check for white king is checked or not
        white("remove")
        // change turn to black
        turn = "black"

        if (checked) {
            black_check_mate()
        }

        // add event listener to black scouts 
        black("add")
    }

    selected = null
}


function check_king_movement(id, k, king) {
    // check for downward id's w.r.t. board
    for (j = id + k; j <= 88; j += k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // if this id have any scout then
            // check if it has opposite king then add dot and break
            if (!(dot.classList.length < 3)) {
                if (dot === king) {
                    number_of_checks += 1
                    if (!checked) {
                        check_list.push(id)
                        add_checked_dot_to_king(king)
                    }
                }
                break
            } else {
                if (!checked) {
                    check_list.push(j)
                }
            }
        } else {
            break
        }
    }

    if (!number_of_checks) {
        check_list = []
    }

    //check for upward id's w.r.t. board
    for (j = id - k; j >= 11; j -= k) {
        dot = document.getElementById("" + String(j))

        // check if id is available otherwise break as other id's are also not available
        if (dot) {
            // if this id have any scout then
            // check if it has opposite king then add dot and break
            if (!(dot.classList.length < 3)) {
                if (dot === king) {
                    number_of_checks += 1
                    if (!checked) {
                        check_list.push(id)
                        add_checked_dot_to_king(king)
                    }
                }
                break
            } else {
                if (!checked) {
                    check_list.push(j)
                }
            }
        } else {
            break
        }
    }

    if (!number_of_checks) {
        check_list = []
    }
}


function add_checked_dot_to_king(king) {
    // adding a child div with checked class
    check_dot = document.createElement("div")
    check_dot.classList.add("checked")
    king.appendChild(check_dot)
    checked = true
}

function white_check_mate() {
    var white_rooks = document.querySelectorAll(".white-rook")
    var white_knights = document.querySelectorAll(".white-knight")
    var white_bishops = document.querySelectorAll(".white-bishop")
    var white_queen = document.querySelector(".white-queen")
    var white_king = document.querySelector(".white-king")
    var white_pawns = document.querySelectorAll(".white-pawn")

    if (number_of_checks < 2) {
        for (let i = 0; i < white_rooks.length; i++) {
            rook_movement(Number(white_rooks[i].id))
        }

        for (let i = 0; i < white_knights.length; i++) {
            knight_movement(Number(white_knights[i].id))
        }

        for (let i = 0; i < white_bishops.length; i++) {
            bishop_movement(Number(white_bishops[i].id))
        }

        if (white_queen) {
            queen_movement(Number(white_queen.id))
        }

        for (let i = 0; i < white_pawns.length; i++) {
            white_pawn_movement_check(Number(white_pawns[i].id))
        }
    }

    white_king_movement_check(Number(white_king.id))

    if (!possible_id.length) {
        alert("Check Mate")
    }

    possible_id = []
}


function black_check_mate() {
    var black_rooks = document.querySelectorAll(".black-rook")
    var black_knights = document.querySelectorAll(".black-knight")
    var black_bishops = document.querySelectorAll(".black-bishop")
    var black_queen = document.querySelector(".black-queen")
    var black_king = document.querySelector(".black-king")
    var black_pawns = document.querySelectorAll(".black-pawn")

    if (number_of_checks < 2) {
        for (let i = 0; i < black_rooks.length; i++) {
            rook_movement(Number(black_rooks[i].id))
        }

        for (let i = 0; i < black_knights.length; i++) {
            knight_movement(Number(black_knights[i].id))
        }

        for (let i = 0; i < black_bishops.length; i++) {
            bishop_movement(Number(black_bishops[i].id))
        }

        if (black_queen) {
            queen_movement(Number(black_queen.id))
        }

        for (let i = 0; i < black_pawns.length; i++) {
            black_pawn_movement_check(Number(black_pawns[i].id))
        }
    }    

    black_king_movement_check(Number(black_king.id))

    if (!possible_id.length) {
        alert("Check Mate")
    }

    possible_id = []
}
