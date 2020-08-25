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
var players_left = 0
var scout_moved = []
var scout_moved_from = []
var scout_moved_to = []
var scout_removed = []


reset()


// to reset board
function reset() {
    // removing dots if available
    remove_dots()

    // remove event listeners from all scouts
    player("remove")

    // if king is checked then remove check dot from king
    if (checked) {
        var king = document.querySelector("."+turn+"-king")
        king.innerHTML = ""
    }

    if (selected) {
        selected.classList.remove("selected")
    }

    // remove shifted class from last move
    last_moves = document.querySelectorAll(".shifted")
    last_moves.forEach(last_move => {
        last_move.classList.remove("shifted")
    });

    // remove all scouts from removing space
    var white_removes = document.querySelectorAll(".white-remove")
    for (let i = 0; i < white_removes.length; i++) {
        white_removes[i].innerHTML = ""
    }

    var black_removes = document.querySelectorAll(".black-remove")
    for (let i = 0; i < black_removes.length; i++) {
        black_removes[i].innerHTML = ""
    }

    // remove all scouts from board
    remove_scouts("white")
    remove_scouts("black")

    // adding scouts to board at default id's
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

    // setting all global variables to default
    turn = "white"
    dots = []
    selected = null
    checked = false
    check_list = []
    number_of_checks = 0
    possible_id = []
    movement_possibility = true
    scout_moved = []
    scout_moved_from = []
    scout_moved_to = []
    scout_removed = []

    // adding event listeners to white scouts
    player("add")

    players_left = 0
    
    var white_player = document.getElementById("white-player")
    var black_player = document.getElementById("black-player")
    black_player.textContent = ""
    white_player.textContent = "White's Turn"

    document.getElementById("takeback").setAttribute('disabled', 'disabled')
}


// to remove scouts of white and black when reset
function remove_scouts(scout) {
    var rooks = document.querySelectorAll("."+scout+"-rook")
    var knights = document.querySelectorAll("."+scout+"-knight")
    var bishops = document.querySelectorAll("."+scout+"-bishop")
    var queens = document.querySelectorAll("."+scout+"-queen")
    var king = document.querySelector("."+scout+"-king")
    var pawns = document.querySelectorAll("."+scout+"-pawn")

    for (let i = 0; i < rooks.length; i++) {
        rooks[i].classList.remove(""+scout+"-rook")
    }

    for (let i = 0; i < knights.length; i++) {
        knights[i].classList.remove(""+scout+"-knight")
    }

    for (let i = 0; i < bishops.length; i++) {
        bishops[i].classList.remove(""+scout+"-bishop")
    }

    for (let i = 0; i < queens.length; i++) {
        queens[i].classList.remove(""+scout+"-queen")
    }

    if (king) {
        king.classList.remove(""+scout+"-king")
    }

    for (let i = 0; i < pawns.length; i++) {
        pawns[i].classList.remove(""+scout+"-pawn")
    }
}


// to add or remove event listeners from scouts of turn
function player(option) {
    var rooks = document.querySelectorAll("."+turn+"-rook")
    var knights = document.querySelectorAll("."+turn+"-knight")
    var bishops = document.querySelectorAll("."+turn+"-bishop")
    var queens = document.querySelectorAll("."+turn+"-queen")
    var king = document.querySelector("."+turn+"-king")
    var pawns = document.querySelectorAll("."+turn+"-pawn")

    if (option === "add") {
        // add event listener
        for (let i = 0; i < rooks.length; i++) {
            if (rooks[i].id) {
                players_left += 1

                rooks[i].classList.add("active")
                rooks[i].addEventListener("click", rook_movement)
            }
        }

        for (let i = 0; i < knights.length; i++) {
            if (knights[i].id) {
                players_left += 1

                knights[i].classList.add("active")
                knights[i].addEventListener("click", knight_movement)
            }
        }

        for (let i = 0; i < bishops.length; i++) {
            if (bishops[i].id) {
                players_left += 1

                bishops[i].classList.add("active")
                bishops[i].addEventListener("click", bishop_movement)
            }
        }

        for (let i = 0; i < queens.length; i++) {
            if (queens[i].id) {
                players_left += 1

                queens[i].classList.add("active")
                queens[i].addEventListener("click", queen_movement)
            }
        }

        players_left += 1

        king.classList.add("active")
        king.addEventListener("click", king_movement)

        for (let i = 0; i < pawns.length; i++) {
            if (pawns[i].id) {
                players_left += 1

                pawns[i].classList.add("active")
                pawns[i].addEventListener("click", pawn_movement)
            }
        }
    } else {
        // remove event listener and check for opposite king is checked or not
        for (let i = 0; i < rooks.length; i++) {
            if (rooks[i].removeEventListener) {
                rooks[i].removeEventListener("click", rook_movement)
            }

            if (rooks[i].id) {
                rooks[i].classList.remove("active")
            }
        }
    
        for (let i = 0; i < knights.length; i++) {
            if (knights[i].removeEventListener) {
                knights[i].removeEventListener("click", knight_movement)
            }

            if (knights[i].id) {
                knights[i].classList.remove("active")
            }
        }
    
        for (let i = 0; i < bishops.length; i++) {
            if (bishops[i].removeEventListener) {
                bishops[i].removeEventListener("click", bishop_movement)
            }

            if (bishops[i].id) {
                bishops[i].classList.remove("active")
            }
        }
    
        for (let i = 0; i < queens.length; i++) {
            if (queens[i].removeEventListener) {
                queens[i].removeEventListener("click", queen_movement)
            }

            if (queens[i].id) {
                queens[i].classList.remove("active")
            }
        }

        if (king) {
            king.classList.remove("active")
            if (king.removeEventListener) {
                king.removeEventListener("click", king_movement)
            }
        }
    
        for (let i = 0; i < pawns.length; i++) {
            if (pawns[i].removeEventListener) {
                pawns[i].removeEventListener("click", pawn_movement)
            }

            if (pawns[i].id) {
                pawns[i].classList.remove("active")
            }
        }
    }
}


