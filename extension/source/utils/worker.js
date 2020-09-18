export default function(callback) {
  return async function() {
    this._dirty = true;
    if(this._active) return;
    this._active = true;
    
    try {
      while(this._dirty) {
        await callback.call(this);
        this._dirty = false
      }
    } finally {
      this._active = false;
    }
  }
}
