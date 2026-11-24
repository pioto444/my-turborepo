import { useState } from 'react';
import CharacterCard from './CharacterCard';
import * as z from 'zod';

const postac = z.object({
    imie: z.string().min(3).max(20),
    rasa: z.enum(['czlowiek', 'elf', 'krasnolud', 'ork']),
    klasa: z.enum(['wojownik', 'mag', 'lucznik']),
    poziom: z.number().min(1).max(100),
    opis: z.string().max(200),
    czyPubliczna: z.boolean()
});

export default function CharacterForm () {
    const [characterInfo, setCharacterInfo] = useState({
        imie: '',
        rasa: 'elf',
        klasa: 'mag',
        poziom: 1,
        opis: '',
        czyPubliczna: true
    })
    const [submit, setSubmit] = useState<boolean>(false);

    return (
        <>
            <form className="flex flex-row gap-2" onSubmit={(e) => {
                e.preventDefault();
                setSubmit(true);
            }}>
                <label htmlFor="imie">Imię:</label>
                <input type="text" name="imie" id="imie" min={3} max={20} onChange={(e) => setCharacterInfo({...characterInfo, imie: e.target.value})} />
                <label htmlFor="rasa">Rasa:</label>
                <select name="rasa" id="rasa" onChange={(e) => setCharacterInfo({...characterInfo, rasa: e.target.value})} required>
                    <option value="czlowiek">Człowiek</option>
                    <option value="elf" selected>Elf</option>
                    <option value="krasnolud">Krasnolud</option>
                    <option value="ork">Ork</option>
                </select>
                <label htmlFor="klasa">Klasa:</label>
                <select name="klasa" id="klasa" onChange={(e) => setCharacterInfo({...characterInfo, klasa: e.target.value})} required>
                    <option value="wojownik">Wojownik</option>
                    <option value="mag" selected>Mag</option>
                    <option value="lucznik">Łucznik</option>
                </select>
                <label htmlFor="poziom">Poziom:</label>
                <input type="number" name="poziom" id="poziom" min={1} max={100} onChange={(e) => setCharacterInfo({...characterInfo, poziom: parseInt(e.target.value) || 1})} />
                <label htmlFor="opis">Opis:</label>
                <textarea name="opis" id="opis" maxLength={200} onChange={(e) => setCharacterInfo({...characterInfo, opis: e.target.value})}></textarea>
                <label htmlFor="czyPubliczna">Czy publiczna:</label>
                <input type="checkbox" name="czyPubliczna" id="czyPubliczna" checked={characterInfo.czyPubliczna} onChange={(e) => setCharacterInfo({...characterInfo, czyPubliczna: e.target.checked})} />
                <button type="submit" >zapisz</button>
            </form>
            {submit ? (
                <CharacterCard characterInfo={characterInfo} />
            ) : (
                <p>zapisz dane aby wyświetlić</p>
            )}
        </>
    )
}

