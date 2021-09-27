import React from 'react';


const listGroup = (props) => {
    const { items, textProperty, valueProperty, selectedItem, onGenreSelect } = props;

    return <ul className="list-group clickable">
        {items.map(item => <li
            key={item[valueProperty]}
            className={item === selectedItem ? "list-group-item active" : "list-group-item"}
            onClick={() => onGenreSelect(item)}
        >
            {item[textProperty]}
        </li>)}
    </ul>;
};

listGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id",
};

export default listGroup;
