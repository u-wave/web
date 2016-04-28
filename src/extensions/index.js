import extension from './extension';

export default function createExtensions(store) {
  return extension(store, 'main', main => {
    main.extension = extension.bind(null, store);
  });
}
