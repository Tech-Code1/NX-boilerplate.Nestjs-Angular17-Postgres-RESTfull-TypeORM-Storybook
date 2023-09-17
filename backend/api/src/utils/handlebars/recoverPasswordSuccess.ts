import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';

export function emailRecoverPassSuccessHTML(name: string, password: string) {
  // *? Load the template
  const templatePath = join(
    __dirname,
    '/../../../backend/api/src/template/',
    'requestResetPasswordSuccess.handlebars'
  );

  const source = fs.readFileSync(templatePath, 'utf8');

  // *? Build the template
  const template = handlebars.compile(source);

  // *? Generate the final HTML
  return template({
    name,
    password,
  });
}
