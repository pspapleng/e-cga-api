import { registerAs } from '@nestjs/config'

export const AdminInitConfig = registerAs('admin-init', () => ({
  username: process.env.ADMIN_INIT_USERNAME || 'admin@admin.com',
  password: process.env.ADMIN_INIT_PASSWORD || 'password',
}))
