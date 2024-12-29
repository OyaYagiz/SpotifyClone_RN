import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ArtistContext = createContext();

const ArtistProvider = ({ children }) => {
    const [artists, setArtist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getArtist = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q: 'Türkiye de popüler olanlar',
                type: 'artists',
                offset: '0',
                limit: '10',
                numberOfTopResults: '5',
            },
            headers: {
                'x-rapidapi-key': '756d0c1442msh153e7d65fc912a8p1d303ajsn3ab32182bfe9',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            const data = response.data.artists.items;
            setArtist(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getArtist();
      
    }, []);


    return (
        <ArtistContext.Provider value={{ artists, loading, error }}>
            {children}
        </ArtistContext.Provider>
    );       
};




export {ArtistContext, ArtistProvider};