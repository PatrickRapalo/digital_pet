// CodeBuddy Main - Application Orchestration

class App {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        // Initialize coding buddy with pet element
        const petElement = document.getElementById('pet');
        codingBuddy.init(petElement);

        // Initialize UI
        ui.init();

        // Make instances globally accessible
        window.app = this;
        window.ui = ui;
        window.codingBuddy = codingBuddy;
        window.codeRunner = codeRunner;
        window.aiHelper = aiHelper;

        // Always start at home menu
        ui.showHomeMenu();

        // Update AI button visibility
        ui.updateAIButtonVisibility();

        this.initialized = true;

        console.log('CodeBuddy initialized!');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

// Prevent accidental navigation away
window.addEventListener('beforeunload', (e) => {
    const codeEditor = document.getElementById('code-editor');
    if (codeEditor && codeEditor.value.trim()) {
        // Only warn if there's code in the editor
        // Note: Modern browsers may not show custom message
        e.preventDefault();
        e.returnValue = '';
    }
});
