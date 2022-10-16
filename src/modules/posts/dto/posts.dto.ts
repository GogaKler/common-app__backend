import { IsNotEmpty, MinLength } from 'class-validator';

export class PostDto {
    @IsNotEmpty()
    @MinLength(4, {
        message: 'Длина заголовка должна быть не меньше 4'
    })
    readonly title: string;

    @IsNotEmpty()
    readonly body: string;
}
