export interface Clients {
  id?: number;
  name?: string;
  address?: string;
  url?: string;
  images?: string;
  imagesContentType?: string;
}

export class IClients implements Clients {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public url?: string,
    public images?: string,
    public imagesContentType?: string,
  ) {}
}


export function getClientsIdentifier(clients: IClients): number | undefined {
  return clients.id;
}
