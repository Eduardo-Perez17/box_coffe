"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { CreateOrdenGeneral } from "../CreateOrdenGeneral";

const Form = () => {
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

  const [completedForm, setCompletedForm] = useState(false);
  const [touched, setTouched] = useState({
    collectionAddress: false,
    scheduledDate: false,
    names: false,
    lastnames: false,
    email: false,
  });

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

  const validateIndications = (value) => {
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
      else if (name === "indications") error = validateIndications(value);
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
    else if (name === "indications") error = validateIndications(value);
    else if (name === "department") error = validateDepartment(value);
    else if (name === "benchmark") error = validateBenchmark(value);

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

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

  const handleCompletedForm = () => setCompletedForm(!completedForm);

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submit
    const newErrors = {
      collectionAddress: validateCollectionAddress(formData.collectionAddress),
      scheduledDate: validateScheduledDate(formData.scheduledDate),
      names: validateNames(formData.names),
      lastnames: validateLastnames(formData.lastnames),
      email: validateEmail(formData.email),
      phone: validateEmail(formData.phone),
      recipientAddresses: validateRecipientAddresses(
        formData.recipientAddresses
      ),
      indications: validateRecipientAddresses(formData.indications),
      department: validateRecipientAddresses(formData.department),
      benchmark: validateRecipientAddresses(formData.benchmark),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((err) => err)) {
      console.log("DATA:", formData);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-md border border-[#E5E8EE] px-10 pt-16 pb-10 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!completedForm ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 20 }} // al iniciar
            animate={{ opacity: 1, y: 0 }} // cuando se muestra
            exit={{ opacity: 0, y: -20 }} // cuando se va
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
            <h1 className="text-2xl font-bold mb-4">Formulario completado</h1>
            <p>Puedes continuar con el siguiente paso.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default Form;
