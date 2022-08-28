class TicTacToe {
  constructor() {
    this.currentPlayer = "X";
    this.selectedCellCount = 0;
    this.elements = {
      state: document.querySelector("#state"),
      board: document.querySelector("#board"),
      restartButton: document.querySelector("#restart-button"),
    };
    this.listenEvents();
    this.findDirectionsToCheck();
  }

  findDirectionsToCheck() {
    const board = [...this.elements.board.children];

    this.directionsToCheck = [];

    for (let row = 0; row < 9; row += 3) {
      this.directionsToCheck.push(board.slice(row, row + 3));
    }

    for (let column = 0; column < 3; column++) {
      this.directionsToCheck.push([
        board[column],
        board[column + 3],
        board[column + 6],
      ]);
    }

    this.directionsToCheck.push([board[0], board[4], board[8]]);
    this.directionsToCheck.push([board[2], board[4], board[6]]);
  }

  restart() {
    this.selectedCellCount = 0;

    this.currentPlayer = "X";
    this.showCurrentPlayer();

    [...this.elements.board.children].forEach((child) => {
      child.textContent = "";
      child.classList.remove("disabled");
      child.classList.remove("highlight");
    });

    this.elements.board.classList.remove("finished");
  }

  listenEvents() {
    this.elements.restartButton.addEventListener("click", () => {
      this.restart();
    });

    this.elements.board.addEventListener("click", (e) => {
      if (
        e.target.tagName === "DIV" &&
        !e.target.classList.contains("disabled")
      ) {
        this.selectCell(e.target);
        this.verifyGameResult();
      }
    });
  }

  selectCell(cell) {
    cell.textContent = this.currentPlayer;
    cell.classList.add("disabled");

    this.selectedCellCount++;
  }

  verifyGameResult() {
    const wonDirection = this.findWonDirection();

    if (wonDirection) {
      [...this.elements.board.children].forEach((el) => {
        el.classList.add("disabled");
      });

      wonDirection.forEach((el) => {
        el.classList.add("highlight");
        el.classList.remove("disabled");
      });

      const winner = wonDirection[0].textContent;
      this.elements.state.innerHTML = `
        <strong>Resultado:</strong>
        <p>Jogador ${winner} venceu!</p>
      `;
    } else if (this.selectedCellCount === 9) {
      this.elements.state.innerHTML = `
        <strong>Resultado:</strong>
        <p>Empate!</p>
      `;
    } else {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      this.showCurrentPlayer();

      return;
    }

    this.elements.board.classList.add("finished");
  }

  showCurrentPlayer() {
    this.elements.state.innerHTML = `Jogador atual: <strong>${this.currentPlayer}</strong>`;
  }

  findWonDirection() {
    return this.directionsToCheck.find((direction) =>
      direction.every(
        (element) =>
          element.textContent &&
          element.textContent === direction[0].textContent
      )
    );
  }
}

new TicTacToe();
