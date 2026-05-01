// Part V — Tooling: dependency injection without Spring.
// The functional-factory pattern: a service is a function that takes its
// dependencies and returns a typed handler. No DI container needed.

export type UserRow = { id: string; name: string };

export type UserRepository = {
  findById(id: string): Promise<UserRow | null>;
  save(user: UserRow): Promise<void>;
};

export type UserService = {
  greet(id: string): Promise<string>;
  rename(id: string, name: string): Promise<void>;
};

export function createUserService(deps: { repo: UserRepository }): UserService {
  return {
    async greet(id: string) {
      const user = await deps.repo.findById(id);
      return user ? `hello, ${user.name}` : "user not found";
    },
    async rename(id: string, name: string) {
      const user = await deps.repo.findById(id);
      if (user === null) throw new Error("user not found");
      await deps.repo.save({ ...user, name });
    },
  };
}

// In tests, pass a typed mock repository — the structural type system
// handles the contract without a mocking framework.
export function createInMemoryRepo(seed: UserRow[] = []): UserRepository {
  const store = new Map<string, UserRow>(seed.map((u) => [u.id, u]));
  return {
    findById(id: string) {
      return Promise.resolve(store.get(id) ?? null);
    },
    save(user: UserRow) {
      store.set(user.id, user);
      return Promise.resolve();
    },
  };
}
