import { z } from '@builder.io/qwik-city';
import { Code } from '@ui/components';

export const Login = z.object({
  email: z.string().email(Code.INVALID_EMAIL),
  password: z.string().min(6, Code.TOO_SMALL),
});

export type Login = z.infer<typeof Login>;
