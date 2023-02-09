

//global variables
let page = 1
let game = document.querySelector(".Game")
let vscom = null
let player1;
let player2;
let player1turn = true
let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
let gameOn = true
let player1moves = []
let player2moves = []
let count1 = 0
let count2 = 0
let winningMoves = [[1,2,3], [3,2,1], [4,5,6],
                    [6,5,4], [7,8,9], [9,8,7],
                    [1,4,7], [7,4,1], [2,5,8],
                    [8,5,2], [3,6,9], [9,6,3],
                    [1,5,9], [9,5,1], [3,5,7], [7,5,3]]



const handleWins = () => {
    
    if(player1turn){
        
    for (let i in winningMoves){
        let count = 0
        for (let j in player1moves){
            if(winningMoves[i].indexOf(player1moves[j]) !== -1){
                count++
                if(count < 3 && j === 3){
                    player1moves = []
                }
        }
        if (count === 3){
            count1++
            player1moves = []
            player2moves = []   
            grid.textContent = ""
            p1Score.textContent = count1
            for(let i in boardBoxes){
            boardBoxes[i] = initialBoard[i]
        }
            }
        }
    }
   }else {
        
        for (let i in winningMoves){
            let count = 0
            for (let j in player2moves){
                if(winningMoves[i].indexOf(player2moves[j]) !== -1){
                   count++
                   if(count < 3 && j === 3){
                    player2moves = []
                }
        }
   }    
        if(count === 3) {
           count2++
           player1moves = []
           player2moves = []
           grid.textContent = ""
           p2Score.textContent = count2
           for(let i in boardBoxes){
           boardBoxes[i] = initialBoard[i]
           }
        }
        }
    }
    let gridCount = 0
    for (let i in boardBoxes){
        console.log(boardBoxes[i].id)
        if (boardBoxes[i].id.includes("player")){
            gridCount++
        }
    }
    if (gridCount === 9){
        console.log("A tie")
    }

}



//All functions of the game
const handleTakePlayers = (e) => {
    e.preventDefault()
    if (vscom === true) {
        player1 = input1.value
        player2 = "computer"
        p1PanelName.textContent = player1
        p2PanelName.textContent = player2
    }else {
        player1 = input1.value
        player2 = input2.value
        p1PanelName.textContent = player1
        p2PanelName.textContent = player2
    }
    
    page = 3
    handleGame()
}

const handleChangePage = (e) => {
    e.preventDefault()
    if(page === 1){
        page = 2
        if (e.target.id === "vscom") {
            vscom = true
        }else{
            vscom = false
        }
    }
    handleGame()

}

const handleGameOn = (e) => {
   e.preventDefault()
   let box = e.target
   let newBox = document.createElement("div")
   if(player1turn) {
    newBox.setAttribute("id", `player1-new${box.id}`)
    let p = document.createElement("p")
    p.setAttribute("id", `${newBox.id}p`)
    p.textContent = "O"
    newBox.append(p)
    for(let i in boardBoxes) {
      if (boardBoxes[i] === box){
        boardBoxes[i] = newBox
        player1moves.push(parseInt(i) + 1)
      }
    }
    handleWins()
    player1turn = false
}else {
    
    newBox.setAttribute("id", `player2-new${box.id}`)
    let p = document.createElement("p")
    p.setAttribute("id", `${newBox.id}p`)
    p.textContent = "X"
    newBox.append(p)
    for(let i in boardBoxes) {
      if (boardBoxes[i] === box){
        boardBoxes[i] = newBox
        player2moves.push(parseInt(i) + 1)
      }
    }
    handleWins()
    player1turn = true
}
   
   
   box.remove()
   for(let i in boardBoxes){
    grid.append(boardBoxes[i])
   } 
}
const handleGame = () => {
    if (page === 1){
        game.appendChild(p_or_c)
       }else if (page === 2){
        heading.remove()
        p_or_c.remove()
        if (vscom === true){
            game.append(heading1)
            inputs.append(input1Field)
            finalPage2.append(inputs)
            finalPage2.append(start)
        }else{
            game.append(heading2)
            inputs.append(input1Field, input2Field)
            finalPage2.append(inputs)
            finalPage2.append(start)
        }
        game.append(finalPage2)
       }else if (page === 3){
        
        finalPage2.remove()
        heading1.remove()
        heading2.remove()
        game.append(heading3)
        setTimeout(() => {
            heading3.remove()
            game.append(headingGo)
            game.append(allGame)
        }, 1000)
    
       }
}

