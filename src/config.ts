export const config = {
  db: {
    username: process.env.DB_USERNAME || 'default_username',
    password: process.env.DB_PASSWORD || 'default_password',
  }
};
