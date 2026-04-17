// This file tells TypeScript how to handle CSS imports
declare module '*.css' {
  const content: string;
  export default content;
}