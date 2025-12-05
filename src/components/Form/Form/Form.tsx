"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// Components
import { CreateOrdenGeneral, FormProduct } from "../";

const Form = () => {
  const beforeUnloadRef = useRef(null);

  const [formData, setFormData] = useState({
    collectionAddress: "",
    scheduledDate: "",
    names: "",
    lastnames: "",
    email: "",
    phone: "",
    recipientAddresses: "",
    indications: "",
    municipality: "",
    department: "",
    benchmark: "",
  });
  const [formProduct, setFormProduct] = useState({
    large: "",
    height: "",
    broad: "",
    weightInPounds: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    collectionAddress: "",
    scheduledDate: "",
    names: "",
    lastnames: "",
    email: "",
    phone: "",
    recipientAddresses: "",
    indications: "",
    department: "",
    benchmark: "",
  });
  const [formProductErrors, setFormProductErrors] = useState({
    large: "",
    height: "",
    broad: "",
    weightInPounds: "",
    content: "",
  });

  const [completedForm, setCompletedForm] = useState(false);
  const [touched, setTouched] = useState({
    collectionAddress: false,
    scheduledDate: false,
    names: false,
    lastnames: false,
    email: false,
  });
  const [touchedProduct, setTouchedProduct] = useState({
    large: false,
    height: false,
    broad: false,
    weightInPounds: false,
    content: false,
  });

  const [finalProduct, setFinalProduct] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("products");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [loader, setLoader] = useState(false);

  const validateCollectionAddress = (value) => {
    if (!value) return "La dirección de recolección es obligatoria";
    if (value.length < 6) return "Debe tener al menos 6 caracteres";
    return "";
  };

  const validateScheduledDate = (value) => {
    if (!value) return "La fecha programada es obligatoria";

    const selected = new Date(value);
    const today = new Date();
    const diffInDays =
      (selected.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24);

    if (diffInDays < 1)
      return "Debe programarse con al menos 1 día de anticipación";
    return "";
  };

  const validateNames = (value) => {
    if (!value) return "Los nombres son obligatorios";
    if (value.length < 3) return "Debe tener al menos 3 caracteres";
    return "";
  };

  const validateLastnames = (value) => {
    if (!value) return "Los apellidos son obligatorios";
    if (value.length < 3) return "Debe tener al menos 3 caracteres";
    return "";
  };

  const validateEmail = (value) => {
    if (!value) return "El correo electrónico es obligatorio";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Ingresa un correo electrónico válido";
    return "";
  };

  const validatePhone = (value) => {
    if (!value) return "El número de teléfono es obligatorio";
    const emailRegex = /^\d{6,14}$/;
    if (!emailRegex.test(value)) return "Ingresa un número de teléfono válido";
    return "";
  };

  const validateRecipientAddresses = (value) => {
    if (!value) return "La dirección del destinatario es obligatorio";
    if (value.length < 12) return "Debe tener al menos 12 caracteres";
    return "";
  };

  const validateIndications = () => {
    return "";
  };

  const validateDepartment = (value) => {
    if (!value) return "El departamento es obligatorio";
    return "";
  };

  const validateBenchmark = (value) => {
    if (!value) return "El punto de referencia es obligatorio";
    return "";
  };

  const validateProductField = (name, value) => {
    if (!value) return "Este campo es obligatorio";

    if (name === "weightInPounds" && isNaN(value)) {
      return "El peso debe ser numérico";
    }

    if (name === "large" && isNaN(value)) {
      return "El peso debe ser numérico";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched
    if (touched[name]) {
      let error = "";
      if (name === "collectionAddress")
        error = validateCollectionAddress(value);
      else if (name === "scheduledDate") error = validateScheduledDate(value);
      else if (name === "names") error = validateNames(value);
      else if (name === "lastnames") error = validateLastnames(value);
      else if (name === "email") error = validateEmail(value);
      else if (name === "phone") error = validatePhone(value);
      else if (name === "recipientAddresses")
        error = validateRecipientAddresses(value);
      else if (name === "indications") error = validateIndications();
      else if (name === "department") error = validateDepartment(value);
      else if (name === "benchmark") error = validateBenchmark(value);

      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    let error = "";
    if (name === "collectionAddress") error = validateCollectionAddress(value);
    else if (name === "scheduledDate") error = validateScheduledDate(value);
    else if (name === "names") error = validateNames(value);
    else if (name === "lastnames") error = validateLastnames(value);
    else if (name === "email") error = validateEmail(value);
    else if (name === "phone") error = validatePhone(value);
    else if (name === "recipientAddresses")
      error = validateRecipientAddresses(value);
    else if (name === "indications") error = validateIndications();
    else if (name === "department") error = validateDepartment(value);
    else if (name === "benchmark") error = validateBenchmark(value);

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setFormProduct((prev) => ({ ...prev, [name]: value }));

    // Si deseas validar mientras escribe
    if (touchedProduct[name]) {
      const error = validateProductField(name, value);
      setFormProductErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleProductBlur = (e) => {
    const { name, value } = e.target;
    setTouchedProduct((prev) => ({ ...prev, [name]: true }));

    const error = validateProductField(name, value);
    setFormProductErrors((prev) => ({ ...prev, [name]: error }));
  };

  // --- Validez del producto ---
  const isValidProduct =
    !formProductErrors.large &&
    !formProductErrors.height &&
    !formProductErrors.broad &&
    !formProductErrors.weightInPounds &&
    !formProductErrors.content &&
    formProduct.large &&
    formProduct.height &&
    formProduct.broad &&
    formProduct.weightInPounds &&
    formProduct.content;

  // --- Validez del formulario general (ya existente) ---
  const isValid =
    !errors.collectionAddress &&
    !errors.scheduledDate &&
    !errors.names &&
    !errors.lastnames &&
    !errors.email &&
    !errors.phone &&
    !errors.recipientAddresses &&
    !errors.indications &&
    !errors.department &&
    !errors.benchmark &&
    formData.collectionAddress &&
    formData.scheduledDate &&
    formData.names &&
    formData.lastnames &&
    formData.email &&
    formData.phone &&
    formData.recipientAddresses &&
    formData.indications &&
    formData.department &&
    formData.benchmark;

  // --- Validez combinada (usa esta para habilitar el botón final de submit) ---
  const isFormValid = isValid && isValidProduct;

  const handleCompletedForm = () => setCompletedForm(!completedForm);

  const addToProduct = () => {
    // Validate all fields before submit (formData)
    const newErrors = {
      collectionAddress: validateCollectionAddress(formData.collectionAddress),
      scheduledDate: validateScheduledDate(formData.scheduledDate),
      names: validateNames(formData.names),
      lastnames: validateLastnames(formData.lastnames),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      recipientAddresses: validateRecipientAddresses(
        formData.recipientAddresses
      ),
      indications: validateIndications(),
      department: validateDepartment(formData.department),
      benchmark: validateBenchmark(formData.benchmark),
    };

    // Validate product fields
    const newProductErrors = {
      large: validateProductField("large", formProduct.large),
      height: validateProductField("height", formProduct.height),
      broad: validateProductField("broad", formProduct.broad),
      weightInPounds: validateProductField(
        "weightInPounds",
        formProduct.weightInPounds
      ),
      content: validateProductField("content", formProduct.content),
    };

    setErrors(newErrors);
    setFormProductErrors(newProductErrors);

    const hasFormErrors = Object.values(newErrors).some((err) => err);
    const hasProductErrors = Object.values(newProductErrors).some((err) => err);

    if (!hasFormErrors && !hasProductErrors) {
      const payload = {
        id: uuidv4(),
        ...formData,
        product: { ...formProduct },
      };

      setFinalProduct((prev) => {
        const updated = [...prev, payload];

        sessionStorage.setItem("products", JSON.stringify(updated));
        return updated;
      });

      setFormProduct({
        large: "",
        height: "",
        broad: "",
        weightInPounds: "",
        content: "",
      });
      setFormProductErrors({
        large: "",
        height: "",
        broad: "",
        weightInPounds: "",
        content: "",
      });
      setTouchedProduct({
        large: false,
        height: false,
        broad: false,
        weightInPounds: false,
        content: false,
      });
    }
  };

  const removeToProduct = ({ id }) => {
    setFinalProduct((prev) => {
      const updated = prev.filter((item) => item.id !== id);

      sessionStorage.setItem("products", JSON.stringify(updated));

      return updated;
    });
  };

  const hardReload = () => {
    if (beforeUnloadRef.current) {
      window.removeEventListener("beforeunload", beforeUnloadRef.current);
    }

    sessionStorage.clear();
    window.location.reload();
  };

  const onsubmit = () => {
    setLoader(true);
    const myPromise = new Promise<{ name: string }>((resolve) => {
      setTimeout(() => {
        resolve({ name: "My toast" });
      }, 2000);
    });

    toast.promise(myPromise, {
      loading: "Enviando paquetes...",
      success: () => {
        return {
          message: "Felicidades",
          description:
            "¡Tu paquete fue recibido correctamente; nos contactaremos contigo pronto!",
        };
      },
      error: "Error",
    });

    setTimeout(() => {
      setLoader(false);
      hardReload();
    }, 5000);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    beforeUnloadRef.current = handleBeforeUnload;

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <form className="bg-white rounded-md border border-[#E5E8EE] px-10 pt-16 pb-10 overflow-hidden">
      <AnimatePresence mode="wait">
        {!completedForm ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CreateOrdenGeneral
              formData={formData}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleCompletedForm={handleCompletedForm}
              isValid={isValid}
              setFormData={setFormData}
            />
          </motion.div>
        ) : (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <FormProduct
              formProduct={formProduct}
              formProductErrors={formProductErrors}
              handleProductChange={handleProductChange}
              handleProductBlur={handleProductBlur}
              touchedProduct={touchedProduct}
              isValid={isFormValid}
              handleCompletedForm={handleCompletedForm}
              finalProduct={finalProduct}
              addToProduct={addToProduct}
              removeToProduct={removeToProduct}
              onsubmit={onsubmit}
              loader={loader}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default Form;
