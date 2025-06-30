"use client"

import React, { useState, useEffect } from "react";
import SearchBox from "@/app/components/SearchBox";
import CountrySelector from "@/app/components/CountrySelector";
import DocumentFields from "@/app/components/DocumentFields";
import Alert from "@/app/components/Alert";
import {GetSitesApiRequestDto, FrontLogPlace} from "@/app/api/getSitesApi/getSitesApi.types";
import {getSitesApi} from "@/app/api/getSitesApi/getSitesApi";
import SitesOffCanvas from "@/app/components/SitesOffcanvas";

export default function Home() {
  const [text, setText] = useState('');
  const [sheetId, setSheetId] = useState('');
  const [checkListName, setCheckListName] = useState('');
  const [countryTitle, setCountryTitle] = useState('');
  const [alert, setAlert] = useState<null | { type: 'success' | 'danger'; message: string }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<FrontLogPlace[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>('');
  const [isOffCanvasVisible, setIsOffCanvasVisible] = useState(false);

  const isFormValid =
      sheetId.trim() !== '' &&
      checkListName.trim() !== '' &&
      countryTitle.trim() !== '';

  const handleGetSites = async () => {
    setIsLoading(true);
    const body: GetSitesApiRequestDto ={
      text,
      sheetId,
      checkListName,
      countryTitle,
      nextPageToken
    };

    try {
      const sites = await getSitesApi(body);

      if(sites) {
        setPlaces(prevPlaces => [...prevPlaces, ...sites.logPlaces]);
        setNextPageToken(sites.nextPageToken);
        setIsOffCanvasVisible(true);
      }
    } catch {
      setAlert({ type: 'danger', message: 'Ошибка при отправке запроса' });
      setPlaces([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
      <>
        {alert && <Alert alert={alert} setAlert={setAlert}/>}
        <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
          <button
              className="btn btn-primary position-fixed top-0 end-0 m-4 z-3"
              onClick={() => setIsOffCanvasVisible(true)}
          >
            Открыть таблицу результатов
          </button>
          <div className="w-100" style={{maxWidth: '700px'}}>
            <h2 className="text-center mb-4">Поиск релеватных сайтов</h2>
            <SearchBox text={text} setText={setText} onSearchClick={handleGetSites} disabled={!isFormValid}
                       isLoading={isLoading}/>
            <CountrySelector
                countryTitle={countryTitle}
                setCountryTitle={setCountryTitle}
            />
            <DocumentFields
                sheetId={sheetId}
                setSheetId={setSheetId}
                checkListName={checkListName}
                setCheckListName={setCheckListName}
            />
          </div>
        </div>
        <SitesOffCanvas
            isVisible={isOffCanvasVisible}
            onClose={() => setIsOffCanvasVisible(false)}
            places={places}
            handleGetSites={handleGetSites}
            disabled={!isFormValid}
            isLoading={isLoading}
        />
      </>
  );
}
