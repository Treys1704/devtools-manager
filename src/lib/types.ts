export interface ProjectConfig {
  framework: 'react' | 'vue';
  projectName: string;
  cssLibrary: 'tailwind' | 'shadcn' | null;
}