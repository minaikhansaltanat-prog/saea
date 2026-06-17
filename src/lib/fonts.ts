// Fonts are self-hosted via @fontsource (local npm package files, no runtime/build-time
// network fetch required) because this environment's network does not allow reaching
// fonts.googleapis.com at build time. The actual @font-face declarations are imported
// as a side effect from src/app/[locale]/layout.tsx; this module just documents which
// packages back the --font-heading / --font-body / --font-kkarab CSS variables defined
// in globals.css:
//   --font-heading -> @fontsource/plus-jakarta-sans (weights 500/600/700/800)
//   --font-body    -> @fontsource/inter (weights 400/500/600/700)
//   --font-kkarab   -> @fontsource/noto-naskh-arabic (weights 400/500/600/700)
export {};
