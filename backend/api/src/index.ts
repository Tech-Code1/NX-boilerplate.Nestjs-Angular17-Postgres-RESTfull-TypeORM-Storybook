export * from './app.module';
export * from './auth/auth.module';
export * from './projects/projects.module';
export * from './tasks/tasks.module';
export * from './users/users.module';

import { AuthModule, ProjectsModule, TasksModule, UsersModule } from './';

export const Modules = [UsersModule, ProjectsModule, AuthModule, TasksModule];
