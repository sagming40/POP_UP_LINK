import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('link')
export class Link {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    title!: string;
    
    @Column({ length: 255 })
    url!: string;

    @Column({ default: 0 })
    sequence!: number;

    // N:1 관계 설정 - 여러 링크는 하나의 유저에 속합니다. (외래키 userId 역할)
    @ManyToOne(() => User, (user) => user.links, { onDelete: 'CASCADE' })
    user!: User;
}
