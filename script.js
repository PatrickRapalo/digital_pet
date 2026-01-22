// Digital Pet Game
class DigitalPet {
    constructor() {
        this.pet = {
            name: 'Pet',
            creature: 'blob',
            hunger: 100,
            happiness: 100,
            energy: 100,
            health: 100,
            age: 0,
            poopCount: 0,
            isSleeping: false,
            isSick: false,
            isDead: false
        };

        this.selectedCreature = 'blob';

        this.gameLoopInterval = null;
        this.ageInterval = null;
        this.poopInterval = null;

        this.elements = {
            pet: document.getElementById('pet'),
            petName: document.getElementById('pet-name'),
            petAge: document.getElementById('pet-age'),
            hungerBar: document.getElementById('hunger-bar'),
            happinessBar: document.getElementById('happiness-bar'),
            energyBar: document.getElementById('energy-bar'),
            healthBar: document.getElementById('health-bar'),
            statusMessage: document.getElementById('status-message'),
            poop: document.getElementById('poop'),
            gameOver: document.getElementById('game-over'),
            namingScreen: document.getElementById('naming-screen'),
            nameInput: document.getElementById('name-input'),
            creatureOptions: document.querySelectorAll('.creature-option'),
            feedBtn: document.getElementById('feed-btn'),
            playBtn: document.getElementById('play-btn'),
            sleepBtn: document.getElementById('sleep-btn'),
            cleanBtn: document.getElementById('clean-btn'),
            healBtn: document.getElementById('heal-btn'),
            startBtn: document.getElementById('start-btn'),
            restartBtn: document.getElementById('restart-btn')
        };

        this.init();
    }

    init() {
        this.loadGame();
        this.bindEvents();

        // Set selected creature from loaded game
        if (this.pet.creature) {
            this.selectedCreature = this.pet.creature;
        }

        if (this.pet.isDead) {
            this.showGameOver();
        } else if (this.pet.name === 'Pet' || !localStorage.getItem('digitalPet')) {
            this.showNamingScreen();
        } else {
            this.hideNamingScreen();
            this.startGameLoop();
        }

        this.updateUI();
    }

    bindEvents() {
        this.elements.feedBtn.addEventListener('click', () => this.feed());
        this.elements.playBtn.addEventListener('click', () => this.play());
        this.elements.sleepBtn.addEventListener('click', () => this.toggleSleep());
        this.elements.cleanBtn.addEventListener('click', () => this.clean());
        this.elements.healBtn.addEventListener('click', () => this.heal());
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());

