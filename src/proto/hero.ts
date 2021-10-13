/* eslint-disable */
import { util, configure, Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'hero';

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

const baseHeroById: object = { id: 0 };

export const HeroById = {
  encode(message: HeroById, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): HeroById {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHeroById } as HeroById;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HeroById {
    const message = { ...baseHeroById } as HeroById;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: HeroById): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<HeroById>): HeroById {
    const message = { ...baseHeroById } as HeroById;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseHero: object = { id: 0, name: '' };

export const Hero = {
  encode(message: Hero, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Hero {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHero } as Hero;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Hero {
    const message = { ...baseHero } as Hero;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    return message;
  },

  toJSON(message: Hero): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<Hero>): Hero {
    const message = { ...baseHero } as Hero;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    return message;
  },
};

export interface HeroesService {
  FindOne(request: HeroById): Promise<Hero>;
}

export class HeroesServiceClientImpl implements HeroesService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.FindOne = this.FindOne.bind(this);
  }
  FindOne(request: HeroById): Promise<Hero> {
    const data = HeroById.encode(request).finish();
    const promise = this.rpc.request('hero.HeroesService', 'FindOne', data);
    return promise.then((data) => Hero.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
