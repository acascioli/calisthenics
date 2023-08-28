import { z } from "zod";

export const measureSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  user_id: z.string(),
  weight: z.number(),
  biceps: z.number().optional(),
  chest: z.number().optional(),
  waist: z.number().optional(),
  buttocks: z.number().optional(),
  calf: z.number().optional(),
  thigh: z.number().optional(),
  measure_date: z.string().optional(),
});

export type Measurements = z.infer<typeof measureSchema>;

export const addMeasureSchema = z.object({
  weight: z.string(),
  biceps: z.string().optional(),
  chest: z.string().optional(),
  waist: z.string().optional(),
  buttocks: z.string().optional(),
  calf: z.string().optional(),
  thigh: z.string().optional(),
  measure_date: z.date().optional(),
});
