module.exports = { 
    checkWinner: function(moves) {
        // Initialize the board
        const board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        // Fill the board based on the moves
        moves.forEach(({ row, column, isX }) => {
            board[row][column] = isX ? 'X' : 'O';
        });

        // Helper function to check if all elements in an array are the same
        const allSame = arr => arr[0] !== '' && arr.every(val => val === arr[0]);

        // Check rows for a winner
        for (let row = 0; row < 3; row++) {
            if (allSame(board[row])) {
                return [board[row][0],'column',row];
            }
        }

        // Check columns for a winner
        for (let col = 0; col < 3; col++) {
            const column = [board[0][col], board[1][col], board[2][col]];
            if (allSame(column)) {
                return [column[0],'row',col];
            }
        }

        // Check diagonals for a winner
        const diag1 = [board[0][0], board[1][1], board[2][2]];
        const diag2 = [board[0][2], board[1][1], board[2][0]];

        if (allSame(diag1)) {
            return [diag1[0],'diag', 1];
        }

        if (allSame(diag2)) {
            return [diag2[0],'diag', 2];
        }

        // No winner found
        return false;
    }
}