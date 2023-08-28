import { z } from "zod";

export const measureSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  user_id: z.string(),
  weight: z.number(),
  neck: z.number().optional(),
  chest: z.number().optional(),
  biceps: z.number().optional(),
  abdomen: z.number().optional(),
  waist: z.number().optional(),
  hip: z.number().optional(),
  buttocks: z.number().optional(),
  thigh: z.number().optional(),
  calf: z.number().optional(),
  measure_date: z.string().optional(),
  bf_index: z.number().optional(),
});

export type Measurements = z.infer<typeof measureSchema>;

export const addMeasureSchema = z.object({
  weight: z.string(),
  neck: z.string().optional(),
  chest: z.string().optional(),
  biceps: z.string().optional(),
  abdomen: z.string().optional(),
  waist: z.string().optional(),
  hip: z.string().optional(),
  buttocks: z.string().optional(),
  thigh: z.string().optional(),
  calf: z.string().optional(),
  measure_date: z.date().optional(),
  bf_index: z.number().optional(),
});
