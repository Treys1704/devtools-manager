import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getTsConfig } from './config-templates';
import { getReactTemplate } from './templates/react';
import { getVueTemplate } from './templates/vue';
import { getTailwindConfig } from './templates/css';
import type { ProjectConfig } from './types';
import { toast } from 'sonner';

export async function createProjectWithVite(config: ProjectConfig): Promise<string> {
  try {
    const zip = new JSZip();
    
    // Get base template based on framework
    const template = config.framework === 'react' 
      ? getReactTemplate(config.projectName)
      : getVueTemplate(config.projectName);
    
    // Add base template files to zip
    for (const [path, content] of Object.entries(template)) {
      zip.file(path, content);
    }
    
    // Add TypeScript configuration
    const tsConfig = getTsConfig(config.framework, config.cssLibrary);
    for (const [path, content] of Object.entries(tsConfig)) {
      zip.file(path, content);
    }
    
    // Get the package.json content as an object
    const packageJson = JSON.parse(template['package.json']);
    
    // Add CSS library if selected
    if (config.cssLibrary === 'tailwind') {
      const tailwindFiles = getTailwindConfig(config.framework);
      for (const [path, content] of Object.entries(tailwindFiles)) {
        zip.file(path, content);
      }
      
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'tailwindcss': '^3.3.3',
        'postcss': '^8.4.27',
        'autoprefixer': '^10.4.14'
      };
    } else if (config.cssLibrary === 'shadcn') {
      const tailwindFiles = getTailwindConfig(config.framework);
      for (const [path, content] of Object.entries(tailwindFiles)) {
        zip.file(path, content);
      }
      
      packageJson.dependencies = {
        ...packageJson.dependencies,
        'class-variance-authority': '^0.7.0',
        'clsx': '^2.0.0',
        'tailwind-merge': '^1.14.0',
        'lucide-react': '^0.263.1'
      };
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@types/node': '^20.11.0',
        'tailwindcss': '^3.3.3',
        'postcss': '^8.4.27',
        'autoprefixer': '^10.4.14',
        'tailwindcss-animate': '^1.0.6'
      };
    }
    
    // Create public directory with default Vite favicon
    zip.file('public/vite.svg', `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>`);
    
    zip.file('package.json', JSON.stringify(packageJson, null, 2));
    
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${config.projectName}.zip`);

    toast.success('Project created and downloaded successfully!', {
      duration: 3000,
    });
    
    return '';
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project. Please try again.');
  }
}