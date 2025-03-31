# Node-Based Hardware Simulation (NBHS)

## Overview

Node-Based Hardware Simulation (NBHS) is a web-based application for simulating digital logic circuits. It allows users to create, connect, and simulate various logic gates, switches, LEDs, and custom components using a visual, node-based interface. The project is designed to help users understand and experiment with digital logic concepts interactively.

## Features

- **Logic Gates**: Includes AND, OR, NOT, NAND, NOR, XOR, and XNOR gates.
- **Switches and LEDs**: Simulate input switches and output LEDs to visualize circuit behavior.
- **Custom Components**: Create and save custom logic components using truth tables.
- **Wire Connections**: Connect nodes with wires to build circuits.
- **Dynamic Simulation**: Real-time updates of circuit states based on user interactions.

## File Structure

### Key Directories and Files

- **`src/`**: Contains the TypeScript source code for the application.
  - **`Wire.ts`**: Defines the `Wire` class for connecting nodes.
  - **`Switch.ts`**: Implements the `Switch` component.
  - **`NodeElement.ts`**: Base class for all node-based components.
  - **`LogicNode.ts`**: Represents individual input/output nodes of components.
  - **`Board.ts`**: Manages the simulation board and its elements.
  - **`BoardSelector.ts`**: Handles the UI for selecting and adding components.
  - **`Boards/`**: Contains implementations of specific logic gates and components (e.g., AND, OR, LED).
  - **`Globals.ts`**: Defines global variables and utility functions.
  - **`main.ts`**: Entry point for initializing the simulation.
  - **`onload.ts`**: Handles DOM events and canvas resizing.

- **`js/`**: Compiled JavaScript files for the application.

- **`style.css`**: Styles for the application UI.

- **`index.html`**: Main HTML file for the application.

- **`tsconfig.json`**: TypeScript configuration file.

- **`package.json`**: Lists project dependencies.

## Getting Started

### Prerequisites

- **Node.js**: Install Node.js to manage dependencies and compile TypeScript.
- **TypeScript**: Ensure TypeScript is installed globally or locally in the project.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd NBHS-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript to JavaScript:
   ```bash
   npx tsc
   ```

4. Open `index.html` in a browser to run the application.

### Usage

1. Use the **Board Selector** at the bottom of the screen to add components to the board.
2. Drag and drop components to position them on the canvas.
3. Connect components using wires by clicking on their nodes.
4. Toggle switches to simulate input changes and observe the output on LEDs.
5. Save custom components by pressing the `S` key and providing a name.

## Custom Components

You can create custom components by designing circuits and saving them. The application generates a truth table for the circuit and stores it in local storage. These components can be reused in future simulations.

## Development

### Adding New Components

1. Create a new TypeScript file in the `src/Boards/` directory.
2. Extend the `NodeElement` class and define the logic for the new component.
3. Add the new component to the `BoardSelector` in `BoardSelector.ts`.

### Debugging

- Use the browser's developer tools to debug the application.
- Logs are printed to the console for key actions like saving components and resizing the canvas.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Inspired by digital logic simulators and node-based editors.
- Built using TypeScript and HTML5 Canvas.

