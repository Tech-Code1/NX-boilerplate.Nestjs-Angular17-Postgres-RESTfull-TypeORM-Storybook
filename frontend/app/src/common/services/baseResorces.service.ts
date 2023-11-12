import { Injectable, signal } from '@angular/core';

interface IResourceBaseObject {
  id?: number;
}

type ResourceType<T> = T & IResourceBaseObject;

@Injectable({
  providedIn: 'root',
})
export class ResourceService<T> {
  resources = signal<ResourceType<T>[]>([]);

  // * common stock manager with: GET, POST, PUT, DELETE

  protected setResource = (resources: ResourceType<T>[]) => {
    this.resources.set(resources);
  };

  protected insertResource = (post: ResourceType<T>) => {
    this.resources.update((resources) => {
      const index = resources.findIndex((resource) => resource.id === post.id);

      if (index !== -1) {
        // Reemplaza el elemento en la posición encontrada
        resources[index] = post;
      } else {
        // Agrega el nuevo elemento si no se encontró
        resources.push(post);
      }

      // Devuelve el array actualizado
      return resources;
    });
  };

  protected removeResource = (id: number) => {
    this.resources.update((resources) =>
      resources.filter((resource) => resource.id !== id)
    );
  };
}
