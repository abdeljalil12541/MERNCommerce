declare module '@adminjs/mongoose' {
    import { BaseDatabase, BaseResource } from 'adminjs';
  
    export const Database: typeof BaseDatabase;
    export const Resource: typeof BaseResource;
  
    export function registerAdapter(adapter: {
      Database: typeof BaseDatabase;
      Resource: typeof BaseResource;
    }): void;
  }