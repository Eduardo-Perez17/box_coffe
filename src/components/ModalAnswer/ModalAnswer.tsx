"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";

const ModalAnswer = ({ isOpen, setIsOpen, products, event }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
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
              className="relative p-6"
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
                <h1 className="text-2xl font-bold">
                  ¿Seguro que desea hacer la siguiente acción?
                </h1>
              </div>
            </div>

            <div className="bg-white flex flex-col gap-4 items-center justify-center p-4">
              <Info color="#2F5CDF" size={52} className="mt-4" />

              <p className="font-bold text-base">
                <span className="text-red-600">Eliminar</span> el producto{" "}
                {products?.product?.content}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    event();
                    setIsOpen(!isOpen);
                  }}
                  type="button"
                  className="bg-blue-300 px-4 py-2 text-blue-900 font-bold rounded-2xl cursor-pointer"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-red-300 px-4 py-2 text-red-800 font-bold rounded-2xl cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalAnswer;
