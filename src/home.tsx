import { useEffect, useState } from "react";
import './home.css';

export interface IMusique {
    id: number;
    attributes: {
        titre: string;
        lien: string;
        fav: boolean;
        dateSortie: string;
        couleur: string; 
        chanteur: {
            data: [
                id: number,
                attributes: {
                    nom: string;
                    prenom: string;
                    dateNaissance: string;
                }
            ]
        }
    }
}

export default function Home() {
    const [favoritesMusique, setFavoritesMusique] = useState<IMusique[]>([])
    const [lastMusique, setLastMusique] = useState<IMusique[]>([])

    useEffect(() => {
        const getFavoritesMusique = async () => {
            const response = await fetch('http://localhost:1338/api/musiques?populate=*&filters[favoris][$eq]=true')
            const data = await response.json()
            setFavoritesMusique(data.data)
        }
        getFavoritesMusique()
    }, [])

    useEffect(() => {
        const getLastMusique = async () => {
            const response = await fetch('http://localhost:1338/api/musiques?sort=createdAt:desc&populate=chanteur')
            const data = await response.json()
            setLastMusique(data.data)
        }
        getLastMusique()
    }
    , [])

return (
    <>
    <div className="musique">
        <h1>PlayMag</h1>
        <link className="button-add">+</link>
        <div className="favoris">
            <h2>Favoris</h2>
            <div className="container-song">

            {favoritesMusique.map(
                (favsong) => (
                    <div key={favsong.id} className="song">
                        <div className="title">{favsong.attributes.titre}</div>
                            {favsong.attributes.chanteur.data.map(
                                (favsinger : any) => (
                                    <div key={favsinger.id} className="artiste">
                                        {favsinger.attributes.nom + favsinger.attributes.prenom}
                                    </div>
                                )
                            )}
                        <div className="icon-favoris"></div>
                    </div>
                ))}

            <div className="recent">
            <h2>Recent</h2>
            <div className="container-song">
            {lastMusique.map(
                (lastsong) => (
                    <div key={lastsong.id} className="song">
                        <div className="title">{lastsong.attributes.titre}</div>
                            {lastsong.attributes.chanteur.data.map(
                                (lastsinger : any) => (
                                    <div key={lastsinger.id} className="artiste">
                                        {lastsinger.attributes.nom + lastsinger.attributes.prenom}
                                    </div>
                                )
                            )}
                        <div className="icon-favoris"></div>
                    </div>
                ))}
        </div>
        </div>
    </div>
    </div>
    </div>
    </>
)
}