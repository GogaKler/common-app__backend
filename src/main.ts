import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function start() {
    const PORT = process.env.PORT || 6001;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('common-app')
        .setDescription('Documentation REST API')
        .setVersion('0.0.1')
        .addTag('common')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.enableCors();
    app.setGlobalPrefix('api/');
    app.useGlobalPipes(new ValidateInputPipe());
    await app.listen(PORT, () => {
        console.log(`Server start on port === ${PORT}`);
    });
}

start();
