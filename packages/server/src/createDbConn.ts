import { createConnection, getConnectionOptions } from 'typeorm';

export const createDbConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL as string,
        entities: [process.env.TYPEORM_ENTITIES],
        name: 'default',
      } as any)
    : createConnection({ ...connectionOptions, name: 'default' });
};
