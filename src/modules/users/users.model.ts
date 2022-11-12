import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { serverPath } from '../../core/helpers/serverPath';

interface UserAttributes {
    id: number;
    name: string;
    status: string;
    avatar: string;
    // surname: string;
    // patronymic: string;
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
        example: 'Frontend Developer',
        description: 'Статус пользователя'
    })
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    status: string;

    @ApiProperty({
        example: serverPath('9959ae9a-b54e-4d83-952b-aa2fb63c648c.jpg'),
        description: 'Аватар пользователя'
    })
    @Column({
        type: DataType.STRING
    })
    avatar: string;

    // @ApiProperty({
    //     example: 'Алешкинов',
    //     description: 'Фамилия пользователя'
    // })
    // @Column({
    //     type: DataType.STRING,
    //     allowNull: false
    // })
    // surname: string;
    //
    // @ApiProperty({
    //     example: 'Сергеевич',
    //     description: 'Отчество пользователя'
    // })
    // @Column({
    //     type: DataType.STRING,
    //     allowNull: false
    // })
    // patronymic: string;

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
        allowNull: true
    })
    gender: string;
}
