// Part VI — Tooling and ecosystem
// Manual DI: factory functions taking deps explicitly.
// The TS-native pattern that replaces Laravel's app() / Symfony's container.

export type DbClient = {
  query<T>(sql: string, params?: readonly unknown[]): Promise<T[]>;
};

export type Logger = {
  info(msg: string): void;
  error(msg: string, err?: unknown): void;
};

export type UserService = {
  findByEmail(email: string): Promise<{ id: string; email: string } | undefined>;
  count(): Promise<number>;
};

export function createUserService(deps: { db: DbClient; logger: Logger }): UserService {
  return {
    async findByEmail(email) {
      const rows = await deps.db.query<{ id: string; email: string }>(
        "SELECT id, email FROM users WHERE email = ?",
        [email],
      );
      const found = rows[0];
      if (found === undefined) {
        deps.logger.info(`No user for ${email}`);
        return undefined;
      }
      return found;
    },
    async count() {
      const rows = await deps.db.query<{ c: number }>("SELECT COUNT(*) AS c FROM users");
      return rows[0]?.c ?? 0;
    },
  };
}
