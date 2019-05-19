function drawChessboard() {
    var $div = document.getElementById('chessboard');
    var $table = document.createElement('table'),
        letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ' '];

    for (var i = 0; i < 10; i++) {
        var $row = document.createElement('tr');


        for (var j = 0; j < 10; j++) {
            var $cell = document.createElement('td');
            if(i===0 || i===9)
                $cell.textContent = letters[j];
            else if((i!==0 && j===0) || (i!==9&&j===0)||(i!==9 && j===9) || (i!==0&&j===9))
                $cell.textContent = i;
            $row.appendChild($cell);
        }
        $table.appendChild($row);
    }
    $div.appendChild($table);

};
drawChessboard();
