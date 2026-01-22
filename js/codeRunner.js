// CodeBuddy Code Runner - Multi-Language Execution

class CodeRunner {
    constructor() {
        this.output = [];
        this.maxExecutionTime = 3000;
        this.maxIterations = 10000;
        this.currentLanguage = 'javascript';
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
    }

    // Execute code based on current language
    execute(code) {
        switch (this.currentLanguage) {
            case 'javascript':
                return this.executeJavaScript(code);
            case 'python':
                return this.executePython(code);
            case 'cpp':
                return this.executeCpp(code);
            default:
                return this.executeJavaScript(code);
        }
    }

    // Execute JavaScript directly
    executeJavaScript(code) {
        this.output = [];
        let error = null;

        try {
            const __print = (value) => {
                this.output.push(String(value));
            };

            let iterations = 0;
            const checkIterations = () => {
                iterations++;
                if (iterations > this.maxIterations) {
                    throw new Error('Too many iterations! Check for infinite loops.');
                }
            };

            // Replace console.log with our capture function
            let safeCode = code.replace(/console\.log\s*\(/g, '__print(');

            // Add iteration checks to loops
            safeCode = safeCode.replace(
                /for\s*\([^)]+\)\s*\{/g,
                (match) => match.replace('{', '{ __checkIterations();')
            );
            safeCode = safeCode.replace(
                /while\s*\([^)]+\)\s*\{/g,
                (match) => match.replace('{', '{ __checkIterations();')
            );

            const wrappedCode = `
                "use strict";
                ${safeCode}
            `;

            const fn = new Function('__print', '__checkIterations', wrappedCode);
            fn(__print, checkIterations);

        } catch (e) {
            error = this.formatError(e, 'javascript');
        }

        return {
            output: this.output.join('\n'),
            error: error,
            success: error === null
        };
    }

    // Simulate Python execution
    executePython(code) {
        this.output = [];
        let error = null;

        try {
            // Transpile Python to JavaScript for execution
            let jsCode = this.transpilePythonToJS(code);

            const __print = (value) => {
                // Handle Python list representation
                if (Array.isArray(value)) {
                    this.output.push('[' + value.join(', ') + ']');
                } else {
                    this.output.push(String(value));
                }
            };

            let iterations = 0;
            const checkIterations = () => {
                iterations++;
                if (iterations > this.maxIterations) {
                    throw new Error('Too many iterations! Check for infinite loops.');
                }
            };

            // Add iteration checks
            jsCode = jsCode.replace(
                /for\s*\([^)]+\)\s*\{/g,
                (match) => match.replace('{', '{ __checkIterations();')
            );
            jsCode = jsCode.replace(
                /while\s*\([^)]+\)\s*\{/g,
                (match) => match.replace('{', '{ __checkIterations();')
            );

            const wrappedCode = `
                "use strict";
                ${jsCode}
            `;

            const fn = new Function('__print', '__checkIterations', wrappedCode);
            fn(__print, checkIterations);

        } catch (e) {
            error = this.formatError(e, 'python');
        }

        return {
            output: this.output.join('\n'),
            error: error,
            success: error === null
        };
    }

    // Transpile basic Python to JavaScript
    transpilePythonToJS(code) {
        let js = code;
        const lines = code.split('\n');
        const transpiledLines = [];
        let indentStack = [0];
        let inFunction = false;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            const trimmed = line.trim();

            // Skip comments and empty lines
            if (trimmed === '' || trimmed.startsWith('#')) {
                if (trimmed.startsWith('#')) {
                    transpiledLines.push(line.replace('#', '//'));
                } else {
                    transpiledLines.push('');
                }
                continue;
            }

            // Calculate current indentation
            const currentIndent = line.search(/\S/);
            if (currentIndent === -1) continue;

            // Handle dedentation (close braces)
            while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
                indentStack.pop();
                transpiledLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
            }

            // Handle print()
            line = line.replace(/print\s*\(f"([^"]*)"\)/g, (match, content) => {
                // Handle f-strings
                let result = content.replace(/\{([^}]+)\}/g, '" + $1 + "');
                return `__print("${result}")`;
            });
            line = line.replace(/print\s*\(([^)]+)\)/g, '__print($1)');

            // Handle def (function definition)
            if (trimmed.startsWith('def ')) {
                const match = trimmed.match(/def\s+(\w+)\s*\(([^)]*)\)\s*:/);
                if (match) {
                    line = ' '.repeat(currentIndent) + `function ${match[1]}(${match[2]}) {`;
                    indentStack.push(currentIndent + 4);
                    inFunction = true;
                    transpiledLines.push(line);
                    continue;
                }
            }

            // Handle if/elif/else
            if (trimmed.startsWith('if ') && trimmed.endsWith(':')) {
                const condition = trimmed.slice(3, -1);
                line = ' '.repeat(currentIndent) + `if (${this.pythonConditionToJS(condition)}) {`;
                indentStack.push(currentIndent + 4);
            } else if (trimmed.startsWith('elif ') && trimmed.endsWith(':')) {
                // Close previous block first
                transpiledLines.push(' '.repeat(currentIndent) + '} else');
                const condition = trimmed.slice(5, -1);
                line = ' '.repeat(currentIndent) + `if (${this.pythonConditionToJS(condition)}) {`;
                indentStack.push(currentIndent + 4);
            } else if (trimmed === 'else:') {
                transpiledLines.push(' '.repeat(currentIndent) + '} else {');
                indentStack.push(currentIndent + 4);
                continue;
            }

            // Handle for loops
            if (trimmed.startsWith('for ') && trimmed.endsWith(':')) {
                const forMatch = trimmed.match(/for\s+(\w+)\s+in\s+range\s*\(([^)]+)\)\s*:/);
                if (forMatch) {
                    const varName = forMatch[1];
                    const rangeArgs = forMatch[2].split(',').map(s => s.trim());
                    let start = '0', end, step = '1';
                    if (rangeArgs.length === 1) {
                        end = rangeArgs[0];
                    } else if (rangeArgs.length === 2) {
                        start = rangeArgs[0];
                        end = rangeArgs[1];
                    } else {
                        start = rangeArgs[0];
                        end = rangeArgs[1];
                        step = rangeArgs[2];
                    }
                    line = ' '.repeat(currentIndent) + `for (let ${varName} = ${start}; ${varName} < ${end}; ${varName} += ${step}) {`;
                    indentStack.push(currentIndent + 4);
                } else {
                    // for x in list:
                    const listMatch = trimmed.match(/for\s+(\w+)\s+in\s+(\w+)\s*:/);
                    if (listMatch) {
                        line = ' '.repeat(currentIndent) + `for (let ${listMatch[1]} of ${listMatch[2]}) {`;
                        indentStack.push(currentIndent + 4);
                    }
                }
            }

            // Handle while loops
            if (trimmed.startsWith('while ') && trimmed.endsWith(':')) {
                const condition = trimmed.slice(6, -1);
                line = ' '.repeat(currentIndent) + `while (${this.pythonConditionToJS(condition)}) {`;
                indentStack.push(currentIndent + 4);
            }

            // Handle return
            line = line.replace(/^\s*return\s+/, (match) => match.replace('return', 'return '));

            // Handle variable assignments and operators
            line = line.replace(/\bTrue\b/g, 'true');
            line = line.replace(/\bFalse\b/g, 'false');
            line = line.replace(/\bNone\b/g, 'null');
            line = line.replace(/\band\b/g, '&&');
            line = line.replace(/\bor\b/g, '||');
            line = line.replace(/\bnot\b/g, '!');

            // Handle list comprehension (basic)
            const listCompMatch = line.match(/(\w+)\s*=\s*\[(.+)\s+for\s+(\w+)\s+in\s+range\(([^)]+)\)(\s+if\s+.+)?\]/);
            if (listCompMatch) {
                const varName = listCompMatch[1];
                const expr = listCompMatch[2];
                const iterVar = listCompMatch[3];
                const rangeArgs = listCompMatch[4].split(',').map(s => s.trim());
                const condition = listCompMatch[5] ? listCompMatch[5].replace('if', '&&') : '';

                let start = '0', end;
                if (rangeArgs.length === 1) {
                    end = rangeArgs[0];
                } else {
                    start = rangeArgs[0];
                    end = rangeArgs[1];
                }

                line = ' '.repeat(currentIndent) + `let ${varName} = []; for (let ${iterVar} = ${start}; ${iterVar} < ${end}; ${iterVar}++) { ${varName}.push(${expr.replace(new RegExp('\\b' + iterVar + '\\b', 'g'), iterVar)}); }`;
            }

            // Handle .append()
            line = line.replace(/\.append\s*\(([^)]+)\)/g, '.push($1)');

            // Add let for variable declarations if not already present
            const assignMatch = line.match(/^(\s*)(\w+)\s*=\s*(.+)$/);
            if (assignMatch && !line.includes('let ') && !line.includes('function') && !line.includes('for ') && !line.includes('if ') && !line.includes('while ')) {
                const indent = assignMatch[1];
                const varName = assignMatch[2];
                const value = assignMatch[3];
                // Check if it's not a property assignment
                if (!varName.includes('.') && !varName.includes('[')) {
                    line = `${indent}let ${varName} = ${value};`;
                }
            }

            // Add semicolons if needed
            if (!line.trim().endsWith('{') && !line.trim().endsWith('}') && !line.trim().endsWith(';') && !line.trim().startsWith('//') && line.trim() !== '') {
                line = line + ';';
            }

            transpiledLines.push(line);
        }

        // Close any remaining open blocks
        while (indentStack.length > 1) {
            indentStack.pop();
            transpiledLines.push('}');
        }

        return transpiledLines.join('\n');
    }

    pythonConditionToJS(condition) {
        return condition
            .replace(/\band\b/g, '&&')
            .replace(/\bor\b/g, '||')
            .replace(/\bnot\b/g, '!')
            .replace(/\bTrue\b/g, 'true')
            .replace(/\bFalse\b/g, 'false')
            .replace(/\b(\w+)\s+in\s+"([^"]+)"/g, '"$2".includes($1)')
            .replace(/\b"([^"]+)"\s+in\s+(\w+)/g, '$2.includes("$1")');
    }

    // Simulate C++ execution
    executeCpp(code) {
        this.output = [];
        let error = null;

        try {
            let jsCode = this.transpileCppToJS(code);

            const __print = (value) => {
                this.output.push(String(value));
            };

            let iterations = 0;
            const checkIterations = () => {
                iterations++;
                if (iterations > this.maxIterations) {
                    throw new Error('Too many iterations!');
                }
            };

            jsCode = jsCode.replace(
                /for\s*\([^)]+\)\s*\{/g,
                (match) => match.replace('{', '{ __checkIterations();')
            );
            jsCode = jsCode.replace(
                /while\s*\([^)]+\)\s*\{/g,
                (match) => match.replace('{', '{ __checkIterations();')
            );

            const wrappedCode = `
                "use strict";
                ${jsCode}
            `;

            const fn = new Function('__print', '__checkIterations', wrappedCode);
            fn(__print, checkIterations);

        } catch (e) {
            error = this.formatError(e, 'cpp');
        }

        return {
            output: this.output.join('\n'),
            error: error,
            success: error === null
        };
    }

    // Transpile basic C++ to JavaScript
    transpileCppToJS(code) {
        let js = code;

        // Remove includes and using namespace
        js = js.replace(/#include\s*<[^>]+>/g, '');
        js = js.replace(/using\s+namespace\s+\w+\s*;/g, '');

        // Handle cout
        js = js.replace(/cout\s*<<\s*"([^"]*)"(?:\s*<<\s*endl)?\s*;/g, '__print("$1");');
        js = js.replace(/cout\s*<<\s*(\w+)(?:\s*<<\s*endl)?\s*;/g, '__print($1);');
        js = js.replace(/cout\s*<<\s*"([^"]*)"\s*<<\s*(\w+)(?:\s*<<\s*endl)?\s*;/g, '__print("$1" + $2);');
        js = js.replace(/cout\s*<<\s*"([^"]*)"\s*<<\s*(\w+)\s*<<\s*"([^"]*)"(?:\s*<<\s*endl)?\s*;/g, '__print("$1" + $2 + "$3");');

        // Handle complex cout with multiple <<
        js = js.replace(/cout\s*((?:<<[^;]+)+)\s*;/g, (match, parts) => {
            let result = parts
                .replace(/<<\s*endl/g, '')
                .replace(/<<\s*/g, ' + ')
                .trim();
            if (result.startsWith('+')) result = result.slice(1).trim();
            return `__print(${result});`;
        });

        // Handle variable declarations
        js = js.replace(/\bint\s+(\w+)\s*=\s*([^;]+);/g, 'let $1 = $2;');
        js = js.replace(/\bint\s+(\w+)\s*;/g, 'let $1;');
        js = js.replace(/\bdouble\s+(\w+)\s*=\s*([^;]+);/g, 'let $1 = $2;');
        js = js.replace(/\bfloat\s+(\w+)\s*=\s*([^;]+);/g, 'let $1 = $2;');
        js = js.replace(/\bstring\s+(\w+)\s*=\s*([^;]+);/g, 'let $1 = $2;');
        js = js.replace(/\bbool\s+(\w+)\s*=\s*([^;]+);/g, 'let $1 = $2;');

        // Handle arrays
        js = js.replace(/\bint\s+(\w+)\s*\[\s*\d*\s*\]\s*=\s*\{([^}]+)\}\s*;/g, 'let $1 = [$2];');

        // Handle void functions
        js = js.replace(/\bvoid\s+(\w+)\s*\(([^)]*)\)\s*\{/g, 'function $1($2) {');

        // Handle int functions
        js = js.replace(/\bint\s+(\w+)\s*\(([^)]*)\)\s*\{/g, 'function $1($2) {');

        // Handle main function - extract just the body
        const mainMatch = js.match(/int\s+main\s*\(\s*\)\s*\{([\s\S]*?)\breturn\s+0\s*;\s*\}/);
        if (mainMatch) {
            // Keep functions defined before main
            const beforeMain = js.substring(0, js.indexOf('int main'));
            const mainBody = mainMatch[1];
            js = beforeMain + mainBody;
        }

        // Handle struct (basic support)
        js = js.replace(/\bstruct\s+(\w+)\s*\{([^}]+)\}\s*;/g, (match, name, body) => {
            return `// struct ${name}`;
        });

        // Handle struct instance creation
        js = js.replace(/(\w+)\s+(\w+)\s*;(?=\s*\2\.)/g, 'let $2 = {};');

        // Handle function parameters with types
        js = js.replace(/\(int\s+(\w+)/g, '($1');
        js = js.replace(/,\s*int\s+(\w+)/g, ', $1');
        js = js.replace(/\(string\s+(\w+)/g, '($1');
        js = js.replace(/,\s*string\s+(\w+)/g, ', $1');
        js = js.replace(/\(bool\s+(\w+)/g, '($1');
        js = js.replace(/,\s*bool\s+(\w+)/g, ', $1');

        // Handle switch statement
        // (kept as is since JS switch is similar)

        // Clean up
        js = js.replace(/return\s+0\s*;/g, '');
        js = js.trim();

        return js;
    }

    // Format error messages
    formatError(error, language) {
        let message = error.message || String(error);

        const langNames = {
            javascript: 'JavaScript',
            python: 'Python',
            cpp: 'C++'
        };

        if (message.includes('is not defined')) {
            const varMatch = message.match(/(\w+) is not defined/);
            if (varMatch) {
                message = `Variable "${varMatch[1]}" doesn't exist. Did you forget to create it?`;
            }
        } else if (message.includes('Unexpected token')) {
            message = 'Syntax error! Check for typos or missing punctuation.';
        } else if (message.includes('is not a function')) {
            const fnMatch = message.match(/(\w+) is not a function/);
            if (fnMatch) {
                message = `"${fnMatch[1]}" is not a function. Did you define it correctly?`;
            }
        }

        return `${langNames[language] || 'Code'} Error: ${message}`;
    }

    // Validate code output
    validate(code, validation) {
        const result = this.execute(code);

        if (!result.success) {
            return {
                passed: false,
                message: result.error,
                output: result.output
            };
        }

        switch (validation.type) {
            case 'output-match':
                const outputNormalized = result.output.trim();
                const expectedNormalized = validation.expected.trim();
                const passed = outputNormalized === expectedNormalized;
                return {
                    passed,
                    message: passed ? 'Correct!' : `Expected:\n${expectedNormalized}\n\nGot:\n${outputNormalized}`,
                    output: result.output
                };

            case 'output-contains':
                const contains = result.output.includes(validation.expected);
                return {
                    passed: contains,
                    message: contains ? 'Correct!' : `Output should contain: ${validation.expected}`,
                    output: result.output
                };

            default:
                return {
                    passed: result.success,
                    message: result.success ? 'Code ran successfully!' : result.error,
                    output: result.output
                };
        }
    }

    run(code) {
        return this.execute(code);
    }
}

const codeRunner = new CodeRunner();
