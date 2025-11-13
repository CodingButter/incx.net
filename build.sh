#!/bin/bash

#############################################
# Build Script for Next.js Static Site
# Usage: ./build.sh
#############################################

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_header() {
    echo ""
    print_message "$BLUE" "================================================"
    print_message "$BLUE" "  $1"
    print_message "$BLUE" "================================================"
    echo ""
}

print_success() {
    print_message "$GREEN" "✓ $1"
}

print_error() {
    print_message "$RED" "✗ $1"
}

print_warning() {
    print_message "$YELLOW" "⚠ $1"
}

print_info() {
    print_message "$BLUE" "ℹ $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command_exists apt-get; then
            echo "debian"
        elif command_exists yum; then
            echo "redhat"
        else
            echo "linux"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "mac"
    else
        echo "unknown"
    fi
}

# Install Node.js based on OS
install_nodejs() {
    local os_type=$(detect_os)

    # Use sudo only if not running as root (e.g., in Docker we're root)
    local SUDO=""
    if [ "$EUID" -ne 0 ]; then
        SUDO="sudo"
    fi

    print_header "Installing Node.js and npm"

    case $os_type in
        debian)
            print_info "Installing Node.js via apt..."
            $SUDO apt-get update
            $SUDO apt-get install -y curl
            if [ "$EUID" -eq 0 ]; then
                curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
            else
                curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
            fi
            $SUDO apt-get install -y nodejs
            ;;
        redhat)
            print_info "Installing Node.js via yum..."
            $SUDO yum install -y curl
            if [ "$EUID" -eq 0 ]; then
                curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
            else
                curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
            fi
            $SUDO yum install -y nodejs
            ;;
        mac)
            if command_exists brew; then
                print_info "Installing Node.js via Homebrew..."
                brew install node
            else
                print_error "Homebrew not found. Please install Homebrew first:"
                print_info "Visit: https://brew.sh"
                exit 1
            fi
            ;;
        *)
            print_error "Unsupported operating system"
            print_info "Please install Node.js manually from: https://nodejs.org"
            exit 1
            ;;
    esac

    if command_exists node && command_exists npm; then
        print_success "Node.js and npm installed successfully!"
        print_info "Node version: $(node --version)"
        print_info "npm version: $(npm --version)"
    else
        print_error "Installation failed. Please install Node.js manually."
        exit 1
    fi
}

# Check Node.js installation
check_nodejs() {
    print_header "Checking Dependencies"

    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        NODE_INSTALLED=true
    else
        print_warning "Node.js is not installed"
        NODE_INSTALLED=false
    fi

    if command_exists npm; then
        NPM_VERSION=$(npm --version)
        print_success "npm is installed: $NPM_VERSION"
        NPM_INSTALLED=true
    else
        print_warning "npm is not installed"
        NPM_INSTALLED=false
    fi

    if [ "$NODE_INSTALLED" = false ] || [ "$NPM_INSTALLED" = false ]; then
        echo ""
        print_warning "Node.js and npm are required to build this website."
        print_info "Node.js is a JavaScript runtime that allows us to build the static site."
        echo ""

        # Check if running in interactive mode (stdin is a terminal)
        if [ -t 0 ]; then
            # Interactive mode - ask user
            read -p "Would you like to install Node.js and npm now? (y/n): " -n 1 -r
            echo ""

            if [[ $REPLY =~ ^[Yy]$ ]]; then
                install_nodejs
            else
                print_error "Cannot proceed without Node.js and npm"
                print_info "Please install Node.js from: https://nodejs.org"
                exit 1
            fi
        else
            # Non-interactive mode (e.g., Docker) - auto-install
            print_info "Non-interactive mode detected. Installing Node.js automatically..."
            install_nodejs
        fi
    fi
}

# Install npm dependencies
install_dependencies() {
    print_header "Installing Project Dependencies"

    cd "$(dirname "$0")/next"

    if [ -f "package.json" ]; then
        if [ ! -d "node_modules" ]; then
            print_info "Installing packages (this may take a few minutes)..."
            npm install
            print_success "Dependencies installed successfully!"
        else
            print_info "Checking for updates..."
            npm install
            print_success "Dependencies are up to date!"
        fi
    else
        print_error "package.json not found!"
        exit 1
    fi

    cd ..
}

# Run the build
run_build() {
    print_header "Building Website"

    cd "$(dirname "$0")/next"

    # Determine output directory
    OUTPUT_DIR=${WEB_ROOT:-www}

    if [ -n "$WEB_ROOT" ]; then
        print_info "Building static site to ../$OUTPUT_DIR folder (custom WEB_ROOT)..."
    else
        print_info "Building static site to ../www folder..."
    fi
    print_info "This may take a minute..."

    npm run build

    cd ..

    print_success "Build completed successfully!"
}

# Verify build output
verify_build() {
    print_header "Verifying Build Output"

    # Determine output directory
    OUTPUT_DIR=${WEB_ROOT:-www}

    if [ -d "$OUTPUT_DIR" ]; then
        FILE_COUNT=$(find "$OUTPUT_DIR" -type f | wc -l)
        OUTPUT_SIZE=$(du -sh "$OUTPUT_DIR" | cut -f1)
        print_success "Build output verified!"
        print_info "Location: $(pwd)/$OUTPUT_DIR"
        print_info "Files: $FILE_COUNT"
        print_info "Size: $OUTPUT_SIZE"
    else
        print_error "Build output directory '$OUTPUT_DIR' not found!"
        exit 1
    fi
}

# Main execution
main() {
    # Clear screen only if running in an interactive terminal
    if [ -t 1 ]; then
        clear
    fi

    print_header "Website Build Script"
    print_info "This script will build your website from the config files"
    echo ""

    # Change to script directory
    cd "$(dirname "$0")"

    # Check and install Node.js if needed
    check_nodejs

    # Install project dependencies
    install_dependencies

    # Run the build
    run_build

    # Verify output
    verify_build

    # Final message
    OUTPUT_DIR=${WEB_ROOT:-www}
    print_header "Build Complete!"
    print_success "Your website is ready!"
    print_info "The static files are in: $(pwd)/$OUTPUT_DIR"
    print_info "You can deploy these files to any web server."
    echo ""
    print_info "To test locally, run: cd next && node serve-dist.js"
    print_info "Then visit: http://localhost:8080"
    echo ""
}

# Run main function
main
