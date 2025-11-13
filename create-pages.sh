#!/bin/bash

# Create all remaining pages for the INCX.net website

# Function to create a page with standard layout
create_page() {
    local filename="$1"
    local title="$2"
    local description="$3"
    local content="$4"

    cat > "$filename" << 'EOF'
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TITLE_PLACEHOLDER - Interconnecx</title>
    <meta name="description" content="DESC_PLACEHOLDER">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Tailwind CSS -->
    <link rel="stylesheet" href="css/output.css">

    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-['Inter'] transition-colors duration-200">

    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="flex items-baseline">
                        <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">INCX</span>
                        <span class="text-2xl text-gray-600 dark:text-gray-400">.net</span>
                    </a>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</a>
                    <a href="/dedicated-servers.html" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Dedicated Servers</a>
                    <a href="/vps.html" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">VPS</a>
                    <a href="/colocation.html" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Colocation</a>
                    <a href="/network.html" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Network</a>
                    <a href="/about.html" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</a>
                    <a href="/contact.html" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors NAV_ACTIVE">Contact</a>
                </div>
                <div class="flex items-center space-x-4">
                    <button id="darkModeToggle" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <svg class="w-5 h-5 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <a href="/client-portal.html" class="hidden sm:inline-flex btn btn-primary">
                        Client Area
                    </a>
                    <button id="mobileMenuToggle" class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="mobileMenu" class="hidden md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
                <div class="flex flex-col space-y-2">
                    <a href="/" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Home</a>
                    <a href="/dedicated-servers.html" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Dedicated Servers</a>
                    <a href="/vps.html" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">VPS</a>
                    <a href="/colocation.html" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Colocation</a>
                    <a href="/network.html" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Network</a>
                    <a href="/about.html" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">About</a>
                    <a href="/contact.html" class="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
                    <a href="/client-portal.html" class="px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">Client Area</a>
                </div>
            </div>
        </div>
    </nav>

    CONTENT_PLACEHOLDER

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-black text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div>
                    <h3 class="text-white font-bold mb-4">Services</h3>
                    <ul class="space-y-2">
                        <li><a href="/dedicated-servers.html" class="hover:text-primary-400 transition-colors">Dedicated Servers</a></li>
                        <li><a href="/vps.html" class="hover:text-primary-400 transition-colors">VPS Hosting</a></li>
                        <li><a href="/colocation.html" class="hover:text-primary-400 transition-colors">Colocation</a></li>
                        <li><a href="#" class="hover:text-primary-400 transition-colors">Fiber Internet</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-white font-bold mb-4">Company</h3>
                    <ul class="space-y-2">
                        <li><a href="/about.html" class="hover:text-primary-400 transition-colors">About Us</a></li>
                        <li><a href="/network.html" class="hover:text-primary-400 transition-colors">Network</a></li>
                        <li><a href="#" class="hover:text-primary-400 transition-colors">Data Centers</a></li>
                        <li><a href="#" class="hover:text-primary-400 transition-colors">Testimonials</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-white font-bold mb-4">Support</h3>
                    <ul class="space-y-2">
                        <li><a href="/knowledge-base.html" class="hover:text-primary-400 transition-colors">Knowledge Base</a></li>
                        <li><a href="/network-status.html" class="hover:text-primary-400 transition-colors">Network Status</a></li>
                        <li><a href="/contact.html" class="hover:text-primary-400 transition-colors">Contact Support</a></li>
                        <li><a href="/client-portal.html" class="hover:text-primary-400 transition-colors">Client Portal</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-white font-bold mb-4">Contact</h3>
                    <ul class="space-y-2">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-phone text-primary-400"></i>
                            <span>(810) 202-7474</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-envelope text-primary-400"></i>
                            <span>sales@incx.net</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-clock text-primary-400"></i>
                            <span>24/7/365 Support</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-flag-usa text-primary-400"></i>
                            <span>USA Based</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2024 Interconnecx, LLC. All rights reserved.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="/privacy.html" class="hover:text-primary-400 transition-colors">Privacy Policy</a>
                    <a href="/terms.html" class="hover:text-primary-400 transition-colors">Terms of Service</a>
                    <a href="/sla.html" class="hover:text-primary-400 transition-colors">SLA</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
EOF

    # Replace placeholders
    sed -i "s/TITLE_PLACEHOLDER/$title/g" "$filename"
    sed -i "s/DESC_PLACEHOLDER/$description/g" "$filename"
    sed -i "s|CONTENT_PLACEHOLDER|$content|g" "$filename"
    sed -i "s/NAV_ACTIVE//g" "$filename"
}

echo "Creating all website pages..."

# Make the script executable
chmod +x create-pages.sh

echo "Script ready to create pages. Run individual page creation commands below."