// CodeBuddy - Pet Integration with Learning Metrics

class CodingBuddy {
    constructor() {
        this.data = {
            name: 'CodeBuddy',
            creature: 'blob',
            currentTrack: 'javascript',
            level: 1,
            xp: 0,
            totalXP: 0,
            knowledge: 0,        // Total lessons completed percentage
            happiness: 100,      // Decreases on wrong answers, increases on correct
            currentStreak: 0,    // Consecutive correct answers
            bestStreak: 0,
            dayStreak: 0,        // Daily login streak
            lastActiveDate: null,
            lessonsCompleted: [],
            achievements: [],
            hintsUsed: 0,
            totalAttempts: 0,
            correctAttempts: 0,
            createdAt: new Date().toISOString()
        };

        this.element = null;
        this.motivationDecayInterval = null;

        // XP needed per level (increases each level)
        this.xpPerLevel = [
            100,   // Level 1 -> 2
            150,   // Level 2 -> 3
            200,   // Level 3 -> 4
            300,   // Level 4 -> 5
            400,   // Level 5 -> 6
            500,   // Level 6 -> 7
            650,   // Level 7 -> 8
            800,   // Level 8 -> 9
            1000,  // Level 9 -> 10
            1500   // Level 10+
        ];

        // Evolution titles based on level
        this.titles = {
            1: 'Coding Apprentice',
            3: 'Code Explorer',
            5: 'Logic Learner',
            7: 'Algorithm Adept',
            10: 'Code Master',
            15: 'Programming Prodigy',
            20: 'Coding Legend'
        };

        // Buddy messages for different situations
        this.messages = {
            greeting: [
                "Ready to code? Let's learn something new!",
                "Welcome back! I missed you!",
                "Let's tackle some coding challenges together!",
                "Your coding journey continues today!"
            ],
            lessonStart: [
                "This looks interesting! Let's figure it out!",
                "New lesson time! I'm excited!",
                "Ready when you are!",
                "Let's do this together!"
            ],
            thinking: [
                "Hmm, let me think about this...",
                "Working on it...",
                "Processing your code..."
            ],
            correct: [
                "Amazing! You got it!",
                "Brilliant work!",
                "That's exactly right!",
                "You're getting so good at this!",
                "Perfect! On to the next challenge!"
            ],
            incorrect: [
                "Not quite, but don't give up!",
                "Close! Try again!",
                "That's okay, learning takes practice!",
                "Keep trying, you'll get it!"
            ],
            hint: [
                "Here's a little help!",
                "Maybe this will point you in the right direction...",
                "Let me give you a hint!"
            ],
            streak: [
                "You're on fire!",
                "Keep that streak going!",
                "Unstoppable!",
                "What a streak!"
            ],
            levelUp: [
                "LEVEL UP! You're amazing!",
                "You've grown stronger!",
                "New level unlocked!",
                "Your skills are improving!"
            ],
            idle: [
                "Don't forget about me!",
                "Want to try another lesson?",
                "I'm here when you're ready!",
                "Let's keep learning!"
            ],
            sad: [
                "That's okay, we can try again!",
                "Don't give up, I believe in you!",
                "Mistakes help us learn!"
            ],
            verySad: [
                "I'm feeling a bit down...",
                "Let's get one right to cheer me up!",
                "I know you can do this!"
            ],
            happyAgain: [
                "Yay! I'm feeling better!",
                "That's the spirit!",
                "We're back on track!"
            ]
        };
    }

    init(petElement) {
        this.element = petElement;
        this.load();
        this.updateDayStreak();
        this.startHappinessRecovery();
        this.updateVisuals();
        this.updateMoodVisual();
    }

    // Save data to localStorage
    save() {
        localStorage.setItem('codeBuddy', JSON.stringify(this.data));
    }

    // Load data from localStorage
    load() {
        const saved = localStorage.getItem('codeBuddy');
        if (saved) {
            const parsed = JSON.parse(saved);
            this.data = { ...this.data, ...parsed };
            // Set the current track for lessons.js
            if (this.data.currentTrack) {
                setCurrentTrack(this.data.currentTrack);
            }
        }
    }

    // Check if first time user
    isNewUser() {
        return !localStorage.getItem('codeBuddy');
    }

    // Set buddy name
    setName(name) {
        this.data.name = name || 'CodeBuddy';
        this.save();
    }

    // Set creature type
    setCreature(creature) {
        this.data.creature = creature;
        this.updateVisuals();
        this.save();
    }

    // Set current track
    setTrack(track) {
        this.data.currentTrack = track;
        setCurrentTrack(track);
        this.save();
    }

    // Get current track
    getTrack() {
        return this.data.currentTrack || 'javascript';
    }

