import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CharacterCard from "./CharacterCard";

const postac = z.object({
  imie: z.string().min(3).max(20),
  rasa: z.enum(["czlowiek", "elf", "krasnolud", "ork"]),
  klasa: z.enum(["wojownik", "mag", "lucznik"]),
  poziom: z.number().min(1).max(100),
  opis: z.string().max(200),
  czyPubliczna: z.boolean(),
});

export default function CharacterForm() {
  const [player, setPlayer] = useState<z.infer<typeof postac> | null>(null);
  const [letters, setLetters] = useState(0);
  const [copy, setCopy] = useState<z.infer<typeof postac> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof postac>>({
    resolver: zodResolver(postac),
    defaultValues: {
      imie: "",
      rasa: "elf",
      klasa: "mag",
      poziom: 1,
      opis: "",
      czyPubliczna: true,
    },
  });

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-slate-800">Utwórz postać</h1>

      <form
        className="grid gap-4"
        onSubmit={handleSubmit((data) => {
          if (!data) return;

          setPlayer(data);
          setCopy(player);
          console.log(data);
        })}
      >
        <div className="grid gap-1">
          <label htmlFor="imie" className="text-sm font-medium text-slate-700">
            Imię:
          </label>
          <input
            {...register("imie")}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            type="text"
            name="imie"
            id="imie"
          />
          {errors.imie && (
            <span className="text-sm text-red-600">{errors.imie.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-1">
            <label
              htmlFor="rasa"
              className="text-sm font-medium text-slate-700"
            >
              Rasa:
            </label>
            <select
              {...register("rasa")}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              name="rasa"
              id="rasa"
              required
            >
                {postac.shape.rasa.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid gap-1">
            <label
              htmlFor="klasa"
              className="text-sm font-medium text-slate-700"
            >
              Klasa:
            </label>
            <select
              {...register("klasa")}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              name="klasa"
              id="klasa"
              required
            >
                {postac.shape.klasa.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid gap-1">
          <label
            htmlFor="poziom"
            className="text-sm font-medium text-slate-700"
          >
            Poziom:
          </label>
          <input
            {...register("poziom", { valueAsNumber: true })}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            type="number"
            name="poziom"
            id="poziom"
          />

          {errors.poziom && (
            <span className="text-sm text-red-600">{errors.poziom.message}</span>
          )}
        </div>

        <div className="grid gap-1">
          <label htmlFor="opis" className="text-sm font-medium text-slate-700">
            Opis:
          </label>
          <label className="text-sm text-slate-500">{letters}/200</label>
          <textarea
            {...register("opis")}
            className="min-h-24 resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            name="opis"
            id="opis"
            onChange={(e) => setLetters(e.target.value.length)}
          ></textarea>
            {errors.opis && (
                <span className="text-sm text-red-600">{errors.opis.message}</span>
            )}
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            {...register("czyPubliczna")}
            className="h-4 w-4 rounded accent-blue-600"
            type="checkbox"
            name="czyPubliczna"
            id="czyPubliczna"
          />
          Czy publiczna
        </label>

        <button
          className="mt-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          type="submit"
        >
          Zapisz
        </button>
        <button
          className="mt-2 rounded-lg bg-slate-600 px-4 py-2.5 font-semibold text-white transition hover:bg-slate-700"
          type="button"
          onClick={() => {
            reset();
          }}
        >
          Wyczyść
        </button>
      </form>

      {copy && <CharacterCard characterInfo={copy} />}
    </div>
  );
}
