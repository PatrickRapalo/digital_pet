[Demo](https://patrickrapalo.github.io/digital_pet/)

# CodeBuddy - AI-Powered Coding Tutor

An interactive coding tutor with a virtual pet companion that helps you learn programming fundamentals.

## Features

- **Interactive Lessons**: 25+ lessons covering programming fundamentals, logic, loops, functions, and problem-solving
- **Virtual Pet Companion**: A cute animated pet that celebrates your successes and encourages you
- **Pseudocode Support**: Write in easy-to-understand pseudocode that runs like real code
- **Gamification**: XP system, levels, achievements, and daily streaks
- **AI Enhancement** (Optional): Connect your own OpenAI or Anthropic API key for enhanced hints and explanations

## Getting Started

### Local Development

1. Clone this repository
2. Open `index.html` in your web browser
3. Choose your buddy and start learning!

### GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to repository **Settings** > **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select the `main` branch and `/ (root)` folder
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/repository-name/`

## Curriculum

### Module 1: Programming Fundamentals
- Hello World
- Variables and data types
- Numbers and math
- Strings and concatenation

### Module 2: Logic & Conditions
- IF statements
- IF-ELSE branching
- Comparison operators
- Boolean logic (AND, OR)
- Nested conditions

### Module 3: Loops & Iteration
- WHILE loops
- FOR loops
- Calculating sums
- Countdowns
- Nested loops

### Module 4: Functions
- Creating functions
- Parameters
- Return values
- Multiple parameters
- Temperature converter challenge

### Module 5: Problem Solving
- Algorithms
- FizzBuzz challenge
- Factorial calculation
- Debugging
- Final challenge

## Pseudocode Syntax

CodeBuddy uses a simple pseudocode syntax:

```
// Comments start with //

PRINT "Hello, World!"              // Output text
SET name TO "CodeBuddy"           // Create variables
SET age TO 10                     // Numbers don't need quotes
SET isHappy TO TRUE               // Boolean values

IF age > 5 THEN                   // Conditions
    PRINT "Old enough!"
ELSE
    PRINT "Too young"
END

FOR i FROM 1 TO 5 DO              // Counting loop
    PRINT i
END

WHILE count > 0 DO                // While loop
    SET count TO count - 1
END

FUNCTION greet(name)              // Define function
    PRINT "Hello, " + name
END

CALL greet("World")               // Call function
```

## AI Enhancement (Optional)

CodeBuddy works great without AI, but you can enhance your learning experience by adding an API key:

1. Click the settings gear icon
2. Select your AI provider (OpenAI or Anthropic)
3. Enter your API key
4. Click Save

With AI enabled, you can:
- Get personalized hints and explanations
- Ask questions about your code
- Receive detailed feedback on your solutions

**Note**: Your API key is stored locally in your browser and never sent to our servers.

## File Structure

```
digital_pet/
├── index.html          # Main application
├── style.css           # Styles including pet animations
├── js/
│   ├── main.js         # App initialization
│   ├── lessons.js      # Curriculum data (25+ lessons)
│   ├── codeRunner.js   # Sandboxed code execution
│   ├── codingBuddy.js  # Pet integration and stats
│   ├── aiHelper.js     # Optional AI API integration
│   └── ui.js           # UI management
└── README.md           # This file
```

## Browser Compatibility

Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Credits

Built with vanilla JavaScript, CSS, and HTML. No external dependencies required.

## License

MIT License - Feel free to use, modify, and share!
