'use client';

import React from 'react';
import {FrontLogPlace, FrontStatus} from "@/app/api/getSitesApi/getSitesApi.types";

interface SitesTableProps {
    places: FrontLogPlace[];
}

const getRowClass = (status: FrontStatus): string => {
    switch (status) {
        case FrontStatus.SUITABLE:
            return 'table-success';
        case FrontStatus.RECOMMENDED:
            return 'table-warning';
        case FrontStatus.UNSUITABLE:
            return 'table-danger';
        default:
            return '';
    }
};

const SitesTable: React.FC<SitesTableProps> = ({ places }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped align-middle">
                <thead>
                <tr>
                    <th scope="col">Номер</th>
                    <th scope="col">Название</th>
                    <th scope="col">Адрес</th>
                    <th scope="col">Вебсайт</th>
                    <th scope="col">Ошибка</th>
                    <th scope="col">Лендинг</th>
                    <th scope="col">Соц. сеть</th>
                    <th scope="col">В чеклисте</th>
                </tr>
                </thead>
                <tbody>
                {places && places.map((site, index) => (
                    <tr key={index} className={getRowClass(site.status)}>
                        <th scope="row">{index + 1}</th>
                        <td>{site.displayName?.text}</td>
                        <td>{site.formattedAddress}</td>
                        <td>{site.isWebsiteUri ? site.websiteUri : '—'}</td>
                        <td>{site.isError ? 'Да' : 'Нет'}</td>
                        <td>{site.isLanding ? 'Да' : 'Нет'}</td>
                        <td>{site.isSocialNetwork ? 'Да' : 'Нет'}</td>
                        <td>{site.isExistsInCheckList ? 'Да' : 'Нет'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SitesTable;
