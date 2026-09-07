import { TestBed } from '@angular/core/testing';

import { WebsocketAdapterService } from './websocket-adapter.service';

describe('WebsocketAdapterService', () => {
  let service: WebsocketAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
