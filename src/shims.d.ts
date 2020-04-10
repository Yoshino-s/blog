declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {

  const content: string;
  export default content;
}

declare module '*.md' {

  const content: string;
  export default content;
}

declare module 'prismjs/plugins/*' {

  const content: object;
  export default object;
}