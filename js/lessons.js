// CodeBuddy Curriculum - Multi-Language Lessons

const TRACKS = {
    javascript: {
        id: 'javascript',
        name: 'JavaScript',
        focus: 'Web Development',
        icon: 'JS',
        description: 'Build interactive websites and web apps',
        modules: [
            {
                id: 'js-basics',
                title: 'JavaScript Basics',
                description: 'Variables, data types, and output',
                icon: '1',
                lessons: [
                    {
                        id: 'js-hello',
                        title: 'Hello, JavaScript!',
                        description: 'Your first JavaScript program',
                        xpReward: 25,
                        instructions: `
                            <p>Welcome to JavaScript! It's the language that makes websites interactive.</p>
                            <p>Use <strong>console.log()</strong> to print text:</p>
                            <pre>console.log("Hello!");</pre>
                            <p><strong>Your task:</strong> Print "Hello, World!" to the console.</p>
                        `,
                        starterCode: '// Print Hello, World!\n',
                        hints: [
                            'Use console.log() with your text inside',
                            'Text needs to be in quotes: "Hello, World!"',
                            'Don\'t forget the semicolon at the end!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Hello, World!'
                        },
                        buddyMessages: {
                            start: "Your first JS program! Let's do this!",
                            success: "Awesome! You just wrote JavaScript!",
                            error: "Check your spelling - it should be exactly 'Hello, World!'"
                        }
                    },
                    {
                        id: 'js-variables',
                        title: 'Variables with let',
                        description: 'Store data in variables',
                        xpReward: 30,
                        instructions: `
                            <p>Variables store data. In JavaScript, use <strong>let</strong> to create them:</p>
                            <pre>let name = "CodeBuddy";
let age = 5;</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create a variable <code>message</code> with value "I love coding!"</li>
                                <li>Print the variable using console.log()</li>
                            </ol>
                        `,
                        starterCode: '// Create and print a variable\n',
                        hints: [
                            'Use let to declare: let message = "...";',
                            'Then use console.log(message) - no quotes around variable name',
                            'The message should be: I love coding!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'I love coding!'
                        },
                        buddyMessages: {
                            start: "Variables are like labeled boxes for your data!",
                            success: "Great! You've stored and retrieved data!",
                            error: "Make sure message contains 'I love coding!'"
                        }
                    },
                    {
                        id: 'js-numbers',
                        title: 'Numbers and Math',
                        description: 'Do calculations with JavaScript',
                        xpReward: 35,
                        instructions: `
                            <p>JavaScript can do math! Use +, -, *, / for operations:</p>
                            <pre>let sum = 10 + 5;    // 15
let product = 4 * 3;  // 12</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>price</code> = 25</li>
                                <li>Create <code>quantity</code> = 4</li>
                                <li>Create <code>total</code> = price * quantity</li>
                                <li>Print <code>total</code></li>
                            </ol>
                        `,
                        starterCode: '// Calculate the total\n',
                        hints: [
                            'Numbers don\'t need quotes',
                            'Use * for multiplication',
                            '25 * 4 = 100'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '100'
                        },
                        buddyMessages: {
                            start: "Math time! Computers are great calculators.",
                            success: "100! Perfect calculation!",
                            error: "Check your math: 25 * 4 = ?"
                        }
                    },
                    {
                        id: 'js-strings',
                        title: 'String Concatenation',
                        description: 'Combine text together',
                        xpReward: 35,
                        instructions: `
                            <p>Combine strings with <strong>+</strong> or use template literals:</p>
                            <pre>let greeting = "Hello, " + "World!";
// Or use template literals:
let name = "Coder";
let msg = \`Hello, \${name}!\`;</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>firstName</code> = "Web"</li>
                                <li>Create <code>lastName</code> = "Developer"</li>
                                <li>Create <code>fullTitle</code> combining them with a space</li>
                                <li>Print <code>fullTitle</code></li>
                            </ol>
                        `,
                        starterCode: '// Combine strings\n',
                        hints: [
                            'Use + to join strings',
                            'Add a space between: firstName + " " + lastName',
                            'Result should be "Web Developer"'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Web Developer'
                        },
                        buddyMessages: {
                            start: "Let's stick some strings together!",
                            success: "Web Developer! Great job combining strings!",
                            error: "Make sure there's a space between Web and Developer"
                        }
                    }
                ]
            },
            {
                id: 'js-logic',
                title: 'Logic & Conditions',
                description: 'Make decisions in your code',
                icon: '2',
                lessons: [
                    {
                        id: 'js-if',
                        title: 'If Statements',
                        description: 'Make decisions with if',
                        xpReward: 40,
                        instructions: `
                            <p>Use <strong>if</strong> to run code only when a condition is true:</p>
                            <pre>let score = 85;
if (score > 50) {
    console.log("You passed!");
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>temperature</code> = 75</li>
                                <li>If temperature > 70, print "It's warm!"</li>
                            </ol>
                        `,
                        starterCode: '// Check the temperature\n',
                        hints: [
                            'Use if (condition) { ... }',
                            '75 > 70 is true',
                            'Don\'t forget the curly braces!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: "It's warm!"
                        },
                        buddyMessages: {
                            start: "Time to teach JavaScript to make decisions!",
                            success: "Your if statement works perfectly!",
                            error: "Make sure temperature is 75 and you check > 70"
                        }
                    },
                    {
                        id: 'js-else',
                        title: 'If-Else',
                        description: 'Handle two possible paths',
                        xpReward: 45,
                        instructions: `
                            <p>Use <strong>else</strong> for when the condition is false:</p>
                            <pre>if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>hour</code> = 14</li>
                                <li>If hour < 12, print "Good morning!"</li>
                                <li>Else, print "Good afternoon!"</li>
                            </ol>
                        `,
                        starterCode: '// Morning or afternoon?\n',
                        hints: [
                            'hour is 14, which is >= 12',
                            'So the else branch runs',
                            'Output should be "Good afternoon!"'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Good afternoon!'
                        },
                        buddyMessages: {
                            start: "What if the condition is false? Let's handle that!",
                            success: "Good afternoon indeed! Perfect if-else!",
                            error: "14 is not < 12, so it should say Good afternoon!"
                        }
                    },
                    {
                        id: 'js-comparison',
                        title: 'Comparison Operators',
                        description: 'Compare values',
                        xpReward: 45,
                        instructions: `
                            <p>JavaScript comparison operators:</p>
                            <ul>
                                <li><code>===</code> equal to</li>
                                <li><code>!==</code> not equal to</li>
                                <li><code>></code> <code><</code> <code>>=</code> <code><=</code></li>
                            </ul>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>password</code> = "secret123"</li>
                                <li>If password === "secret123", print "Access granted"</li>
                                <li>Else print "Access denied"</li>
                            </ol>
                        `,
                        starterCode: '// Check the password\n',
                        hints: [
                            'Use === for exact comparison',
                            'The password matches!',
                            'So it should print "Access granted"'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Access granted'
                        },
                        buddyMessages: {
                            start: "Let's check some passwords!",
                            success: "Access granted! Security check passed!",
                            error: "The passwords match, so access should be granted"
                        }
                    },
                    {
                        id: 'js-logical',
                        title: 'AND & OR',
                        description: 'Combine conditions',
                        xpReward: 50,
                        instructions: `
                            <p>Combine conditions with <strong>&&</strong> (AND) and <strong>||</strong> (OR):</p>
                            <pre>if (age >= 18 && hasLicense) {
    console.log("Can drive");
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>isLoggedIn</code> = true</li>
                                <li>Create <code>isAdmin</code> = true</li>
                                <li>If BOTH are true, print "Welcome, Admin!"</li>
                            </ol>
                        `,
                        starterCode: '// Check admin access\n',
                        hints: [
                            'Use && for AND',
                            'Both conditions are true',
                            'if (isLoggedIn && isAdmin)'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Welcome, Admin!'
                        },
                        buddyMessages: {
                            start: "Sometimes you need multiple things to be true!",
                            success: "Admin access granted! You understand && !",
                            error: "Both are true, so the condition should pass"
                        }
                    }
                ]
            },
            {
                id: 'js-loops',
                title: 'Loops',
                description: 'Repeat actions',
                icon: '3',
                lessons: [
                    {
                        id: 'js-for',
                        title: 'For Loops',
                        description: 'Count and repeat',
                        xpReward: 45,
                        instructions: `
                            <p>A <strong>for loop</strong> repeats code a specific number of times:</p>
                            <pre>for (let i = 1; i <= 3; i++) {
    console.log(i);
}</pre>
                            <p><strong>Your task:</strong> Print numbers 1 through 5, each on a new line.</p>
                        `,
                        starterCode: '// Count to 5\n',
                        hints: [
                            'Start i at 1',
                            'Continue while i <= 5',
                            'Increment with i++'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '1\n2\n3\n4\n5'
                        },
                        buddyMessages: {
                            start: "Loops let us repeat without copy-pasting!",
                            success: "1 through 5! Perfect loop!",
                            error: "Make sure you print 1, 2, 3, 4, 5"
                        }
                    },
                    {
                        id: 'js-while',
                        title: 'While Loops',
                        description: 'Loop while condition is true',
                        xpReward: 45,
                        instructions: `
                            <p>A <strong>while loop</strong> repeats while a condition is true:</p>
                            <pre>let count = 3;
while (count > 0) {
    console.log(count);
    count--;
}</pre>
                            <p><strong>Your task:</strong> Create a countdown from 5 to 1, then print "Blast off!"</p>
                        `,
                        starterCode: '// Countdown!\n',
                        hints: [
                            'Start count at 5',
                            'Loop while count >= 1',
                            'Decrease count each iteration with count--'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '5\n4\n3\n2\n1\nBlast off!'
                        },
                        buddyMessages: {
                            start: "3... 2... 1... Let's code a countdown!",
                            success: "Blast off! Great while loop!",
                            error: "Count from 5 down to 1, then print 'Blast off!'"
                        }
                    },
                    {
                        id: 'js-arrays',
                        title: 'Arrays',
                        description: 'Store lists of data',
                        xpReward: 50,
                        instructions: `
                            <p>Arrays store multiple values:</p>
                            <pre>let colors = ["red", "green", "blue"];
console.log(colors[0]); // "red"
console.log(colors.length); // 3</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create an array <code>fruits</code> with "apple", "banana", "orange"</li>
                                <li>Print the second fruit (index 1)</li>
                            </ol>
                        `,
                        starterCode: '// Work with arrays\n',
                        hints: [
                            'Arrays use square brackets: []',
                            'Index starts at 0',
                            'fruits[1] is the second item'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'banana'
                        },
                        buddyMessages: {
                            start: "Arrays hold lists of things!",
                            success: "Banana! You understand array indexing!",
                            error: "Remember: index 0 is first, index 1 is second"
                        }
                    },
                    {
                        id: 'js-loop-array',
                        title: 'Looping Arrays',
                        description: 'Process each item',
                        xpReward: 55,
                        instructions: `
                            <p>Loop through arrays with for or for...of:</p>
                            <pre>let nums = [1, 2, 3];
for (let num of nums) {
    console.log(num);
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create array <code>scores</code> = [85, 92, 78]</li>
                                <li>Loop through and print each score</li>
                            </ol>
                        `,
                        starterCode: '// Loop through scores\n',
                        hints: [
                            'Use for...of for easy array looping',
                            'for (let score of scores)',
                            'Print each score inside the loop'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '85\n92\n78'
                        },
                        buddyMessages: {
                            start: "Let's process every item in an array!",
                            success: "All scores printed! Array looping mastered!",
                            error: "Print each score: 85, 92, 78"
                        }
                    }
                ]
            },
            {
                id: 'js-functions',
                title: 'Functions',
                description: 'Reusable code blocks',
                icon: '4',
                lessons: [
                    {
                        id: 'js-func-basic',
                        title: 'Creating Functions',
                        description: 'Define and call functions',
                        xpReward: 50,
                        instructions: `
                            <p>Functions are reusable code blocks:</p>
                            <pre>function sayHello() {
    console.log("Hello!");
}
sayHello(); // Call it</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create a function <code>greet</code></li>
                                <li>It should print "Welcome to JavaScript!"</li>
                                <li>Call the function</li>
                            </ol>
                        `,
                        starterCode: '// Create and call a function\n',
                        hints: [
                            'function greet() { ... }',
                            'Put console.log inside the function',
                            'Call with greet()'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Welcome to JavaScript!'
                        },
                        buddyMessages: {
                            start: "Functions let you reuse code!",
                            success: "Your first function works!",
                            error: "Make sure to call the function after defining it"
                        }
                    },
                    {
                        id: 'js-func-params',
                        title: 'Function Parameters',
                        description: 'Pass data to functions',
                        xpReward: 55,
                        instructions: `
                            <p>Functions can receive parameters:</p>
                            <pre>function greet(name) {
    console.log("Hello, " + name);
}
greet("Alice"); // "Hello, Alice"</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>double</code> that takes a number</li>
                                <li>It should print the number * 2</li>
                                <li>Call it with 7</li>
                            </ol>
                        `,
                        starterCode: '// Function with parameter\n',
                        hints: [
                            'function double(num) { ... }',
                            'Print num * 2',
                            '7 * 2 = 14'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '14'
                        },
                        buddyMessages: {
                            start: "Parameters make functions flexible!",
                            success: "14! Parameters mastered!",
                            error: "double(7) should print 14"
                        }
                    },
                    {
                        id: 'js-func-return',
                        title: 'Return Values',
                        description: 'Get results from functions',
                        xpReward: 60,
                        instructions: `
                            <p>Functions can return values:</p>
                            <pre>function add(a, b) {
    return a + b;
}
let sum = add(3, 4);
console.log(sum); // 7</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>multiply</code> that takes two numbers</li>
                                <li>Return their product</li>
                                <li>Call it with 6 and 8, print the result</li>
                            </ol>
                        `,
                        starterCode: '// Function that returns a value\n',
                        hints: [
                            'Use return to send back a value',
                            'return a * b;',
                            '6 * 8 = 48'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '48'
                        },
                        buddyMessages: {
                            start: "Return sends values back!",
                            success: "48! You understand return values!",
                            error: "multiply(6, 8) should return 48"
                        }
                    },
                    {
                        id: 'js-arrow',
                        title: 'Arrow Functions',
                        description: 'Modern function syntax',
                        xpReward: 60,
                        instructions: `
                            <p>Arrow functions are a shorter syntax:</p>
                            <pre>const square = (x) => x * x;
console.log(square(5)); // 25</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create an arrow function <code>triple</code></li>
                                <li>It takes a number and returns it * 3</li>
                                <li>Call it with 4 and print the result</li>
                            </ol>
                        `,
                        starterCode: '// Arrow function\n',
                        hints: [
                            'const triple = (x) => x * 3;',
                            'Or: const triple = x => x * 3;',
                            '4 * 3 = 12'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '12'
                        },
                        buddyMessages: {
                            start: "Arrow functions are sleek and modern!",
                            success: "12! Arrow function mastered!",
                            error: "triple(4) should return 12"
                        }
                    }
                ]
            },
            {
                id: 'js-web',
                title: 'Web Development',
                description: 'DOM and events',
                icon: '5',
                lessons: [
                    {
                        id: 'js-dom-intro',
                        title: 'The DOM',
                        description: 'Understanding the Document Object Model',
                        xpReward: 50,
                        instructions: `
                            <p>The <strong>DOM</strong> (Document Object Model) lets JavaScript interact with HTML.</p>
                            <p>Key concept: The webpage is a tree of elements that JS can read and modify.</p>
                            <pre>// Get element by ID
document.getElementById("myDiv");

// Get elements by class
document.getElementsByClassName("item");</pre>
                            <p><strong>Your task:</strong> Print "DOM stands for Document Object Model"</p>
                        `,
                        starterCode: '// What does DOM stand for?\n',
                        hints: [
                            'This is a simple print exercise',
                            'Use console.log()',
                            'Print the exact phrase'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'DOM stands for Document Object Model'
                        },
                        buddyMessages: {
                            start: "The DOM is how JS talks to webpages!",
                            success: "Correct! The DOM is powerful!",
                            error: "Print the exact phrase about DOM"
                        }
                    },
                    {
                        id: 'js-events-intro',
                        title: 'Events',
                        description: 'Responding to user actions',
                        xpReward: 55,
                        instructions: `
                            <p>Events let you respond to user actions:</p>
                            <pre>button.addEventListener("click", function() {
    console.log("Button clicked!");
});</pre>
                            <p>Common events: click, mouseover, keydown, submit</p>
                            <p><strong>Your task:</strong> Create a function <code>handleClick</code> that prints "Button was clicked!" and call it.</p>
                        `,
                        starterCode: '// Event handler function\n',
                        hints: [
                            'Create a regular function',
                            'It should print the message',
                            'Then call it to test'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Button was clicked!'
                        },
                        buddyMessages: {
                            start: "Events make websites interactive!",
                            success: "Click handled! Events are fun!",
                            error: "The function should print 'Button was clicked!'"
                        }
                    },
                    {
                        id: 'js-objects',
                        title: 'Objects',
                        description: 'Store related data together',
                        xpReward: 60,
                        instructions: `
                            <p>Objects group related data:</p>
                            <pre>let user = {
    name: "Alice",
    age: 25,
    isAdmin: true
};
console.log(user.name); // "Alice"</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create an object <code>website</code></li>
                                <li>Give it: title = "My Site", visitors = 1000</li>
                                <li>Print the visitors count</li>
                            </ol>
                        `,
                        starterCode: '// Create an object\n',
                        hints: [
                            'Use curly braces for objects',
                            'Properties use key: value syntax',
                            'Access with website.visitors'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '1000'
                        },
                        buddyMessages: {
                            start: "Objects are like real-world things in code!",
                            success: "1000 visitors! Objects are powerful!",
                            error: "Print website.visitors"
                        }
                    },
                    {
                        id: 'js-web-challenge',
                        title: 'Web Dev Challenge',
                        description: 'Put it all together!',
                        xpReward: 75,
                        instructions: `
                            <p><strong>Challenge:</strong> Build a simple page data simulator!</p>
                            <ol>
                                <li>Create an object <code>page</code> with title and viewCount (start at 0)</li>
                                <li>Create function <code>visit</code> that increases viewCount by 1</li>
                                <li>Call visit() 3 times</li>
                                <li>Print the final viewCount</li>
                            </ol>
                        `,
                        starterCode: '// Page view counter\n',
                        hints: [
                            'Object: let page = { title: "...", viewCount: 0 }',
                            'Function modifies: page.viewCount++',
                            'Call visit() three times, then print'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '3'
                        },
                        buddyMessages: {
                            start: "Real web dev puts it all together!",
                            success: "3 views! You've built a view counter!",
                            error: "After 3 visits, viewCount should be 3"
                        }
                    }
                ]
            }
        ]
    },

    python: {
        id: 'python',
        name: 'Python',
        focus: 'Data & Analytics',
        icon: 'PY',
        description: 'Analyze data and build smart programs',
        modules: [
            {
                id: 'py-basics',
                title: 'Python Basics',
                description: 'Variables, printing, and types',
                icon: '1',
                lessons: [
                    {
                        id: 'py-hello',
                        title: 'Hello, Python!',
                        description: 'Your first Python program',
                        xpReward: 25,
                        instructions: `
                            <p>Python is known for its simple, readable syntax!</p>
                            <p>Use <strong>print()</strong> to display text:</p>
                            <pre>print("Hello!")</pre>
                            <p><strong>Your task:</strong> Print "Hello, World!"</p>
                        `,
                        starterCode: '# Print Hello, World!\n',
                        hints: [
                            'Use print() with text inside',
                            'Text needs quotes: "Hello, World!"',
                            'Python doesn\'t need semicolons!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Hello, World!'
                        },
                        buddyMessages: {
                            start: "Python is beginner-friendly! Let's go!",
                            success: "Awesome! You wrote Python!",
                            error: "Check spelling - exactly 'Hello, World!'"
                        }
                    },
                    {
                        id: 'py-variables',
                        title: 'Variables',
                        description: 'Store data in Python',
                        xpReward: 30,
                        instructions: `
                            <p>Python variables don't need a keyword - just assign!</p>
                            <pre>name = "CodeBuddy"
age = 5</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>language</code> = "Python"</li>
                                <li>Create <code>year</code> = 1991</li>
                                <li>Print <code>language</code></li>
                            </ol>
                        `,
                        starterCode: '# Create variables\n',
                        hints: [
                            'No let or var needed!',
                            'Just: language = "Python"',
                            'Print with print(language)'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Python'
                        },
                        buddyMessages: {
                            start: "Python makes variables easy!",
                            success: "Python! Clean and simple!",
                            error: "Make sure to print the language variable"
                        }
                    },
                    {
                        id: 'py-math',
                        title: 'Math Operations',
                        description: 'Calculate with Python',
                        xpReward: 35,
                        instructions: `
                            <p>Python math operators: +, -, *, /, ** (power), // (floor division)</p>
                            <pre>result = 2 ** 3  # 8 (2 to the power of 3)
half = 7 // 2    # 3 (floor division)</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Calculate 2 to the power of 10</li>
                                <li>Store in <code>result</code></li>
                                <li>Print <code>result</code></li>
                            </ol>
                        `,
                        starterCode: '# Calculate 2^10\n',
                        hints: [
                            'Use ** for exponents',
                            '2 ** 10',
                            'Should equal 1024'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '1024'
                        },
                        buddyMessages: {
                            start: "Python has cool math operators!",
                            success: "1024! 2^10 calculated!",
                            error: "2 ** 10 should equal 1024"
                        }
                    },
                    {
                        id: 'py-strings',
                        title: 'String Formatting',
                        description: 'Format text in Python',
                        xpReward: 35,
                        instructions: `
                            <p>Python has powerful string formatting with f-strings:</p>
                            <pre>name = "Alice"
age = 25
print(f"Name: {name}, Age: {age}")</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>item</code> = "laptop"</li>
                                <li>Create <code>price</code> = 999</li>
                                <li>Print "The laptop costs $999" using an f-string</li>
                            </ol>
                        `,
                        starterCode: '# Use f-strings\n',
                        hints: [
                            'f-strings start with f before the quote',
                            'Put variables in {curly braces}',
                            'f"The {item} costs ${price}"'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'The laptop costs $999'
                        },
                        buddyMessages: {
                            start: "f-strings are Python magic!",
                            success: "Beautiful formatting!",
                            error: "Use f-string: f\"The {item} costs ${price}\""
                        }
                    }
                ]
            },
            {
                id: 'py-logic',
                title: 'Logic & Conditions',
                description: 'Make decisions',
                icon: '2',
                lessons: [
                    {
                        id: 'py-if',
                        title: 'If Statements',
                        description: 'Conditional logic in Python',
                        xpReward: 40,
                        instructions: `
                            <p>Python uses indentation for code blocks:</p>
                            <pre>score = 85
if score >= 60:
    print("Pass!")</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>age</code> = 20</li>
                                <li>If age >= 18, print "Adult"</li>
                            </ol>
                        `,
                        starterCode: '# Check age\n',
                        hints: [
                            'Use colon after condition: if age >= 18:',
                            'Indent the code inside with 4 spaces',
                            '20 >= 18 is True'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Adult'
                        },
                        buddyMessages: {
                            start: "Python uses indentation - it's elegant!",
                            success: "Adult! Python if works!",
                            error: "Make sure to indent the print statement"
                        }
                    },
                    {
                        id: 'py-elif',
                        title: 'If-Elif-Else',
                        description: 'Multiple conditions',
                        xpReward: 45,
                        instructions: `
                            <p>Python uses <strong>elif</strong> for multiple conditions:</p>
                            <pre>if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("C")</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>grade</code> = 75</li>
                                <li>If >= 90: print "Excellent"</li>
                                <li>Elif >= 70: print "Good"</li>
                                <li>Else: print "Needs work"</li>
                            </ol>
                        `,
                        starterCode: '# Grade checker\n',
                        hints: [
                            '75 is >= 70 but not >= 90',
                            'So the elif branch runs',
                            'Output should be "Good"'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Good'
                        },
                        buddyMessages: {
                            start: "elif is Python's else-if!",
                            success: "Good! Multiple conditions handled!",
                            error: "75 falls into the >= 70 category"
                        }
                    },
                    {
                        id: 'py-and-or',
                        title: 'And, Or, Not',
                        description: 'Combine conditions',
                        xpReward: 45,
                        instructions: `
                            <p>Python uses readable words for logic:</p>
                            <pre>if age >= 18 and has_id:
    print("Can enter")

if is_weekend or is_holiday:
    print("Day off!")</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>has_ticket</code> = True</li>
                                <li>Create <code>has_id</code> = True</li>
                                <li>If both are True, print "Welcome to the show!"</li>
                            </ol>
                        `,
                        starterCode: '# Check entry requirements\n',
                        hints: [
                            'Use "and" not "&&"',
                            'if has_ticket and has_id:',
                            'Both are True!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Welcome to the show!'
                        },
                        buddyMessages: {
                            start: "Python uses 'and', 'or', 'not' - so readable!",
                            success: "Welcome! Boolean logic in Python!",
                            error: "Both are True, so the condition passes"
                        }
                    },
                    {
                        id: 'py-in',
                        title: 'The in Operator',
                        description: 'Check membership',
                        xpReward: 50,
                        instructions: `
                            <p>The <strong>in</strong> operator checks if something is inside:</p>
                            <pre>if "a" in "cat":
    print("Found!")

fruits = ["apple", "banana"]
if "apple" in fruits:
    print("Have apples!")</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>word</code> = "Python"</li>
                                <li>If "th" in word, print "Found 'th'!"</li>
                            </ol>
                        `,
                        starterCode: '# Check for substring\n',
                        hints: [
                            '"th" is in "Python"',
                            'Use: if "th" in word:',
                            'It will be True!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: "Found 'th'!"
                        },
                        buddyMessages: {
                            start: "'in' is so Pythonic!",
                            success: "Found it! 'in' is powerful!",
                            error: "'th' is in 'Python' - check your condition"
                        }
                    }
                ]
            },
            {
                id: 'py-loops',
                title: 'Loops & Lists',
                description: 'Iteration in Python',
                icon: '3',
                lessons: [
                    {
                        id: 'py-for',
                        title: 'For Loops',
                        description: 'Loop through sequences',
                        xpReward: 45,
                        instructions: `
                            <p>Python's for loop is elegant:</p>
                            <pre>for i in range(5):
    print(i)  # 0, 1, 2, 3, 4</pre>
                            <p><strong>Your task:</strong> Print numbers 1 through 5 using range(1, 6)</p>
                        `,
                        starterCode: '# Count 1 to 5\n',
                        hints: [
                            'range(1, 6) gives 1, 2, 3, 4, 5',
                            'The end number is excluded',
                            'for i in range(1, 6):'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '1\n2\n3\n4\n5'
                        },
                        buddyMessages: {
                            start: "Python for loops are clean!",
                            success: "1 to 5! range() mastered!",
                            error: "Use range(1, 6) to get 1-5"
                        }
                    },
                    {
                        id: 'py-lists',
                        title: 'Lists',
                        description: 'Python\'s arrays',
                        xpReward: 50,
                        instructions: `
                            <p>Lists hold multiple values:</p>
                            <pre>colors = ["red", "green", "blue"]
print(colors[0])  # "red"
colors.append("yellow")
print(len(colors))  # 4</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>numbers</code> = [10, 20, 30]</li>
                                <li>Append 40 to the list</li>
                                <li>Print the length of the list</li>
                            </ol>
                        `,
                        starterCode: '# Work with lists\n',
                        hints: [
                            'Use .append() to add items',
                            'Use len() to get length',
                            'After append, length is 4'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '4'
                        },
                        buddyMessages: {
                            start: "Lists are super useful!",
                            success: "4 items! List operations work!",
                            error: "After appending 40, the list has 4 items"
                        }
                    },
                    {
                        id: 'py-list-loop',
                        title: 'Looping Lists',
                        description: 'Process each item',
                        xpReward: 50,
                        instructions: `
                            <p>Loop through lists directly:</p>
                            <pre>fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>prices</code> = [10, 25, 15, 30]</li>
                                <li>Calculate and print the sum of all prices</li>
                            </ol>
                            <p>Hint: Use a variable to track the total!</p>
                        `,
                        starterCode: '# Sum all prices\n',
                        hints: [
                            'Create total = 0 first',
                            'Loop and add: total += price',
                            '10 + 25 + 15 + 30 = 80'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '80'
                        },
                        buddyMessages: {
                            start: "Let's add up some numbers!",
                            success: "80! Sum calculated!",
                            error: "Sum should be 10+25+15+30 = 80"
                        }
                    },
                    {
                        id: 'py-list-comp',
                        title: 'List Comprehension',
                        description: 'Pythonic list creation',
                        xpReward: 60,
                        instructions: `
                            <p>List comprehension is a powerful Python feature:</p>
                            <pre># Create a list of squares
squares = [x**2 for x in range(5)]
# [0, 1, 4, 9, 16]</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create a list of doubles: [2, 4, 6, 8, 10]</li>
                                <li>Use list comprehension: [x*2 for x in range(1, 6)]</li>
                                <li>Print the list</li>
                            </ol>
                        `,
                        starterCode: '# List comprehension\n',
                        hints: [
                            'doubles = [x*2 for x in range(1, 6)]',
                            'This creates [2, 4, 6, 8, 10]',
                            'Print the whole list'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '[2, 4, 6, 8, 10]'
                        },
                        buddyMessages: {
                            start: "List comprehension is Python magic!",
                            success: "Beautiful! That's Pythonic!",
                            error: "Print should show [2, 4, 6, 8, 10]"
                        }
                    }
                ]
            },
            {
                id: 'py-functions',
                title: 'Functions',
                description: 'Define reusable code',
                icon: '4',
                lessons: [
                    {
                        id: 'py-def',
                        title: 'Defining Functions',
                        description: 'Create functions with def',
                        xpReward: 50,
                        instructions: `
                            <p>Use <strong>def</strong> to define functions:</p>
                            <pre>def greet():
    print("Hello!")

greet()  # Call it</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Define <code>welcome</code> function</li>
                                <li>It should print "Welcome to Python!"</li>
                                <li>Call the function</li>
                            </ol>
                        `,
                        starterCode: '# Define and call a function\n',
                        hints: [
                            'def welcome():',
                            'Indent the print inside',
                            'Call with welcome()'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Welcome to Python!'
                        },
                        buddyMessages: {
                            start: "def is how Python defines functions!",
                            success: "Function works! def mastered!",
                            error: "Make sure to call welcome() after defining it"
                        }
                    },
                    {
                        id: 'py-params',
                        title: 'Parameters',
                        description: 'Pass data to functions',
                        xpReward: 55,
                        instructions: `
                            <p>Functions can have parameters:</p>
                            <pre>def greet(name):
    print(f"Hello, {name}!")

greet("Alice")</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>square</code> that takes a number</li>
                                <li>Print the number squared (n ** 2)</li>
                                <li>Call it with 5</li>
                            </ol>
                        `,
                        starterCode: '# Function with parameter\n',
                        hints: [
                            'def square(n):',
                            'print(n ** 2)',
                            '5 ** 2 = 25'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '25'
                        },
                        buddyMessages: {
                            start: "Parameters make functions flexible!",
                            success: "25! 5 squared!",
                            error: "square(5) should print 25"
                        }
                    },
                    {
                        id: 'py-return',
                        title: 'Return Values',
                        description: 'Send results back',
                        xpReward: 60,
                        instructions: `
                            <p>Return sends a value back:</p>
                            <pre>def add(a, b):
    return a + b

result = add(3, 4)
print(result)  # 7</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>average</code> that takes two numbers</li>
                                <li>Return their average: (a + b) / 2</li>
                                <li>Call with 10 and 20, print result</li>
                            </ol>
                        `,
                        starterCode: '# Calculate average\n',
                        hints: [
                            'return (a + b) / 2',
                            '(10 + 20) / 2 = 15',
                            'Print the returned value'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '15.0'
                        },
                        buddyMessages: {
                            start: "Return is powerful!",
                            success: "15.0! Average calculated!",
                            error: "average(10, 20) should return 15.0"
                        }
                    },
                    {
                        id: 'py-default',
                        title: 'Default Parameters',
                        description: 'Optional arguments',
                        xpReward: 55,
                        instructions: `
                            <p>Parameters can have default values:</p>
                            <pre>def greet(name="Friend"):
    print(f"Hello, {name}!")

greet()         # "Hello, Friend!"
greet("Alice")  # "Hello, Alice!"</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>power</code> with parameters (base, exp=2)</li>
                                <li>Return base ** exp</li>
                                <li>Call power(3) and print result (should use default exp=2)</li>
                            </ol>
                        `,
                        starterCode: '# Default parameter\n',
                        hints: [
                            'def power(base, exp=2):',
                            'return base ** exp',
                            'power(3) uses exp=2, so 3**2=9'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '9'
                        },
                        buddyMessages: {
                            start: "Defaults make functions flexible!",
                            success: "9! Default parameter used!",
                            error: "power(3) with default exp=2 gives 3**2 = 9"
                        }
                    }
                ]
            },
            {
                id: 'py-data',
                title: 'Data Analytics',
                description: 'Working with data',
                icon: '5',
                lessons: [
                    {
                        id: 'py-dict',
                        title: 'Dictionaries',
                        description: 'Key-value data storage',
                        xpReward: 55,
                        instructions: `
                            <p>Dictionaries store key-value pairs:</p>
                            <pre>person = {
    "name": "Alice",
    "age": 25
}
print(person["name"])  # "Alice"</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>data</code> with "product": "Phone", "sales": 150</li>
                                <li>Print the sales value</li>
                            </ol>
                        `,
                        starterCode: '# Use a dictionary\n',
                        hints: [
                            'Use curly braces with key: value',
                            'Access with data["sales"]',
                            'Should print 150'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '150'
                        },
                        buddyMessages: {
                            start: "Dictionaries are like labeled containers!",
                            success: "150 sales! Dict access works!",
                            error: "Print data[\"sales\"]"
                        }
                    },
                    {
                        id: 'py-stats',
                        title: 'Basic Statistics',
                        description: 'Calculate statistics',
                        xpReward: 60,
                        instructions: `
                            <p>Let's calculate some basic stats!</p>
                            <pre>data = [10, 20, 30, 40, 50]
total = sum(data)
avg = total / len(data)
maximum = max(data)
minimum = min(data)</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>scores</code> = [85, 92, 78, 95, 88]</li>
                                <li>Calculate the average</li>
                                <li>Print the average</li>
                            </ol>
                        `,
                        starterCode: '# Calculate average score\n',
                        hints: [
                            'Use sum(scores) / len(scores)',
                            '85+92+78+95+88 = 438',
                            '438 / 5 = 87.6'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '87.6'
                        },
                        buddyMessages: {
                            start: "Statistics in Python!",
                            success: "87.6 average! Data analysis!",
                            error: "Average should be 87.6"
                        }
                    },
                    {
                        id: 'py-filter',
                        title: 'Filtering Data',
                        description: 'Select specific items',
                        xpReward: 65,
                        instructions: `
                            <p>Filter data with conditions:</p>
                            <pre>numbers = [1, 2, 3, 4, 5, 6]
evens = [n for n in numbers if n % 2 == 0]
# [2, 4, 6]</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create <code>temps</code> = [68, 75, 82, 91, 77, 88]</li>
                                <li>Filter to get only temps >= 80</li>
                                <li>Print the filtered list</li>
                            </ol>
                        `,
                        starterCode: '# Filter temperatures\n',
                        hints: [
                            'Use list comprehension with if',
                            '[t for t in temps if t >= 80]',
                            'Should get [82, 91, 88]'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '[82, 91, 88]'
                        },
                        buddyMessages: {
                            start: "Filtering is key in analytics!",
                            success: "Hot days found! Filtering works!",
                            error: "Filter temps >= 80: [82, 91, 88]"
                        }
                    },
                    {
                        id: 'py-data-challenge',
                        title: 'Data Challenge',
                        description: 'Analyze a dataset!',
                        xpReward: 75,
                        instructions: `
                            <p><strong>Challenge:</strong> Analyze sales data!</p>
                            <ol>
                                <li>Create <code>sales</code> = [120, 95, 180, 75, 200, 150]</li>
                                <li>Find the max sale</li>
                                <li>Find the min sale</li>
                                <li>Calculate the range (max - min)</li>
                                <li>Print the range</li>
                            </ol>
                        `,
                        starterCode: '# Analyze sales data\n',
                        hints: [
                            'Use max(sales) and min(sales)',
                            'Range = max - min',
                            '200 - 75 = 125'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '125'
                        },
                        buddyMessages: {
                            start: "Real data analysis time!",
                            success: "125! You're a data analyst now!",
                            error: "Range should be 200 - 75 = 125"
                        }
                    }
                ]
            }
        ]
    },

    cpp: {
        id: 'cpp',
        name: 'C++',
        focus: 'Game Development',
        icon: 'C++',
        description: 'Create games and high-performance apps',
        modules: [
            {
                id: 'cpp-basics',
                title: 'C++ Basics',
                description: 'Variables, types, and output',
                icon: '1',
                lessons: [
                    {
                        id: 'cpp-hello',
                        title: 'Hello, C++!',
                        description: 'Your first C++ program',
                        xpReward: 25,
                        instructions: `
                            <p>C++ uses <strong>cout</strong> for output:</p>
                            <pre>#include &lt;iostream&gt;
using namespace std;

int main() {
    cout << "Hello!" << endl;
    return 0;
}</pre>
                            <p><strong>Your task:</strong> Print "Hello, World!"</p>
                            <p><em>Note: The template code is provided - just fill in the print statement!</em></p>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print Hello, World! here\n    \n    return 0;\n}',
                        hints: [
                            'Use cout << "text" << endl;',
                            'Text needs quotes',
                            'endl creates a new line'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Hello, World!'
                        },
                        buddyMessages: {
                            start: "C++ is powerful! Let's learn it!",
                            success: "Hello World in C++! Great start!",
                            error: "Use cout << \"Hello, World!\" << endl;"
                        }
                    },
                    {
                        id: 'cpp-variables',
                        title: 'Variables & Types',
                        description: 'Declare typed variables',
                        xpReward: 30,
                        instructions: `
                            <p>C++ requires declaring variable types:</p>
                            <pre>int age = 25;
double price = 19.99;
string name = "CodeBuddy";
bool isReady = true;</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create an int <code>score</code> = 100</li>
                                <li>Print the score</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Create and print score\n    \n    return 0;\n}',
                        hints: [
                            'int score = 100;',
                            'cout << score << endl;',
                            'Variables need types in C++'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '100'
                        },
                        buddyMessages: {
                            start: "C++ is strongly typed!",
                            success: "100! You declared a typed variable!",
                            error: "Declare int score = 100; then print it"
                        }
                    },
                    {
                        id: 'cpp-math',
                        title: 'Math Operations',
                        description: 'Arithmetic in C++',
                        xpReward: 35,
                        instructions: `
                            <p>C++ math: +, -, *, /, % (modulo)</p>
                            <pre>int a = 10, b = 3;
cout << a / b << endl;  // 3 (integer division)
cout << a % b << endl;  // 1 (remainder)</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create int <code>x</code> = 17</li>
                                <li>Create int <code>y</code> = 5</li>
                                <li>Print the remainder of x / y</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Calculate remainder\n    \n    return 0;\n}',
                        hints: [
                            'Use % for modulo (remainder)',
                            'x % y gives the remainder',
                            '17 % 5 = 2'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '2'
                        },
                        buddyMessages: {
                            start: "Modulo is useful in games!",
                            success: "2! Remainder calculated!",
                            error: "17 % 5 = 2 (17 = 5*3 + 2)"
                        }
                    },
                    {
                        id: 'cpp-strings',
                        title: 'Strings',
                        description: 'Text in C++',
                        xpReward: 35,
                        instructions: `
                            <p>C++ strings:</p>
                            <pre>string greeting = "Hello";
string name = "World";
cout << greeting + ", " + name << endl;</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create string <code>game</code> = "Space"</li>
                                <li>Create string <code>genre</code> = "Shooter"</li>
                                <li>Print them combined with a space: "Space Shooter"</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Combine strings\n    \n    return 0;\n}',
                        hints: [
                            'Use + to concatenate strings',
                            'game + " " + genre',
                            'Don\'t forget the space!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Space Shooter'
                        },
                        buddyMessages: {
                            start: "Game titles need strings!",
                            success: "Space Shooter! Great game name!",
                            error: "Combine with space: game + \" \" + genre"
                        }
                    }
                ]
            },
            {
                id: 'cpp-logic',
                title: 'Logic & Conditions',
                description: 'Game logic with conditionals',
                icon: '2',
                lessons: [
                    {
                        id: 'cpp-if',
                        title: 'If Statements',
                        description: 'Make decisions',
                        xpReward: 40,
                        instructions: `
                            <p>C++ if statements:</p>
                            <pre>int health = 75;
if (health > 50) {
    cout << "Healthy" << endl;
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create int <code>lives</code> = 3</li>
                                <li>If lives > 0, print "Still playing!"</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Check lives\n    \n    return 0;\n}',
                        hints: [
                            'if (lives > 0) { ... }',
                            'Use curly braces for the block',
                            '3 > 0 is true!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Still playing!'
                        },
                        buddyMessages: {
                            start: "Game logic needs conditions!",
                            success: "Still playing! Life check works!",
                            error: "3 > 0, so it should print the message"
                        }
                    },
                    {
                        id: 'cpp-else',
                        title: 'If-Else',
                        description: 'Two paths',
                        xpReward: 45,
                        instructions: `
                            <p>Handle both cases:</p>
                            <pre>if (score >= 1000) {
    cout << "Winner!" << endl;
} else {
    cout << "Keep trying!" << endl;
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create int <code>playerScore</code> = 750</li>
                                <li>If >= 500, print "Level Complete!"</li>
                                <li>Else print "Try Again"</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Check if level complete\n    \n    return 0;\n}',
                        hints: [
                            '750 >= 500 is true',
                            'So the if branch runs',
                            'Print "Level Complete!"'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Level Complete!'
                        },
                        buddyMessages: {
                            start: "Win or lose - handle both!",
                            success: "Level Complete! You passed!",
                            error: "750 >= 500, so level is complete"
                        }
                    },
                    {
                        id: 'cpp-switch',
                        title: 'Switch Statements',
                        description: 'Multiple choices',
                        xpReward: 50,
                        instructions: `
                            <p>Switch is good for multiple options:</p>
                            <pre>switch (choice) {
    case 1: cout << "Attack"; break;
    case 2: cout << "Defend"; break;
    default: cout << "Wait";
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create int <code>weapon</code> = 2</li>
                                <li>Switch: 1="Sword", 2="Bow", 3="Magic"</li>
                                <li>Print the weapon name</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Weapon selector\n    \n    return 0;\n}',
                        hints: [
                            'weapon is 2, so case 2 runs',
                            'Don\'t forget break;',
                            'Should print "Bow"'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Bow'
                        },
                        buddyMessages: {
                            start: "Switch is great for menus!",
                            success: "Bow selected! Switch mastered!",
                            error: "weapon=2 should match case 2: Bow"
                        }
                    },
                    {
                        id: 'cpp-logical',
                        title: 'Logical Operators',
                        description: 'Combine conditions',
                        xpReward: 50,
                        instructions: `
                            <p>C++ logical operators: && (and), || (or), ! (not)</p>
                            <pre>if (hasKey && doorLocked) {
    cout << "Open door" << endl;
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create bool <code>hasAmmo</code> = true</li>
                                <li>Create bool <code>enemyInRange</code> = true</li>
                                <li>If both true, print "Fire!"</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Check firing conditions\n    \n    return 0;\n}',
                        hints: [
                            'Use && for AND',
                            'if (hasAmmo && enemyInRange)',
                            'Both are true!'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Fire!'
                        },
                        buddyMessages: {
                            start: "Game logic often needs multiple checks!",
                            success: "Fire! Combat logic works!",
                            error: "Both conditions are true - fire away!"
                        }
                    }
                ]
            },
            {
                id: 'cpp-loops',
                title: 'Loops',
                description: 'Game loops and iteration',
                icon: '3',
                lessons: [
                    {
                        id: 'cpp-for',
                        title: 'For Loops',
                        description: 'Counted iteration',
                        xpReward: 45,
                        instructions: `
                            <p>C++ for loop:</p>
                            <pre>for (int i = 0; i < 5; i++) {
    cout << i << endl;
}</pre>
                            <p><strong>Your task:</strong> Print numbers 1 through 5</p>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Count 1 to 5\n    \n    return 0;\n}',
                        hints: [
                            'Start i at 1',
                            'Continue while i <= 5',
                            'Increment with i++'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '1\n2\n3\n4\n5'
                        },
                        buddyMessages: {
                            start: "Game loops are everywhere!",
                            success: "1 to 5! Loop complete!",
                            error: "for (int i = 1; i <= 5; i++)"
                        }
                    },
                    {
                        id: 'cpp-while',
                        title: 'While Loops',
                        description: 'Loop while true',
                        xpReward: 45,
                        instructions: `
                            <p>While loop continues until condition is false:</p>
                            <pre>int hp = 100;
while (hp > 0) {
    hp -= 25;
    cout << "HP: " << hp << endl;
}</pre>
                            <p><strong>Your task:</strong> Count down from 3 to 1, then print "Go!"</p>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Countdown\n    \n    return 0;\n}',
                        hints: [
                            'Start count at 3',
                            'Loop while count >= 1',
                            'Print count, then decrement'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '3\n2\n1\nGo!'
                        },
                        buddyMessages: {
                            start: "Race countdown!",
                            success: "Go! While loop mastered!",
                            error: "Print 3, 2, 1, then Go!"
                        }
                    },
                    {
                        id: 'cpp-arrays',
                        title: 'Arrays',
                        description: 'Store multiple values',
                        xpReward: 55,
                        instructions: `
                            <p>C++ arrays:</p>
                            <pre>int scores[3] = {100, 200, 150};
cout << scores[0] << endl;  // 100</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create int array <code>levels</code> with {1, 2, 3, 4, 5}</li>
                                <li>Print the 3rd element (index 2)</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Array of levels\n    \n    return 0;\n}',
                        hints: [
                            'int levels[5] = {1, 2, 3, 4, 5};',
                            'Index 2 is the 3rd element',
                            'levels[2] = 3'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '3'
                        },
                        buddyMessages: {
                            start: "Arrays store game data!",
                            success: "Level 3! Array indexing works!",
                            error: "levels[2] is the third element: 3"
                        }
                    },
                    {
                        id: 'cpp-loop-array',
                        title: 'Looping Arrays',
                        description: 'Process game data',
                        xpReward: 55,
                        instructions: `
                            <p>Loop through arrays:</p>
                            <pre>int scores[3] = {10, 20, 30};
for (int i = 0; i < 3; i++) {
    cout << scores[i] << endl;
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create int array <code>damage</code> = {25, 50, 75}</li>
                                <li>Loop through and print each value</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print damage values\n    \n    return 0;\n}',
                        hints: [
                            'Array has 3 elements',
                            'Loop i from 0 to 2',
                            'Print damage[i] each iteration'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '25\n50\n75'
                        },
                        buddyMessages: {
                            start: "Process all the damage!",
                            success: "All damage printed!",
                            error: "Print 25, 50, 75 on separate lines"
                        }
                    }
                ]
            },
            {
                id: 'cpp-functions',
                title: 'Functions',
                description: 'Organize game code',
                icon: '4',
                lessons: [
                    {
                        id: 'cpp-func-basic',
                        title: 'Functions',
                        description: 'Create reusable code',
                        xpReward: 50,
                        instructions: `
                            <p>C++ functions need return types:</p>
                            <pre>void sayHi() {
    cout << "Hi!" << endl;
}

int main() {
    sayHi();
    return 0;
}</pre>
                            <p><strong>Your task:</strong> Create a void function <code>startGame</code> that prints "Game Started!" and call it.</p>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\n// Define function here\n\nint main() {\n    // Call function here\n    \n    return 0;\n}',
                        hints: [
                            'void startGame() { ... }',
                            'Define BEFORE main()',
                            'Call with startGame();'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Game Started!'
                        },
                        buddyMessages: {
                            start: "Functions organize game code!",
                            success: "Game Started! Function works!",
                            error: "Create void startGame() that prints the message"
                        }
                    },
                    {
                        id: 'cpp-func-params',
                        title: 'Parameters',
                        description: 'Pass data to functions',
                        xpReward: 55,
                        instructions: `
                            <p>Functions with parameters:</p>
                            <pre>void attack(int damage) {
    cout << "Dealt " << damage << " damage!" << endl;
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create void <code>levelUp</code> that takes int level</li>
                                <li>Print "Reached level " + the level</li>
                                <li>Call it with 5</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\n// Define function\n\nint main() {\n    // Call function\n    \n    return 0;\n}',
                        hints: [
                            'void levelUp(int level)',
                            'Use << to combine text and numbers',
                            'levelUp(5);'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Reached level 5'
                        },
                        buddyMessages: {
                            start: "Pass the level number!",
                            success: "Level 5! Parameters work!",
                            error: "Print \"Reached level \" << level"
                        }
                    },
                    {
                        id: 'cpp-func-return',
                        title: 'Return Values',
                        description: 'Get results back',
                        xpReward: 60,
                        instructions: `
                            <p>Return values from functions:</p>
                            <pre>int calculateDamage(int base, int bonus) {
    return base + bonus;
}</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create int <code>calculateScore</code>(int kills, int bonus)</li>
                                <li>Return kills * 100 + bonus</li>
                                <li>Call with 5 kills and 250 bonus, print result</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\n// Define function\n\nint main() {\n    // Call and print\n    \n    return 0;\n}',
                        hints: [
                            'int calculateScore(int kills, int bonus)',
                            'return kills * 100 + bonus;',
                            '5 * 100 + 250 = 750'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '750'
                        },
                        buddyMessages: {
                            start: "Calculate that score!",
                            success: "750 points! Return value works!",
                            error: "5*100 + 250 = 750"
                        }
                    },
                    {
                        id: 'cpp-game-challenge',
                        title: 'Game Challenge',
                        description: 'Put it together!',
                        xpReward: 75,
                        instructions: `
                            <p><strong>Challenge:</strong> Create a damage calculator!</p>
                            <ol>
                                <li>Create int <code>calculateDamage</code>(int base, int multiplier)</li>
                                <li>Returns base * multiplier</li>
                                <li>Create bool <code>isCritical</code> = true</li>
                                <li>If critical, call with multiplier 2</li>
                                <li>Else call with multiplier 1</li>
                                <li>Base damage is 50, print final damage</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\n// Damage function\n\nint main() {\n    // Critical hit check\n    \n    return 0;\n}',
                        hints: [
                            'Create the function first',
                            'Use if to check isCritical',
                            'Critical: 50 * 2 = 100'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '100'
                        },
                        buddyMessages: {
                            start: "Critical hit system!",
                            success: "100 damage! Critical hit!",
                            error: "Critical = true, so 50 * 2 = 100"
                        }
                    }
                ]
            },
            {
                id: 'cpp-game',
                title: 'Game Concepts',
                description: 'Game programming patterns',
                icon: '5',
                lessons: [
                    {
                        id: 'cpp-structs',
                        title: 'Structs',
                        description: 'Group related data',
                        xpReward: 60,
                        instructions: `
                            <p>Structs group related variables:</p>
                            <pre>struct Player {
    string name;
    int health;
    int score;
};</pre>
                            <p><strong>Your task:</strong></p>
                            <ol>
                                <li>Create a struct <code>Enemy</code> with int health and int damage</li>
                                <li>Create an Enemy with health=100, damage=25</li>
                                <li>Print the enemy's damage</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\n// Define struct\n\nint main() {\n    // Create and use enemy\n    \n    return 0;\n}',
                        hints: [
                            'struct Enemy { int health; int damage; };',
                            'Enemy e; e.health = 100; e.damage = 25;',
                            'Print e.damage'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: '25'
                        },
                        buddyMessages: {
                            start: "Structs organize game objects!",
                            success: "25 damage! Structs work!",
                            error: "Print the enemy's damage value"
                        }
                    },
                    {
                        id: 'cpp-random',
                        title: 'Random Numbers',
                        description: 'Add unpredictability',
                        xpReward: 55,
                        instructions: `
                            <p>Random numbers make games fun:</p>
                            <pre>#include &lt;cstdlib&gt;
#include &lt;ctime&gt;

srand(time(0));  // Seed
int roll = rand() % 6 + 1;  // 1-6</pre>
                            <p><strong>Your task:</strong> For this exercise, just print "Random damage: 50" (we'll simulate randomness)</p>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Simulate random damage\n    int damage = 50;\n    \n    return 0;\n}',
                        hints: [
                            'Use cout to print the message',
                            'Include the variable in output',
                            '"Random damage: " << damage'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Random damage: 50'
                        },
                        buddyMessages: {
                            start: "Randomness adds excitement!",
                            success: "Random systems understood!",
                            error: 'Print "Random damage: " << damage'
                        }
                    },
                    {
                        id: 'cpp-game-loop',
                        title: 'Game Loop Concept',
                        description: 'The heart of every game',
                        xpReward: 65,
                        instructions: `
                            <p>Games run in a loop: Update -> Render -> Repeat</p>
                            <pre>while (gameRunning) {
    processInput();
    updateGame();
    render();
}</pre>
                            <p><strong>Your task:</strong> Simulate 3 game frames by printing "Frame 1", "Frame 2", "Frame 3"</p>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Simulate 3 frames\n    \n    return 0;\n}',
                        hints: [
                            'Use a for loop from 1 to 3',
                            'Print "Frame " << i each iteration',
                            'Will print Frame 1, Frame 2, Frame 3'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'Frame 1\nFrame 2\nFrame 3'
                        },
                        buddyMessages: {
                            start: "The game loop is fundamental!",
                            success: "3 frames rendered! Game loop basics!",
                            error: "Print Frame 1, Frame 2, Frame 3"
                        }
                    },
                    {
                        id: 'cpp-final',
                        title: 'Final Challenge',
                        description: 'Build a mini game system!',
                        xpReward: 100,
                        instructions: `
                            <p><strong>Challenge:</strong> Create a combat round!</p>
                            <ol>
                                <li>Create int <code>playerHP</code> = 100</li>
                                <li>Create int <code>enemyDamage</code> = 30</li>
                                <li>Simulate 3 hits (loop 3 times)</li>
                                <li>Each hit: subtract damage, print "HP: " + current HP</li>
                            </ol>
                        `,
                        starterCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Combat simulation\n    \n    return 0;\n}',
                        hints: [
                            'Loop 3 times',
                            'playerHP -= enemyDamage each time',
                            '100->70->40->10'
                        ],
                        validation: {
                            type: 'output-match',
                            expected: 'HP: 70\nHP: 40\nHP: 10'
                        },
                        buddyMessages: {
                            start: "Final boss: Combat system!",
                            success: "Combat works! You're a game dev now!",
                            error: "After 3 hits: 70, 40, 10"
                        }
                    }
                ]
            }
        ]
    }
};

// Current track (default to JavaScript)
let currentTrack = 'javascript';

// Get current curriculum based on selected track
function getCurrentCurriculum() {
    return { modules: TRACKS[currentTrack].modules };
}

// Set the current track
function setCurrentTrack(trackId) {
    if (TRACKS[trackId]) {
        currentTrack = trackId;
        return true;
    }
    return false;
}

// Get track info
function getTrack(trackId) {
    return TRACKS[trackId];
}

// Get all tracks
function getAllTracks() {
    return Object.values(TRACKS);
}

// Helper functions for accessing curriculum
function getModule(moduleId) {
    const curriculum = getCurrentCurriculum();
    return curriculum.modules.find(m => m.id === moduleId);
}

function getLesson(moduleId, lessonId) {
    const module = getModule(moduleId);
    if (!module) return null;
    return module.lessons.find(l => l.id === lessonId);
}

function getNextLesson(moduleId, lessonId) {
    const curriculum = getCurrentCurriculum();
    const module = getModule(moduleId);
    if (!module) return null;

    const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);

    // Try next lesson in same module
    if (lessonIndex < module.lessons.length - 1) {
        return { moduleId, lessonId: module.lessons[lessonIndex + 1].id };
    }

    // Try first lesson of next module
    const moduleIndex = curriculum.modules.findIndex(m => m.id === moduleId);
    if (moduleIndex < curriculum.modules.length - 1) {
        const nextModule = curriculum.modules[moduleIndex + 1];
        return { moduleId: nextModule.id, lessonId: nextModule.lessons[0].id };
    }

    return null; // No more lessons
}

function getTotalLessons() {
    const curriculum = getCurrentCurriculum();
    return curriculum.modules.reduce((total, module) => total + module.lessons.length, 0);
}

function getAllLessons() {
    const curriculum = getCurrentCurriculum();
    const lessons = [];
    curriculum.modules.forEach(module => {
        module.lessons.forEach(lesson => {
            lessons.push({ moduleId: module.id, ...lesson });
        });
    });
    return lessons;
}

// For backwards compatibility
const CURRICULUM = {
    get modules() {
        return getCurrentCurriculum().modules;
    }
};
