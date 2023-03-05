import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';

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

  @ManyToOne(() => User, (user) => user.videos, { nullable: false })
  user: User;

  @ManyToMany(() => User, (user) => user.likedVideos)
  likedBy: User[];

  @Column({ default: 0 })
  likesCount: number;
}

export default Video;
