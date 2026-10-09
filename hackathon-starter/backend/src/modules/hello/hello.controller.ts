import type { Request, Response } from 'express';
import type { HelloService } from './hello.service';
import type { GreetQuery } from './hello.schema';

// Controllers translate HTTP <-> service calls. They stay thin on purpose.
export class HelloController {
  constructor(private readonly service: HelloService) {}

  greet = async (_req: Request, res: Response) => {
    const { name } = res.locals.query as GreetQuery;
    const result = await this.service.greet(name);
    res.json({ data: result });
  };
}
