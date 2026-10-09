import { prisma } from '../../db/prisma';

// The repository is the ONLY layer that knows how data is stored.
// Services depend on this interface, so storage can be swapped without touching them.
export interface Visit {
  id: number;
  name: string;
  createdAt: Date;
}

export interface HelloRepository {
  recordVisit(name: string): Promise<Visit>;
  countVisits(): Promise<number>;
}

export class PrismaHelloRepository implements HelloRepository {
  recordVisit(name: string) {
    return prisma.visit.create({ data: { name } });
  }

  countVisits() {
    return prisma.visit.count();
  }
}

export class InMemoryHelloRepository implements HelloRepository {
  private visits: Visit[] = [];

  async recordVisit(name: string) {
    const visit = { id: this.visits.length + 1, name, createdAt: new Date() };
    this.visits.push(visit);
    return visit;
  }

  async countVisits() {
    return this.visits.length;
  }
}
