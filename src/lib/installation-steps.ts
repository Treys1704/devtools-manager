export interface InstallationStep {
  message: string;
  duration: number;
}

export const getInstallationSteps = (
  framework: 'react' | 'vue',
  cssLibrary: 'tailwind' | 'shadcn' | null
): InstallationStep[] => {
  const steps: InstallationStep[] = [
    { message: 'Creating project directory...', duration: 800 },
    { message: `Installing ${framework} dependencies...`, duration: 2000 },
    { message: 'Setting up TypeScript configuration...', duration: 1000 },
    { message: 'Initializing Git repository...', duration: 500 },
  ];

  if (cssLibrary === 'tailwind') {
    steps.push(
      { message: 'Installing Tailwind CSS...', duration: 1500 },
      { message: 'Configuring Tailwind...', duration: 800 }
    );
  } else if (cssLibrary === 'shadcn') {
    steps.push(
      { message: 'Installing Tailwind CSS...', duration: 1500 },
      { message: 'Installing shadcn/ui dependencies...', duration: 2000 },
      { message: 'Configuring shadcn/ui...', duration: 1000 }
    );
  }

  steps.push({ message: 'Finalizing project setup...', duration: 1000 });

  return steps;
};