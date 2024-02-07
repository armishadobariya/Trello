
import React, { useState } from 'react';
import Card from './Card';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Column = ({ column, idx, onDeleteColumn, onDeleteCard, onEditColumnTitle, onAddCard, onEditCard, onMoveCard, searchTerm }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(column.title);
    const [newCardText, setNewCardText] = useState('');

    const handleEditTitle = () => {
        onEditColumnTitle(column.id, newTitle);
        setIsEditing(false);
    };

    const handleAddCard = () => {
        if (newCardText.trim() !== '') {
            onAddCard(column.id, newCardText);
            setNewCardText('');
        }
    };

    const handleMoveCard = (cardId) => {
        const destinationColumnId = prompt("Enter destination column number:");
        if (destinationColumnId) {
            onMoveCard(idx, parseInt(destinationColumnId), cardId);
        }
    };

    const filteredCards = column?.cards?.filter((card) =>
        card?.text?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-wrap justify-center space-y-6 sm:space-x-4 md:space-x-8 lg:space-x-12 mt-10">
            <div className="shadow-lg w-full sm:w-80">
                <div className="column-header p-3">
                    {isEditing ? (
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onBlur={handleEditTitle}
                            autoFocus
                            className="h-10 w-full"
                        />
                    ) : (
                        <>
                            <div className="flex items-center">
                                <h3 className="text-xl font-semibold">{column.title}</h3>
                                <button onClick={() => onDeleteColumn(column.id)} className="ml-auto"><HighlightOffIcon /></button>
                            </div>
                        </>
                    )}
                    <button onClick={() => setIsEditing(true)} className="ml-auto mt-[-40px] mr-3"><EditIcon /></button>
                </div>

                <ul className="cards">
                    {filteredCards?.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                            onDeleteCard={() => onDeleteCard(column.id, card.id)}
                            onEditCard={onEditCard}
                            onMoveCard={handleMoveCard}
                            searchTerm={searchTerm}
                            columnId={column.id}
                        />
                    ))}
                </ul>

                <div className="grid grid-cols-1 gap-4 p-3">
                    <input
                        type="text"
                        placeholder="Add a card..."
                        value={newCardText}
                        onChange={(e) => setNewCardText(e.target.value)}
                        className="h-10 border-2 border-gray-200 p-1 w-full"
                    />
                    <button onClick={handleAddCard} className="mt-3"><AddIcon />Add Card</button>
                </div>
            </div>
        </div>
    );
};

export default Column;


