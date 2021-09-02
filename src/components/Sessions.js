import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Schedule from "./Schedule";

export default function Sessions() {
    const { idFilme } = useParams();
    const [movie, setMovie] = useState([]);
    const [sessions, setSessions] = useState([]);
    const URL_MOVIE = `https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies/${idFilme}/showtimes`;

    useEffect(() => {
        const promise = axios.get(URL_MOVIE);

        promise.then((answer) => {
            setMovie(answer.data);
            setSessions(answer.data.days);
        });
    }, []);

    return (
        <>
            <h1 className="section-title">Selecione o horário</h1>
            <ul className="sessions-list">
                {sessions.map(day => <Schedule weekday={day.weekday} date={day.date} showtimes={day.showtimes} />)}
            </ul>
            <footer className="movie-selected">
                <div className="poster">
                    <img src={movie.posterURL} />
                </div>
                <p className="movie-title">{movie.title}</p>
            </footer>
        </>
    );
}