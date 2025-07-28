# About this Project

This project serves as a template for the `Next` plus `Tailwind` stack for You_Source and SaaSVP.

# Getting started

#### 1. After cloning, install the dependencies by running `npm install` in the root directory. Do this everytime there's a new dependency that was added.

#### 2. Recommended VS Code extensions

- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

#### 3. Auto-formatting code with Prettier plugin

- to check for code formatting issues, run `npm run check-format`
- to auto-fix the issue, run `npm run fix-format`. few of the things this does are
  - auto-sort tailwind classes by specifity
  - enfore semicolon in js, jsx, ts, tsx
  - enfore single-quotes instead of double-quotes for string declarations
  - and other ES Lint standards

#### 4. To visualize the components, pages, and other ui elements using Storybook

- run `npm run storybook`
- this will spin-up a local app in `http://localhost:6006` that will list up all ui elements provided with a [story](https://storybook.js.org/docs/react/get-started/whats-a-story)
- refer to this guide to know how to browse the stories
- do `ctrl + C` on the CLI to terminate the storybook app

# Code Style

This section serves as a guide for developers in building their custom components using TailwindCSS and NextJS

- We currently use the `kebab naming convention` for components
- When creating components make sure you have `.stories.tsx` file to be rendered in storybook
- When creating core components: `src/components/core/`
  - `button.tsx`
  - `button.stories.tsx`
- When creating custom components: `src/components/custom/`
  - `custom-button.tsx`
  - `custom-button.stories.tsx`
- When creating components with multiple children we can create subfolders within the components
  - `/core/nav/side-nav/side-nav.tsx`
  - `/core/nav/side-nav/side-nav.stories.tsx`
  - `/core/nav/side-nav/nav-item/nav-item.tsx`
  - `/core/nav/side-nav/nav-item/nav-item.stories.tsx`
- The content of the .tsx file should follow the standard sequence.
  1.  **Variants**
  - `const buttonVariants = cva(''...`
  2.  **Props**
  - `interface ButtonProps extends VariantProps<typeof...`
  3.  **Component**
  - `const Button: React.FC<ButtonProps> = ({...`
- All parts of the code that can individually be styled should have their own CVA variants
  - `<div className={ containerVariants({ intent })}...`
- Stories should have the following title format to be foldered correctly.
  - `title: 'Components/Core/Button'`
- `argTypes` section should consists of property that can be styled.
  - Ex. `intent, fullWidth, size, disabled, nolabel etc...`
- `args` should be specified to set the default value on Storybook documentations
- Create multiple `Story` in the stories file if there are multiple styling options
