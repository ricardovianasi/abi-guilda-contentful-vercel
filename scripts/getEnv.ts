if (typeof window !== 'undefined') {
  throw new Error('This util must not end up bundled');
}

// TODO: deduplicate with `getEnv` from site utils — requires making imports runnable in the build
export const getEnv = (key: string) => {
  const val = process.env[key];
  if (!val) {
    throw new Error(`Env variable ${key} not set`);
  }
  return val;
};
