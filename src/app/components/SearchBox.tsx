import React from 'react';

type Props = {
    text: string;
    setText: (value: string) => void;
    onSearchClick: () => void;
    disabled: boolean;
    isLoading: boolean;
};

const SearchBox: React.FC<Props> = ({ text, setText, onSearchClick, disabled, isLoading }) => (
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
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Загрузка...
                </>
            ) : (
                'Получить сайты'
            )}
        </button>
    </div>
);

export default SearchBox;