// functions for listeners calling movement function on click
function rook_movement() {
    movement.bind(this)("rook")
}
function knight_movement() {
    movement.bind(this)("knight")
}
function bishop_movement() {
    movement.bind(this)("bishop")
}
function queen_movement() {
    movement.bind(this)("queen")
}
function king_movement() {
    movement.bind(this)("king")
}
function pawn_movement() {
    movement.bind(this)("pawn")
}


// check if any scout is selected then remove dots and selected class
// and add selected class to this scout
// and call movement check according to scout
function movement(scout) {
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

        if (scout === "rook") {
            rook_movement_check(id)
        } else if (scout === "knight") {
            knight_movement_check(id)
        } else if (scout === "bishop") {
            bishop_movement_check(id)
        } else if (scout === "queen") {
            queen_movement_check(id)
        } else if (scout === "king") {
            player_king_movement_check(id)
        } else if (scout === "pawn") {
            pawn_movement_check(id)
        }

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


// check movement of rook is possible or not
// then add dots to possible blocks
function rook_movement_check(id) {
    // check if it is removed then king have checked or not
    var [left_right, up_down, main_diagonal, cross_diagonal] = check_possibility(id)

    // if movement is possible in only one direction then rook can only move in that direction
    // otherwise rook can move in up-down and left-right direction
    if (main_diagonal && cross_diagonal) {
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


// check movement of bishop is possible or not
// then add dots to possible blocks
function bishop_movement_check(id) {
    // check if it is removed then king have checked or not
    var [left_right, up_down, main_diagonal, cross_diagonal] = check_possibility(id)

    // if movement is possible in only one direction then bishop can only move in that direction
    // otherwise bishop can move in main-diagonal and cross-diagonal direction
    if (left_right && up_down) {
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


// check movement of queen is possible or not
// then add dots to possible blocks
function queen_movement_check(id) {
    // check if it is removed then king have checked or not
    var [left_right, up_down, main_diagonal, cross_diagonal] = check_possibility(id)
    
    // if movement is possible in only one direction then queen can only move in that direction
    // otherwise queen can move in all these directions
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


// check movement of pawn is possible or not
// then add dots to possible blocks
function pawn_movement_check(id) {
    // check if it is removed then king have checked or not
    var [left_right, up_down, main_diagonal, cross_diagonal] = check_possibility(id)

    if (turn === "white") {
        k = 1 // white pawn moves downward w.r.t. board
    } else {
        k = -1 // black pawn moves upward w.r.t. board
    }

    
    // if movement is possible in only one direction then rook can only move in that direction
    // otherwise rook can move in up-down direction and diagonally
    if (left_right) {
        if (!up_down) {
            pawn_forward_move(id, k)
        } else if (!main_diagonal) {
            // check for right forward move
            pawn_diagonal_move(id, 11*k)
        } else if (!cross_diagonal) {
            // check for left forward move
            pawn_diagonal_move(id, 9*k)
        } else {
            pawn_forward_move(id, k)
            pawn_diagonal_move(id, 11*k)
            pawn_diagonal_move(id, 9*k)
        }
    }
}


// to move pawn in forward direction
function pawn_forward_move(id, k) {
    p = 1 // pawn have only one move
    // checks if pawn is at the default id then pawn have 2 moves
    if (k === 1) {
        for (var j = 0; j < 8; j++) {
            if (white_pawn_default_id[j] === String(id)) {
                p = 2
                break
            }
        }
    } else {
        for (var j = 0; j < 8; j++) {
            if (black_pawn_default_id[j] === String(id)) {
                p = 2
                break
            }
        }
    }

    // if pawn is at default id then check for 2 forward moves otherwise check for only 1 forward move
    for (j = 10; j <= 10*p; j += 10) {
        dot = document.getElementById("" + String(id + j*k))
        if (dot) {
            if (dot.classList.length < 3) {
                add_or_push_dot(dot)
            } else if (dot.classList[2] === 'shifted') {
                add_or_push_dot(dot)
            } else {
                break
            }
        }
    }
}


// to move pawn diagonally if diagonal has opposite scout
function pawn_diagonal_move(id, k) {
    dot = document.getElementById("" + String(id + k))
    if (dot) {
        if (dot.classList.length >= 3 && !(dot.classList[2][0] === turn[0])) {
            if (dot.classList[2] !== 'shifted') {
                add_or_push_dot(dot)
            }
        } else if (id-id%10 === 40 || id-id%10 === 50) {
            // check if the last move is of pawn and from it's default id
            // also moves 2 move then add dot to this dot
            number_of_moves = scout_moved.length
            if (number_of_moves) {
                if (scout_moved[number_of_moves-1].substring(6) === "pawn") {
                    id1 = Number(scout_moved_from[number_of_moves-1].id)
                    id2 = Number(scout_moved_to[number_of_moves-1].id)
                    if (((k === 9 || k === -11) && id-id2 === 1) || ((k === -9 || k === 11) && id2-id === 1)) {
                        if (id1-id1%10 === 20 || id1-id1%10 === 70) {
                            if (Math.abs(id2-id1) === 20) {
                                add_or_push_dot(dot)
                            }
                        }
                    }
                }
            }
        }
    }
}


// check movement of knight is possible or not
// then add dots to possible blocks
function knight_movement_check(id) {
    // check if it is removed then king have checked or not
    var [left_right, up_down, main_diagonal, cross_diagonal] = check_possibility(id)

    if (left_right && up_down && main_diagonal && cross_diagonal) {
        var knight_moves = [id-21, id-19, id-12, id-8, id+8, id+12, id+19, id+21]

        // if any of these id don't have opposite scout then add dot
        for (let j = 0; j < 8; j++) {
            dot = document.getElementById("" + String(knight_moves[j]))

            if (dot) {
                if (dot.classList.length < 3 || !(dot.classList[2][0] === turn[0])) {
                    add_or_push_dot(dot)
                }
            }
        }
    }
}


// check movement of king is possible or not
// then add dots to possible blocks
function player_king_movement_check(id) {
    if (turn === "white") {
        scout = "black" // for opposite scouts
        k = -1 // black pawns move upward w.r.t. board
    } else {
        scout = "white" // for opposite scouts
        k = 1 // white pawns move downward w.r.t. board
    }

    var opposite_rooks = document.querySelectorAll("."+scout+"-rook")
    var opposite_knights = document.querySelectorAll("."+scout+"-knight")
    var opposite_bishops = document.querySelectorAll("."+scout+"-bishop")
    var opposite_queens = document.querySelectorAll("."+scout+"-queen")
    var opposite_king = document.querySelector("."+scout+"-king")
    var opposite_pawns = document.querySelectorAll("."+scout+"-pawn")

    var king_moves = [id-11, id-10, id-9, id-1, id+1, id+9, id+10, id+11]

    // check for all the above places are checked from any opposite scout or not
    for (let j = 0; j < 8; j++) {
        var place = document.getElementById("" + String(king_moves[j]))
        
        // if place is not available or have same scout then continue
        if (place) {
            if (place.classList.length >= 3 && place.classList[2][0] === turn[0]) {
                continue
            }
        } else {
            continue
        }

        var place_id = place.id
        var check = false

        for (let i = 0; i < opposite_rooks.length; i++) {
            if (!check) {
                if (opposite_rooks[i].id) {
                    // left-right-movement
                    check = king_movement_check(Number(opposite_rooks[i].id), place_id, 1, check)
                    // up-down-movement
                    check = king_movement_check(Number(opposite_rooks[i].id), place_id, 10, check)
                }
            } else {
                break
            }
        }

        for (let i = 0; i < opposite_knights.length; i++) {
            if (!check) {
                if (opposite_knights[i].id) {
                    var id1 = Number(opposite_knights[i].id)
                    knight_moves = [id1-21, id1-19, id1-12, id1-8, id1+8, id1+12, id1+19, id1+21]

                    // check if any of these id has black-king
                    for (let j = 0; j < 8; j++) {
                        if (place_id === String(knight_moves[j])) {
                            check = true
                            break
                        }
                    }
                }
            } else {
                break
            }
        }

        for (let i = 0; i < opposite_bishops.length; i++) {
            if (!check) {
                if (opposite_bishops[i].id) {
                    // main-diagonal-movement
                    check = king_movement_check(Number(opposite_bishops[i].id), place_id, 11, check)
                    // cross-diagonal-movement
                    check = king_movement_check(Number(opposite_bishops[i].id), place_id, 9, check)
                }
            } else {
                break
            }
        }

        for (let i = 0; i < opposite_queens.length; i++) {
            if (!check) {
                if (opposite_queens[i].id) {
                    // left-right-movement
                    check = king_movement_check(Number(opposite_queens[i].id), place_id, 1, check)
                    // up-down-movement
                    check = king_movement_check(Number(opposite_queens[i].id), place_id, 10, check)
                    // main-diagonal-movement
                    check = king_movement_check(Number(opposite_queens[i].id), place_id, 11, check)
                    // cross-diagonal-movement
                    check = king_movement_check(Number(opposite_queens[i].id), place_id, 9, check)
                }
            } else {
                break
            }
        }

        if (!check) {
            var id1 = Number(opposite_king.id)
            var opposite_king_moves = [id1-11, id1-10, id1-9, id1-1, id1+1, id1+9, id1+10, id1+11]

            for (let k = 0; k < 8; k++) {
                if (place_id === String(opposite_king_moves[k])) {
                    check = true
                    break
                }
            }
        }

        for (let i = 0; i < opposite_pawns.length; i++) {
            if (!check) {
                if (opposite_pawns[i].id) {
                    var id1 = Number(opposite_pawns[i].id)

                    // check for left forward move
                    dot = document.getElementById("" + String(id1 + 11*k))
                    if (dot && dot.id === place_id) {
                        check = true
                    }

                    // check for right forward move
                    dot = document.getElementById("" + String(id1 + 9*k))
                    if (dot && dot.id === place_id) {
                        check = true
                    }
                }
            } else {
                break
            }
        }

        if (!check) {
            if (place.classList.length < 3 || !(place.classList[2][0] === turn[0])) {
                if (checked) {
                    possible_id.push(place.id)
                } else {
                    add_dot(place)
                }
            }
        }
    }
}


// to check if this place_id is checked or not from other scout available at id's with id+j*k or id-j*k
function king_movement_check(id, place_id, k, check) {
    let i = 0 // first check for id+j*k then id-j*k
    while (i < 2) {
        for (let j = id + k; (j >= 11 && j <= 88); j += k) {
            dot = document.getElementById("" + String(j))
    
            // check if id is available otherwise break as other id's are also not available
            if (dot) {
                // check if it is that place then return true
                if (dot.id === place_id) {
                    check = true
                    return check
                }
                
                // if this id have any scout then break
                if (!(dot.classList.length < 3) && !(dot.classList[2] === turn+"-king") && !(dot.classList[2] === "shifted")) {
                    break
                }
            } else {
                break
            }
        }
        k *= -1
        i += 1
    }

    return check
}


// to check for movements of this scout in id+j*k and id-j*k
function check_movement(id, k) {
    let i = 0 // first check for id+j*k then id-j*k
    while (i < 2) {
        // check for downward id's w.r.t. board
        for (j = id + k; (j >= 11 && j <= 88); j += k) {
            dot = document.getElementById("" + String(j))

            // check if id is available otherwise break as other id's are also not available
            if (dot) {
                // if this id don't have any scout then add dot and 
                // if it has opposite scout then add dot and break
                // and break otherwise
                if (dot.classList.length < 3) {
                    add_or_push_dot(dot)
                } else if (!(dot.classList[2][0] === turn[0])) {
                    add_or_push_dot(dot)
                    if (dot.classList[2] !== 'shifted') {
                        break
                    }
                } else {
                    break
                }
            } else {
                break
            }
        }
        k *= -1
        i += 1
    }
}


// check movement of scout is possible in all directions
function check_possibility(id) {
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

    return [left_right, up_down, main_diagonal, cross_diagonal]
}


// to add dot to this dot if king is not checked
// otherwise push it's id in possible_id list
function add_or_push_dot(dot) {
    // if king is checked, then push dot id in possible_id list
    // otherwise add "dot" div to this dot
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


// check if this scout have one side it's king and another side opposite rook, bishopor queen
// then return false as it cannot move in any other direction
function movement_possible_or_not(id, k) {
    var opposite_scout = false
    var same_king = false

    let i = 0 // first check for id+j*k then id-j*k
    while (i < 2) {
        // check for downward id's w.r.t. board
        for (j = id + k; (j >= 11 && j <= 88); j += k) {
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
                            if (opposite_scout) {
                                movement_possibility = false
                            }
                        }
                    } else {
                        if (k === 10 || k === 1 || k === -1 || k === -10) {
                            if (dot.classList[2].substring(6) === "rook" || dot.classList[2].substring(6) === "queen") {
                                opposite_scout = true
                                if (same_king) {
                                    movement_possibility = false
                                }
                            }
                        } else if (k === 11 || k === 9 || k === -11 || k === -9) {
                            if (dot.classList[2].substring(6) === "bishop" || dot.classList[2].substring(6) === "queen") {
                                opposite_scout = true
                                if (same_king) {
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
        k *= -1
        i += 1
    }
}


// add event listeners to dots
function add_event_to_dots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", dot_event)
    }
}


// add dot to this place
function add_dot(dot) {
    // adding a child div with dot class
    var select = document.createElement("div")

    select.classList.add("dot")
    dot.appendChild(select)
    dots.push(dot)
}


// remove dot from all places in dots list
function remove_dots() {
    for (i = 0; i < dots.length; i++) {
        // remove child div
        dots[i].innerHTML = ""
        dots[i].removeEventListener("click", dot_event)
    }
    dots = []
}


// event for dots when clicked
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
    selected.classList.remove("active")
    scout = selected.classList[2]
    selected.classList.remove(scout)

    // remove shifted class from last move
    last_moves = document.querySelectorAll(".shifted")
    last_moves.forEach(last_move => {
        last_move.classList.remove("shifted")
    });

    // to save last move
    scout_moved.push(scout)
    scout_moved_from.push(selected)
    scout_moved_to.push(this)
    selected.classList.add("shifted") // to show the last move
    document.getElementById("takeback").removeAttribute('disabled')

    // move scout from 'selected' to 'this'
    duration = 0
    duration = move_scout.bind(this)(scout, duration, "move")

    // this function start after movement of scout
    setTimeout(() => {
        // remove event listener from slected id
        if (scout.substring(6) === "rook") {
            selected.removeEventListener("click", rook_movement)
        } else if (scout.substring(6) === "knight") {
            selected.removeEventListener("click", knight_movement)
        } else if (scout.substring(6) === "bishop") {
            selected.removeEventListener("click", bishop_movement)
        } else if (scout.substring(6) === "queen") {
            selected.removeEventListener("click", queen_movement)
        } else if (scout.substring(6) === "king") {
            selected.removeEventListener("click", king_movement)
        } else if (scout.substring(6) === "pawn") {
            selected.removeEventListener("click", pawn_movement)
        }

        // remove event listener and check for black king is checked or not
        player("remove")

        var flag = 1
        // if pawn moves to last move then change it to rook, knight, bishop, or queen
        if (scout.substring(6) === "pawn") {
            var id = Number(this.id)
            if (id-id%10 === 10 || id-id%10 === 80) {
                flag = 0
                var div = document.createElement("div")
                var dimensions = document.getElementById("41").getBoundingClientRect()
                width = dimensions.width
                div.style.width = width*8
                div.style.height = width*2
                div.style.padding = '0 '+width
                div.style.left = dimensions.left
                div.style.top = dimensions.top
                div.classList.add("pawn")
                document.querySelector(".container").appendChild(div)
                var pawn = this

                replace_pawn("rook", scout, pawn, width, 1, div)
                replace_pawn("knight", scout, pawn, width, 5/4, div)
                replace_pawn("bishop", scout, pawn, width, 5/4, div)
                replace_pawn("queen", scout, pawn, width, 5/4, div)
            }
        }

        if (flag) {
            change_turn()
        }
    }, duration);
}


// to add 'scout1' to 'div' and replace it with pawn when clicked
function replace_pawn(scout1, scout, pawn, width, x, div) {
    scout2 = document.createElement('img')
    scout2.setAttribute('src', 'icons/'+scout.substring(0, 5)+'_'+scout1+'.png')
    scout2.style.width = width*x
    scout2.style.height = width*5/4
    scout2.style.margin =  width*3/8+' '+width*5/32

    div.appendChild(scout2)

    scout2.addEventListener("click", function () {
        pawn.classList.remove(scout)
        pawn.classList.add(scout.substring(0, 6)+scout1)
        document.querySelector(".container").removeChild(div)
        change_turn()
    })
}


// this function is used for pawn removal at last move
// otherwise used simply
function change_turn() {
    // check for opposite king
    check_king()

    var black_player = document.getElementById("black-player")
    var white_player = document.getElementById("white-player")

    if (turn === "black") {
        // change turn to white
        turn = "white"

        black_player.textContent = ""
        white_player.textContent = "White's Turn"
    } else {
        // change turn to black
        turn = "black"

        white_player.textContent = ""
        black_player.textContent = "Black's Turn"
    }

    // if king is checked then check if king can move or not
    if (checked) {
        check_mate()
    }

    // add event listener to white scouts
    player("add")

    // if only kings are left then game tied
    if (players_left === 2) {
        setTimeout(() => {
            alert("Game Tie")
            reset()
        }, 10);
    }

    players_left = 0
    selected = null
}


// to check if opposite king is checked or not from the scouts of this turn
function check_king() {
    var rooks = document.querySelectorAll("."+turn+"-rook")
    var knights = document.querySelectorAll("."+turn+"-knight")
    var bishops = document.querySelectorAll("."+turn+"-bishop")
    var queens = document.querySelectorAll("."+turn+"-queen")
    var king = document.querySelector("."+turn+"-king")
    var pawns = document.querySelectorAll("."+turn+"-pawn")

    if (turn === "white") {
        var opposite_king = document.querySelector(".black-king")
        k = 1
    } else {
        var opposite_king = document.querySelector(".white-king")
        k = -1
    }
    var opposite_king_id = Number(opposite_king.id)

    players_left += 1 // for king

    for (let i = 0; i < rooks.length; i++) {
        if (rooks[i].id) {
            players_left += 1
            // counting number of checks on king as
            // if number of checks >= 2, then only king can move
            if (number_of_checks < 2) {
                // left-right-movement
                check_king_movement(Number(rooks[i].id), 1, opposite_king)
                // up-down-movement
                check_king_movement(Number(rooks[i].id), 10, opposite_king)
            }
        }
    }

    for (let i = 0; i < knights.length; i++) {
        if (knights[i].id) {
            players_left += 1
            if (number_of_checks < 2) {
                var id = Number(knights[i].id)
                var knight_moves = [id-21, id-19, id-12, id-8, id+8, id+12, id+19, id+21]

                // check if any of these id has black-king
                for (let j = 0; j < 8; j++) {
                    if (opposite_king_id === knight_moves[j]) {
                        add_checked_dot_to_king(id, opposite_king)
                        break
                    }
                }
            }
        }
    }

    for (let i = 0; i < bishops.length; i++) {
        if (bishops[i].id) {
            players_left += 1
            if (number_of_checks < 2) {
                // main-diagonal-movement
                check_king_movement(Number(bishops[i].id), 11, opposite_king)
                // cross-diagonal-movement
                check_king_movement(Number(bishops[i].id), 9, opposite_king)
            }
        }
    }

    for (let i = 0; i < queens.length; i++) {
        if (queens[i].id) {
            players_left += 1
            if (number_of_checks < 2) {
                // left-right-movement
                check_king_movement(Number(queens[i].id), 1, opposite_king)
                // up-down-movement
                check_king_movement(Number(queens[i].id), 10, opposite_king)
                // main-diagonal-movement
                check_king_movement(Number(queens[i].id), 11, opposite_king)
                // cross-diagonal-movement
                check_king_movement(Number(queens[i].id), 9, opposite_king)
            }
        }
    }

    for (let i = 0; i < pawns.length; i++) {
        if (pawns[i].id) {
            players_left += 1
            if (number_of_checks < 2) {
                var id = Number(pawns[i].id)

                // check for right forward
                pawn_check_king_movement(id, 11*k, opposite_king)
                // check for left forward
                pawn_check_king_movement(id, 9*k, opposite_king)
            }
        }
    }
}


// to check if opposite king is checked or not from this scout 
// king is checked if it is available at id's with id+j*k or id-j*k
function check_king_movement(id, k, king) {
    let i = 0 // first check for id+j*k then id-j*k
    while (i < 2) {
        // check for downward id's w.r.t. board
        for (j = id + k; j <= 88; j += k) {
            dot = document.getElementById("" + String(j))

            // check if id is available otherwise break as other id's are also not available
            if (dot) {
                // if this id have any scout then
                // check if it has opposite king then add dot and break
                if (!(dot.classList.length < 3)) {
                    if (dot === king) {
                        add_checked_dot_to_king(id, king)
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

        // if king is not checked then empty checklist
        if (!number_of_checks) {
            check_list = []
        }
        k *= -1
        i += 1
    }
}


// to check that king is checked from pawn or not
function pawn_check_king_movement(id, k, opposite_king) {
    dot = document.getElementById("" + String(id + k))
    if (dot) {
        if (dot === opposite_king) {
            add_checked_dot_to_king(id, opposite_king)
        }
    }
}


// add checked dot to king if checked is false and
// increase number_of_checks by 1
function add_checked_dot_to_king(id, king) {
    number_of_checks += 1
    if (!checked) {
        // adding a child div with checked class
        check_dot = document.createElement("div")
        check_dot.classList.add("checked")
        king.appendChild(check_dot)
        checked = true
        check_list.push(id)
    }
}


// check if any of the same scout can save king from check or not
function check_mate() {
    var rooks = document.querySelectorAll("."+turn+"-rook")
    var knights = document.querySelectorAll("."+turn+"-knight")
    var bishops = document.querySelectorAll("."+turn+"-bishop")
    var queens = document.querySelectorAll("."+turn+"-queen")
    var king = document.querySelector("."+turn+"-king")
    var pawns = document.querySelectorAll("."+turn+"-pawn")

    if (number_of_checks < 2) {
        for (let i = 0; i < rooks.length; i++) {
            if (rooks[i].id) {
                rook_movement_check(Number(rooks[i].id))
            }
        }

        for (let i = 0; i < knights.length; i++) {
            if (knights[i].id) {
                knight_movement_check(Number(knights[i].id))
            }
        }

        for (let i = 0; i < bishops.length; i++) {
            if (bishops[i].id) {
                bishop_movement_check(Number(bishops[i].id))
            }
        }

        for (let i = 0; i < queens.length; i++) {
            if (queens[i].id) {
                queen_movement_check(Number(queens[i].id))
            }
        }

        for (let i = 0; i < pawns.length; i++) {
            if (pawns[i].id) {
                pawn_movement_check(Number(pawns[i].id))
            }
        }
    }

    player_king_movement_check(Number(king.id))

    // if any movement is not possible to save check then alert checkmate and reset board
    if (!possible_id.length) {
        setTimeout(() => {
            if (turn === "white") {
                alert("Check Mate \nBlack Player Won")
            } else {
                alert("Check Mate \nWhite Player Won")
            }
            document.getElementById("takeback").setAttribute('disabled', 'disabled')
        }, 10);
        setTimeout(() => {
            if (confirm("Reset Board")) {
                reset()
            }
        }, 1000);
    }
    
    possible_id = []
}


// to move scout in a div above the blocks
function move_scout(scout, duration, option) {
    var moving_div = document.createElement("div")
    moving_div.classList.add("moving-div")

    document.querySelector(".container").appendChild(moving_div)

    // save image of scout in moving_div 
    var img = document.createElement('img')
    img.setAttribute('src', 'icons/'+scout.substring(0, 5)+'_'+scout.substring(6)+'.png')
    img.style.position = 'relative'

    moving_div.appendChild(img)

    // to get dimensions of the small id place
    var id = (this.id<selected.id)?(this.id):(selected.id)
    var dimensions = document.getElementById(id).getBoundingClientRect()
    left1 = dimensions.left
    top1 = dimensions.top
    width = dimensions.width

    // set image height, width and margin according to width of block
    img.style.height = width*3/4
    img.style.width = width*3/4
    img.style.margin = width/8

    selected_id = Number(selected.id)
    this_id = Number(this.id)
    number_of_blocks = Math.abs(selected_id%10-this_id%10)+1
    moving_div.style.height = width

    if (option === "takeback") {
        removed_scout = scout_removed.pop()
        if (removed_scout) {
            // remove scout from removing area
            if (turn === "black") {
                var player_removes = document.querySelectorAll(".black-remove")
            } else {
                var player_removes = document.querySelectorAll(".white-remove")
            }
            if (player_removes[0].children.length < 8) {
                player_remove = player_removes[0]
            } else {
                player_remove = player_removes[1]
            }

            var remove_scout = player_remove.querySelectorAll('.'+removed_scout)
            player_remove.removeChild(remove_scout[remove_scout.length-1])

            flag = 1
            // add scout to its place
            if (scout.substring(6) === "pawn") {
                // check if the last move is of pawn and from it's default id
                // also moves 2 move then add removed scout to it's place instead of selected
                id = Number(move_to.id)
                if (id-id%10 === 40 || id-id%10 === 50) {
                    number_of_moves = scout_moved.length
                    if (number_of_moves) {
                        if (removed_scout.substring(6) === "pawn") {
                            id1 = Number(scout_moved_from[number_of_moves-1].id)
                            id2 = Number(scout_moved_to[number_of_moves-1].id)
                            if (Math.abs(id-id2) === 1 && Math.abs(Number(selected.id)-id2) === 10) {
                                if (id1-id1%10 === 20 || id1-id1%10 === 70) {
                                    if (Math.abs(id2-id1) === 20) {
                                        flag = 0
                                        scout_moved_to[number_of_moves-1].classList.add(removed_scout)
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (flag) {
                selected.classList.add(removed_scout)
            }
        }
    }

    if (scout.substring(6) === "knight") {
        moving_div.style.height = 3*width
        moving_div.style.width = 2*width
        let rotation = 0
        if (this_id > selected_id) {
            k = 1 // for downward movement of scout w.r.t. board
        } else {
            k = -1 // for upward movement of scout w.r.t. board
            rotation += 180 // same as downward movement only rotate div by 180 degree
        }

        min_width_left = 5
        max_width_left = width+5
        min_width_top = 5
        max_width_top = 2*width+5
        if (this_id%10-selected_id%10 === -1*k) {
            moving_div.style.top = top1
            moving_div.style.left = left1-width
            min_width_left = width+5
            max_width_left = 5
        } else if (this_id%10-selected_id%10 === -2*k) {
            moving_div.style.top = top1-width/2
            moving_div.style.left = left1-width*3/2
            rotation += 90
        } else if (this_id%10-selected_id%10 === 1*k) {
            moving_div.style.top = top1
            moving_div.style.left = left1
        } else {
            moving_div.style.top = top1-width/2
            moving_div.style.left = left1+width/2
            rotation -= 90
            min_width_left = width+5
            max_width_left = 5
        }

        moving_div.style.transform = 'rotate('+String(rotation)+'deg)'
        img.style.transform = 'rotate('+String((-1)*rotation)+'deg)'

        img.style.marginTop = min_width_top
        img.style.marginLeft = min_width_left

        min_width = String(min_width_top)+'px'
        max_width = String(width+5)+'px'

        for (let j = 1; j < 3; j++) {
            setTimeout(() => {
                img.animate({
                    marginTop: [min_width, max_width]
                }, 150)
                setTimeout(() => {
                    img.style.marginTop = max_width
                    min_width = max_width
                    max_width = String(max_width_top)+'px'
                }, 150);
            }, duration);
            duration += 300
        }

        setTimeout(() => {
            img.animate({
                marginLeft: [String(min_width_left)+'px', String(max_width_left)+'px']
            }, 150)
            setTimeout(() => {
                img.style.marginLeft = max_width_left
            }, 150);
        }, duration);
        duration += 150
    } else {
        var diagonal = 0
        let rotation = 0
        if(this_id%10 === selected_id%10) {
            number_of_blocks = Math.abs(selected_id-selected_id%10-this_id+this_id%10)/10+1
            moving_div.style.top = top1+width*(number_of_blocks/2-0.5)
            moving_div.style.left = left1-width*(number_of_blocks/2-0.5)
            if(this_id > selected_id) {
                rotation = 90
            } else {
                rotation = -90
            }
        } else if (this_id-this_id%10 === selected_id-selected.id%10) {
            moving_div.style.top = top1
            moving_div.style.left = left1
            if (this_id < selected_id) {
                rotation = 180
            }
        } else {
            diagonal = 1
            if (this_id>selected_id) {
                var number_of_extra_blocks = number_of_blocks/2-1
                number_of_blocks += number_of_extra_blocks
                moving_div.style.top = top1+width*(number_of_blocks/2-0.5-number_of_extra_blocks/2)
                if(this_id%10 > selected_id%10) {
                    moving_div.style.left = left1-width*number_of_extra_blocks/2
                    rotation = 45
                } else {
                    moving_div.style.left = left1-width*(number_of_blocks-1-number_of_extra_blocks/2)
                    rotation = 135
                }
            } else {
                var number_of_extra_blocks = number_of_blocks/2-1
                number_of_blocks += number_of_extra_blocks
                moving_div.style.top = top1+width*(number_of_blocks/2-0.5-number_of_extra_blocks/2)
                if(this_id%10 < selected_id%10) {
                    moving_div.style.left = left1-width*number_of_extra_blocks/2
                    rotation = -135
                } else {
                    moving_div.style.left = left1-width*(number_of_blocks-1-number_of_extra_blocks/2)
                    rotation = -45
                }
            }
        }
        moving_div.style.transform = 'rotate('+String(rotation)+'deg)'
        img.style.transform = 'rotate('+String((-1)*rotation)+'deg)'
        moving_div.style.width = width*number_of_blocks

        // set k to move scout step by step
        var k = 1
        if (diagonal) {
            k = 1.25
            if (number_of_extra_blocks) {
                k = 1.4
            }
        }

        min_width = '5px'
        for (let j = k; j < number_of_blocks; j += k) {
            setTimeout(() => {
                max_width = String(width*j+5)+'px'
                img.animate({
                    marginLeft: [min_width, max_width]
                }, 100)
                min_width = max_width
                setTimeout(() => {
                    img.style.marginLeft = max_width
                }, 100);
            }, duration);
            duration += 200
        }
        duration -= 100
    }

    // after movement
    setTimeout(() => {
        // remove moving_div
        document.querySelector(".container").removeChild(moving_div)

        flag = 0
        // remove scout available at this id and add to the respective removing space
        if (option === "move") {
            if (this.classList.length >= 3) {
                removing_scout = this.classList[2]
                this.classList.remove(removing_scout)
                flag = 1
            } else if (scout.substring(6) === "pawn") {
                // check if the last move is of pawn and from it's default id
                // also moves 2 move then remove the pawn from it's place
                id = Number(selected.id)
                if (id-id%10 === 40 || id-id%10 === 50) {
                    number_of_moves = scout_moved.length
                    if (number_of_moves) {
                        if (scout_moved[number_of_moves-2].substring(6) === "pawn") {
                            id1 = Number(scout_moved_from[number_of_moves-2].id)
                            id2 = Number(scout_moved_to[number_of_moves-2].id)
                            if (Math.abs(id-id2) === 1) {
                                if (id1-id1%10 === 20 || id1-id1%10 === 70) {
                                    if (Math.abs(id2-id1) === 20) {
                                        flag = 1
                                        removing_scout = scout_moved[number_of_moves-2]
                                        scout_moved_to[number_of_moves-2].classList.remove(removing_scout)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (flag) {
            var remove_scout = document.createElement("div")
            remove_scout.classList.add("col-1")
            remove_scout.classList.add(removing_scout)

            if (turn === "white") {
                var player_removes = document.querySelectorAll(".black-remove")
            } else {
                var player_removes = document.querySelectorAll(".white-remove")
            }
            if (player_removes[0].children.length < 8) {
                player_removes[0].appendChild(remove_scout)
            } else {
                player_removes[1].appendChild(remove_scout)
            }

            scout_removed.push(removing_scout)
        } else {
            if (option === "move") {
                scout_removed.push(null)
            }
        }

        // add the scout to this id
        this.classList.add(scout)
        if (option === "move") {
            this.classList.add("shifted") // to show the last move
        }
    }, duration);
    duration += 50
    return duration
}


// for reset button
document.getElementById("reset").addEventListener("click", reset)


// for takeback
document.getElementById("takeback").addEventListener("click", takeback)

function takeback() {
    if (scout_moved.length) {
        this.setAttribute('disabled', 'disabled')

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

        if (selected) {
            selected.classList.remove("selected")
            selected.classList.remove("active")
            remove_dots()
        }

        // remove shifted class from last move
        last_moves = document.querySelectorAll(".shifted")
        last_moves.forEach(last_move => {
            last_move.classList.remove("shifted")
        });

        scout = scout_moved.pop()
        selected = scout_moved_to.pop()
        move_to = scout_moved_from.pop()

        // if scout is pawn and pawn is at it's last move then change available_scout to pawn
        if (scout.substring(6) === "pawn") {
            var id = Number(selected.id)
            if (id-id%10 === 10 || id-id%10 === 80) {
                console.log(selected.classList[2])
                selected.classList.remove(selected.classList[2])
                selected.classList.add(scout)
            }
        }
        selected.classList.remove(scout)

        // move scout from selected to move_to
        duration = 0
        duration = move_scout.bind(move_to)(scout, duration, "takeback")

        // this function start after movement of scout
        setTimeout(() => {
            // add shifted class to last move
            number_of_moves = scout_moved.length
            if (number_of_moves) {
                scout_moved_from[number_of_moves-1].classList.add("shifted")
                scout_moved_to[number_of_moves-1].classList.add("shifted")
                this.removeAttribute('disabled')
            }

            // remove event listener and check for black king is checked or not
            player("remove")

            change_turn()
        }, duration);
    }
}