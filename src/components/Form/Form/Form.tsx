"use client";
import { useState } from "react";

// Components
import { CreateOrdenGeneral } from "../CreateOrdenGeneral";

const Form = () => {
  const [formData, setFormData] = useState({
    collectionAddress: "",
    scheduledDate: "",
    names: "",
    lastnames: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    collectionAddress: "",
    scheduledDate: "",
    names: "",
    lastnames: "",
    email: "",
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

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isValid =
    !errors.collectionAddress &&
    !errors.scheduledDate &&
    !errors.names &&
    !errors.lastnames &&
    !errors.email &&
    formData.collectionAddress &&
    formData.scheduledDate &&
    formData.names &&
    formData.lastnames &&
    formData.email;

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
    };

    setErrors(newErrors);

    // If valid, submit
    if (!Object.values(newErrors).some((err) => err)) {
      console.log("DATA:", formData);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-md border border-[#E5E8EE] px-10 pt-16 pb-10"
    >
      <CreateOrdenGeneral
        formData={formData}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleCompletedForm={handleCompletedForm}
        isValid={isValid}
      />
    </form>
  );
};

export default Form;
