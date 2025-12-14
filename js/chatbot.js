// SmartPotholes AI Chatbot
class SmartPotholesChatbot {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.addMessage('bot', '👋 Hello! I\'m your SmartPotholes AI Assistant. How can I help you today?');
        this.showQuickQuestions();
    }

    addMessage(type, content) {
        const message = {
            type: type,
            content: content,
            timestamp: new Date()
        };

        this.messages.push(message);
        this.renderMessage(message);
    }

    renderMessage(message) {
        const chatWindow = document.getElementById('chatWindow');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;

        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${message.type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'}
            </div>
            <div class="message-content">
                ${message.content}
            </div>
        `;

        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    showTyping() {
        this.isTyping = true;
        const chatWindow = document.getElementById('chatWindow');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typingIndicator';

        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-typing">
                <span>AI is thinking</span>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        chatWindow.appendChild(typingDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    showQuickQuestions() {
        const quickQuestions = document.getElementById('quickQuestions');
        if (quickQuestions) {
            quickQuestions.style.display = 'grid';
        }
    }

    hideQuickQuestions() {
        const quickQuestions = document.getElementById('quickQuestions');
        if (quickQuestions) {
            quickQuestions.style.display = 'none';
        }
    }

    async sendMessage(message) {
        if (this.isTyping) return;

        this.addMessage('user', message);
        this.hideQuickQuestions();

        this.showTyping();

        // Simulate AI thinking time
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage('bot', response);
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase().trim();

        // Report potholes
        if (lowerMessage.includes('report') || lowerMessage.includes('pothole') || lowerMessage.includes('submit')) {
            return `📸 <strong>How to Report a Pothole:</strong><br><br>
            1. 📍 Go to the <strong>Report Pothole</strong> page<br>
            2. 🖼️ Take a clear photo of the pothole<br>
            3. 📍 Choose location (GPS auto-detects or manual entry)<br>
            4. 📝 Add your name and phone number<br>
            5. ✅ Submit the report<br><br>
            Your report will be reviewed by our team within 24 hours! 🚀`;
        }

        // Check status
        if (lowerMessage.includes('status') || lowerMessage.includes('check') || lowerMessage.includes('track')) {
            return `📊 <strong>Check Repair Status:</strong><br><br>
            1. 🏠 Visit the <strong>Dashboard</strong> page<br>
            2. 🔍 View all reported potholes<br>
            3. 👷 See assigned officers<br>
            4. 🔥 Track live repair progress<br>
            5. 💬 Read admin updates<br><br>
            Status updates happen in real-time! ⏱️`;
        }

        // Repair tracking
        if (lowerMessage.includes('repair') || lowerMessage.includes('tracking') || lowerMessage.includes('progress')) {
            return `🔥 <strong>Live Repair Tracking:</strong><br><br>
            Our system provides <strong>6-step repair tracking</strong>:<br><br>
            ✅ 1. <strong>Reported</strong> - Your report received<br>
            👮 2. <strong>Officer Assigned</strong> - Team member assigned<br>
            🚶 3. <strong>Worker Reached</strong> - On-site arrival<br>
            📦 4. <strong>Material Arriving</strong> - Equipment delivered<br>
            🔧 5. <strong>Work Started</strong> - Repair begins<br>
            ✅ 6. <strong>Completed</strong> - Job finished<br><br>
            Just like Swiggy/Zomato delivery tracking! 🚚`;
        }

        // Admin features
        if (lowerMessage.includes('admin') || lowerMessage.includes('login') || lowerMessage.includes('manage')) {
            return `👨‍💼 <strong>Admin Features:</strong><br><br>
            Admin portal includes:<br><br>
            🔐 <strong>Secure Login</strong> - Protected access<br>
            📊 <strong>Dashboard</strong> - All reports overview<br>
            👷 <strong>Officer Assignment</strong> - Assign repair teams<br>
            📝 <strong>Status Updates</strong> - Update repair progress<br>
            💬 <strong>Admin Messages</strong> - Communicate with users<br>
            📈 <strong>Analytics</strong> - Performance metrics<br><br>
            Access: <strong>/admin-login.html</strong> (admin/admin123) 🔑`;
        }

        // Contact information
        if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
            return `📞 <strong>Contact Information:</strong><br><br>
            📧 <strong>Email:</strong> support@smartpotholes.com<br>
            📱 <strong>Phone:</strong> +1 (555) 123-POTH<br>
            📍 <strong>Address:</strong> Making Cities Safer Worldwide<br><br>
            🕒 <strong>Response Time:</strong> Within 24 hours<br>
            💬 <strong>Emergency:</strong> Call local authorities for immediate danger<br><br>
            We're here to help! 🤝`;
        }

        // Safety guidelines
        if (lowerMessage.includes('safety') || lowerMessage.includes('guideline') || lowerMessage.includes('danger')) {
            return `🛡️ <strong>Safety Guidelines:</strong><br><br>
            🚨 <strong>Stay Safe While Reporting:</strong><br><br>
            🚗 Never stand in traffic lanes<br>
            📸 Use your phone's camera safely<br>
            🚨 Report dangerous potholes immediately<br>
            🚔 Call emergency services for severe damage<br>
            👟 Wear reflective clothing at night<br><br>
            Your safety comes first! 🛟`;
        }

        // About the system
        if (lowerMessage.includes('about') || lowerMessage.includes('what') || lowerMessage.includes('how')) {
            return `🌟 <strong>About SmartPotholes:</strong><br><br>
            We're an <strong>AI-powered platform</strong> that makes roads safer through:<br><br>
            🤖 <strong>Smart Technology</strong> - AI analysis & GPS tracking<br>
            👥 <strong>Community Driven</strong> - Citizen participation<br>
            📊 <strong>Real-time Updates</strong> - Live repair tracking<br>
            👷 <strong>Professional Management</strong> - Expert repair teams<br>
            🔒 <strong>Secure & Transparent</strong> - Privacy protected<br><br>
            Together we're building safer cities! 🏙️`;
        }

        // FAQ responses
        if (lowerMessage.includes('photo') || lowerMessage.includes('image')) {
            return `🖼️ <strong>Photo Guidelines:</strong><br><br>
            📸 <strong>Take clear photos:</strong><br>
            • Good lighting (daylight preferred)<br>
            • Show pothole size and depth<br>
            • Include surrounding context<br>
            • Multiple angles if possible<br>
            • Focus on the damage area<br><br>
            Better photos = Faster repairs! 📷`;
        }

        if (lowerMessage.includes('location') || lowerMessage.includes('gps')) {
            return `📍 <strong>Location Options:</strong><br><br>
            🎯 <strong>GPS Auto-detection:</strong> One-click location<br>
            ✏️ <strong>Manual Address:</strong> Type any address<br>
            🗺️ <strong>Map Selection:</strong> Click on interactive map<br>
            📍 <strong>Precise Pinning:</strong> Exact coordinates saved<br><br>
            We support all Indian cities! 🇮🇳`;
        }

        if (lowerMessage.includes('time') || lowerMessage.includes('how long')) {
            return `⏱️ <strong>Processing Times:</strong><br><br>
            📝 <strong>Report Review:</strong> Within 24 hours<br>
            👷 <strong>Officer Assignment:</strong> 1-2 days<br>
            🔧 <strong>Repair Start:</strong> 3-7 days (based on priority)<br>
            ✅ <strong>Completion:</strong> 1-3 weeks<br><br>
            Emergency repairs: <strong>Same day!</strong> 🚨`;
        }

        // Default responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return `👋 Hello! Welcome to SmartPotholes! I'm here to help you with:<br><br>
            📸 Reporting potholes<br>
            📊 Checking repair status<br>
            👷 Understanding the process<br>
            📞 Contact information<br>
            🛡️ Safety guidelines<br><br>
            What would you like to know? 🤔`;
        }

        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return `🙏 You're welcome! Happy to help make our roads safer! 🛣️<br><br>
            Remember: <strong>Every report counts!</strong> Your contribution helps create safer communities for everyone. 🌟<br><br>
            Have a great day! 😊`;
        }

        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return `👋 Goodbye! Thanks for using SmartPotholes. Stay safe on the roads! 🛣️<br><br>
            Don't forget to report any potholes you see! 📸`;
        }

        // Generic help
        return `🤔 I can help you with:<br><br>
        📸 <strong>How to report potholes</strong><br>
        📊 <strong>Check repair status</strong><br>
        👷 <strong>Officer assignments & tracking</strong><br>
        📞 <strong>Contact information</strong><br>
        🛡️ <strong>Safety guidelines</strong><br>
        ℹ️ <strong>About our platform</strong><br><br>
        What specific question do you have? Feel free to ask anything! 💬`;
    }
}

// Global functions for HTML onclick handlers
function askQuestion(question) {
    if (window.chatbot) {
        window.chatbot.sendMessage(question);
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (message) {
        window.chatbot.sendMessage(message);
        input.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.chatbot = new SmartPotholesChatbot();
});
