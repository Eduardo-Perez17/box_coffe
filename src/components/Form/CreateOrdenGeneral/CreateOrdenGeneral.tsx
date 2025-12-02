"use client";
import { ArrowRight, CalendarDays } from "lucide-react";

const CreateOrdenGeneral = ({
  formData,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleCompletedForm,
  isValid,
}) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-5 grid-rows-5 gap-8">
        {/* Dirección de recolección */}
        <div className="col-start-1 col-end-4 row-start-1 row-end-2 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            📍 Dirección de recolección
          </label>

          <input
            name="collectionAddress"
            value={formData.collectionAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel."
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] ${
              touched.collectionAddress && errors.collectionAddress
                ? "border-2 border-red-500"
                : "border-gray-300"
            }`}
          />

          {touched.collectionAddress && errors.collectionAddress && (
            <p className="text-red-600 text-sm mt-1">
              {errors.collectionAddress}
            </p>
          )}
        </div>

        {/* Fecha Programada */}
        <div className="col-start-4 col-end-6 row-start-1 row-end-2 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            📅 Fecha Programada
          </label>

          <div
            className={`flex items-center w-full rounded-lg border ${
              touched.scheduledDate && errors.scheduledDate
                ? "border-red-500"
                : "border-gray-300"
            } bg-white overflow-hidden`}
          >
            {/* ICONO IZQUIERDA */}
            <div className="flex items-center justify-center w-16 border-r border-[#E5E8EE]">
              <CalendarDays size={32} color="#7682A0" />
            </div>

            {/* INPUT FECHA */}
            <input
              type="date"
              name="scheduledDate"
              min={minDate}
              value={formData.scheduledDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="flex-1 px-4 py-3 text-[#4A5265] outline-[#4270F9]"
            />
          </div>

          {touched.scheduledDate && errors.scheduledDate && (
            <p className="text-red-500 text-xs mt-1">{errors.scheduledDate}</p>
          )}
        </div>

        {/* Nombres */}
        <div className="col-start-1 col-end-3 row-start-2 row-end-3 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            Nombres
          </label>

          <input
            type="text"
            name="names"
            value={formData.names}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Gabriel Rene"
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] ${
              touched.names && errors.names
                ? "border-2 border-red-500"
                : "border-gray-300"
            }`}
          />

          {touched.names && errors.names && (
            <p className="text-red-600 text-sm mt-1">{errors.names}</p>
          )}
        </div>

        {/* Apellidos */}
        <div className="col-start-3 col-end-4 row-start-2 row-end-3 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            Apellidos
          </label>

          <input
            type="text"
            name="lastnames"
            value={formData.lastnames}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Díaz López"
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] ${
              touched.lastnames && errors.lastnames
                ? "border-2 border-red-500"
                : "border-gray-300"
            }`}
          />

          {touched.lastnames && errors.lastnames && (
            <p className="text-red-600 text-sm mt-1">{errors.lastnames}</p>
          )}
        </div>

        {/* Correo electronico */}
        <div className="col-start-4 col-end-6 row-start-2 row-end-3 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            Correo Electrónico
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="gabbydiaz@gmail.com"
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] ${
              touched.email && errors.email
                ? "border-2 border-red-500"
                : "border-gray-300"
            }`}
          />

          {touched.email && errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="flex items-end justify-end">
        <button
          onClick={handleCompletedForm}
          type="submit"
          disabled={!isValid}
          className={`mt-6 text-white px-6 py-5 rounded-md flex items-center justify-end gap-4 text-lg ${
            isValid
              ? "bg-[#2F5CDF] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Siguiente <ArrowRight size={20} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default CreateOrdenGeneral;
