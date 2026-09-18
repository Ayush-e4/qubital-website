/**
 * The shape every locale dictionary must satisfy.
 *
 * Derived from the English dictionary, which is the source of truth. Because
 * each other locale is annotated with this type, adding a key to `en` makes
 * every other locale fail to type-check until it is translated too, and
 * removing a key is caught as well. That is the whole point of #17: a missing
 * translation should be a build error, not a blank string in production.
 */
export type Dictionary = typeof import('./locales/en').default;
