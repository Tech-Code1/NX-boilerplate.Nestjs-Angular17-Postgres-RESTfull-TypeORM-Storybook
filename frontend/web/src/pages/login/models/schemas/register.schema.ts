import { z } from '@builder.io/qwik-city';
import { Code } from '@ui/components';

export const Register = z.object({
  email: z.string().email(Code.INVALID_EMAIL),
  username: z.string().min(3, Code.TOO_SMALL),
  password: z.string().min(6, Code.TOO_SMALL),
});

export type Register = z.infer<typeof Register>;
