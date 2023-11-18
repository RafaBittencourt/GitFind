import React from 'react';
import './styles.css';

function ItemList({title, description, url_repo}) {
    return (
        <div className='item-list'>
            <a href={url_repo} target="_blank" className="linkStyle">
                <strong>{title}</strong>
            </a>
            <p>{description}</p>
            <hr />
        </div>
    )
}

export default ItemList;