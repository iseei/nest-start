import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Hero, HeroById } from 'src/proto/hero';

interface HeroService {
  findOne(data: HeroById): Observable<Hero>;
  findMany(): Observable<Hero>;
}

@Controller('hero')
export class HeroController implements OnModuleInit {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];
  private heroService: HeroService;

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  @Get('index')
  index() {
    return 'hero index';
  }

  @Get('grpc')
  grpc() {
    return this.heroService.findOne({ id: 1 });
  }
}
