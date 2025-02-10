import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Role';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const defaultRoles = [
      { roleName: 'Admin' },
      { roleName: 'User' },
    ];

    for (const role of defaultRoles) {
      const exists = await this.roleRepository.findOne({ where: { roleName: role.roleName } });
      if (!exists) {
        await this.roleRepository.save(role);
      }
    }
  }
}
