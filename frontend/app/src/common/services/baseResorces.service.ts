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
    const index = this.resources().findIndex(
      (resource) => resource.id === post.id
    );

    if (index !== -1) {
      this.resources.set([...this.resources(), post]);
      return;
    }

    this.resources.mutate((resource) => (resource[index] = post));
  };

  protected removeResource = (id: number) => {
    this.resources.mutate((resources) =>
      resources.filter((resource) => resource.id !== id)
    );
  };
}
