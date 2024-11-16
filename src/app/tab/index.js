// src/app/tab/index.js
class Tab {
    constructor(defaultValue, tabs) {
        this.selectedTab = defaultValue;
        this.tabs = tabs;
    }

    changeTab(tab) {
        if (this.selectedTab === tab) {
            return;
        }
        if (this.tabs.includes(tab)) {
            this.selectedTab = tab;
            this.onTabChange(tab);
        }
    }

    getSelectedTab() {
        return this.selectedTab;
    }

    onTabChange(tab) {
    }
}

export default Tab;