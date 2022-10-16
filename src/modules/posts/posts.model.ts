import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Optional } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

interface PostAttributes {
    id: number;
    userId: number;
    title: string;
    body: string;
}

type PostCreationAttributes = Optional<PostAttributes, 'title'>;

@Table({
    tableName: 'posts'
})
export class Post extends Model<PostAttributes, PostCreationAttributes> {
    @ApiProperty({
        example: '1',
        description: 'Уникальный id'
    })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({
        example: 'Заголовок',
        description: 'Заголовок для поста'
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @ApiProperty({
        example: 'Я сегодня гулял',
        description: 'Описание поста'
    })
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    body: string;

    @ApiProperty({
        example: '4',
        description: 'id пользователя которому пренадлежит пост'
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
