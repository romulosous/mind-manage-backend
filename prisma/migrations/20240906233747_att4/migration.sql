-- CreateEnum
CREATE TYPE "attachment" AS ENUM ('PEDAGOGICAL_REPORT', 'MEDICAL_REPORT', 'TEACHER_REPORT', 'PROFESSIONAL_REPORT', 'CORDENATION_REPORT', 'DIRECTION_REPORT', 'ENAPI_REPORT', 'DIRECTION_EDUCATION_REPORT', 'SPONTANEOUS_DECISION', 'OTHER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "CreatedBy" AS ENUM ('PATIENT', 'PSYCHOLOGIST');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('AVALIATION', 'ORGANIZATION_ON_STUDIES', 'CONCENTRATION', 'MEMORY', 'TDAH', 'COMUNICATION', 'RELATIONSHIP', 'OTHER');

-- CreateEnum
CREATE TYPE "Education" AS ENUM ('MEDIO', 'SUPERIOR', 'POS_GRADUACAO', 'TECNICO', 'MESTRADO');

-- CreateEnum
CREATE TYPE "Courses" AS ENUM ('FISICA', 'QUIMICA', 'ADS', 'ELETROTECNICA', 'ADMINISTRACAO', 'INFORMATICA');

-- CreateEnum
CREATE TYPE "PatientType" AS ENUM ('STUDENT', 'CONTRACTOR', 'GUARDIAN', 'TEACHER');

-- CreateEnum
CREATE TYPE "typeAppointment" AS ENUM ('SESSION', 'COLLECTIVE_ACTIVITIES', 'ADMINISTRATIVE_RECORDS');

-- CreateEnum
CREATE TYPE "typeAcctivity" AS ENUM ('GROUP', 'LECTURE', 'SEMINAR', 'MEETING', 'DISCUSSION_CIRCLE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CONFIRMED', 'FINALIZED', 'CANCELED', 'ABSENCE');

-- CreateEnum
CREATE TYPE "psychologicalDisorder" AS ENUM ('DEPRESSION', 'GENERALIZED_ANXIETY', 'BIPOLAR_DISORDER', 'BORDERLINE_PERSONALITY_DISORDER', 'SCHIZOPHRENIA', 'OBSESSIVE_COMPULSIVE_DISORDER', 'POST_TRAUMATIC_STRESS_DISORDER', 'ATTENTION_DEFICIT_HYPERACTIVITY_DISORDER', 'AUTISM_SPECTRUM_DISORDER', 'EATING_DISORDER', 'SUBSTANCE_ABUSE', 'PERSONALITY_DISORDER', 'DISSOCIATIVE_DISORDER', 'BODY_DYSMORPHIC_DISORDER', 'PARANOID_DISORDER', 'PANIC_DISORDER', 'PSYCHOSIS', 'OTHER');

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('RELATIONSHIP_WITH_COLLEAGUES', 'RELATIONSHIP_WITH_FAMILY', 'RELATIONSHIP_WITH_PARTNER', 'RELATIONSHIP_WITH_TEACHER', 'OTHER');

-- CreateTable
CREATE TABLE "Psychologist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "crp" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Psychologist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registration" TEXT,
    "course" "Courses",
    "education" "Education",
    "age" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "patientType" "PatientType" NOT NULL,
    "attachment" "attachment"[],
    "series" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "psychologicalDisorder" "psychologicalDisorder"[],
    "relationship" "Relationship"[],
    "createdBy" "CreatedBy" NOT NULL DEFAULT 'PSYCHOLOGIST',
    "isActive" BOOLEAN DEFAULT true,
    "difficulty" "Difficulty"[],

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "psychologistId" INTEGER NOT NULL,
    "patientId" INTEGER,
    "appointmentDate" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "name" TEXT,
    "typeAcctivity" "typeAcctivity",
    "type" "typeAppointment",
    "observation" TEXT,
    "obejective" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "psychologistId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "sessionDate" TEXT NOT NULL,
    "intervention" TEXT,
    "referrals" TEXT,
    "attachment" TEXT,
    "complaint" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anamenese" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "familyHistory" TEXT,
    "infancy" TEXT,
    "adolescence" TEXT,
    "illnesses" TEXT,
    "acompaniment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Anamenese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSchedule" (
    "id" SERIAL NOT NULL,
    "toEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sendAt" TIMESTAMP(3) NOT NULL,
    "isSent" BOOLEAN NOT NULL DEFAULT false,
    "appointmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EmailSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Psychologist_email_key" ON "Psychologist"("email");

-- CreateIndex
CREATE INDEX "Psychologist_email_idx" ON "Psychologist"("email");

-- CreateIndex
CREATE INDEX "Psychologist_id_idx" ON "Psychologist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE INDEX "Patient_id_idx" ON "Patient"("id");

-- CreateIndex
CREATE INDEX "Patient_isActive_idx" ON "Patient"("isActive");

-- CreateIndex
CREATE INDEX "Patient_email_idx" ON "Patient"("email");

-- CreateIndex
CREATE INDEX "Appointment_status_idx" ON "Appointment"("status");

-- CreateIndex
CREATE INDEX "Appointment_type_idx" ON "Appointment"("type");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamenese" ADD CONSTRAINT "Anamenese_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSchedule" ADD CONSTRAINT "EmailSchedule_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
