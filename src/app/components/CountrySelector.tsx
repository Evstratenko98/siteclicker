import React from 'react';
import {COUNTRIES} from "../../../pages/api/back/constants";

type Props = {
    countryTitle: string;
    setCountryTitle: (value: string) => void;
};

const CountrySelector: React.FC<Props> = ({ countryTitle, setCountryTitle }) => (
    <select
        className="form-select mb-4"
        value={countryTitle}
        onChange={(e) => setCountryTitle(e.target.value)}
    >
        <option value="">Выберите страну</option>
        {Object.entries(COUNTRIES).map(([key, value]) => (
            <option key={key} value={key}>
                {value.title}
            </option>
        ))}
    </select>
);

export default CountrySelector;