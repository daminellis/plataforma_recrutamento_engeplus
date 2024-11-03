import { SetMetadata } from '@nestjs/common';

export const AllowUserTypes = (...allowedTypes: string[]) => SetMetadata('allowedTypes', allowedTypes);
