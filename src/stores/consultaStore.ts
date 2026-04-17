import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface ConsultaData {
  nombre: string;
  edad: string;
  escolaridad: string;
  ocupacionAnterior: string;
  fuente: string;
  fechaEvaluacion: string;
  telefonoCuidadora: string;

  motivoConsulta: string;
  historiaEnfermedadActual: string;

  antPatologicos: string;
  antQuirurgicos: string;
  antTraumaticos: string;
  antAlergicos: string;
  antHospitalarios: string;
  antInmunologicos: string;
  antToxicos: string;

  revNutricional: string;
  revDisfagia: string;
  revVision: string;
  revAudicion: string;
  revIncontinencias: string;
  revCaidas: string;
  revLesionesPiel: string;
  revDeterioroCognitivo: string;
  revSintomasDepresivos: string;
  revSueno: string;
  revPatronEvacuatorio: string;

  tratamientoActual: string;
  taDerecha: string;
  taIzquierda: string;
  fc: string;
  fr: string;
  spo2: string;

  peso: string;
  glicemiaCapilar: string;
  fuerzaPrensionIzquierda: string;
  fuerzaPrensionDerecha: string;
  descripcionExamenFisico: string;

  scoreQSM: string;
  scoreGDS: string;
  scoreBarthel: string;
  scoreLawton: string;
  scoreSARCF: string;
  scoreFRAIL: string;
  scoreMNA: string;

  diagClinicos: string;
  diagFuncionales: string;
  diagMentales: string;
  diagSociales: string;
  analisisClinicoIntegral: string;

  recomFarmacologicas: string;
  recomNoFarmacologicas: string;
  estudiosComplementarios: string;
  recomFuncionales: string;
}

const initialState: ConsultaData = {
  nombre: "",
  edad: "",
  escolaridad: "",
  ocupacionAnterior: "",
  fuente: "",
  fechaEvaluacion: "",
  telefonoCuidadora: "",

  motivoConsulta: "",
  historiaEnfermedadActual: "",

  antPatologicos: "",
  antQuirurgicos: "",
  antTraumaticos: "",
  antAlergicos: "",
  antHospitalarios: "",
  antInmunologicos: "",
  antToxicos: "",

  revNutricional: "",
  revDisfagia: "",
  revVision: "",
  revAudicion: "",
  revIncontinencias: "",
  revCaidas: "",
  revLesionesPiel: "",
  revDeterioroCognitivo: "",
  revSintomasDepresivos: "",
  revSueno: "",
  revPatronEvacuatorio: "",

  tratamientoActual: "",
  taDerecha: "",
  taIzquierda: "",
  fc: "",
  fr: "",
  spo2: "",

  peso: "",
  glicemiaCapilar: "",
  fuerzaPrensionIzquierda: "",
  fuerzaPrensionDerecha: "",
  descripcionExamenFisico: "",

  scoreQSM: "",
  scoreGDS: "",
  scoreBarthel: "",
  scoreLawton: "",
  scoreSARCF: "",
  scoreFRAIL: "",
  scoreMNA: "",

  diagClinicos: "",
  diagFuncionales: "",
  diagMentales: "",
  diagSociales: "",
  analisisClinicoIntegral: "",

  recomFarmacologicas: "",
  recomNoFarmacologicas: "",
  estudiosComplementarios: "",
  recomFuncionales: "",
};

export const useConsultaStore = defineStore("consulta", () => {
  const formData = ref<ConsultaData>({ ...initialState });
  const isLoading = ref(false);
  const isSaved = ref(false);

  const validationErrors = computed(() => {
    const errors: Partial<Record<keyof ConsultaData, boolean>> = {};
    if (!formData.value.nombre.trim()) errors.nombre = true;
    if (!formData.value.motivoConsulta.trim()) errors.motivoConsulta = true;
    return errors;
  });

  const isFormValid = computed(
    () => Object.keys(validationErrors.value).length === 0,
  );

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(
        "Historia Clínica Geriátrica Guardada:",
        JSON.parse(JSON.stringify(formData.value)),
      );
      isSaved.value = true;
      return true;
    } catch (error) {
      console.error("Error al guardar:", error);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function limpiarFormulario() {
    formData.value = { ...initialState };
    isSaved.value = false;
  }

  return {
    formData,
    isLoading,
    isSaved,
    validationErrors,
    isFormValid,
    updateField,
    guardarRegistro,
    limpiarFormulario,
  };
});
