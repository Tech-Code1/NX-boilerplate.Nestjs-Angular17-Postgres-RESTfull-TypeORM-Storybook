import { Project } from '@db/entities';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ProjectUpdateDTO } from '../../dto';

export function EditProjectDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Edit project' }),
    ApiBody({ type: ProjectUpdateDTO }),
    ApiParam({ name: 'id', required: true }),
    ApiOkResponse({
      description: 'The project has been successfully updated.',
      type: Project,
    })
  );
}
