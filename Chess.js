var turn = "white"
var dots = []
var selected = null;
var white_pawn_default_id = ["21", "22", "23", "24", "25", "26", "27", "28"];
var black_pawn_default_id = ["71", "72", "73", "74", "75", "76", "77", "78"];

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

    for (let i = 0; i < white_bishops.length; i++) {
        white_bishops[i].addEventListener("click", white_bishop_movement)
    }

    for (let i = 0; i < white_queens.length; i++) {
        white_queens[i].addEventListener("click", white_queen_movement)
    }

    for (let i = 0; i < white_pawns.length; i++) {
        white_pawns[i].addEventListener("click", white_pawn_movement)
    }

    for (let i = 0; i < black_rooks.length; i++) {
        if (black_rooks[i].removeEventListener) {
            black_rooks[i].removeEventListener("click", black_rook_movement)
        }
    }

    for (let i = 0; i < black_bishops.length; i++) {
        if (black_bishops[i].removeEventListener) {
            black_bishops[i].removeEventListener("click", black_bishop_movement)
        }
    }

    for (let i = 0; i < black_queens.length; i++) {
        if (black_queens[i].removeEventListener) {
            black_queens[i].removeEventListener("click", black_queen_movement)
        }
    }

    for (let i = 0; i < black_pawns.length; i++) {
        if (black_pawns[i].removeEventListener) {
            black_pawns[i].removeEventListener("click", black_pawn_movement)
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

    for (let i = 0; i < black_bishops.length; i++) {
        black_bishops[i].addEventListener("click", black_bishop_movement)
    }

    for (let i = 0; i < black_queens.length; i++) {
        black_queens[i].addEventListener("click", black_queen_movement)
    }

    for (let i = 0; i < black_pawns.length; i++) {
        black_pawns[i].addEventListener("click", black_pawn_movement)
    }

    for (let i = 0; i < white_rooks.length; i++) {
        if (white_rooks[i].removeEventListener) {
            white_rooks[i].removeEventListener("click", white_rook_movement)
        }
    }

    for (let i = 0; i < white_bishops.length; i++) {
        if (white_bishops[i].removeEventListener) {
            white_bishops[i].removeEventListener("click", white_bishop_movement)
        }
    }

    for (let i = 0; i < white_queens.length; i++) {
        if (white_queens[i].removeEventListener) {
            white_queens[i].removeEventListener("click", white_queen_movement)
        }
    }

    for (let i = 0; i < white_pawns.length; i++) {
        if (white_pawns[i].removeEventListener) {
            white_pawns[i].removeEventListener("click", white_pawn_movement)
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
            up_down_movement(id)
            left_right_movement(id)
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
            up_down_movement(id)
            left_right_movement(id)
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
            main_diagonal_movement(id)
            cross_diagonal_movement(id)
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
            main_diagonal_movement(id)
            cross_diagonal_movement(id)
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
            up_down_movement(id)
            left_right_movement(id)
            main_diagonal_movement(id)
            cross_diagonal_movement(id)
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
            up_down_movement(id)
            left_right_movement(id)
            main_diagonal_movement(id)
            cross_diagonal_movement(id)
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
            for (var j = 0; j < 8; j++) {
                if (white_pawn_default_id[j] === String(id)) {
                    break
                }
            }
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
            if (id % 10 < 8) {
                dot = document.getElementById("" + String(id + 11))
                if (dot.classList.length === 3) {
                    if (!(dot.classList[2][0] === turn[0])) {
                        add_dot(dot)
                    }
                }
            }
            if (id % 10 > 1) {
                dot = document.getElementById("" + String(id + 9))
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
            for (var j = 0; j < 8; j++) {
                if (black_pawn_default_id[j] === String(id)) {
                    break
                }
            }
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
            if (id % 10 > 1) {
                dot = document.getElementById("" + String(id - 11))
                if (dot.classList.length === 3) {
                    if (!(dot.classList[2][0] === turn[0])) {
                        add_dot(dot)
                    }
                }
            }
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

function left_right_movement(id) {
    check_movement(id, 1, id - id % 10 + 8, id - id % 10 + 1)
}

function up_down_movement(id) {
    check_movement(id, 10, 88, 11)
}

function main_diagonal_movement(id) {
    var max = 88
    var min = 11
    var j = id - id % 10
    j += j / 10
    if (j < id) {
        max -= (id - j) * 10
    } else {
        min += (j - id) * 10
    }
    check_movement(id, 11, max, min)
}

function cross_diagonal_movement(id) {
    var max = 88
    var min = 11
    var j = id - id % 10
    j -= j / 10
    j += 9
    if (j > id) {
        max -= (j - id) * 10
    } else {
        min += (id - j) * 10
    }
    check_movement(id, 9, max, min)
}

function check_movement(id, k, max, min) {
    for (j = id + k; j <= max; j += k) {
        dot = document.getElementById("" + String(j))
        if (dot.classList.length < 3) {
            add_dot(dot)
        } else if (!(dot.classList[2][0] === turn[0])) {
            add_dot(dot)
            break
        } else {
            break
        }
    }
    for (j = id - k; j >= min; j -= k) {
        dot = document.getElementById("" + String(j))
        if (dot.classList.length < 3) {
            add_dot(dot)
        } else if (!(dot.classList[2][0] === turn[0])) {
            add_dot(dot)
            break
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
    var select = document.createElement("div")
    select.classList.add("dot")
    dot.appendChild(select)
    dots.push(dot)
}

function remove_dots() {
    for (i = 0; i < dots.length; i++) {
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
    if (turn === "black") {
        if (icon === "black-rook") {
            selected.removeEventListener("click", black_rook_movement)
        } else if (icon === "black-bishop") {
            selected.removeEventListener("click", black_bishop_movement)
        } else if (icon === "black-queen") {
            selected.removeEventListener("click", black_queen_movement)
        } else if (icon === "black-pawn") {
            selected.removeEventListener("click", black_pawn_movement)
        }
        turn = "white"
        white()
    } else {
        if (icon === "white-rook") {
            selected.removeEventListener("click", white_rook_movement)
        } else if (icon === "white-bishop") {
            selected.removeEventListener("click", white_bishop_movement)
        } else if (icon === "white-queen") {
            selected.removeEventListener("click", white_queen_movement)
        } else if (icon === "white-pawn") {
            selected.removeEventListener("click", white_pawn_movement)
        }
        turn = "black"
        black()
    }
    selected = null
}
