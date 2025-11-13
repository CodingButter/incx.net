// Network Page Dynamic Content Loader
class NetworkManager {
    constructor() {
        // Wait for configs to be loaded
        if (window.configLoader && window.configLoader.loaded) {
            this.init();
        } else {
            window.addEventListener('configsLoaded', () => {
                this.init();
            });
        }
    }

    init() {
        // Get network page config from config-loader
        const config = window.configLoader ? window.configLoader.getCurrentPageConfig() : {};

        if (config.speedtest) {
            this.loadSpeedTests(config.speedtest);
        }

        if (config.lookingGlass) {
            this.loadLookingGlass(config.lookingGlass);
        }

        if (config.datacenters) {
            this.loadDataCenters(config.datacenters);
        }
    }

    loadSpeedTests(speedtest) {
        // Update title and description
        const titleEl = document.getElementById('speedtest-title');
        const descEl = document.getElementById('speedtest-description');
        const filesContainer = document.getElementById('speedtest-files');

        if (titleEl) titleEl.textContent = speedtest.title;
        if (descEl) descEl.textContent = speedtest.description;

        if (filesContainer) {
            filesContainer.innerHTML = '';

            // Add test files
            speedtest.files.forEach(file => {
                const fileEl = document.createElement('div');
                fileEl.className = 'p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow';
                fileEl.innerHTML = `
                    <div class="flex items-center justify-between gap-4">
                        <div>
                            <h4 class="font-semibold text-gray-900 dark:text-white">${file.label}</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${file.description}</p>
                        </div>
                        <a href="${file.url}" download class="btn btn-primary flex items-center gap-2 whitespace-nowrap">
                            <i class="fas fa-download"></i>
                            Download
                        </a>
                    </div>
                `;
                filesContainer.appendChild(fileEl);
            });

            // Add note
            if (speedtest.note) {
                const noteEl = document.createElement('div');
                noteEl.className = 'mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800';
                noteEl.innerHTML = `
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                        <i class="fas fa-info-circle mr-2"></i>
                        ${speedtest.note}
                    </p>
                `;
                filesContainer.appendChild(noteEl);
            }
        }
    }

    loadLookingGlass(lookingGlass) {
        const titleEl = document.getElementById('lookingglass-title');
        const descEl = document.getElementById('lookingglass-description');
        const inputEl = document.getElementById('lookingglass-input');
        const selectEl = document.getElementById('lookingglass-select');
        const buttonEl = document.getElementById('lookingglass-button');

        if (titleEl) titleEl.textContent = lookingGlass.title;
        if (descEl) descEl.textContent = lookingGlass.description;
        if (inputEl) inputEl.placeholder = lookingGlass.placeholder;
        if (buttonEl) buttonEl.textContent = lookingGlass.buttonText;

        if (selectEl) {
            selectEl.innerHTML = '';

            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.textContent = lookingGlass.defaultOption;
            selectEl.appendChild(defaultOption);

            // Add test types
            lookingGlass.testTypes.forEach(type => {
                const option = document.createElement('option');
                option.textContent = type;
                option.value = type.toLowerCase().replace(' ', '');
                selectEl.appendChild(option);
            });
        }
    }

    loadDataCenters(datacenters) {
        const grid = document.getElementById('datacenters-grid');
        if (!grid) return;

        grid.innerHTML = '';

        datacenters.forEach(dc => {
            const card = document.createElement('div');
            card.className = 'card p-6 hover:scale-105 transition-transform';
            card.innerHTML = `
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <i class="fas fa-map-pin text-primary-600 dark:text-primary-400"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-900 dark:text-white">${dc.city}, ${dc.state}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">${dc.type}</p>
                    </div>
                </div>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    ${dc.features.map(feature => `
                        <li><i class="fas fa-check text-green-500 mr-2"></i>${feature}</li>
                    `).join('')}
                </ul>
            `;
            grid.appendChild(card);
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new NetworkManager();
});