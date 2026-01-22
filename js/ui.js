// CodeBuddy UI Management

class UI {
    constructor() {
        this.elements = {};
        this.currentModule = null;
        this.currentLesson = null;
        this.hintIndex = 0;
        this.lessonPassed = false;
        this.selectedTrack = 'javascript';
    }

    init() {
        this.cacheElements();
        this.bindEvents();
    }

    // Cache DOM elements
    cacheElements() {
        this.elements = {
            // Home Menu
            homeMenu: document.getElementById('home-menu'),
            homePet: document.getElementById('home-pet'),
            homePetName: document.getElementById('home-pet-name'),
            homeCreatureSelection: document.getElementById('home-creature-selection'),
            trackCards: document.querySelectorAll('.track-card'),
            homeStats: document.getElementById('home-stats'),
            homeLevel: document.getElementById('home-level'),
            homeLessons: document.getElementById('home-lessons'),
            homeStreak: document.getElementById('home-streak'),
            homeXP: document.getElementById('home-xp'),
            startLearningHome: document.getElementById('start-learning-home'),

            // Header
            appHeader: document.getElementById('app-header'),
            homeBtn: document.getElementById('home-btn'),
            currentTrackBadge: document.getElementById('current-track-badge'),
            currentLevel: document.getElementById('current-level'),
            xpBar: document.getElementById('xp-bar'),
            currentXP: document.getElementById('current-xp'),
            xpNeeded: document.getElementById('xp-needed'),
            settingsBtn: document.getElementById('settings-btn'),

            // Main Content
            mainContent: document.getElementById('main-content'),
            actionBar: document.getElementById('action-bar'),

            // Lesson Panel
            modulesToggle: document.getElementById('modules-toggle'),
            toggleIcon: document.getElementById('toggle-icon'),
            modulesList: document.getElementById('modules-list'),
            lessonTitle: document.getElementById('lesson-title'),
            lessonXP: document.getElementById('lesson-xp'),
            lessonDescription: document.getElementById('lesson-description'),
            lessonInstructions: document.getElementById('lesson-instructions'),

            // Editor Panel
            codeEditor: document.getElementById('code-editor'),
            outputConsole: document.getElementById('output-console'),
            clearOutputBtn: document.getElementById('clear-output-btn'),
            languageBadge: document.getElementById('language-badge'),

            // Pet Sidebar
            pet: document.getElementById('pet'),
            buddyName: document.getElementById('buddy-name'),
            buddyTitle: document.getElementById('buddy-title'),
            knowledgeBar: document.getElementById('knowledge-bar'),
            happinessBar: document.getElementById('happiness-bar'),
            streakBar: document.getElementById('streak-bar'),
            streakCount: document.getElementById('streak-count'),
            chatBubble: document.getElementById('chat-bubble'),
            buddyMessage: document.getElementById('buddy-message'),
            achievementsList: document.getElementById('achievements-list'),

            // Action Bar
            runBtn: document.getElementById('run-btn'),
            hintBtn: document.getElementById('hint-btn'),
            nextBtn: document.getElementById('next-btn'),
            askAIBtn: document.getElementById('ask-ai-btn'),

            // Modals
            settingsModal: document.getElementById('settings-modal'),
            welcomeModal: document.getElementById('welcome-modal'),
            askAIModal: document.getElementById('ask-ai-modal'),

            // Settings
            closeSettings: document.getElementById('close-settings'),
            creatureSelection: document.getElementById('creature-selection'),
            buddyNameInput: document.getElementById('buddy-name-input'),
            aiProvider: document.getElementById('ai-provider'),
            apiKeyInput: document.getElementById('api-key-input'),
            resetProgressBtn: document.getElementById('reset-progress-btn'),
            saveSettingsBtn: document.getElementById('save-settings-btn'),

            // Welcome
            welcomeCreatureSelection: document.getElementById('welcome-creature-selection'),
            welcomeNameInput: document.getElementById('welcome-name-input'),
            startLearningBtn: document.getElementById('start-learning-btn'),

            // AI Chat
            closeAskAI: document.getElementById('close-ask-ai'),
            aiChatHistory: document.getElementById('ai-chat-history'),
            aiQuestionInput: document.getElementById('ai-question-input'),
            sendAIQuestion: document.getElementById('send-ai-question')
        };
    }

