ko.dirtyFlag = function(root, isInitiallyDirty, saveMethod) {
    var result = function() {}
    var _initialState = ko.observable(ko.toJSON(root));
    var _isInitiallyDirty = ko.observable(isInitiallyDirty);

    result.isDirty = ko.computed(function() {
        return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
    });

    result.reset = function() {
        _initialState(ko.toJSON(root));
        _isInitiallyDirty(false);
    };

    ko.computed(function(){
        var dirty = _isInitiallyDirty() || _initialState() !== ko.toJSON(root);

        if(saveMethod && typeof(saveMethod) === "function"){
            saveMethod();
        }
    });

    return result;
};
