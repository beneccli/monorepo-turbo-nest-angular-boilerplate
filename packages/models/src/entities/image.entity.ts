import { IsDefined } from 'class-validator';
import { ColumnNumericTransformer } from '../utils/ColumnNumericTransformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Omit } from '../utils/Omit';

/**
 * Entity definition
 */
@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined({ always: true })
  url: string;

  @Column({ type: 'integer', nullable: true })
  width: number;

  @Column({ type: 'integer', nullable: true })
  height: number;

  @Column({
    type: 'decimal',
    nullable: true,
    transformer: new ColumnNumericTransformer(),
  })
  size: number;

  @Column({ nullable: true })
  format: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  provider: string;
}

/**
 * Interface generation
 */
class _Image extends Omit(Image, ['hasId', 'save', 'remove', 'softRemove', 'recover', 'reload']) {}
export interface IImage extends _Image {}
