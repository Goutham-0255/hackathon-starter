import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { HelloController } from './hello.controller';
import type { HelloRepository } from './hello.repository';
import { greetQuerySchema } from './hello.schema';
import { HelloService } from './hello.service';

// Wires the module together: repository -> service -> controller -> routes.
export function helloRoutes(repository: HelloRepository) {
  const controller = new HelloController(new HelloService(repository));
  const router = Router();

  router.get('/', validate({ query: greetQuerySchema }), controller.greet);

  return router;
}