    // Update day streak based on last active date
    updateDayStreak() {
        const today = new Date().toDateString();
        const lastActive = this.data.lastActiveDate ? new Date(this.data.lastActiveDate).toDateString() : null;

        if (lastActive === today) {
            // Already logged in today
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActive === yesterday.toDateString()) {
            // Consecutive day - increase streak
            this.data.dayStreak++;
        } else if (lastActive !== today) {
            // Streak broken - reset
            this.data.dayStreak = 1;
        }

        this.data.lastActiveDate = new Date().toISOString();
        this.save();
    }

    // Happiness naturally recovers slowly over time
    startHappinessRecovery() {
        if (this.happinessRecoveryInterval) {
            clearInterval(this.happinessRecoveryInterval);
        }

        this.happinessRecoveryInterval = setInterval(() => {
            if (this.data.happiness < 100 && this.data.happiness >= 30) {
                // Slowly recover happiness if not too sad
                this.data.happiness = Math.min(100, this.data.happiness + 2);
                this.save();
                this.updateMoodVisual();
                this.onHappinessChange();
            }
        }, 60000); // Every minute
    }

    // Called when happiness changes
    onHappinessChange() {
        if (typeof window.updateBuddyStats === 'function') {
            window.updateBuddyStats();
        }
    }

    // Add XP and handle level ups
    addXP(amount) {
        this.data.xp += amount;
        this.data.totalXP += amount;

        const xpNeeded = this.getXPNeeded();

        // Check for level up
        while (this.data.xp >= xpNeeded) {
            this.data.xp -= xpNeeded;
            this.data.level++;
            this.onLevelUp();
        }

        this.save();
        return this.data.level;
    }

    // Get XP needed for current level
    getXPNeeded() {
        const levelIndex = Math.min(this.data.level - 1, this.xpPerLevel.length - 1);
        return this.xpPerLevel[levelIndex];
    }

    // Handle level up
    onLevelUp() {
        this.animate('celebrating');
        this.updateVisuals();

        // Check for new title
        const newTitle = this.getTitle();
        if (newTitle !== this.getPreviousTitle()) {
            // Title upgrade!
        }
    }

    // Get current title based on level
    getTitle() {
        let title = 'Coding Apprentice';
        for (const [level, t] of Object.entries(this.titles)) {
            if (this.data.level >= parseInt(level)) {
                title = t;
            }
        }
        return title;
    }

    // Get previous title
    getPreviousTitle() {
        const prevLevel = this.data.level - 1;
        let title = 'Coding Apprentice';
        for (const [level, t] of Object.entries(this.titles)) {
            if (prevLevel >= parseInt(level)) {
                title = t;
            }
        }
        return title;
    }

    // Mark lesson as completed
    completeLesson(moduleId, lessonId, xpReward) {
        const lessonKey = `${moduleId}:${lessonId}`;

        if (!this.data.lessonsCompleted.includes(lessonKey)) {
            this.data.lessonsCompleted.push(lessonKey);

            // Award XP
            this.addXP(xpReward);

            // Boost happiness
            this.data.happiness = Math.min(100, this.data.happiness + 20);

            // Update knowledge percentage
            const totalLessons = getTotalLessons();
            this.data.knowledge = Math.round((this.data.lessonsCompleted.length / totalLessons) * 100);

            this.save();
            return true;
        }

        return false;
    }

    // Check if lesson is completed
    isLessonCompleted(moduleId, lessonId) {
        return this.data.lessonsCompleted.includes(`${moduleId}:${lessonId}`);
    }

    // Get completed lessons count for a module
    getModuleProgress(moduleId) {
        return this.data.lessonsCompleted.filter(key => key.startsWith(`${moduleId}:`)).length;
    }

    // Record attempt
    recordAttempt(correct) {
        this.data.totalAttempts++;
        const previousHappiness = this.data.happiness;

        if (correct) {
            this.data.correctAttempts++;
            this.data.currentStreak++;

            if (this.data.currentStreak > this.data.bestStreak) {
                this.data.bestStreak = this.data.currentStreak;
            }

            // Bonus XP for streaks
            if (this.data.currentStreak >= 3) {
                this.addXP(5 * Math.min(this.data.currentStreak, 10));
            }

            // Increase happiness on correct answer
            const happinessGain = 15 + (this.data.currentStreak * 2);
            this.data.happiness = Math.min(100, this.data.happiness + happinessGain);

            this.animate('celebrating');

            // Check if we recovered from being sad
            if (previousHappiness < 50 && this.data.happiness >= 50) {
                // Will show happy again message
            }
        } else {
            this.data.currentStreak = 0;

            // Decrease happiness on wrong answer
            this.data.happiness = Math.max(0, this.data.happiness - 15);

            // Update visual state based on happiness
            this.updateMoodVisual();
            this.animate('thinking');
        }

        this.save();
        this.updateMoodVisual();
    }

