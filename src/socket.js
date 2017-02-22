
class WebSocketManager {

  constructor() {
    this.socket = null;
    this.listeners = [];

    this.status = 'disconnected';
  }

  connect() {
    const url = 'ws://' + window.location.host +  '/ws';
    this.socket = new WebSocket(url);
    this.socket.onmessage = e => this.handleMessage(e);

    this.socket.onerror = e => {
      this.status = 'error';
      this.emit('status', this.status);
    }

    this.socket.onopen = e => {
      this.status = 'connected';
      this.emit('status', this.status);
    }

    this.socket.onclose = e => {
      this.status = 'disconnected';
      this.emit('status', this.status);
    }
  }

  handleMessage(event) {
    const message = JSON.parse(event.data);
    this.emit('message', message);
  }

  emit(type, ...params) {
    for (let listener of this.listeners) {
      if (listener.type === type) {
        listener.func(...params);
      }
    }
  }

  on(type, func) {
    this.listeners.push({
      type: type,
      func: func
    });
  }

  readyState() {
    return this.socket.readyState;
  }

}

const instance = new WebSocketManager();

export default function getSocket() {
  return instance;
};
