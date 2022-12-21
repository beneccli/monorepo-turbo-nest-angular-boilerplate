import { Image } from './image.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Omit } from '../utils/Omit';

/**
 * Entity definition
 */
@Entity()
export class ImageFormat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Image, { eager: true, cascade: true })
  @JoinColumn()
  cover: Image;

  @OneToOne(() => Image, { eager: true, cascade: true })
  @JoinColumn()
  thumbnail: Image;

  @OneToOne(() => Image, { eager: true, cascade: true })
  @JoinColumn()
  small: Image;
}


/**
 * Interface generation
 */
class _ImageFormat extends Omit(ImageFormat, ['hasId', 'save', 'remove', 'softRemove', 'recover', 'reload']) {}
export interface IImageFormat extends _ImageFormat {}
