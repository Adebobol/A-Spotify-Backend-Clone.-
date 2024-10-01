import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  duration: string;

  @Column()
  stream: string;

  @Column({ default: 'song' })
  tag: string;
}
