import { Project } from '@db/entities';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

export function ProjectDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Find specific project by its ID' }),
    ApiParam({ name: 'id', required: true }),
    ApiOkResponse({
      description: 'Successfully retrieved the project.',
      type: Project,
    })
  );
}
