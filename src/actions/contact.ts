"use server";

import {
  contactSchema,
  emptyContactValues,
  type ContactErrorKey,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/lib/contact-schema";

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (String(formData.get("company") ?? "") !== "") {
    return { status: "success", errors: {}, values: emptyContactValues };
  }

  const values = Object.fromEntries(
    (Object.keys(emptyContactValues) as ContactField[]).map((key) => [key, String(formData.get(key) ?? "")]),
  ) as ContactValues;

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      errors[field] ??= issue.message as ContactErrorKey;
    }
    return { status: "error", errors, values };
  }

  // The client uses these validated values to prepare a WhatsApp message.
  // No message is sent until the visitor opens WhatsApp and taps Send.
  return { status: "success", errors: {}, values: parsed.data };
}
