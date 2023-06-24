import { Field } from '@nestjs/graphql';
import { JoinColumn, ManyToOne } from 'typeorm';

export function LastUpdatedBy(type: Function): PropertyDecorator {
  return (target: Object, propertyName: string | symbol) => {
    ManyToOne(() => type, { nullable: true })(target, propertyName);
    JoinColumn({ name: 'lastUpdateBy' })(target, propertyName);
    Field(() => type, { nullable: true })(target, propertyName);
  };
}
