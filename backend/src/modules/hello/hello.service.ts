import type { HelloRepository } from './hello.repository';

// Business logic lives here: no Express objects (req/res), no database calls.
// That makes it easy to unit test and easy to explain.
export class HelloService {
  constructor(private readonly repository: HelloRepository) {}

  async greet(name: string) {
    await this.repository.recordVisit(name);
    const totalVisits = await this.repository.countVisits();
    return { message: `Hello, ${name}!`, totalVisits };
  }
}
