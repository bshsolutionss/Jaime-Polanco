import { z } from "zod";
import { allServiceIds } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";

export type ContactErrorKey = keyof Dictionary["contact"]["errors"];

export const serviceOptions: readonly string[] = [...allServiceIds, "other"];

// Each message is a key into messages/*.json → contact.errors, so the UI can translate it.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120, "name"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s().-]{7,20}$/, "phone")
    .refine((v) => v.replace(/\D/g, "").length >= 10, "phone"),
  email: z.union([z.literal(""), z.email("email")]),
  service: z.string().refine((v) => serviceOptions.includes(v), "service"),
  message: z.string().trim().min(10, "message").max(2000, "message"),
  consent: z.literal("on", "consent"),
});

export type ContactField = keyof z.infer<typeof contactSchema>;
export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  status: "idle" | "success" | "error";
  errors: Partial<Record<ContactField, ContactErrorKey>>;
  values: ContactValues;
};

export const emptyContactValues: ContactValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  consent: "",
};
