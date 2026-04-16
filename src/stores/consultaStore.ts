import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface ConsultaData {
  // Información del Paciente
  nombre: string;
  edad: string;
  sexo: string;
  telefono: string;
  // Signos Vitales
  presionArterial: string;
  peso: string;
  talla: string;
  // Evaluación Clínica
  motivoConsulta: string;
  antecedentes: string;
  // Diagnóstico y Plan
  diagnosticoCie10: string;
  tratamiento: string;
}

const initialState: ConsultaData = {
  nombre: "",
  edad: "",
  sexo: "",
  telefono: "",
  presionArterial: "",
  peso: "",
  talla: "",
  motivoConsulta: "",
  antecedentes: "",
  diagnosticoCie10: "",
  tratamiento: "",
};

export const useConsultaStore = defineStore("consulta", () => {
  const formData = ref<ConsultaData>({ ...initialState });
  const isLoading = ref(false);
  const isSaved = ref(false);

  // Computed property para calcular el IMC
  const imc = computed(() => {
    const peso = parseFloat(formData.value.peso);
    const tallaCm = parseFloat(formData.value.talla);

    if (peso > 0 && tallaCm > 0) {
      const tallaM = tallaCm / 100;
      const imcValue = peso / (tallaM * tallaM);
      return imcValue.toFixed(2);
    }
    return "";
  });

  // Computed para clasificación del IMC
  const imcClasificacion = computed(() => {
    const imcValue = parseFloat(imc.value);
    if (!imcValue) return "";
    if (imcValue < 18.5) return "Bajo peso";
    if (imcValue < 25) return "Normal";
    if (imcValue < 30) return "Sobrepeso";
    return "Obesidad";
  });

  // Validaciones
  const validationErrors = computed(() => {
    const errors: Partial<Record<keyof ConsultaData, boolean>> = {};

    if (!formData.value.nombre.trim()) errors.nombre = true;
    if (!formData.value.edad.trim()) errors.edad = true;
    if (!formData.value.sexo) errors.sexo = true;
    if (!formData.value.motivoConsulta.trim()) errors.motivoConsulta = true;

    return errors;
  });

  const isFormValid = computed(() => {
    return Object.keys(validationErrors.value).length === 0;
  });

  // Acciones
  function updateField<K extends keyof ConsultaData>(
    field: K,
    value: ConsultaData[K],
  ) {
    formData.value[field] = value;
    isSaved.value = false;
  }

  async function guardarRegistro() {
    if (!isFormValid.value) return false;

    isLoading.value = true;

    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Datos guardados:", {
      ...formData.value,
      imc: imc.value,
      imcClasificacion: imcClasificacion.value,
    });

    isLoading.value = false;
    isSaved.value = true;

    return true;
  }

  function limpiarFormulario() {
    formData.value = { ...initialState };
    isSaved.value = false;
  }

  return {
    formData,
    isLoading,
    isSaved,
    imc,
    imcClasificacion,
    validationErrors,
    isFormValid,
    updateField,
    guardarRegistro,
    limpiarFormulario,
  };
});
