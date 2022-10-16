import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export class UserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail(
        {},
        {
            message: 'Неккоректный е-mail'
        }
    )
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6, {
        message: 'Минимальная длина пароля 6 символов'
    })
    readonly password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'Пол может быть только мужским или женским'
    })
    readonly gender: Gender;
}
