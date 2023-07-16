import { Project } from '@db/entities';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export function ProjectsDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Find all projects' }),
    ApiQuery({ name: 'limit', required: false }),
    ApiQuery({ name: 'offset', required: false }),
    ApiQuery({ name: 'search', required: false }),
    ApiOkResponse({
      description: 'Successfully retrieved projects.',
      type: [Project],
    })
  );
}
