import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';

export function emailRecoverPassHTML(name: string, link: string) {
  // *? Load the template
  const templatePath = join(
    __dirname,
    '/../../../backend/api/src/template/',
    'requestResetPassword.handlebars'
  );

  const source = fs.readFileSync(templatePath, 'utf8');

  // *? Build the template
  const template = handlebars.compile(source);

  // *? Generate the final HTML
  return template({
    name,
    link,
  });
}
