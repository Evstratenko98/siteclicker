import React from 'react';

type Props = {
    alert: null | { type: 'success' | 'danger'; message: string };
    setAlert: (value: {type: "success" | "danger", message: string } | null) => void;
};

const Alert: React.FC<Props> = ({ alert, setAlert }) => (
    <div
        className={`alert alert-${alert?.type} alert-dismissible fade show position-fixed top-0 end-0 m-4 shadow`}
        role="alert"
        style={{zIndex: 1050, minWidth: '300px'}}
    >
        {alert?.message}
        <button
            type="button"
            className="btn-close"
            aria-label="Закрыть"
            onClick={() => setAlert(null)}
        ></button>
    </div>
);

export default Alert;
