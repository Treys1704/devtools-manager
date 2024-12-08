# DevTools Manager 🚀

DevTools Manager is an interactive CLI tool that helps you quickly create and set up new web development projects with modern tooling and best practices.

## Features ✨

- Interactive CLI interface
- Support for multiple frameworks (React, Vue)
- CSS library integration (Tailwind CSS, shadcn/ui)
- TypeScript configuration
- Modern development setup with Vite
- Beautiful terminal UI with real-time feedback

## Getting Started 🎯

1. Open the application in your browser
2. Type `npm start devtools` to begin
3. Follow the interactive prompts to create your project:
   - Choose your framework (React/Vue)
   - Enter your project name
   - Select CSS library options
   - Wait for the project to be created and downloaded

## Project Creation Process 📝

1. **Start the Tool**
   ```bash
   npm start devtools
   ```

2. **Main Menu**
   - Choose option 1 to install development tools
   - Choose option 2 to exit

3. **Framework Selection**
   - Option 1: React
   - Option 2: Vue

4. **Project Configuration**
   - Enter your project name
   - Choose whether to include a CSS library
   - Select between Tailwind CSS and shadcn/ui (if opted for a CSS library)

5. **Installation**
   - The tool will create your project with all selected options
   - A zip file will be downloaded containing your project

6. **Next Steps**
   After downloading your project:
   1. Extract the zip file
   2. Navigate to the project directory
   3. Install dependencies: `npm install`
   4. Start the development server: `npm run dev`
   5. If you selected shadcn/ui, run: `npx shadcn-ui@latest init`

## Available Options 🛠️

### Frameworks
- **React**: Modern web applications with React 18
- **Vue**: Progressive framework for building user interfaces

### CSS Libraries
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Re-usable components built with Radix UI and Tailwind CSS

## Features Included 📦

- TypeScript configuration
- Modern bundling with Vite
- Path aliases (@/ for src directory)
- ESLint configuration
- Proper project structure
- Development server with hot reload
- Production build setup

## Project Structure 📁

```
your-project/
├── src/
│   ├── components/
│   ├── assets/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Support 💬

For any issues or questions, please open an issue in the repository.

## 📫 Contact
For any question, you can contact me :
- Tresor Manock - [LinkedIn](https://www.linkedin.com/in/tr%C3%A9sormanock/)

## License 📄

MIT License - feel free to use this tool for any of your projects!

---

Made with ❤️ by Tresor Manock