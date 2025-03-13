// plugins/agGrid.js

// Import AG Grid Community Modules
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default {
  install(app) {
    // This is where you could set up other AG Grid-related configurations
    // If you need to do anything specific here, you can add it as well.
    console.log('AG Grid has been registered');
  }
}
