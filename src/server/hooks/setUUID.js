export function timestamp(name) {
  return (hook, next) => {
    const data = hook.uuid;
    data[name] = new Date();
    next();
  };
}
