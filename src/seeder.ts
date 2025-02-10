import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Role } from './typeorm/entities/Role';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepo = dataSource.getRepository(Role);

  // Kiểm tra nếu đã có dữ liệu
  const count = await userRepo.count();
  if (count === 0) {
    await userRepo.insert([
      { roleName: 'Admin' },
      { roleName: 'User' },
    ]);
    console.log('✅ Seeded default users successfully');
  } else {
    console.log('⚠️ Users already exist, skipping seeding.');
  }

  await app.close();
}

seed().catch((err) => {
  console.error('❌ Seeding failed', err);
});
