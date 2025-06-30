import React from 'react';

type Props = {
    sheetId: string;
    setSheetId: (value: string) => void;
    checkListName: string;
    setCheckListName: (value: string) => void;
};

const DocumentFields: React.FC<Props> = ({
    sheetId,
    setSheetId,
    checkListName,
    setCheckListName
}) => (
    <>
        <div className="form-floating mb-3">
            <input
                type="text"
                className="form-control"
                id="sheetId"
                placeholder="ID документа (SHEET ID)"
                value={sheetId}
                onChange={(e) => setSheetId(e.target.value)}
            />
            <label htmlFor="sheetId">ID документа (SHEET ID)</label>
        </div>
        <div className="form-floating mb-3">
            <input
                type="text"
                className="form-control"
                id="checkListName"
                placeholder="Название Листа проверки"
                value={checkListName}
                onChange={(e) => setCheckListName(e.target.value)}
            />
            <label htmlFor="checkListName">Название Листа проверки</label>
        </div>
    </>
);

export default DocumentFields;
