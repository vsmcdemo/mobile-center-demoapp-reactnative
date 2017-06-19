export let Storage = (function () {
    let store = {
        user: {
                name: '',
                photoUrl: ''    
              },
        authInProgress: false,
        gettingFitDataProgress: false
    };
    const listeners = [];
	class StorageInner {
        constructor() {
            this.set = this.set.bind(this);
            this.get = this.get.bind(this);
            this.dispatch = this.dispatch.bind(this);
            this.subscribe = this.subscribe.bind(this);
        }

        set(itemName, newVal) {
            store[itemName] = newVal;
            console.log('Local store updated:', store);
            this.dispatch();
        }
        
        get(itemName) {
            return store[itemName];
        }

        dispatch(){
            listeners.forEach(listener => listener());
        }
        
        subscribe(listener){
            listeners.push(listener);
        }
    }
    
    return new StorageInner;
})();