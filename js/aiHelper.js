// CodeBuddy AI Helper - Optional AI API Integration

class AIHelper {
    constructor() {
        this.config = {
            provider: null, // 'openai' or 'anthropic'
            apiKey: null
        };

        this.endpoints = {
            openai: 'https://api.openai.com/v1/chat/completions',
            anthropic: 'https://api.anthropic.com/v1/messages'
        };

        this.loadConfig();
    }

    // Load config from localStorage
    loadConfig() {
        const saved = localStorage.getItem('codeBuddyAI');
        if (saved) {
            try {
                this.config = JSON.parse(saved);
            } catch (e) {
                // Invalid config, use defaults
            }
        }
    }

    // Save config to localStorage
    saveConfig() {
        localStorage.setItem('codeBuddyAI', JSON.stringify(this.config));
    }

    // Set configuration
    setConfig(config) {
        this.config = {
            provider: config.provider || null,
            apiKey: config.apiKey || null
        };
        this.saveConfig();
    }

    // Get current configuration
    getConfig() {
        return { ...this.config };
    }

    // Clear configuration
    clearConfig() {
        this.config = { provider: null, apiKey: null };
        localStorage.removeItem('codeBuddyAI');
    }

    // Check if AI is configured
    isConfigured() {
        return this.config.provider && this.config.apiKey;
    }

    // Ask a question to the AI
    async askQuestion(question, lesson, userCode) {
        if (!this.isConfigured()) {
            return this.getBuiltInResponse(question, lesson);
        }

        const systemPrompt = this.buildSystemPrompt(lesson);
        const userPrompt = this.buildUserPrompt(question, lesson, userCode);

        try {
            if (this.config.provider === 'openai') {
                return await this.callOpenAI(systemPrompt, userPrompt);
            } else if (this.config.provider === 'anthropic') {
                return await this.callAnthropic(systemPrompt, userPrompt);
            }
        } catch (error) {
            console.error('AI API error:', error);
            return this.getBuiltInResponse(question, lesson);
        }
    }

    // Build system prompt for AI
    buildSystemPrompt(lesson) {
        return `You are CodeBuddy, a friendly and encouraging AI coding tutor helping a beginner learn programming.

Your personality:
- Friendly, patient, and encouraging
- Use simple language appropriate for beginners
- Give hints rather than full solutions when possible
- Celebrate small wins
- Break down complex concepts into simple steps

Current lesson: "${lesson?.title || 'Programming basics'}"
Lesson topic: ${lesson?.description || 'Learning to code'}

Teaching approach:
- If asked about syntax, explain it simply with examples
- If code has errors, point to the specific issue without giving the full answer
- Encourage experimentation and learning from mistakes
- Keep responses concise (2-3 paragraphs max)

The student is using a pseudocode language with these commands:
- PRINT "text" - outputs text
- SET variable TO value - creates/assigns variables
- IF condition THEN / ELSE / END - conditionals
- FOR i FROM start TO end DO / END - loops
- WHILE condition DO / END - while loops
- FUNCTION name(params) / RETURN / END - functions
- CALL functionName(args) - call functions
- AND, OR, NOT - boolean operators
- MOD - modulo operator`;
    }

    // Build user prompt
    buildUserPrompt(question, lesson, userCode) {
        let prompt = `Student question: ${question}\n\n`;

        if (lesson) {
            prompt += `Current lesson instructions: ${lesson.instructions?.replace(/<[^>]*>/g, '') || ''}\n\n`;
        }

        if (userCode && userCode.trim()) {
            prompt += `Student's current code:\n\`\`\`\n${userCode}\n\`\`\`\n\n`;
        }

        prompt += 'Please provide a helpful, encouraging response.';
        return prompt;
    }

    // Call OpenAI API
    async callOpenAI(systemPrompt, userPrompt) {
        const response = await fetch(this.endpoints.openai, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
    }

    // Call Anthropic API
    async callAnthropic(systemPrompt, userPrompt) {
        const response = await fetch(this.endpoints.anthropic, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.config.apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 500,
                system: systemPrompt,
                messages: [
                    { role: 'user', content: userPrompt }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.status}`);
        }

        const data = await response.json();
        return data.content[0]?.text || 'Sorry, I couldn\'t generate a response.';
    }

    // Get built-in response when AI is not configured
    getBuiltInResponse(question, lesson) {
        const questionLower = question.toLowerCase();

        // Check for common question patterns
        if (questionLower.includes('help') || questionLower.includes('hint')) {
            if (lesson?.hints && lesson.hints.length > 0) {
                return `Here's a hint: ${lesson.hints[0]}`;
            }
            return "Try breaking down the problem into smaller steps. What's the first thing you need to do?";
        }

        if (questionLower.includes('print') || questionLower.includes('output')) {
            return 'To display text, use PRINT followed by your text in quotes. For example: PRINT "Hello!"';
        }

        if (questionLower.includes('variable') || questionLower.includes('set')) {
            return 'To create a variable, use SET followed by the variable name and TO with the value. For example: SET score TO 100';
        }

        if (questionLower.includes('if') || questionLower.includes('condition')) {
            return 'IF statements let you make decisions. Structure: IF condition THEN ... END. Use ELSE for an alternative path.';
        }

        if (questionLower.includes('loop') || questionLower.includes('for') || questionLower.includes('while')) {
            return 'FOR loops count through numbers: FOR i FROM 1 TO 5 DO ... END. WHILE loops repeat while a condition is true.';
        }

        if (questionLower.includes('function')) {
            return 'Functions are reusable code blocks. Define with FUNCTION name() ... END, call with CALL name(). Use RETURN to send back a value.';
        }

        if (questionLower.includes('error') || questionLower.includes('wrong')) {
            return 'Check your syntax carefully! Common issues: missing quotes around text, forgetting END to close blocks, or typos in keywords.';
        }

        if (questionLower.includes('stuck')) {
            return "Being stuck is normal! Try re-reading the instructions, look at your code line by line, or use the Hint button for guidance.";
        }

        // Default response
        return `That's a great question! For this lesson, focus on: ${lesson?.description || 'the fundamentals'}. Try the Hint button if you need specific guidance!`;
    }

    // Get enhanced hint (combines lesson hint with AI explanation)
    async getEnhancedHint(lesson, userCode) {
        if (!lesson) return "Try reading the instructions again carefully!";

        const basicHint = lesson.hints?.[0] || "Think about what the lesson is asking you to do.";

        if (!this.isConfigured()) {
            return basicHint;
        }

        try {
            const response = await this.askQuestion(
                "I'm stuck and need a hint. Can you help me understand what I should do next?",
                lesson,
                userCode
            );
            return response;
        } catch (error) {
            return basicHint;
        }
    }

    // Get code feedback
    async getCodeFeedback(lesson, userCode, validationResult) {
        if (!this.isConfigured()) {
            if (validationResult.passed) {
                return lesson?.buddyMessages?.success || "Great job! Your code works correctly!";
            } else {
                return lesson?.buddyMessages?.error || "Not quite right. Check your code and try again!";
            }
        }

        const question = validationResult.passed
            ? "My code worked! Can you explain why it's correct?"
            : "My code isn't working. Can you help me understand what's wrong without giving the answer?";

        try {
            return await this.askQuestion(question, lesson, userCode);
        } catch (error) {
            return validationResult.passed
                ? lesson?.buddyMessages?.success || "Correct!"
                : lesson?.buddyMessages?.error || "Keep trying!";
        }
    }
}

// Create global instance
const aiHelper = new AIHelper();