    // Update pet visual based on mood/happiness
    updateMoodVisual() {
        if (!this.element) return;

        // Remove mood classes
        this.element.classList.remove('sad', 'very-sad');

        // Add appropriate mood class
        if (this.data.happiness < 30) {
            this.element.classList.add('very-sad');
        } else if (this.data.happiness < 60) {
            this.element.classList.add('sad');
        }
    }

    // Get mood state
    getMood() {
        if (this.data.happiness >= 70) return 'happy';
        if (this.data.happiness >= 40) return 'okay';
        if (this.data.happiness >= 20) return 'sad';
        return 'very-sad';
    }

    // Record hint usage
    useHint() {
        this.data.hintsUsed++;
        this.save();
    }

    // Get random message for situation
    getMessage(type) {
        const messages = this.messages[type];
        if (!messages || messages.length === 0) {
            return "...";
        }
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Animate the pet
    animate(animation) {
        if (!this.element) return;

        // Remove previous animations
        this.element.classList.remove('celebrating', 'thinking', 'playing', 'eating', 'sleeping');

        // Add new animation
        this.element.classList.add(animation);

        // Remove after animation completes
        setTimeout(() => {
            this.element.classList.remove(animation);
        }, animation === 'celebrating' ? 800 : 500);
    }

    // Update visual appearance
    updateVisuals() {
        if (!this.element) return;

        // Update creature type
        const creatureTypes = ['blob', 'cat', 'bunny', 'alien', 'dragon'];
        creatureTypes.forEach(type => {
            this.element.classList.remove(type);
        });
        this.element.classList.add(this.data.creature);
    }

    // Get stats for display
    getStats() {
        return {
            name: this.data.name,
            creature: this.data.creature,
            currentTrack: this.data.currentTrack || 'javascript',
            level: this.data.level,
            xp: this.data.xp,
            xpNeeded: this.getXPNeeded(),
            totalXP: this.data.totalXP,
            knowledge: this.data.knowledge,
            happiness: this.data.happiness,
            mood: this.getMood(),
            currentStreak: this.data.currentStreak,
            bestStreak: this.data.bestStreak,
            dayStreak: this.data.dayStreak,
            lessonsCompleted: this.data.lessonsCompleted.length,
            totalLessons: getTotalLessons(),
            title: this.getTitle(),
            accuracy: this.data.totalAttempts > 0
                ? Math.round((this.data.correctAttempts / this.data.totalAttempts) * 100)
                : 0
        };
    }

    // Reset all progress
    reset() {
        localStorage.removeItem('codeBuddy');
        this.data = {
            name: 'CodeBuddy',
            creature: 'blob',
            currentTrack: 'javascript',
            level: 1,
            xp: 0,
            totalXP: 0,
            knowledge: 0,
            happiness: 100,
            currentStreak: 0,
            bestStreak: 0,
            dayStreak: 0,
            lastActiveDate: null,
            lessonsCompleted: [],
            achievements: [],
            hintsUsed: 0,
            totalAttempts: 0,
            correctAttempts: 0,
            createdAt: new Date().toISOString()
        };
        setCurrentTrack('javascript');
        this.updateVisuals();
        this.updateMoodVisual();
    }

    // Add achievement
    addAchievement(achievementId) {
        if (!this.data.achievements.includes(achievementId)) {
            this.data.achievements.push(achievementId);
            this.save();
            return true;
        }
        return false;
    }

    // Check if has achievement
    hasAchievement(achievementId) {
        return this.data.achievements.includes(achievementId);
    }
}

// Achievement definitions
const ACHIEVEMENTS = {
    firstLesson: {
        id: 'firstLesson',
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: '1'
    },
    fiveStreak: {
        id: 'fiveStreak',
        name: 'On Fire!',
        description: 'Get 5 correct answers in a row',
        icon: '5'
    },
    tenLessons: {
        id: 'tenLessons',
        name: 'Dedicated Learner',
        description: 'Complete 10 lessons',
        icon: '10'
    },
    moduleComplete: {
        id: 'moduleComplete',
        name: 'Module Master',
        description: 'Complete an entire module',
        icon: 'M'
    },
    levelFive: {
        id: 'levelFive',
        name: 'Rising Star',
        description: 'Reach level 5',
        icon: '5'
    },
    levelTen: {
        id: 'levelTen',
        name: 'Code Expert',
        description: 'Reach level 10',
        icon: '10'
    },
    noHints: {
        id: 'noHints',
        name: 'Independent Thinker',
        description: 'Complete 5 lessons without hints',
        icon: '!'
    },
    weekStreak: {
        id: 'weekStreak',
        name: 'Week Warrior',
        description: '7 day login streak',
        icon: '7'
    },
    perfectModule: {
        id: 'perfectModule',
        name: 'Perfectionist',
        description: 'Complete a module with 100% accuracy',
        icon: '+'
    },
    allLessons: {
        id: 'allLessons',
        name: 'Graduate',
        description: 'Complete all lessons',
        icon: 'G'
    }
};

// Create global instance
const codingBuddy = new CodingBuddy();