    // Bind event listeners
    bindEvents() {
        // Home Menu - Creature selection
        this.elements.homeCreatureSelection.querySelectorAll('.creature-option').forEach(option => {
            option.addEventListener('click', () => {
                this.elements.homeCreatureSelection.querySelectorAll('.creature-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                this.updateHomePetPreview(option.dataset.creature);
            });
        });

        // Home Menu - Track selection
        this.elements.trackCards.forEach(card => {
            card.addEventListener('click', () => {
                this.elements.trackCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.selectedTrack = card.dataset.track;
            });
        });

        // Home Menu - Start learning button
        this.elements.startLearningHome.addEventListener('click', () => this.startFromHome());

        // Home button in header
        this.elements.homeBtn.addEventListener('click', () => this.showHomeMenu());

        // Modules toggle
        this.elements.modulesToggle.addEventListener('click', () => this.toggleModules());

        // Action buttons
        this.elements.runBtn.addEventListener('click', () => this.runCode());
        this.elements.hintBtn.addEventListener('click', () => this.showHint());
        this.elements.nextBtn.addEventListener('click', () => this.nextLesson());
        this.elements.clearOutputBtn.addEventListener('click', () => this.clearOutput());

        // Settings
        this.elements.settingsBtn.addEventListener('click', () => this.openSettings());
        this.elements.closeSettings.addEventListener('click', () => this.closeSettings());
        this.elements.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.elements.resetProgressBtn.addEventListener('click', () => this.confirmReset());

        // AI provider selection
        this.elements.aiProvider.addEventListener('change', (e) => {
            this.elements.apiKeyInput.style.display = e.target.value ? 'block' : 'none';
        });

        // Welcome modal
        this.elements.startLearningBtn.addEventListener('click', () => this.startLearning());

        // Creature selection (settings)
        this.elements.creatureSelection.querySelectorAll('.creature-option').forEach(option => {
            option.addEventListener('click', () => {
                this.elements.creatureSelection.querySelectorAll('.creature-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        // Creature selection (welcome)
        this.elements.welcomeCreatureSelection.querySelectorAll('.creature-option').forEach(option => {
            option.addEventListener('click', () => {
                this.elements.welcomeCreatureSelection.querySelectorAll('.creature-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        // AI chat
        if (this.elements.askAIBtn) {
            this.elements.askAIBtn.addEventListener('click', () => this.openAIChat());
        }
        this.elements.closeAskAI.addEventListener('click', () => this.closeAIChat());
        this.elements.sendAIQuestion.addEventListener('click', () => this.sendAIQuestion());
        this.elements.aiQuestionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendAIQuestion();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to run code
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    }

    // Update home pet preview when creature is selected
    updateHomePetPreview(creature) {
        const creatureTypes = ['blob', 'cat', 'bunny', 'alien', 'dragon'];
        creatureTypes.forEach(type => {
            this.elements.homePet.classList.remove(type);
        });
        this.elements.homePet.classList.add(creature);
    }

    // Show home menu
    showHomeMenu() {
        this.elements.homeMenu.classList.remove('hidden');
        this.elements.appHeader.classList.add('hidden');
        this.elements.mainContent.classList.add('hidden');
        this.elements.actionBar.classList.add('hidden');

        // Update home stats if returning user
        this.updateHomeStats();
    }

    // Show learning view
    showLearningView() {
        this.elements.homeMenu.classList.add('hidden');
        this.elements.appHeader.classList.remove('hidden');
        this.elements.mainContent.classList.remove('hidden');
        this.elements.actionBar.classList.remove('hidden');
    }

    // Update home menu stats for returning users
    updateHomeStats() {
        if (!codingBuddy.isNewUser()) {
            const stats = codingBuddy.getStats();
            this.elements.homeStats.style.display = 'block';
            this.elements.homeLevel.textContent = stats.level;
            this.elements.homeLessons.textContent = stats.lessonsCompleted;
            this.elements.homeStreak.textContent = stats.dayStreak;
            this.elements.homeXP.textContent = stats.totalXP;

            // Pre-select the user's creature
            this.elements.homeCreatureSelection.querySelectorAll('.creature-option').forEach(o => {
                o.classList.toggle('selected', o.dataset.creature === stats.creature);
            });
            this.updateHomePetPreview(stats.creature);
            this.elements.homePetName.value = stats.name;

            // Pre-select the user's track
            const savedTrack = codingBuddy.data.currentTrack || 'javascript';
            this.selectedTrack = savedTrack;
            this.elements.trackCards.forEach(card => {
                card.classList.toggle('selected', card.dataset.track === savedTrack);
            });
        }
    }

    // Start learning from home menu
    startFromHome() {
        // Get selected creature
        const selectedCreature = this.elements.homeCreatureSelection.querySelector('.creature-option.selected');
        const creature = selectedCreature ? selectedCreature.dataset.creature : 'blob';

        // Get name
        const name = this.elements.homePetName.value.trim() || 'CodeBuddy';

        // Save settings
        codingBuddy.setName(name);
        codingBuddy.setCreature(creature);
        codingBuddy.setTrack(this.selectedTrack);
        codingBuddy.save();

        // Set codeRunner language
        codeRunner.setLanguage(this.selectedTrack === 'cpp' ? 'cpp' : this.selectedTrack);

        // Update language badge
        const track = getTrack(this.selectedTrack);
        this.elements.languageBadge.textContent = track.name;
        this.elements.currentTrackBadge.textContent = track.name;
        this.elements.currentTrackBadge.setAttribute('data-track', this.selectedTrack);

        // Show learning view
        this.showLearningView();

        // Render modules for selected track
        this.renderModules();

        // Load first incomplete lesson
        this.loadProgressForTrack();

        // Update stats
        this.updateStats();

        // Greet user
        this.setBuddyMessage(`Let's learn ${track.name}! I'm so excited!`);
        codingBuddy.animate('celebrating');
    }

    // Load progress for current track
    loadProgressForTrack() {
        const curriculum = getCurrentCurriculum();

        // Find first incomplete lesson
        for (const module of curriculum.modules) {
            for (const lesson of module.lessons) {
                if (!codingBuddy.isLessonCompleted(module.id, lesson.id)) {
                    this.loadLesson(module.id, lesson.id);
                    return;
                }
            }
        }

        // All complete - load first lesson
        if (curriculum.modules.length > 0 && curriculum.modules[0].lessons.length > 0) {
            this.loadLesson(curriculum.modules[0].id, curriculum.modules[0].lessons[0].id);
        }
    }

    // Render module list
    renderModules() {
        this.elements.modulesList.innerHTML = '';
        const curriculum = getCurrentCurriculum();

        curriculum.modules.forEach(module => {
            const completed = codingBuddy.getModuleProgress(module.id);
            const total = module.lessons.length;
            const isComplete = completed === total;

            const div = document.createElement('div');
            div.className = `module-item ${isComplete ? 'completed' : ''} ${this.currentModule === module.id ? 'active' : ''}`;
            div.innerHTML = `
                <div class="module-icon">${isComplete ? '&#10003;' : module.icon}</div>
                <div class="module-info">
                    <div class="module-title">${module.title}</div>
                    <div class="module-progress">${completed}/${total} lessons</div>
                </div>
            `;

            div.addEventListener('click', () => this.selectModule(module.id));
            this.elements.modulesList.appendChild(div);
        });
    }

    // Toggle modules list visibility
    toggleModules() {
        this.elements.modulesList.classList.toggle('collapsed');
        this.elements.toggleIcon.classList.toggle('collapsed');
    }

    // Select a module
    selectModule(moduleId) {
        this.currentModule = moduleId;
        const module = getModule(moduleId);

        if (!module) return;

        // Find first incomplete lesson, or first lesson if all complete
        let targetLesson = module.lessons[0];
        for (const lesson of module.lessons) {
            if (!codingBuddy.isLessonCompleted(moduleId, lesson.id)) {
                targetLesson = lesson;
                break;
            }
        }

        this.loadLesson(moduleId, targetLesson.id);
        this.renderModules();
    }

    // Load a specific lesson
    loadLesson(moduleId, lessonId) {
        const lesson = getLesson(moduleId, lessonId);
        if (!lesson) return;

        this.currentModule = moduleId;
        this.currentLesson = lessonId;
        this.hintIndex = 0;
        this.lessonPassed = codingBuddy.isLessonCompleted(moduleId, lessonId);

        // Update lesson panel
        this.elements.lessonTitle.textContent = lesson.title;
        this.elements.lessonXP.textContent = this.lessonPassed ? 'Completed' : `+${lesson.xpReward} XP`;
        this.elements.lessonXP.style.background = this.lessonPassed ? 'var(--success-color)' : 'var(--primary-color)';
        this.elements.lessonDescription.textContent = lesson.description;
        this.elements.lessonInstructions.innerHTML = lesson.instructions;

        // Update code editor
        this.elements.codeEditor.value = lesson.starterCode || '';

        // Clear output
        this.clearOutput();

        // Update buttons
        this.elements.nextBtn.disabled = !this.lessonPassed;

        // Update buddy message
        const messageType = this.lessonPassed ? 'correct' : 'lessonStart';
        this.setBuddyMessage(lesson.buddyMessages?.start || codingBuddy.getMessage(messageType));

        // Collapse modules list to show lesson content
        this.elements.modulesList.classList.add('collapsed');
        this.elements.toggleIcon.classList.add('collapsed');

        // Update modules list
        this.renderModules();
    }

    // Run the code
    runCode() {
        const code = this.elements.codeEditor.value;
        const lesson = getLesson(this.currentModule, this.currentLesson);

        if (!code.trim()) {
            this.showOutput('Please write some code first!', true);
            return;
        }

        // Show thinking animation
        codingBuddy.animate('thinking');
        this.setBuddyMessage(codingBuddy.getMessage('thinking'));

        // Small delay for effect
        setTimeout(() => {
            // Validate code
            const result = codeRunner.validate(code, lesson.validation);

            // Display output
            this.showOutput(result.output || '(No output)');

            if (result.passed) {
                // Success!
                const prevHappiness = codingBuddy.data.happiness;
                const wasSad = prevHappiness < 60;

                codingBuddy.recordAttempt(true);

                // Complete lesson if first time
                const isFirstCompletion = codingBuddy.completeLesson(
                    this.currentModule,
                    this.currentLesson,
                    lesson.xpReward
                );

                if (isFirstCompletion) {
                    this.showOutput(result.output + '\n\n Correct! +' + lesson.xpReward + ' XP');
                    this.checkAchievements();
                } else {
                    this.showOutput(result.output + '\n\n Correct!');
                }

                this.lessonPassed = true;
                this.elements.nextBtn.disabled = false;

                // Buddy celebration - show recovery message if was sad
                if (wasSad && codingBuddy.data.happiness >= 60) {
                    this.setBuddyMessage(codingBuddy.getMessage('happyAgain'));
                } else {
                    this.setBuddyMessage(lesson.buddyMessages?.success || codingBuddy.getMessage('correct'));
                }

                // Check for streak message
                if (codingBuddy.data.currentStreak >= 3) {
                    setTimeout(() => {
                        this.setBuddyMessage(codingBuddy.getMessage('streak') + ` (${codingBuddy.data.currentStreak} in a row!)`);
                    }, 2000);
                }
            } else {
                // Incorrect
                const prevHappiness = codingBuddy.data.happiness;
                codingBuddy.recordAttempt(false);

                this.showOutput(result.message || 'Not quite right. Try again!', true);

                // Show mood-appropriate message
                if (codingBuddy.data.happiness < 30) {
                    this.setBuddyMessage(codingBuddy.getMessage('verySad'));
                } else if (codingBuddy.data.happiness < 60) {
                    this.setBuddyMessage(codingBuddy.getMessage('sad'));
                } else {
                    this.setBuddyMessage(lesson.buddyMessages?.error || codingBuddy.getMessage('incorrect'));
                }
            }

            // Update UI
            this.updateStats();
        }, 300);
    }

    // Show output in console
    showOutput(text, isError = false) {
        this.elements.outputConsole.textContent = text;
        this.elements.outputConsole.classList.toggle('error', isError);
    }

    // Clear output
    clearOutput() {
        this.elements.outputConsole.textContent = '';
        this.elements.outputConsole.classList.remove('error');
    }

    // Show hint
    showHint() {
        const lesson = getLesson(this.currentModule, this.currentLesson);
        if (!lesson || !lesson.hints || lesson.hints.length === 0) {
            this.setBuddyMessage("I don't have any hints for this one!");
            return;
        }

        const hint = lesson.hints[this.hintIndex];
        this.hintIndex = (this.hintIndex + 1) % lesson.hints.length;

        codingBuddy.useHint();

        this.setBuddyMessage(`Hint: ${hint}`);
        codingBuddy.animate('thinking');
    }

    // Go to next lesson
    nextLesson() {
        const next = getNextLesson(this.currentModule, this.currentLesson);

        if (next) {
            this.loadLesson(next.moduleId, next.lessonId);
        } else {
            this.setBuddyMessage("Congratulations! You've completed all the lessons!");
            codingBuddy.animate('celebrating');
        }
    }

    // Set buddy message
    setBuddyMessage(message) {
        this.elements.buddyMessage.textContent = message;
    }

    // Update all stats displays
    updateStats() {
        const stats = codingBuddy.getStats();

        // Header
        this.elements.currentLevel.textContent = stats.level;
        this.elements.xpBar.style.width = `${(stats.xp / stats.xpNeeded) * 100}%`;
        this.elements.currentXP.textContent = stats.xp;
        this.elements.xpNeeded.textContent = stats.xpNeeded;

        // Sidebar
        this.elements.buddyName.textContent = stats.name;
        this.elements.buddyTitle.textContent = stats.title;
        this.elements.knowledgeBar.style.width = `${stats.knowledge}%`;
        this.elements.happinessBar.style.width = `${stats.happiness}%`;

        // Update happiness bar color based on mood
        this.elements.happinessBar.classList.remove('sad', 'very-sad');
        if (stats.happiness < 30) {
            this.elements.happinessBar.classList.add('very-sad');
        } else if (stats.happiness < 60) {
            this.elements.happinessBar.classList.add('sad');
        }

        this.elements.streakBar.style.width = `${Math.min(stats.currentStreak * 10, 100)}%`;
        this.elements.streakCount.textContent = stats.dayStreak;

        // Achievements
        this.renderAchievements();

        // Modules
        this.renderModules();
    }

    // Render achievements
    renderAchievements() {
        this.elements.achievementsList.innerHTML = '';

        const recentAchievements = codingBuddy.data.achievements.slice(-5);
        const displayAchievements = recentAchievements.length > 0 ? recentAchievements : ['locked', 'locked', 'locked'];

        displayAchievements.forEach(achId => {
            const ach = ACHIEVEMENTS[achId];
            const div = document.createElement('div');
            div.className = `achievement-badge ${ach ? '' : 'locked'}`;
            div.innerHTML = ach ? ach.icon : '?';
            div.title = ach ? `${ach.name}: ${ach.description}` : 'Locked';
            this.elements.achievementsList.appendChild(div);
        });
    }

    // Check for new achievements
    checkAchievements() {
        const stats = codingBuddy.getStats();

        // First lesson
        if (stats.lessonsCompleted === 1) {
            if (codingBuddy.addAchievement('firstLesson')) {
                this.showAchievementNotification(ACHIEVEMENTS.firstLesson);
            }
        }

        // 5 streak
        if (codingBuddy.data.currentStreak >= 5) {
            if (codingBuddy.addAchievement('fiveStreak')) {
                this.showAchievementNotification(ACHIEVEMENTS.fiveStreak);
            }
        }

        // 10 lessons
        if (stats.lessonsCompleted >= 10) {
            if (codingBuddy.addAchievement('tenLessons')) {
                this.showAchievementNotification(ACHIEVEMENTS.tenLessons);
            }
        }

        // Level 5
        if (stats.level >= 5) {
            if (codingBuddy.addAchievement('levelFive')) {
                this.showAchievementNotification(ACHIEVEMENTS.levelFive);
            }
        }

        // Level 10
        if (stats.level >= 10) {
            if (codingBuddy.addAchievement('levelTen')) {
                this.showAchievementNotification(ACHIEVEMENTS.levelTen);
            }
        }

        // 7 day streak
        if (stats.dayStreak >= 7) {
            if (codingBuddy.addAchievement('weekStreak')) {
                this.showAchievementNotification(ACHIEVEMENTS.weekStreak);
            }
        }

        // Module complete
        const curriculum = getCurrentCurriculum();
        curriculum.modules.forEach(module => {
            const progress = codingBuddy.getModuleProgress(module.id);
            if (progress === module.lessons.length) {
                if (codingBuddy.addAchievement('moduleComplete')) {
                    this.showAchievementNotification(ACHIEVEMENTS.moduleComplete);
                }
            }
        });

        // All lessons
        if (stats.lessonsCompleted === stats.totalLessons) {
            if (codingBuddy.addAchievement('allLessons')) {
                this.showAchievementNotification(ACHIEVEMENTS.allLessons);
            }
        }
    }

    // Show achievement notification
    showAchievementNotification(achievement) {
        this.setBuddyMessage(`Achievement Unlocked: ${achievement.name}!`);
        codingBuddy.animate('celebrating');
    }

    // Open settings modal
    openSettings() {
        const stats = codingBuddy.getStats();

        // Populate current values
        this.elements.buddyNameInput.value = stats.name;

        // Select current creature
        this.elements.creatureSelection.querySelectorAll('.creature-option').forEach(option => {
            option.classList.toggle('selected', option.dataset.creature === stats.creature);
        });

        // Load AI settings
        const aiConfig = aiHelper.getConfig();
        this.elements.aiProvider.value = aiConfig.provider || '';
        this.elements.apiKeyInput.value = aiConfig.apiKey || '';
        this.elements.apiKeyInput.style.display = aiConfig.provider ? 'block' : 'none';

        this.elements.settingsModal.classList.remove('hidden');
    }

    // Close settings modal
    closeSettings() {
        this.elements.settingsModal.classList.add('hidden');
    }

    // Save settings
    saveSettings() {
        // Save buddy name
        const name = this.elements.buddyNameInput.value.trim();
        if (name) {
            codingBuddy.setName(name);
        }

        // Save creature
        const selectedCreature = this.elements.creatureSelection.querySelector('.creature-option.selected');
        if (selectedCreature) {
            codingBuddy.setCreature(selectedCreature.dataset.creature);
        }

        // Save AI config
        aiHelper.setConfig({
            provider: this.elements.aiProvider.value,
            apiKey: this.elements.apiKeyInput.value
        });

        // Update AI button visibility
        this.updateAIButtonVisibility();

        this.updateStats();
        this.closeSettings();
    }

    // Confirm reset progress
    confirmReset() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            codingBuddy.reset();
            aiHelper.clearConfig();
            this.updateStats();
            this.closeSettings();

            // Show home menu to start fresh
            this.showHomeMenu();

            this.setBuddyMessage("Fresh start! Let's learn together again!");
        }
    }

    // Show welcome modal for new users
    showWelcome() {
        this.elements.welcomeModal.classList.remove('hidden');
    }

    // Start learning (from welcome modal - legacy, redirects to home)
    startLearning() {
        // Get selected creature
        const selectedCreature = this.elements.welcomeCreatureSelection.querySelector('.creature-option.selected');
        const creature = selectedCreature ? selectedCreature.dataset.creature : 'blob';

        // Get name
        const name = this.elements.welcomeNameInput.value.trim() || 'CodeBuddy';

        // Initialize buddy
        codingBuddy.setName(name);
        codingBuddy.setCreature(creature);
        codingBuddy.save();

        // Close modal
        this.elements.welcomeModal.classList.add('hidden');

        // Show home menu instead of loading directly
        this.showHomeMenu();
        this.elements.homePetName.value = name;
        this.updateHomePetPreview(creature);
    }

    // Update AI button visibility
    updateAIButtonVisibility() {
        const hasAI = aiHelper.isConfigured();
        this.elements.askAIBtn.style.display = hasAI ? 'flex' : 'none';
    }

    // Open AI chat modal
    openAIChat() {
        this.elements.askAIModal.classList.remove('hidden');
        this.elements.aiQuestionInput.focus();
    }

    // Close AI chat modal
    closeAIChat() {
        this.elements.askAIModal.classList.add('hidden');
    }

    // Send AI question
    async sendAIQuestion() {
        const question = this.elements.aiQuestionInput.value.trim();
        if (!question) return;

        // Add user message to chat
        this.addAIChatMessage(question, 'user');
        this.elements.aiQuestionInput.value = '';

        // Get current context
        const lesson = getLesson(this.currentModule, this.currentLesson);
        const code = this.elements.codeEditor.value;

        // Show loading
        const loadingDiv = this.addAIChatMessage('Thinking...', 'assistant');

        try {
            const response = await aiHelper.askQuestion(question, lesson, code);
            loadingDiv.textContent = response;
        } catch (error) {
            loadingDiv.textContent = 'Sorry, I couldn\'t connect to the AI. Try again later or check your API key.';
        }
    }

    // Add message to AI chat
    addAIChatMessage(text, role) {
        const div = document.createElement('div');
        div.className = `ai-message ${role}`;
        div.textContent = text;
        this.elements.aiChatHistory.appendChild(div);
        this.elements.aiChatHistory.scrollTop = this.elements.aiChatHistory.scrollHeight;
        return div;
    }
}

// Global function for buddy stats update
window.updateBuddyStats = function() {
    if (window.ui) {
        window.ui.updateStats();
    }
};

// Create global instance
const ui = new UI();
