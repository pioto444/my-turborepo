import { useState } from 'react'

export default function CharacterForm () {
    const [characterInfo, setCharacterInfo] = useState({
        imie: '',
        rasa: 'elf',
        klasa: 'mag',
        poziom: 1,
        opis: '',
        czyPubliczna: true
    })

    return (
        <>
            <form className="flex flex-row gap-2">
                <label htmlFor="imie">Imię:</label>
                <input type="text" name="imie" id="imie" min={3} max={20} onChange={(e) => setCharacterInfo({...characterInfo, imie: e.target.value})} />
                <label htmlFor="rasa">Rasa:</label>
                <select name="rasa" id="rasa" onChange={(e) => setCharacterInfo({...characterInfo, rasa: e.target.value})}>
                    <option value="czlowiek">Człowiek</option>
                    <option value="elf" selected>Elf</option>
                    <option value="krasnolud">Krasnolud</option>
                    <option value="ork">Ork</option>
                </select>
                <label htmlFor="klasa">Klasa:</label>
                <select name="klasa" id="klasa" onChange={(e) => setCharacterInfo({...characterInfo, klasa: e.target.value})}>
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
            </form>

            <p>Imię: {characterInfo.imie}</p>
            <p>Rasa: {characterInfo.rasa}</p>
            <p>Klasa: {characterInfo.klasa}</p>
            <p>Poziom: {characterInfo.poziom}</p>
            <p>Opis: {characterInfo.opis}</p>
            <p>Czy publiczna: {characterInfo.czyPubliczna ? 'Tak' : 'Nie'}</p>
        </>
    )
}