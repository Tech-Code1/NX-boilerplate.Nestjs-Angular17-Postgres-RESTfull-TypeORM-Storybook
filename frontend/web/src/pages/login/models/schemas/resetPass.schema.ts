import { z } from '@builder.io/qwik-city';
import { Code } from '@ui/components';

export const ResetPass = z.object({
  password: z.string().min(6, Code.TOO_SMALL),
  repeatPass: z.string().min(6, Code.TOO_SMALL),
});

export type ResetPass = z.infer<typeof ResetPass>;