        this.elements.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.startGame();
        });

        // Creature selection
        this.elements.creatureOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectCreature(option.dataset.creature);
            });
        });
    }

    selectCreature(creature) {
        this.selectedCreature = creature;

        // Update UI selection
        this.elements.creatureOptions.forEach(option => {
            option.classList.toggle('selected', option.dataset.creature === creature);
        });
    }

    startGame() {
        const name = this.elements.nameInput.value.trim() || 'Buddy';
        this.pet.name = name;
        this.pet.creature = this.selectedCreature;
        this.hideNamingScreen();
        this.startGameLoop();
        this.saveGame();
        this.updateUI();
    }

    restartGame() {
        localStorage.removeItem('digitalPet');
        this.pet = {
            name: 'Pet',
            creature: 'blob',
            hunger: 100,
            happiness: 100,
            energy: 100,
            health: 100,
            age: 0,
            poopCount: 0,
            isSleeping: false,
            isSick: false,
            isDead: false
        };
        this.selectedCreature = 'blob';
        this.selectCreature('blob');
        this.hideGameOver();
        this.showNamingScreen();
        this.elements.nameInput.value = '';
        this.updateUI();
    }

    showNamingScreen() {
        this.elements.namingScreen.classList.remove('hidden');
        this.elements.nameInput.focus();
    }

    hideNamingScreen() {
        this.elements.namingScreen.classList.add('hidden');
    }

    showGameOver() {
        this.elements.gameOver.classList.remove('hidden');
        this.stopGameLoop();
    }

    hideGameOver() {
        this.elements.gameOver.classList.add('hidden');
    }

    startGameLoop() {
        // Main game loop - stats decay every 3 seconds
        this.gameLoopInterval = setInterval(() => this.gameLoop(), 3000);

        // Age increases every 30 seconds
        this.ageInterval = setInterval(() => {
            if (!this.pet.isDead) {
                this.pet.age++;
                this.updateUI();
                this.saveGame();
            }
        }, 30000);

        // Poop appears randomly every 20-40 seconds
        this.scheduleNextPoop();
    }

    scheduleNextPoop() {
        const delay = 20000 + Math.random() * 20000;
        this.poopInterval = setTimeout(() => {
            if (!this.pet.isDead && !this.pet.isSleeping) {
                this.pet.poopCount++;
                this.updateUI();
                this.saveGame();
            }
            this.scheduleNextPoop();
        }, delay);
    }

    stopGameLoop() {
        clearInterval(this.gameLoopInterval);
        clearInterval(this.ageInterval);
        clearTimeout(this.poopInterval);
    }

    gameLoop() {
        if (this.pet.isDead) return;

        // Stats decay
        if (!this.pet.isSleeping) {
            this.pet.hunger = Math.max(0, this.pet.hunger - 2);
            this.pet.happiness = Math.max(0, this.pet.happiness - 1);
            this.pet.energy = Math.max(0, this.pet.energy - 1);
        } else {
            // Sleeping restores energy but hunger still decreases
            this.pet.energy = Math.min(100, this.pet.energy + 5);
            this.pet.hunger = Math.max(0, this.pet.hunger - 1);
        }

        // Poop affects happiness
        if (this.pet.poopCount > 0) {
            this.pet.happiness = Math.max(0, this.pet.happiness - this.pet.poopCount);
        }

        // Health affected by low stats
        if (this.pet.hunger < 20 || this.pet.happiness < 20 || this.pet.energy < 20) {
            this.pet.health = Math.max(0, this.pet.health - 2);
            if (!this.pet.isSick && this.pet.health < 50) {
                this.pet.isSick = true;
            }
        } else if (this.pet.health < 100 && !this.pet.isSick) {
            // Slowly recover health if stats are good
            this.pet.health = Math.min(100, this.pet.health + 1);
        }

        // Check for death
        if (this.pet.health <= 0) {
            this.pet.isDead = true;
            this.showGameOver();
        }

        this.updateUI();
        this.saveGame();
    }

    feed() {
        if (this.pet.isDead || this.pet.isSleeping) return;

        this.pet.hunger = Math.min(100, this.pet.hunger + 30);
        this.pet.happiness = Math.min(100, this.pet.happiness + 5);

        this.showStatus('Yummy!');
        this.animatePet('eating');
        this.updateUI();
        this.saveGame();
    }

    play() {
        if (this.pet.isDead || this.pet.isSleeping || this.pet.energy < 10) {
            if (this.pet.energy < 10) {
                this.showStatus('Too tired...');
            }
            return;
        }

        this.pet.happiness = Math.min(100, this.pet.happiness + 25);
        this.pet.energy = Math.max(0, this.pet.energy - 15);
        this.pet.hunger = Math.max(0, this.pet.hunger - 5);

        this.showStatus('Wheee!');
        this.animatePet('playing');
        this.updateUI();
        this.saveGame();
    }

    toggleSleep() {
        if (this.pet.isDead) return;

        this.pet.isSleeping = !this.pet.isSleeping;

        if (this.pet.isSleeping) {
            this.showStatus('Zzz...');
            this.addZzz();
        } else {
            this.showStatus('Good morning!');
            this.removeZzz();
        }

        this.updateUI();
        this.saveGame();
    }

    clean() {
        if (this.pet.isDead) return;

        if (this.pet.poopCount > 0) {
            this.pet.poopCount = 0;
            this.pet.happiness = Math.min(100, this.pet.happiness + 10);
            this.showStatus('Clean!');
        } else {
            this.showStatus('Already clean!');
        }

        this.updateUI();
        this.saveGame();
    }

    heal() {
        if (this.pet.isDead) return;

        if (this.pet.isSick) {
            this.pet.isSick = false;
            this.pet.health = Math.min(100, this.pet.health + 30);
            this.showStatus('Feeling better!');
        } else {
            this.pet.health = Math.min(100, this.pet.health + 10);
            this.showStatus('Healthy!');
        }

        this.updateUI();
        this.saveGame();
    }

    showStatus(message) {
        this.elements.statusMessage.textContent = message;
        this.elements.statusMessage.classList.add('visible');

        setTimeout(() => {
            this.elements.statusMessage.classList.remove('visible');
        }, 2000);
    }

    animatePet(animation) {
        this.elements.pet.classList.add(animation);
        setTimeout(() => {
            this.elements.pet.classList.remove(animation);
        }, 500);
    }

    addZzz() {
        if (!document.querySelector('.zzz')) {
            const zzz = document.createElement('div');
            zzz.className = 'zzz';
            zzz.textContent = 'Zzz';
            this.elements.pet.appendChild(zzz);
        }
    }

    removeZzz() {
        const zzz = document.querySelector('.zzz');
        if (zzz) zzz.remove();
    }

    updateUI() {
        // Update name and age
        this.elements.petName.textContent = this.pet.name;
        this.elements.petAge.textContent = `Age: ${this.pet.age}`;

        // Update stat bars
        this.updateStatBar(this.elements.hungerBar, this.pet.hunger);
        this.updateStatBar(this.elements.happinessBar, this.pet.happiness);
        this.updateStatBar(this.elements.energyBar, this.pet.energy);
        this.updateStatBar(this.elements.healthBar, this.pet.health);

        // Update poop visibility
        if (this.pet.poopCount > 0) {
            this.elements.poop.classList.remove('hidden');
            this.elements.poop.textContent = '💩'.repeat(Math.min(this.pet.poopCount, 3));
        } else {
            this.elements.poop.classList.add('hidden');
        }

        // Update creature type class
        const creatureTypes = ['blob', 'cat', 'bunny', 'alien', 'dragon'];
        creatureTypes.forEach(type => {
            this.elements.pet.classList.remove(type);
        });
        this.elements.pet.classList.add(this.pet.creature);

        // Update pet state classes
        this.elements.pet.classList.remove('sleeping', 'sick', 'dead');
        if (this.pet.isDead) {
            this.elements.pet.classList.add('dead');
        } else if (this.pet.isSleeping) {
            this.elements.pet.classList.add('sleeping');
        } else if (this.pet.isSick) {
            this.elements.pet.classList.add('sick');
        }

        // Update button states
        this.elements.feedBtn.disabled = this.pet.isDead || this.pet.isSleeping;
        this.elements.playBtn.disabled = this.pet.isDead || this.pet.isSleeping || this.pet.energy < 10;
        this.elements.sleepBtn.disabled = this.pet.isDead;
        this.elements.cleanBtn.disabled = this.pet.isDead;
        this.elements.healBtn.disabled = this.pet.isDead;

        // Update sleep button text
        const sleepBtnText = this.elements.sleepBtn.querySelector('.btn-text');
        sleepBtnText.textContent = this.pet.isSleeping ? 'Wake' : 'Sleep';
    }

    updateStatBar(element, value) {
        element.style.width = value + '%';
        if (value < 25) {
            element.classList.add('low');
        } else {
            element.classList.remove('low');
        }
    }

    saveGame() {
        localStorage.setItem('digitalPet', JSON.stringify(this.pet));
    }

    loadGame() {
        const saved = localStorage.getItem('digitalPet');
        if (saved) {
            this.pet = JSON.parse(saved);
        }
    }
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DigitalPet();
});
