// Book reference: Chapter 19 — the one place numeric enums are defensible.

enum FilePermissions {
  None = 0,
  Read = 1 << 0,
  Write = 1 << 1,
  Execute = 1 << 2,
  All = Read | Write | Execute,
}

const perms = FilePermissions.Read | FilePermissions.Write;
const canRead = (perms & FilePermissions.Read) !== 0;
const canExec = (perms & FilePermissions.Execute) !== 0;

console.log("perms:", perms);
console.log("canRead :", canRead);
console.log("canExec :", canExec);
