/**
 * Centralized TypeScript interfaces for ClinaxCore
 */

// ==========================================
// User & Authentication Types
// ==========================================

export interface User {
  id: string
  name: string
  email: string
  specialty: string
  avatar?: string
}

export interface UserCredentials {
  email: string
  password: string
}

// ==========================================
// Patient Types
// ==========================================

export type SexoPaciente = 'M' | 'F'

export type EstadoPaciente = 'en_tratamiento' | 'alta'

export interface Paciente {
  id: string
  nombre: string
  cedula: string
  edad: number
  sexo: SexoPaciente
  telefono: string
  email?: string
  avatar?: string
  estado: EstadoPaciente
  ultimaVisita: Date
  fechaRegistro: Date
}

export interface FiltrosPaciente {
  busqueda: string
  ultimaVisita: 'todos' | 'hoy' | 'semana' | 'mes'
}

// ==========================================
// Appointment Types
// ==========================================

export type EstadoCita = 'programada' | 'en_espera' | 'finalizada' | 'cancelada'

export type VistaCita = 'dia' | 'semana' | 'mes'

export interface Cita {
  id: string
  pacienteId: string
  pacienteNombre: string
  pacienteAvatar?: string
  fecha: Date
  hora: string
  motivo: string
  estado: EstadoCita
  notas?: string
}

export interface FiltrosCita {
  fecha: Date
  vista: VistaCita
}

export interface ResumenCitas {
  total: number
  programadas: number
  enEspera: number
  finalizadas: number
  canceladas: number
}

// ==========================================
// Consultation Types
// ==========================================

export interface ConsultaData {
  // Patient Information
  nombre: string
  edad: string
  sexo: string
  telefono: string
  // Vital Signs
  presionArterial: string
  peso: string
  talla: string
  // Clinical Evaluation
  motivoConsulta: string
  antecedentes: string
  // Diagnosis and Plan
  diagnosticoCie10: string
  tratamiento: string
}

export type IMCClasificacion = 'Bajo peso' | 'Normal' | 'Sobrepeso' | 'Obesidad' | ''

// ==========================================
// UI Component Types
// ==========================================

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

export type ButtonSize = 'sm' | 'md' | 'lg'
