import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketinfoController } from './websocketinfo.controller';

describe('WebsocketinfoController', () => {
  let controller: WebsocketinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebsocketinfoController],
    }).compile();

    controller = module.get<WebsocketinfoController>(WebsocketinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
