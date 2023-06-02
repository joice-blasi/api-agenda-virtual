import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3001"
  })

  const config = new DocumentBuilder()
    .setTitle("Documentação Agenda Virtual")
    .setDescription("Salve seus contatos para acessá-los a qualquer momento.")
    .setVersion("1.0")
    .addTag("users")
    .addBearerAuth()
    .addTag("contacts")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ["transform"] }
    })
  )
  await app.listen(3001);
}
bootstrap();