/*elements of page 1 of the game*/
let heading = document.getElementById("heading")
let p_or_c = document.createElement("div")
p_or_c.setAttribute("id", "p_or_c")
p_or_c.classList.add("player_or_computer")
let button1 = document.createElement("button")
button1.setAttribute("id", "vscom")
button1.classList.add("vscomputer")
button1.textContent = "VS COM"
button1.addEventListener("click", handleChangePage)
let button2 = document.createElement("button")
button2.setAttribute("id", "vsp")
button2.classList.add("vsplayer")
button2.textContent = "VS PLAYER"
button2.addEventListener("click", handleChangePage)
p_or_c.append(button1, button2)

//elements of page 2 of the game
let finalPage2 = document.createElement("div")
finalPage2.setAttribute("id", "page2")
let heading1 = document.createElement("h1")
heading1.setAttribute("id", "titleOne")
heading1.textContent = "Input your username below"
let heading2 = document.createElement("h1")
heading2.setAttribute("id", "titleTwo")
heading2.textContent = "Input your usernames below"
let inputs = document.createElement("div")
inputs.setAttribute("id", "inputs")
let inputSection = document.createElement("div")
inputSection.setAttribute("id", "input")
let input1Field = document.createElement("div")
input1Field.setAttribute("id", "input1Field")
let label1 = document.createElement("p")
label1.setAttribute("id", "label1")
label1.textContent = "PLAYER-1"
let input1 = document.createElement('input')
input1Field.append(label1, input1)
input1.setAttribute("id", "name1")
let input2Field = document.createElement("div")
input2Field.setAttribute("id", "input2Field")
let label2 = document.createElement("p")
label2.setAttribute("id", "label2")
label2.textContent = "PLAYER-2"
let input2 = document.createElement('input')
input2.setAttribute("id", "name2")
input2Field.append(label2, input2)
let start = document.createElement("button")
start.addEventListener("click", handleTakePlayers)
start.setAttribute("id", "start")
start.textContent = "Start Game"

//elements of page 3 of the game
let allGame = document.createElement("div")
allGame.setAttribute("id", "allgame")
let heading3 = document.createElement("h2")
heading3.setAttribute("id", "heading3")
heading3.textContent = "Readyy"
let headingGo = document.createElement("h2")
headingGo.setAttribute("id", "headingGo")
headingGo.textContent = "Go!!!"
let grid = document.createElement("div")
grid.setAttribute("id", "board")
let boardBoxes = []
let initialBoard = []
let panels = document.createElement("div")
panels.setAttribute("id", "panels")
let player1Panel = document.createElement("div")
player1Panel.setAttribute("id", "p1panel")
let p1PanelName = document.createElement("h3")
p1PanelName.setAttribute("id", "p1panelname")
p1PanelName.textContent = ""
let p1Score = document.createElement("h4")
p1Score.setAttribute("id", "p1score")
p1Score.textContent = 0
player1Panel.append(p1Score, p1PanelName)

let player2Panel = document.createElement("div")
player2Panel.setAttribute("id", "p2panel")
let p2PanelName = document.createElement("h3")
p2PanelName.setAttribute("id", "p2panelname")
p2PanelName.textContent = ""
let p2Score = document.createElement("h4")
p2Score.setAttribute("id", "p2score")
p2Score.textContent = 0
player2Panel.append(p2Score, p2PanelName)

panels.append(player1Panel, player2Panel)

allGame.append(grid, panels)

for (let i = 0; i < 9; i++) {
    let box = document.createElement("button")
    box.setAttribute("id", `box${board[i]}`)
    box.addEventListener("click", handleGameOn)
    initialBoard.push(box)
    boardBoxes.push(box)
    grid.append(box)
}

handleGame()