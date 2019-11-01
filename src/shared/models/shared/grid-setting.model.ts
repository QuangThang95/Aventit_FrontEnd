export class GridSettingModel {
    columnChooser = false;
    export = false;
    isFilter = true;
    filterRowHidden = false;
    isGrouping = false;
    isSearch = true;
    isSearchPanel = false;
    isFilterBuilder = false;
    isVisible = false;
    _autoSaveSetting = false;
    _saveSetting = true;
    _resetAllSetting = false;

    constructor() {}

    get autoSaveSetting() {
        return this._autoSaveSetting;
    }
    set autoSaveSetting(value: boolean) {
        this._saveSetting = !value;
        this._autoSaveSetting = value;
    }

    get saveSetting() {
        return this._saveSetting;
    }
    set saveSetting(value: boolean) {
        this._autoSaveSetting = !value;
        this._saveSetting = value;
    }

    get resetAllSetting() {
        return this._resetAllSetting;
    }
    set resetAllSetting(value: boolean) {
        this._resetAllSetting = value;
    }
}
