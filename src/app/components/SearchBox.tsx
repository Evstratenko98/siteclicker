import React from 'react';

type Props = {
    text: string;
    setText: (value: string) => void;
    onSearchClick: () => void;
    disabled: boolean;
};

const SearchBox: React.FC<Props> = ({ text, setText, onSearchClick, disabled }) => (
    <div className="input-group mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Поиск..."
            disabled={disabled}
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <button
            className="btn btn-primary"
            type="button"
            onClick={onSearchClick}
            disabled={disabled}
        >
            Получить сайты
        </button>
    </div>
);

export default SearchBox;
