import { z } from 'zod';

export const BasePositionSchema = z.object({
    security: z.string().min(1, 'Security is required'),
    ticker: z.string().min(1, 'Ticker is required'),
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
        message: 'Exit price must be greater than entry price',
        path: ['exitPrice'],
      });
    }

    if (data.type === 'short' && data.exitPrice >= data.entryPrice) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Exit price must be less than entry price',
        path: ['exitPrice'],
      });
    }
  }

  if (data.stopLoss !== undefined) {
    if (data.type === 'long' && data.stopLoss >= data.entryPrice) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Stop loss must be less than entry price',
        path: ['stopLoss'],
      });
    }

    if (data.type === 'short' && data.stopLoss <= data.entryPrice) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Stop loss must be greater than entry price',
        path: ['stopLoss'],
      });
    }
  }
});