import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';
import Video from './Video';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastUpdateDate: Date;

  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  @ManyToMany(() => Video, (video) => video.likedBy, { cascade: true })
  @JoinTable()
  likedVideos: Video[];

  @ManyToMany(() => User, (user) => user.isFollowedBy)
  @JoinTable()
  follows: User[];

  @ManyToMany(() => User, (user) => user.follows)
  isFollowedBy: User[];

  @Column({ nullable: true })
  profilePictureUrl: string;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;
