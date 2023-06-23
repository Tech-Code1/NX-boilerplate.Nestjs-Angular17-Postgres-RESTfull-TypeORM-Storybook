import { registerEnumType } from '@nestjs/graphql';

export enum ROLES {
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
  CREATOR = 'CREATOR',
  USER = 'USER', // default role
}

registerEnumType(ROLES, {
  name: 'ROLES',
  description:
    'Roles that allow the user to have certain permissions in the application.',
});

export enum ACCES_LEVEL {
  DEVELOPER = 30,
  MANTEINER = 40,
  OWNER = 50,
}

registerEnumType(ACCES_LEVEL, {
  name: 'ACCES_LEVEL',
  description:
    'Access level for a certain section that you want to give to the user.',
});

export enum STATUS_TASK {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISH = 'FINISH',
}

registerEnumType(STATUS_TASK, {
  name: 'STATUS_TASK',
  description: 'Task status.',
});

export enum BLOCKED_TIME {
  ONE_HOUR = 3600000,
  ONE_DAY = 86400000,
  THREE_DAYS = 259200000,
  FIVE_DAYS = 432000000,
  FIFTEEN_DAYS = 1296000000,
  ONE_MONTH = 2592000000,
  ONE_WEEK = 604800000,
  PERMANENT = -1,
}

registerEnumType(BLOCKED_TIME, {
  name: 'BLOCKED_TIME',
  description: 'Time that a user will have to block for violating some rule.',
});
