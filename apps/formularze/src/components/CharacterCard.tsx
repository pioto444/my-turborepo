export default function CharacterCard({ characterInfo }: { characterInfo: any }) {
    return (
        <>
            <div>
                <p>Imię: {characterInfo.imie}</p>
                <p>Rasa: {characterInfo.rasa}</p>
                <p>Klasa: {characterInfo.klasa}</p>
                <p>Poziom: {characterInfo.poziom}</p>
                <p>Opis: {characterInfo.opis}</p>
                <p>Czy publiczna: {characterInfo.czyPubliczna ? 'Tak' : 'Nie'}</p>
            </div>
        </>
    )
}