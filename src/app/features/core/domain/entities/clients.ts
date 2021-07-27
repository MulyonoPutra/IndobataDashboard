export interface Clients {
  id?: number;
  name?: string;
  address?: string;
  url?: string;
  imagesContentType?: string;
  images?: string;
}

export class IClients implements Clients {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public url?: string,
    public imagesContentType?: string,
    public images?: string,
  ) {}
}
