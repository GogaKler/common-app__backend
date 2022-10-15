import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'email'>;

@Table({
    tableName: 'users'
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
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
        example: 'Дмитрий',
        description: 'Имя пользователя'
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @ApiProperty({
        example: 'user@mail.com',
        description: 'email пользователя'
    })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string;

    @ApiProperty({
        example: 'mypassword',
        description: 'Пароль пользователя'
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @ApiProperty({
        example: 'Мужчина',
        description: 'Пол пользователя'
    })
    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: false
    })
    gender: string;
}
