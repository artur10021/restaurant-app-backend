import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });


  const config = new DocumentBuilder().addBearerAuth()
      .setTitle("Documentation")
      .setDescription("Technology: Nest.JS, Sequelize, TypeScript, PostgreSQL")
      .setVersion("1.0.0")
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/docs", app, document)

  await app.listen(PORT, ()=>{console.log(`server started on PORT = ${PORT}`)});
}
bootstrap();

