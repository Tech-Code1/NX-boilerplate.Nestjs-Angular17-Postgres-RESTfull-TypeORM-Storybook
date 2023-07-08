import { z } from '@builder.io/qwik-city';
import { Code } from '@ui/components';

export const Recover = z.object({
  email: z.string().email(Code.INVALID_EMAIL),
});

export type Recover = z.infer<typeof Recover>;
