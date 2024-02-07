import React, { useState } from 'react';
import Column from './Column';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
// import './App.css';

const Appp = () => {
    const [board, setBoard] = useState([
        { id: 1, title: 'To Do', cards: [] },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const addColumn = () => {
        const newColumn = { id: Date.now(), title: 'New Column', cards: [] };
        setBoard((prevBoard) => [...prevBoard, newColumn]);
    };

    const editColumnTitle = (columnId, newTitle) => {
        setBoard((prevBoard) =>
            prevBoard.map((column) =>
                column.id === columnId ? { ...column, title: newTitle } : column
            )
        );
    };

    const deleteColumn = (columnId) => {
        setBoard((prevBoard) => prevBoard.filter((column) => column.id !== columnId));
    };

    const addCard = (columnId, text) => {
        setBoard((prevBoard) =>
            prevBoard.map((column) =>
                column.id === columnId
                    ? { ...column, cards: [...column.cards, { id: Date.now(), text }] }
                    : column
            )
        );
    };
    const editCard = (columnId, cardId, newText) => {
        console.log("edit", newText, cardId, columnId)
        setBoard((prevBoard) =>
            prevBoard.map((column) =>
                column.id === columnId
                    ? {
                        ...column,
                        cards: column.cards.map((card) =>
                            card.id === cardId ? { ...card, text: newText } : card
                        ),
                    }
                    : column
            )
        );
        console.log(board)
    };
    const deleteCard = (columnId, cardId) => {
        setBoard((prevBoard) =>
            prevBoard.map((column) =>
                column.id === columnId
                    ? { ...column, cards: column.cards.filter((card) => card.id !== cardId) }
                    : column
            )
        );
    };

    const moveCard = (sourceColumnId, destinationColumnId, cardId) => {
        setBoard((prevBoard) => {
            const updatedBoard = [...prevBoard];
            console.log(sourceColumnId, destinationColumnId, cardId, updatedBoard);

            // Convert sourceColumnId and destinationColumnId to zero-based indices
            const sourceColumnIndex = sourceColumnId - 1;
            const destinationColumnIndex = destinationColumnId - 1;

            // Check if destinationColumnIndex is out of range
            if (destinationColumnIndex < 0 || destinationColumnIndex >= updatedBoard.length) {
                console.error("Destination column index is out of range.");
                return updatedBoard;
            }

            // Find the card to move
            const cardToMove = updatedBoard[sourceColumnIndex]?.cards?.find(card => card.id === cardId);

            // Check if cardToMove is found
            if (!cardToMove) {
                console.error("Card not found in the source column.");
                return updatedBoard;
            }

            // Remove the card from the source column
            updatedBoard[sourceColumnIndex]?.cards?.splice(cardToMove, 1);

            // Add the card to the destination column
            updatedBoard[destinationColumnIndex]?.cards?.push(cardToMove);

            console.log(updatedBoard);
            return updatedBoard;

        });
    };


    return (
        <div className=" ">
            <div className=' bg-sky-900 p-4 flex sm:w-full'>

                <button onClick={addColumn} className='bg-white rounded-sm w-48 p-1'><AddIcon /> Add new Column</button>
                <div className='h-9 ml-5 bg-white p-1 rounded-sm' >
                    <SearchIcon />
                    <input

                        type="text"
                        placeholder="Search Cards"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ outline: "none" }}
                    />
                </div>

            </div>

            <div className=" flex w-sm-full">
                {board.map((column, idx) => (
                    <Column
                        key={column.id}
                        column={column}
                        idx={idx + 1}
                        onDeleteColumn={deleteColumn}
                        onAddCard={addCard}
                        onDeleteCard={deleteCard}
                        onEditColumnTitle={editColumnTitle}
                        onEditCard={editCard}
                        onMoveCard={moveCard} // Pass the moveCard function here
                        searchTerm={searchTerm}
                    />
                ))}
            </div>
        </div>
    );
};

export default Appp;
