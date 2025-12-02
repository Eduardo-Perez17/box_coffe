"use client";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useEffect } from "react";

interface Props {
  register: any;
  errors: any;
  setValue: any; // viene de useForm()
}

export default function AddressAutocomplete({ register, errors, setValue }: Props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue: setAddressValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "sv" }, // 🇸🇻 Cambia a tu país si deseas
    },
    debounce: 300,
  });

  const handleSelect = async (address: string) => {
    setAddressValue(address, false);
    clearSuggestions();
    setValue("collectionAddress", address, { shouldValidate: true });

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    // Si quieres guardar coordenadas:
    // setValue("lat", lat);
    // setValue("lng", lng);
  };

  return (
    <div className="relative">
      <input
        {...register("collectionAddress", {
          required: "La dirección de recolección es obligatoria",
          minLength: {
            value: 6,
            message: "Debe tener al menos 6 caracteres",
          },
          onChange: (e) => setAddressValue(e.target.value),
        })}
        value={value}
        placeholder="Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel."
        disabled={!ready}
        className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] ${
          errors.collectionAddress ? "border-2 border-red-500" : "border-gray-300"
        }`}
      />

      {status === "OK" && (
        <ul className="absolute bg-white z-50 border w-full rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(description)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}

      {errors.collectionAddress && (
        <p className="text-red-600 text-sm mt-1">{errors.collectionAddress.message}</p>
      )}
    </div>
  );
}
