import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    // url: 'localhost:5000',
    package: 'hero', // ['hero', 'hero2']
    protoPath: join(__dirname, './proto/hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
  },
};
