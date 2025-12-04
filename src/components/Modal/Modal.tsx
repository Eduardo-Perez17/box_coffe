"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  MapPin,
  Mail,
  Phone,
  Calendar,
  MapPinned,
  Ruler,
  X,
  FileText,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Modal({ products, isOpen, setIsOpen }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentProduct = products ? products[selectedIndex] : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  const handleNextProduct = () => {
    setSelectedIndex((prev) => (prev + 1) % products?.length);
  };

  const handlePrevProduct = () => {
    setSelectedIndex((prev) => (prev === 0 ? products?.length - 1 : prev - 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000051] bg-opacity-40 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #F3F5F9 0%, #ffffff 100%)",
            }}
          >
            {/* Header */}
            <div
              className="relative p-6 border-b"
              style={{
                background: `#2F5CDF`,
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              <div className="flex items-center gap-3 text-white">
                <div
                  className="p-3 rounded-full"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <Package size={28} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Detalles del Pedido</h1>
                  <p className="text-white/80 text-sm">
                    {currentProduct?.names} {currentProduct?.lastnames}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Recipient Info Card */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                className="p-5 rounded-xl border transition-all"
                style={{
                  borderColor: "#ACB3C5",
                  background: "#F3F5F9",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg mt-1"
                    style={{ background: "#2F5CDF" }}
                  >
                    <Home size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-semibold mb-3"
                      style={{ color: "#2F5CDF" }}
                    >
                      Información del Destinatario
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Teléfono</p>
                        <p className="font-medium flex items-center gap-2">
                          <Phone size={16} style={{ color: "#2F5CDF" }} />
                          {currentProduct?.countryCode} {currentProduct?.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-medium flex items-center gap-2">
                          <Mail size={16} style={{ color: "#2F5CDF" }} />
                          {currentProduct?.email}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Dirección de Entrega</p>
                        <p className="font-medium flex items-start gap-2">
                          <MapPin
                            size={16}
                            style={{ color: "#2F5CDF" }}
                            className="mt-0.5 flex-shrink-0"
                          />
                          {currentProduct?.recipientAddresses}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Location & Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="p-4 rounded-xl border transition-all"
                  style={{
                    borderColor: "#ACB3C5",
                    background: "#F3F5F9",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MapPinned size={20} style={{ color: "#2F5CDF" }} />
                    <h4
                      className="font-semibold text-sm"
                      style={{ color: "#2F5CDF" }}
                    >
                      Ubicación
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Departamento</p>
                  <p className="font-medium">{currentProduct?.department}</p>
                  <p className="text-xs text-gray-600 mt-2 mb-1">Municipio</p>
                  <p className="font-medium">
                    {currentProduct?.municipality || "N/A"}
                  </p>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="p-4 rounded-xl border transition-all"
                  style={{
                    borderColor: "#ACB3C5",
                    background: "#F3F5F9",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={20} style={{ color: "#2F5CDF" }} />
                    <h4
                      className="font-semibold text-sm"
                      style={{ color: "#2F5CDF" }}
                    >
                      Programación
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Fecha Programada</p>
                  <p className="font-medium">{currentProduct?.scheduledDate}</p>
                </motion.div>
              </div>

              {/* Product Specifications */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="p-5 rounded-xl border transition-all"
                style={{
                  borderColor: "#ACB3C5",
                  background: "#F3F5F9",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: "#2F5CDF" }}
                  >
                    <Ruler size={18} className="text-white" />
                  </div>
                  <h3 className="font-semibold" style={{ color: "#2F5CDF" }}>
                    Especificaciones del Producto
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div
                    className="p-3 bg-white rounded-lg border"
                    style={{ borderColor: "#c4c6c9" }}
                  >
                    <p className="text-xs text-gray-500 mb-1">Largo</p>
                    <p className="font-semibold">
                      {currentProduct?.product?.large}
                    </p>
                  </div>
                  <div
                    className="p-3 bg-white rounded-lg border"
                    style={{ borderColor: "#c4c6c9" }}
                  >
                    <p className="text-xs text-gray-500 mb-1">Alto</p>
                    <p className="font-semibold">
                      {currentProduct?.product?.height}
                    </p>
                  </div>
                  <div
                    className="p-3 bg-white rounded-lg border"
                    style={{ borderColor: "#c4c6c9" }}
                  >
                    <p className="text-xs text-gray-500 mb-1">Ancho</p>
                    <p className="font-semibold">
                      {currentProduct?.product?.broad}
                    </p>
                  </div>
                  <div
                    className="p-3 bg-white rounded-lg border"
                    style={{ borderColor: "#c4c6c9" }}
                  >
                    <div className="flex items-center gap-1">
                      <p className="text-xs text-gray-500">Peso (lbs)</p>
                    </div>
                    <p className="font-semibold">
                      {currentProduct?.product?.weightInPounds}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={4}
                className="p-5 rounded-xl border transition-all"
                style={{
                  borderColor: "#ACB3C5",
                  background: "#F3F5F9",
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <FileText size={20} style={{ color: "#2F5CDF" }} />
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: "#2F5CDF" }}>
                      Contenido e indicaciones
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Contenido</p>
                    <p
                      className="p-2 rounded bg-white border"
                      style={{ borderColor: "#c4c6c9" }}
                    >
                      {currentProduct?.product?.content}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">
                      Indicaciones Especiales
                    </p>
                    <p
                      className="p-2 rounded bg-white border"
                      style={{ borderColor: "#c4c6c9" }}
                    >
                      {currentProduct?.indications || "Ninguna"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Punto de Referencia</p>
                    <p
                      className="flex items-center gap-2 p-2 rounded bg-white border"
                      style={{ borderColor: "#c4c6c9" }}
                    >
                      {currentProduct?.benchmark}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Navigation */}
            <div
              className="p-6 border-t flex items-center justify-between"
              style={{ borderColor: "#c4c6c9", background: "#F3F5F9" }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevProduct}
                disabled={products?.length <= 1}
                className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                style={{
                  background: "#2F5CDF",
                  color: "white",
                }}
                type="button"
              >
                <ChevronLeft /> Anterior
              </motion.button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Pedido {selectedIndex + 1} de {products?.length}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextProduct}
                disabled={products?.length <= 1}
                className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-1"
                style={{
                  background: "#3EBF5B",
                  color: "white",
                }}
                type="button"
              >
                Siguiente <ChevronRight />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
