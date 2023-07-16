import { Project } from '@db/entities';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export function DeleteProjectDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete project' }),
    ApiParam({ name: 'id', required: true }),
    ApiOkResponse({
      description: 'The project has been successfully deleted.',
      type: Project,
    })
  );
}
