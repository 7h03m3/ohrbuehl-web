import * as Path from 'path';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  timeZone: process.env.TIMEZONE || 'Europe/Zurich',
  hostUrl: process.env.HOST_URL || 'https://ohrbuehl.info',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || '12345',
    name: process.env.DATABASE_NAME || 'ohrbuehl-web',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT, 10) || 465,
    ignoreTLS: process.env.MAIL_IGNORE_TLS == 'true' || true,
    secure: process.env.MAIL_SECURE == 'true' || true,
    user: process.env.MAIL_USER || 'ohrbuehl@gmail.com',
    password: process.env.MAIL_PASSWORD || '',
    from: process.env.MAIL_FROM || '"Schiessanlage Ohrbühl" <ohrbuehl@gmail.com>',
  },
  shootingRange: {
    distance25mBlockManualCount: 2,
    distance25mBlockElectronicCount: 2,
    distance50mManuelCount: 8,
    distance50mElectronicCount: 12,
    distance100mCount: 5,
    distance300mCount: 64,
    singleShooterEventLimit: 2,
  },
  paths: {
    applications: process.env.APPLICATIONS_PATH || Path.resolve(__dirname, '../../../', 'data/files/applications'),
  },
});
