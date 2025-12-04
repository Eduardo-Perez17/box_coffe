"use client";
import { Modal } from "@/components/Modal";
import { ModalAnswer } from "@/components/ModalAnswer";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  PackageOpen,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const FormProduct = ({
  formProduct,
  formProductErrors,
  handleProductChange,
  handleProductBlur,
  touchedProduct,
  isValid,
  handleCompletedForm,
  finalProduct,
  addToProduct,
  removeToProduct,
  onsubmit,
  loader,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [openModalAnswer, setOpenModalAnswer] = useState(false);
  const [product, setProduct] = useState(null);

  const ITEMS_PER_PAGE = 4;

  const totalItems = finalProduct?.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentItems = finalProduct?.slice(startIndex, endIndex);

  const viewed = currentItems.length;
  const remaining = totalItems - endIndex > 0 ? totalItems - endIndex : 0;

  return (
    <>
      <div className="space-y-4 w-full flex flex-col gap-4">
        <p className="text-[#7682A0] text-sm font-semibold">
          Agrega tus bultos
        </p>

        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12 bg-[#F3F5F9] p-3 md:p-4 lg:p-6 rounded-lg border border-[#c4c6c9] border-dashed">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-start gap-6 md:gap-8 lg:gap-6 xl:gap-12">
            {/* Icon - shown on top for mobile, left side for desktop */}
            <PackageOpen
              size={40}
              className="hidden lg:flex md:size-12 lg:size-10 xl:size-14 text-[#ACB3C5] flex-shrink-0 lg:mr-2 lg:mt-8 xl:mr-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:grid-cols-3 xl:flex xl:flex-row xl:gap-0">
              {/* Largo */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-[#7682A0]">
                  Largo
                </label>
                <div className="relative flex items-center justify-end">
                  <input
                    name="large"
                    value={formProduct.large}
                    onChange={handleProductChange}
                    onBlur={handleProductBlur}
                    placeholder="15"
                    className={`w-full xl:min-w-36 xl:max-w-40 border rounded-l-lg px-3 md:px-4 py-3 md:py-4 outline-[#4270F9] bg-white text-sm md:text-base ${
                      touchedProduct.large && formProductErrors.large
                        ? "border-2 border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <span className="absolute right-1 font-bold text-gray-400 bg-white px-2 text-xs md:text-sm">
                    cm
                  </span>
                </div>
                {touchedProduct.large && formProductErrors.large && (
                  <p className="text-red-600 text-xs md:text-sm mt-1">
                    {formProductErrors.large}
                  </p>
                )}
              </div>

              {/* Alto */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-[#7682A0]">
                  Alto
                </label>
                <div className="relative flex items-center justify-end">
                  <input
                    name="height"
                    value={formProduct.height}
                    onChange={handleProductChange}
                    onBlur={handleProductBlur}
                    placeholder="15"
                    className={`w-full xl:min-w-36 xl:max-w-40 border px-3 md:px-4 py-3 md:py-4 outline-[#4270F9] bg-white text-sm md:text-base ${
                      touchedProduct.height && formProductErrors.height
                        ? "border-2 border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <span className="absolute right-1 font-bold text-gray-400 bg-white px-2 text-xs md:text-sm">
                    cm
                  </span>
                </div>
                {touchedProduct.height && formProductErrors.height && (
                  <p className="text-red-600 text-xs md:text-sm mt-1">
                    {formProductErrors.height}
                  </p>
                )}
              </div>

              {/* Ancho */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-[#7682A0]">
                  Ancho
                </label>
                <div className="relative flex items-center justify-end">
                  <input
                    name="broad"
                    value={formProduct.broad}
                    onChange={handleProductChange}
                    onBlur={handleProductBlur}
                    placeholder="15"
                    className={`w-full xl:min-w-36 xl:max-w-40 border rounded-r-lg px-3 md:px-4 py-3 md:py-4 outline-[#4270F9] bg-white text-sm md:text-base ${
                      touchedProduct.broad && formProductErrors.broad
                        ? "border-2 border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <span className="absolute right-1 font-bold text-gray-400 bg-white px-2 text-xs md:text-sm">
                    cm
                  </span>
                </div>
                {touchedProduct.broad && formProductErrors.broad && (
                  <p className="text-red-600 text-xs md:text-sm mt-1">
                    {formProductErrors.broad}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:grid-cols-2 xl:flex xl:flex-row xl:gap-6 xl:ml-4 w-full xl:w-auto">
              {/* Peso en libras */}
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-[#7682A0]">
                  Peso en libras
                </label>
                <div className="relative flex items-center justify-end">
                  <input
                    name="weightInPounds"
                    value={formProduct.weightInPounds}
                    onChange={handleProductChange}
                    onBlur={handleProductBlur}
                    placeholder="2"
                    className={`w-full xl:min-w-36 xl:max-w-40 border rounded-lg px-3 md:px-4 py-3 md:py-4 outline-[#4270F9] bg-white text-sm md:text-base ${
                      touchedProduct.weightInPounds &&
                      formProductErrors.weightInPounds
                        ? "border-2 border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <span className="absolute right-1 font-bold text-gray-400 bg-white px-2 text-xs md:text-sm">
                    lb
                  </span>
                </div>
                {touchedProduct.weightInPounds &&
                  formProductErrors.weightInPounds && (
                    <p className="text-red-600 text-xs md:text-sm mt-1">
                      {formProductErrors.weightInPounds}
                    </p>
                  )}
              </div>

              {/* Contenido */}
              <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1 xl:col-span-1 xl:min-w-48">
                <label className="block text-sm font-semibold text-[#7682A0]">
                  Contenido
                </label>
                <input
                  name="content"
                  value={formProduct.content}
                  onChange={handleProductChange}
                  onBlur={handleProductBlur}
                  placeholder="iPhone 14 pro Max"
                  className={`w-full border rounded-lg px-3 md:px-4 py-3 md:py-4 outline-[#4270F9] bg-white text-sm md:text-base ${
                    touchedProduct.content && formProductErrors.content
                      ? "border-2 border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {touchedProduct.content && formProductErrors.content && (
                  <p className="text-red-600 text-xs md:text-sm mt-1">
                    {formProductErrors.content}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Button - responsive positioning and sizing */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={addToProduct}
              disabled={!isValid}
              className={`mt-4 md:mt-6 px-4 md:px-6 py-3 md:py-3 rounded-md flex items-center justify-center gap-2 md:gap-4 text-base md:text-lg w-full md:w-auto ${
                isValid
                  ? "bg-[#2F5CDF] cursor-pointer text-white"
                  : "bg-[#E1E4EC] border-2 border-gray-300 cursor-not-allowed text-[#7682A0]"
              }`}
            >
              Agregar{" "}
              <Plus size={18} color={`${isValid ? "#fff" : "#7682A0"}`} />
            </button>
          </div>
        </div>

        {/* Products list section */}
        {finalProduct?.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-[#7682A0] text-sm font-semibold">
              Administra tus bultos
            </p>

            <div className="border border-[#3EBF5B] rounded-lg py-4 md:py-5 lg:py-6 flex flex-col gap-4 md:gap-6 overflow-x-auto">
              {currentItems.map((item, key) => (
                <div
                  key={key}
                  className="flex flex-col lg:flex-row lg:items-start px-3 md:px-4 lg:px-6 gap-4 md:gap-4 lg:gap-0"
                >
                  <div className="lg:ml-6 xl:ml-8 flex gap-3 md:gap-6 lg:gap-8 xl:gap-10 flex-col md:flex-row w-full">
                    <div className="flex flex-col gap-2 md:min-w-max">
                      <label className="block text-xs md:text-sm font-semibold text-[#7682A0]">
                        Peso en libras
                      </label>
                      <div className="relative flex items-center justify-end">
                        <input
                          value={item.product.weightInPounds}
                          className="w-full md:w-24 border rounded-lg px-3 py-3 md:py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9] text-sm md:text-base"
                          disabled
                        />
                        <span className="absolute right-1 font-bold text-gray-400 px-2 text-xs md:text-sm">
                          lb
                        </span>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="flex flex-col gap-2 flex-1 md:min-w-48">
                      <label className="block text-xs md:text-sm font-semibold text-[#7682A0]">
                        Contenido
                      </label>
                      <div className="relative flex items-center justify-start">
                        <input
                          value={item.product.content}
                          className="w-full border rounded-lg px-3 py-3 md:py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9] text-sm md:text-base"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:mx-4 xl:mx-8 flex gap-3 md:gap-4 lg:gap-6 xl:gap-8 justify-between lg:justify-start w-full lg:w-auto items-start lg:items-center flex-wrap lg:flex-nowrap">
                    <PackageOpen
                      size={24}
                      className="text-[#ACB3C5] flex-shrink-0 hidden md:block md:mr-1 md:mt-8 lg:mr-2 xl:mr-4"
                    />

                    {/* Largo */}
                    <div className="flex flex-col gap-2 md:w-20 lg:w-24 xl:w-32">
                      <label className="block text-xs md:text-sm font-semibold text-[#7682A0]">
                        Largo
                      </label>
                      <div className="relative flex items-center justify-end">
                        <input
                          value={item.product.large}
                          disabled
                          className="w-full md:w-20 lg:w-24 xl:w-32 border rounded-l-lg px-3 py-3 md:py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9] text-sm md:text-base"
                        />
                        <span className="absolute right-1 font-bold text-gray-400 px-2 text-xs md:text-sm">
                          cm
                        </span>
                      </div>
                    </div>

                    {/* Alto */}
                    <div className="flex flex-col gap-2 md:w-20 lg:w-24 xl:w-32">
                      <label className="block text-xs md:text-sm font-semibold text-[#7682A0]">
                        Alto
                      </label>
                      <div className="relative flex items-center justify-end">
                        <input
                          value={item.product.height}
                          disabled
                          className="w-full md:w-20 lg:w-24 xl:w-32 border px-3 py-3 md:py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9] text-sm md:text-base"
                        />
                        <span className="absolute right-1 font-bold text-gray-400 px-2 text-xs md:text-sm">
                          cm
                        </span>
                      </div>
                    </div>

                    {/* Ancho */}
                    <div className="flex flex-col gap-2 md:w-20 lg:w-24 xl:w-32">
                      <label className="block text-xs md:text-sm font-semibold text-[#7682A0]">
                        Ancho
                      </label>
                      <div className="relative flex items-center justify-end">
                        <input
                          value={item.product.broad}
                          disabled
                          className="w-full md:w-20 lg:w-24 xl:w-32 border rounded-r-lg px-3 py-3 md:py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9] text-sm md:text-base"
                        />
                        <span className="absolute right-1 font-bold text-gray-400 px-2 text-xs md:text-sm">
                          cm
                        </span>
                      </div>
                    </div>

                    {/* Delete button */}
                    <Trash2
                      className="mt-6 md:mt-8 text-red-500 cursor-pointer flex-shrink-0"
                      size={20}
                      onClick={() => {
                        setOpenModalAnswer(!openModalAnswer);
                        setProduct(item);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {totalItems > ITEMS_PER_PAGE && (
              <p className="text-xs text-gray-500 mb-2 italic">
                Mostrando {viewed} de {totalItems} items —{" "}
                {remaining > 0 ? `${remaining} restantes` : "No hay más"}
              </p>
            )}

            {/* Pagination - responsive buttons */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 md:gap-4 mt-4 flex-wrap">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`px-3 py-1 md:py-2 rounded border text-sm md:text-base ${
                    currentPage === 1
                      ? "text-gray-300 border-gray-200 cursor-not-allowed"
                      : "text-[#4270F9] border-[#4270F9] cursor-pointer"
                  }`}
                >
                  Anterior
                </button>

                <span className="text-xs md:text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`px-3 py-1 md:py-2 rounded border text-sm md:text-base ${
                    currentPage === totalPages
                      ? "text-gray-300 border-gray-200 cursor-not-allowed"
                      : "text-[#2F5CDF] border-[#2F5CDF] cursor-pointer"
                  }`}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom buttons - responsive layout */}
        <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-3 md:gap-4">
          <button
            type="button"
            onClick={handleCompletedForm}
            className="mt-4 md:mt-6 text-white px-4 md:px-6 py-3 md:py-5 rounded-md flex items-center justify-center md:justify-end gap-2 md:gap-4 text-sm md:text-lg bg-[#3EBF5B] cursor-pointer"
          >
            <ArrowLeft size={18} color="#fff" /> Regresar
          </button>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
            <button
              type="button"
              className="text-white px-4 md:px-6 py-3 md:py-5 rounded-md flex items-center justify-center gap-2 md:gap-4 text-sm md:text-lg bg-[#3EBF5B] cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Info size={18} color="#fff" /> Detalles del pedido
            </button>
            <button
              type="button"
              onClick={onsubmit}
              disabled={finalProduct?.length >= 1 ? false : true}
              className="text-white px-4 md:px-6 py-3 md:py-5 rounded-md flex items-center justify-center gap-2 md:gap-4 text-sm md:text-lg bg-[#2F5CDF] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loader ? (
                <div className="flex justify-center items-center w-5 h-5">
                  <div className="w-5 h-5 border-4 border-gray-200 border-t-[#3EBF5B] rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  Enviar <ArrowRight size={18} color="#fff" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} products={finalProduct} />
      )}

      {openModalAnswer && (
        <ModalAnswer
          isOpen={openModalAnswer}
          setIsOpen={setOpenModalAnswer}
          products={product}
          event={() => removeToProduct({ id: product?.id })}
        />
      )}
    </>
  );
};

export default FormProduct;
