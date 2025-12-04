"use client";
import { ArrowRight, CalendarDays } from "lucide-react";
import { CountryPhoneInput } from "../CountryPhoneInput";
import { DEPARTAMENTS } from "@/constants";
import { LOCATIONS } from "@/constants/municipalities.contants";

const CreateOrdenGeneral = ({
  formData,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleCompletedForm,
  isValid,
  setFormData,
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

          <div className="flex items-center w-full border border-gray-300 rounded-lg bg-white overflow-hidden">
            {/* ICONO IZQUIERDA */}
            <div className="flex items-center justify-center w-16 h-full bg-[#F3F5F9] border-r border-gray-300 rounded-l-lg">
              <CalendarDays size={25} color="#7682A0" />
            </div>

            {/* INPUT FECHA */}
            <input
              type="date"
              name="scheduledDate"
              min={minDate}
              value={formData.scheduledDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`flex-1 px-4 py-3 text-[#4A5265] outline-[#4270F9] rounded-r-lg ${
                touched.scheduledDate && errors.scheduledDate
                  ? "border-2 border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>

          {touched.scheduledDate && errors.scheduledDate && (
            <p className="text-red-500 text-sm mt-1">{errors.scheduledDate}</p>
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

        {/* Telefono */}
        <div className="col-start-1 col-end-3 row-start-3 row-end-4 flex flex-col gap-2">
          <CountryPhoneInput
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
            setFormData={setFormData}
          />
        </div>

        {/* Dirección del destinatario */}
        <div className="col-start-3 col-end-6 row-start-3 row-end-3 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            Dirección del destinatario
          </label>

          <input
            type="text"
            name="recipientAddresses"
            value={formData.recipientAddresses}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Final 49 Av. Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador"
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] ${
              touched.recipientAddresses && errors.recipientAddresses
                ? "border-2 border-red-500"
                : "border-gray-300"
            }`}
          />

          {touched.recipientAddresses && errors.recipientAddresses && (
            <p className="text-red-600 text-sm mt-1">
              {errors.recipientAddresses}
            </p>
          )}
        </div>

        {/* Departamento */}
        <div className="col-start-1 col-end-2 row-start-4 row-end-4 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            Departamento
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] bg-white ${
              touched.department && errors.department
                ? "border-2 border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Seleccione un departamento</option>

            {DEPARTAMENTS.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>

          {touched.department && errors.department && (
            <p className="text-red-600 text-sm mt-1">{errors.department}</p>
          )}
        </div>

        {/* Municipio */}
        <div className="col-start-2 col-end-4 row-start-4 row-end-4 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            Municipio
          </label>

          <select
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!formData.department}
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] bg-white ${
              touched.municipality && errors.municipality
                ? "border-2 border-red-500"
                : "border-gray-300"
            } ${!formData.department ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <option value="">Seleccione un municipio</option>

            {LOCATIONS.find(
              (d) => d.name === formData.department
            )?.municipalities?.map((mun) => (
              <option key={mun} value={mun}>
                {mun}
              </option>
            ))}
          </select>

          {touched.municipality && errors.municipality && (
            <p className="text-red-600 text-sm mt-1">{errors.municipality}</p>
          )}
        </div>

        {/* Punto de referencia */}
        <div className="col-start-4 col-end-6 row-start-4 row-end-4 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            Punto de Referencia
          </label>

          <input
            type="text"
            name="benchmark"
            value={formData.benchmark}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Cerca de redondel Arbol de la Paz."
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] ${
              touched.benchmark && errors.benchmark
                ? "border-2 border-red-500"
                : "border-gray-300"
            }`}
          />

          {touched.benchmark && errors.benchmark && (
            <p className="text-red-600 text-sm mt-1">{errors.benchmark}</p>
          )}
        </div>

        {/* Indicaciones */}
        <div className="col-start-1 col-end-6 row-start-5 row-end-5 flex flex-col gap-2">
          <label className="block mb-1 text-sm font-semibold text-[#7682A0]">
            Indicaciones
          </label>

          <input
            type="text"
            name="indications"
            value={formData.indications}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Llamar antes de entregar."
            className={`w-full border rounded-lg px-3 py-3 outline-[#4270F9] ${
              touched.indications && errors.indications
                ? "border-2 border-red-500"
                : "border-gray-300"
            }`}
          />

          {touched.indications && errors.indications && (
            <p className="text-red-600 text-sm mt-1">{errors.indications}</p>
          )}
        </div>
      </div>

      <div className="flex items-end justify-end">
        <button
          onClick={handleCompletedForm}
          type="button"
          disabled={!isValid}
          className={`mt-6 px-6 py-3 rounded-md flex items-center justify-end gap-4 text-lg ${
            isValid
              ? "bg-[#2F5CDF] cursor-pointer text-white"
              : "bg-[#E1E4EC] border-2 border-gray-300 cursor-not-allowed text-[#7682A0]"
          }`}
        >
          Siguiente{" "}
          <ArrowRight size={20} color={`${isValid ? "#fff" : "#7682A0"}`} />
        </button>
      </div>
    </div>
  );
};

export default CreateOrdenGeneral;
