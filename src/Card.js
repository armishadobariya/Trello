import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
const Card = ({ card, onDeleteCard, onEditCard, onMoveCard, searchTerm, columnId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(card.text);

    const handleEditCard = () => {
        onEditCard(columnId, card.id, newText);
        setIsEditing(false);
    };
    const handleMoveCard = () => {
        if (onMoveCard) {
            onMoveCard(card.id);
        }
    };

    return (
        <li className="card">
            {isEditing ? (
                <>
                    <div className=' p-3'>

                        <input
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className='h-10 w-full border-2 border-gray p-1'
                        />
                        <button onClick={handleEditCard} className='p-1 font-semibold'>Save</button>
                    </div>
                </>
            ) : (
                <>
                    {searchTerm === '' || card.text.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                        <>
                            <div className='flex p-3 bg-slate-100 mt-2 mr-2 ml-2'>

                                <h1 className=' text-lg font-semibold'>{card.text}</h1>

                                <div className='flex ml-auto space-x-3'>
                                    <button onClick={() => onDeleteCard(card.id)}><CloseIcon /></button>
                                    <button onClick={() => setIsEditing(true)}><EditNoteIcon /></button>
                                    <button onClick={handleMoveCard}>Move</button>
                                </div>
                            </div>

                        </>
                    ) : null}
                </>
            )}
        </li>
    );
};

export default Card;
