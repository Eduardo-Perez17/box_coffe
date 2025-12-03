"use client";

import { useState } from "react";

const countries = [
  { name: "Estados Unidos", code: "US", dial: "+1" },
  { name: "México", code: "MX", dial: "+52" },
  { name: "Argentina", code: "AR", dial: "+54" },
  { name: "Colombia", code: "CO", dial: "+57" },
  { name: "Perú", code: "PE", dial: "+51" },
  { name: "Chile", code: "CL", dial: "+56" },
  { name: "España", code: "ES", dial: "+34" },
  { name: "Venezuela", code: "VE", dial: "+58" },
];

export default function CountryPhoneInput({
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  setFormData,
}) {
  const [country, setCountry] = useState(countries[0]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  const handleCountryChange = (c) => {
    setCountry(c);

    // Si quieres guardar el prefijo dentro del formData
    setFormData((prev) => ({
      ...prev,
      countryCode: c.dial,
    }));

    setOpen(false);
    setSearch("");
  };

  const getFlagEmoji = (countryCode) =>
    countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <label className="text-sm font-semibold text-[#7682A0]">Teléfono</label>

      <div className="flex border border-gray-300 rounded-lg">
        {/* SELECT DEL PAÍS */}
        <button
          type="button"
          className="border-r border-gray-300 rounded-l-lg px-3 py-3 bg-[#F3F5F9] text-left flex gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span>{getFlagEmoji(country.code)}</span>

          <span>{country.dial}</span>
        </button>

        {/* INPUT DEL TELÉFONO */}
        <input
          type="tel"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Tu número"
          className={`w-full px-3 py-3 rounded-r-lg outline-[#4270F9] ${
            touched && error ? "border-2 border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      {touched && error && <p className="text-red-600 text-sm">{error}</p>}

      {/* DROPDOWN DE PAISES */}
      {open && (
        <div className="absolute left-0 mt-20 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
          <input
            type="text"
            placeholder="Buscar país..."
            className="w-full p-2 border-gray-300 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          <div className="max-h-56 overflow-y-auto">
            {filtered.map((c) => (
              <div
                key={c.code}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCountryChange(c)}
              >
                {c.name} ({c.dial})
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="p-2 text-gray-500 text-sm">Sin resultados</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
