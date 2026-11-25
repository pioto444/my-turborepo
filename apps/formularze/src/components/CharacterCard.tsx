import {useState} from 'react'

type CharacterInfo = {
  imie: string;
  rasa: string;
  klasa: string;
  poziom: number;
  opis: string;
  czyPubliczna: boolean;
};

export default function CharacterCard({
  characterInfo,
}: {
  characterInfo: CharacterInfo;
}) {
  const [canEdit, setCanEdit] = useState(false);
  const [characterData, setCharacterData] = useState(characterInfo);

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
      <h2 className="mb-3 text-lg font-bold text-slate-800">Podsumowanie</h2>
      <button type="button" className="rounded-lg bg-slate-600 px-4 py-2.5 font-semibold text-white transition hover:bg-slate-700" onClick={() => setCanEdit(!canEdit)}>
        Edytuj
      </button>
      <form >
         <label htmlFor="imie">Imię:</label>
         <input type="text" id="imie" defaultValue={characterData.imie} disabled={!canEdit} />
         <label htmlFor="rasa">Rasa:</label>
         <input type="text" id="rasa" defaultValue={characterData.rasa} disabled={!canEdit} />
         <label htmlFor="klasa">Klasa:</label>
         <input type="text" id="klasa" defaultValue={characterData.klasa} disabled={!canEdit}   />
         <label htmlFor="poziom">Poziom:</label>
         <input type="number" id="poziom" defaultValue={characterData.poziom} disabled={!canEdit} />
         <label htmlFor="opis">Opis:</label>
         <textarea id="opis" defaultValue={characterData.opis} disabled={!canEdit}></textarea>
         <label htmlFor="czyPubliczna">Czy publiczna:</label>
         <input type="checkbox" id="czyPubliczna" checked={characterData.czyPubliczna} disabled={!canEdit} />
         <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700">
           Zapisz
         </button>
      </form>
    </div>
  );
}
