import { useState } from "react";
import { createProjectWithVite } from "@/lib/project-creator";
import { getInstallationSteps } from "@/lib/installation-steps";

type TerminalState =
  | "initial"
  | "menu"
  | "framework-selection"
  | "project-name"
  | "css-library"
  | "css-library-selection"
  | "installing";

export function useTerminalCommands() {
  const [currentState, setCurrentState] = useState<TerminalState>("initial");
  const [selectedFramework, setSelectedFramework] = useState<
    "react" | "vue" | null
  >(null);
  const [projectName, setProjectName] = useState<string>("");
  const [cssLibrary] = useState<"tailwind" | "shadcn" | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const simulateInstallation = async (
    framework: "react" | "vue",
    cssLibrary: "tailwind" | "shadcn" | null
  ): Promise<void> => {
    const steps = getInstallationSteps(framework, cssLibrary);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration));
    }
  };

  const handleCommand = async (command: string): Promise<string> => {
    if (command.trim().toLocaleLowerCase() === "clear") {
      setCurrentState("initial");
    }

    switch (currentState) {
      case "initial":
        if (command.toLowerCase() === "devtools start") {
          setCurrentState("menu");
          return `
🚀 Welcome to DevTools Manager Menu:
1. Install development tools ·
2. Exit
-
Choose an option (1-2):`;
        }
        return '❌ Invalid command. Type "devtools start" to begin.';

      case "menu":
        switch (command) {
          case "1":
            setCurrentState("framework-selection");
            return `
📦 Select a framework:
1. React ·
2. Vue
-
Choose an option (1-2):`;
          case "2":
            setCurrentState("initial");
            return "Goodbye 👋! Thank you for using DevTools Manager.";
          default:
            return "❌ Invalid option. Please choose 1 or 2.";
        }

      case "framework-selection":
        if (["1", "2"].includes(command)) {
          setSelectedFramework(command === "1" ? "react" : "vue");
          setCurrentState("project-name");
          return "\n📝 Enter your project name:";
        }
        return "❌ Invalid option. Please choose 1 or 2.";

      case "project-name":
        if (command.trim()) {
          setProjectName(command.trim());
          setCurrentState("css-library");
          return `
🎨 Would you like to install a CSS library?
1. Yes ·
2. No
-
Choose an option (1-2):`;
        }
        return "Please enter a valid project name.";

      case "css-library":
        if (["1", "2"].includes(command)) {
          if (command === "1") {
            setCurrentState("css-library-selection");
            return `
💅 Select a CSS library:
1. Tailwind CSS ·
2. Shadcn/ui
-
Choose an option (1-2):`;
          } else {
            setCurrentState("installing");
            await simulateInstallation(selectedFramework!, null);
            const result = await createProjectWithVite({
              framework: selectedFramework!,
              projectName,
              cssLibrary: null,
            });
            setCurrentState("initial");
            return `${result}\n\n📋 Next steps:
1. Extract the downloaded zip file ·
2. Navigate to the project directory: cd ${projectName} ·
3. Install dependencies: npm install ·
4. Start the development server: npm run dev`;
          }
        }
        return "❌ Invalid option. Please choose 1 or 2.";

      case "css-library-selection":
        if (["1", "2"].includes(command)) {
          const selectedCssLibrary = command === "1" ? "tailwind" : "shadcn";
          setCurrentState("installing");
          await simulateInstallation(selectedFramework!, selectedCssLibrary);
          const result = await createProjectWithVite({
            framework: selectedFramework!,
            projectName,
            cssLibrary: selectedCssLibrary,
          });
          setCurrentState("initial");
          const additionalSteps =
            selectedCssLibrary === "shadcn"
              ? `\n4. Initialize Shadcn/ui: npx shadcn${
                  selectedFramework === "react" ? "" : "-vue"
                }@latest init`
              : "";
          return `${result}\n\nNext steps:
1. Extract the downloaded zip file ·
2. Navigate to the project directory: cd ${projectName} ·
3. Install dependencies: npm install ·
${additionalSteps}
${selectedCssLibrary === "shadcn" ? "· 5" : "4"}. Start the development server: npm run dev`;
        }
        return "❌ Invalid option. Please choose 1 or 2.";

      default:
        return "Unknown command.";
    }
  };

  return {
    handleCommand,
    currentState,
    currentStep,
    selectedFramework,
    cssLibrary,
  };
}
