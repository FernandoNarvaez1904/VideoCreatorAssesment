import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  isPublished: boolean;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastUpdateDate: Date;
}

export default Video;
