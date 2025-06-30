'use client';
import React from 'react';
import SitesTable from './SitesTable';
import {FrontLogPlace} from "@/app/api/getSitesApi/getSitesApi.types";

type Props = {
    isVisible: boolean;
    onClose: () => void;
    places: FrontLogPlace[];
    handleGetSites: () => void;
    disabled: boolean;
    isLoading: boolean;
};

const SitesOffCanvas = ({ isVisible, onClose, places, handleGetSites, disabled, isLoading }: Props) => {
    console.log(disabled, isLoading)
    return (
        <>
            <div
                className={`offcanvas offcanvas-end ${isVisible ? 'show' : ''}`}
                tabIndex={-1}
                style={{
                    visibility: isVisible ? 'visible' : 'hidden',
                    width: '80%',
                    height: '100vh',
                    backgroundColor: 'white',
                    transition: 'transform 0.3s ease-in-out',
                    zIndex: 1055,
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    overflowY: 'auto',
                }}
                aria-labelledby="sitesOffcanvasLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sitesOffcanvasLabel">
                        Полученные сайты
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        onClick={onClose}
                    />
                </div>
                <div className="offcanvas-body">
                    {places?.length > 0 ? <SitesTable places={places}/> : <p>Данных нет</p>}
                </div>
                {places?.length > 0 &&
                    <div className="d-flex justify-content-center mt-4 mb-4">
                        <button className="btn btn-primary" onClick={handleGetSites}
                                disabled={disabled || isLoading}
                        >{isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Загрузка...
                            </>
                        ) : (
                            'Получить ещё'
                        )}
                        </button>
                    </div>
                }
            </div>

            {isVisible && (
                <div
                    className="modal-backdrop fade show"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1050,
                    }}
                    onClick={onClose}
                />
            )}
        </>
    );
}

export default SitesOffCanvas;