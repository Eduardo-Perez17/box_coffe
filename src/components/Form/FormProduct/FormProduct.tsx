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

  // Divide el array en páginas
  const currentItems = finalProduct?.slice(startIndex, endIndex);

  // Para mostrar la info
  const viewed = currentItems.length;
  const remaining = totalItems - endIndex > 0 ? totalItems - endIndex : 0;

  return (
    <>
      <div className="space-y-4 w-full flex flex-col gap-4">
        <p className="text-[#7682A0] text-sm font-semibold">
          Agrega tus bultos
        </p>

        <div className="flex flex-col gap-12 bg-[#F3F5F9] p-4 rounded-lg border border-[#c4c6c9] border-dashed">
          <div className="flex items-start justify-start">
            <PackageOpen size={52} className="mr-4 mt-8 text-[#ACB3C5]" />

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
                  className={`w-38 border rounded-l-lg px-4 py-4 outline-[#4270F9] bg-white ${
                    touchedProduct.large && formProductErrors.large
                      ? "border-2 border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <span className="absolute right-1 font-bold text-gray-400 bg-white px-2">
                  cm
                </span>
              </div>
              {touchedProduct.large && formProductErrors.large && (
                <p className="text-red-600 text-sm mt-1 max-w-32">
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
                  className={`w-38 border px-3 py-4 outline-[#4270F9] bg-white ${
                    touchedProduct.height && formProductErrors.height
                      ? "border-2 border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <span className="absolute right-1 font-bold text-gray-400 bg-white px-2">
                  cm
                </span>
              </div>
              {touchedProduct.height && formProductErrors.height && (
                <p className="text-red-600 text-sm mt-1 max-w-32">
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
                  className={`w-38 border rounded-r-lg px-3 py-4 outline-[#4270F9] bg-white ${
                    touchedProduct.broad && formProductErrors.broad
                      ? "border-2 border-red-500"
                      : "border-gray-300"
                  }`}
                />

                <span className="absolute right-1 font-bold text-gray-400 bg-white px-2">
                  cm
                </span>
              </div>
              {touchedProduct.broad && formProductErrors.broad && (
                <p className="text-red-600 text-sm mt-1 max-w-32">
                  {formProductErrors.broad}
                </p>
              )}
            </div>

            <div className="ml-12 flex gap-10 w-full">
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
                    className={`w-38 border rounded-lg px-3 py-4 outline-[#4270F9] bg-white ${
                      touchedProduct.weightInPounds &&
                      formProductErrors.weightInPounds
                        ? "border-2 border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  <span className="absolute right-1 font-bold text-gray-400 bg-white px-2">
                    lb
                  </span>
                </div>
                {touchedProduct.weightInPounds &&
                  formProductErrors.weightInPounds && (
                    <p className="text-red-600 text-sm mt-1 max-w-32">
                      {formProductErrors.weightInPounds}
                    </p>
                  )}
              </div>

              {/* Contenido */}
              <div className="flex flex-col gap-2 w-full">
                <label className="block text-sm font-semibold text-[#7682A0]">
                  Contenido
                </label>

                <input
                  name="content"
                  value={formProduct.content}
                  onChange={handleProductChange}
                  onBlur={handleProductBlur}
                  placeholder="iPhone 14 pro Max"
                  className={`w-full border rounded-lg px-3 py-4 outline-[#4270F9] bg-white ${
                    touchedProduct.content && formProductErrors.content
                      ? "border-2 border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {touchedProduct.content && formProductErrors.content && (
                  <p className="text-red-600 text-sm mt-1 max-w-32">
                    {formProductErrors.content}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={addToProduct}
              disabled={!isValid}
              className={`mt-6 px-6 py-3 rounded-md flex items-center justify-end gap-4 text-lg ${
                isValid
                  ? "bg-[#2F5CDF] cursor-pointer text-white"
                  : "bg-[#E1E4EC] border-2 border-gray-300 cursor-not-allowed text-[#7682A0]"
              }`}
            >
              Agregar{" "}
              <Plus size={20} color={`${isValid ? "#fff" : "#7682A0"}`} />
            </button>
          </div>
        </div>

        {finalProduct?.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-[#7682A0] text-sm font-semibold">
              Administra tus bultos
            </p>

            <div className="border border-[#3EBF5B] rounded-lg py-5 flex flex-col gap-6">
              {currentItems.map((item, key) => (
                <div className="flex justify-start items-center" key={key}>
                  <div className="ml-12 flex gap-10">
                    {/* Peso en libras */}
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-semibold text-[#7682A0]">
                        Peso en libras
                      </label>

                      <div className="relative flex items-center justify-end">
                        <input
                          value={item.product.weightInPounds}
                          className={`max-w-24 border rounded-lg px-3 py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9]`}
                          disabled
                        />

                        <span className="absolute right-1 font-bold text-gray-400 px-2">
                          lb
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="mx-12 flex gap-10 justify-between w-full"
                    key={key}
                  >
                    {/* Peso en libras */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="block text-sm font-semibold text-[#7682A0]">
                        Contenido
                      </label>

                      <div className="relative flex items-center justify-start">
                        <input
                          value={item.product.content}
                          className={`w-full border rounded-lg px-3 py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9]`}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <PackageOpen
                        size={32}
                        className="mr-4 mt-8 text-[#ACB3C5]"
                      />

                      {/* Largo */}
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-semibold text-[#7682A0]">
                          Largo
                        </label>

                        <div className="relative flex items-center justify-end">
                          <input
                            name="large"
                            value={item.product.large}
                            disabled
                            className={`w-38 border rounded-l-lg px-3 py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9]`}
                          />
                          <span className="absolute right-1 font-bold text-gray-400 px-2">
                            cm
                          </span>
                        </div>
                      </div>

                      {/* Alto */}
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-semibold text-[#7682A0]">
                          Alto
                        </label>

                        <div className="relative flex items-center justify-end">
                          <input
                            value={item.product.height}
                            disabled
                            className={`w-38 border px-3 py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9]`}
                          />
                          <span className="absolute right-1 font-bold text-gray-400 px-2">
                            cm
                          </span>
                        </div>
                      </div>

                      {/* Ancho */}
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-semibold text-[#7682A0]">
                          Ancho
                        </label>

                        <div className="relative flex items-center justify-end">
                          <input
                            value={item.product.broad}
                            disabled
                            className={`w-38 border rounded-r-lg px-3 py-4 text-gray-500 font-bold border-gray-300 bg-[#F3F5F9]`}
                          />

                          <span className="absolute right-1 font-bold text-gray-400 px-2">
                            cm
                          </span>
                        </div>
                      </div>
                      <Trash2
                        className="mt-8 ml-6 text-red-500 cursor-pointer"
                        onClick={() => {
                          setOpenModalAnswer(!openModalAnswer);
                          setProduct(item);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalItems > ITEMS_PER_PAGE && (
              <p className="text-xs text-gray-500 mb-2 italic">
                Mostrando {viewed} de {totalItems} items —
                {remaining > 0 ? `${remaining} restantes` : "No hay más"}
              </p>
            )}

            {/* Controles de paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`px-3 py-1 rounded border
            ${
              currentPage === 1
                ? "text-gray-300 border-gray-200 cursor-not-allowed"
                : "text-[#4270F9] border-[#4270F9] cursor-pointer"
            }`}
                >
                  Anterior
                </button>

                <span className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`px-3 py-1 rounded border
            ${
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

        <div className="flex items-end justify-between">
          <button
            type="button"
            onClick={handleCompletedForm}
            className="mt-6 text-white px-6 py-5 rounded-md flex items-center justify-end gap-4 text-lg bg-[#3EBF5B] cursor-pointer"
          >
            <ArrowLeft size={20} color="#fff" /> Regresar
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              className={`mt-6 text-white px-6 py-5 rounded-md flex items-center justify-end gap-4 text-lg bg-[#3EBF5B] cursor-pointer`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Info size={20} color="#fff" /> Detalles del pedido
            </button>
            <button
              type="button"
              onClick={onsubmit}
              disabled={finalProduct?.length >= 1 ? false : true}
              className={`mt-6 text-white px-6 py-5 rounded-md flex items-center justify-end gap-4 text-lg bg-[#2F5CDF] cursor-pointer`}
            >
              {loader ? (
                <>
                  <div className="flex justify-center items-center w-6 h-6">
                    <div className="w-6 h-6 border-4 border-gray-200 border-t-[#3EBF5B] rounded-full animate-spin"></div>
                  </div>
                </>
              ) : (
                <>
                  Enviar <ArrowRight size={20} color="#fff" />
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
