"use client"

import React, { useState, useEffect } from "react";
import SearchBox from "@/app/components/SearchBox";
import CountrySelector from "@/app/components/CountrySelector";
import DocumentFields from "@/app/components/DocumentFields";

export default function Home() {
  const [text, setText] = useState('');
  const [sheetId, setSheetId] = useState('');
  const [checkListName, setCheckListName] = useState('');
  const [fillListName, setFillListName] = useState('');
  const [countryTitle, setCountryTitle] = useState('');
  const [alert, setAlert] = useState<null | { type: 'success' | 'danger'; message: string }>(null);

  const isFormValid =
      sheetId.trim() !== '' &&
      checkListName.trim() !== '' &&
      fillListName.trim() !== '' &&
      countryTitle.trim() !== '';

  const handleGetSites = async () => {
    try {
      const res = await fetch('/api/getSites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sheetId,
          checkListName,
          fillListName,
          countryTitle,
        }),
      });

      if (res.ok) {
        setAlert({ type: 'success', message: 'Запрос успешно выполнен!' });
      } else {
        const data = await res.json();
        setAlert({ type: 'danger', message: data.error || 'Ошибка при запросе' });
      }
    } catch {
      setAlert({ type: 'danger', message: 'Ошибка при отправке запроса' });
    }
  };

  // Автоматическое скрытие алерта через 5 секунд
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
      <>
        {/* Floating alert in top-right corner */}
        {alert && (
            <div
                className={`alert alert-${alert.type} alert-dismissible fade show position-fixed top-0 end-0 m-4 shadow`}
                role="alert"
                style={{ zIndex: 1050, minWidth: '300px' }}
            >
              {alert.message}
              <button
                  type="button"
                  className="btn-close"
                  aria-label="Закрыть"
                  onClick={() => setAlert(null)}
              ></button>
            </div>
        )}

        <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
          <div className="w-100" style={{ maxWidth: '700px' }}>
            <h2 className="text-center mb-4">Поисковая страница</h2>
            <SearchBox text={text} setText={setText} onSearchClick={handleGetSites} disabled={!isFormValid} />
            <CountrySelector
                countryTitle={countryTitle}
                setCountryTitle={setCountryTitle}
            />
            <DocumentFields
                sheetId={sheetId}
                setSheetId={setSheetId}
                checkListName={checkListName}
                setCheckListName={setCheckListName}
                fillListName={fillListName}
                setFillListName={setFillListName}
            />
          </div>
        </div>
      </>
  );
}
