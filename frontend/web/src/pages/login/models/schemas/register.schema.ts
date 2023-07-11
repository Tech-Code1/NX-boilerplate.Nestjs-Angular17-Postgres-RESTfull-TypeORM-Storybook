import { z } from '@builder.io/qwik-city';
import { Code } from '@ui/components';

export const Register = z.object({
  emai: z.string().email(Code.INVALID_EMAIL),
  passwor: z.string().min(6, Code.TOO_SMALL),
});

export type Register = z.infer<typeof Register>;
