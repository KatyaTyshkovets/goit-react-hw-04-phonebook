import { useState, useEffect } from "react";

const useLocalStorage = (value, dataContacts) => {
    const [state, setState] = useState(() => {
        return JSON.parse(localStorage.getItem(value)) ?? dataContacts;
    });

    useEffect(() => {
        localStorage.setItem(value, JSON.stringify(state));
    }, [state, value]);
    return [state, setState];
};


export default useLocalStorage
