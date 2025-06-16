import { z } from 'zod';

export const BasePositionSchema = z.object({
    security: z.string({required_error: "Security is required"}),
    type: z.enum(['long', 'short']),
    size: z.number()
            .int('Must be integer')
            .positive('Must be positive'),
    entryPrice: z.number()
                .positive('Must be positive'),

    exitPrice: z
        .number()
        .positive('Must be positive')
        .optional(),

    stopLoss: z
        .number()
        .positive('Must be positive')
        .optional(),
});

export const FullPositionSchema = BasePositionSchema.superRefine((data, context) => {
  if (data.exitPrice !== undefined) {
    if (data.type === 'long' && data.exitPrice <= data.entryPrice) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Exit price must be above entry price',
        path: ['exitPrice'],
      });
    }

    if (data.type === 'short' && data.exitPrice >= data.entryPrice) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Exit price must be below entry price',
        path: ['exitPrice'],
      });
    }
  }

  if (data.stopLoss !== undefined) {
    if (data.type === 'long' && data.stopLoss >= data.entryPrice) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Stop loss must be below entry price',
        path: ['stopLoss'],
      });
    }

    if (data.type === 'short' && data.stopLoss <= data.entryPrice) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Stop loss must be above entry price',
        path: ['stopLoss'],
      });
    }
  }
});